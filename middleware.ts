import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import NextAuth from 'next-auth'
import authConfig from './auth.config'

const publicPages = [
  '/',
  '/search',
  '/sign-in',
  '/sign-up',
  '/cart',
  '/cart/(.*)',
  '/product/(.*)',
  '/page/(.*)',
]

const intlMiddleware = createMiddleware(routing)
const { auth } = NextAuth(authConfig)

// middleware.ts (with error handling)
export default auth(async (req) => {
  try {
    const publicPathnameRegex = RegExp(
      `^(/(${routing.locales.join('|')}))?(${publicPages
        .flatMap((p) => (p === '/' ? ['', '/'] : p))
        .join('|')})/?$`,
      'i'
    )
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

    console.log(
      'Middleware - Path:',
      req.nextUrl.pathname,
      'Locale:',
      req.headers.get('accept-language')
    )

    if (isPublicPage) {
      const response = intlMiddleware(req)
      response.headers.set(
        'x-locale',
        req.nextUrl.pathname.split('/')[1] || routing.defaultLocale
      )
      return response
    } else {
      if (!req.auth) {
        const locale =
          req.nextUrl.pathname.split('/')[1] || routing.defaultLocale
        const callbackUrl =
          encodeURIComponent(req.nextUrl.pathname) || `/${locale}`
        const newUrl = new URL(
          `/${locale}/sign-in?callbackUrl=${callbackUrl}`,
          req.nextUrl.origin
        )
        return Response.redirect(newUrl)
      } else {
        const response = intlMiddleware(req)
        response.headers.set(
          'x-locale',
          req.nextUrl.pathname.split('/')[1] || routing.defaultLocale
        )
        return response
      }
    }
  } catch (error) {
    console.error('Middleware Error:', error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
})

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
