// frontend/app/actions.ts

'use server'

import { draftMode } from 'next/headers'
import * as brevo from '@getbrevo/brevo'

// Define the structure of the form data
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
    process.env.BREVO_API_KEY as string,
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
  // IMPORTANT: Replace with the email address where you want to receive messages
  sendSmtpEmail.to = [{ email: 'info@livingthroughlearning.org', name: 'LTL Admin' }]
  sendSmtpEmail.sender = { email: 'noreply@yourdomain.com', name: 'LTL Website Form' } // IMPORTANT: This should be a verified sender in your Brevo account

  // --- 4. Send the email ---
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

export async function disableDraftMode() {
  'use server'
  await Promise.allSettled([
    (await draftMode()).disable(),
    // Simulate a delay to show the loading state
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ])
}
