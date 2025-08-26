// /frontend/app/actions.ts

'use server'

import { draftMode } from 'next/headers'
import * as brevo from '@getbrevo/brevo'
// Import the crypto module for generating the PayFast signature
import crypto from 'crypto'
// Import the CartItem type from our Zustand store
import { CartItem } from './store/cart'

// --- Helper function for PayFast URL encoding ---
const pfUrlEncode = (value: string): string => {
  let encodedValue = encodeURIComponent(value.trim()).replace(/%20/g, '+')
  // Convert all URL-encoded hex codes to uppercase as required by PayFast
  encodedValue = encodedValue.replace(/%[0-9a-f]{2}/g, (match) =>
    match.toUpperCase()
  )
  return encodedValue
}

// --- PayFast Checkout Server Action ---
export async function processCheckout(items: CartItem[]) {
  'use server'

  const merchantId = process.env.PAYFAST_MERCHANT_ID
  const merchantKey = process.env.PAYFAST_MERCHANT_KEY
  const passphrase = process.env.PAYFAST_PASSPHRASE
  // FIX: Use Vercel's system environment variable for the public URL when deployed.
  const siteUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const payfastUrl =
    process.env.PAYFAST_PROCESS_URL ||
    'https://sandbox.payfast.co.za/eng/process'

  if (!merchantId || !merchantKey) {
    return { error: 'PayFast credentials are not configured.' }
  }

  // --- 1. Calculate the total amount ---
  const totalAmount = items
    .reduce((total, item) => total + (item.price ?? 0) * item.quantity, 0)
    .toFixed(2)

  // --- 2. Create a unique ID for the transaction ---
  const merchantReference = `LTL-${Date.now()}`

  // --- 3. Prepare the data payload ---
  const data = {
    merchant_id: merchantId,
    merchant_key: merchantKey,
    // FIX: Use the siteUrl from environment variables
    return_url: `${siteUrl}/`,
    cancel_url: `${siteUrl}/`,
    notify_url: `${siteUrl}/api/notify`,
    m_payment_id: merchantReference,
    amount: totalAmount,
    item_name: `LTL E-Shop Order #${merchantReference}`,
    item_description: `Purchase of ${items.length} item(s) from the LTL E-Shop.`,
  }

  // --- 4. Generate the security signature ---
  const dataForSignatureArray = [
    { key: 'merchant_id', value: data.merchant_id },
    { key: 'merchant_key', value: data.merchant_key },
    { key: 'return_url', value: data.return_url },
    { key: 'cancel_url', value: data.cancel_url },
    { key: 'notify_url', value: data.notify_url },
    { key: 'm_payment_id', value: data.m_payment_id },
    { key: 'amount', value: data.amount },
    { key: 'item_name', value: data.item_name },
    { key: 'item_description', value: data.item_description },
  ]

  let queryStringForSignature = dataForSignatureArray
    .filter((item) => item.value !== '' && item.value !== null)
    .map(
      ({ key, value }) =>
        `${key}=${pfUrlEncode(value!.toString())}`
    )
    .join('&')

  if (passphrase) {
    queryStringForSignature += `&passphrase=${pfUrlEncode(passphrase)}`
  }

  const signature = crypto
    .createHash('md5')
    .update(queryStringForSignature)
    .digest('hex')

  // --- 5. Construct the final redirect URL ---
  const urlQueryString = Object.entries(data)
    .map(
      ([key, value]) =>
        `${key}=${encodeURIComponent(value)}`
    )
    .join('&')

  // --- 6. Construct the final redirect URL ---
  const redirectUrl = `${payfastUrl}?${urlQueryString}&signature=${signature}`

  return { success: true, url: redirectUrl }
}

// --- Brevo Contact Form Action ---
interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(formData: ContactFormData) {
  'use server'

  const { name, email, subject, message } = formData

  // --- 1. Validate the data ---
  if (!name || !email || !subject || !message) {
    return { error: 'All fields are required.' }
  }

  // --- 2. Initialize the Brevo API ---
  const api = new brevo.TransactionalEmailsApi()
  api.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY as string
  )

  // --- 3. Prepare the email ---
  const sendSmtpEmail = new brevo.SendSmtpEmail()
  sendSmtpEmail.subject = `New Contact Form Submission: ${subject}`
  sendSmtpEmail.htmlContent = `
    <html>
      <body>
        <h1>New Message from LTL Website Contact Form</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      </body>
    </html>
  `
  // FIX: Use environment variables for recipient and sender details
  sendSmtpEmail.to = [
    {
      email: process.env.BREVO_TO_EMAIL || 'info@livingthroughlearning.org',
      name: process.env.BREVO_TO_NAME || 'LTL Admin',
    },
  ]
  sendSmtpEmail.sender = {
    email: process.env.BREVO_SENDER_EMAIL || 'noreply@yourdomain.com',
    name: process.env.BREVO_SENDER_NAME || 'LTL Website Form',
  }

  try {
    await api.sendTransacEmail(sendSmtpEmail)
    return { success: true, message: 'Thank you for your message!' }
  } catch (error) {
    console.error('Brevo API Error:', error)
    return {
      error: 'There was an error sending your message. Please try again later.',
    }
  }
}

// --- Draft Mode Action ---
export async function disableDraftMode() {
  'use server'
  await Promise.allSettled([
    (await draftMode()).disable(),
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ])
}
