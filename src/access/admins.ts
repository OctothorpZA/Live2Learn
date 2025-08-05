import type { AccessArgs } from 'payload'
import type { User } from '../payload-types'

type isAdmin = (args: AccessArgs<User>) => boolean

export const admins: isAdmin = ({ req: { user } }) => {
  // Return true if the user is logged in
  return Boolean(user)
}
