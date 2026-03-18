import { cookies } from 'next/headers'

export const COOKIE_NAME = 'ca_admin_auth'
export const COOKIE_VALUE = 'authenticated'

export function isAdminAuthenticated(): boolean {
  const cookieStore = cookies()
  return cookieStore.get(COOKIE_NAME)?.value === COOKIE_VALUE
}
