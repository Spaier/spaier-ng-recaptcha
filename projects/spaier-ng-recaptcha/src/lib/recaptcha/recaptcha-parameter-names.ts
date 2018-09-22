import { RecaptchaAttributePrefix } from './recaptcha-constants'

export function getAttributeName(name: string): string {
  return RecaptchaAttributePrefix + name
}

export const actionName = 'action'
export const badgeName = 'badge'
export const bindName = 'bind'
export const callbackName = 'callback'
export const contentBindingName = 'content-binding'
export const errorCallbackName = 'error-callback'
export const expiredCallbackName = 'expired-callback'
export const hlName = 'hl'
export const isolatedName = 'isolated'
export const poolName = 'pool'
export const preloadName = 'preload'
export const sName = 's'
export const sitekeyName = 'sitekey'
export const sizeName = 'size'
export const stokenName = 'stoken'
export const tabIndexName = 'tabindex'
export const themeName = 'theme'
export const typeName = 'type'
