// // Если оставить этот экспорт без указания "export const config = {}" ниже, то будут заблокированы абсолютно все пути для незарегестрированных юзеров
// // Если бы мы использовали бы этот метод, нам также нужно было бы сконфигурировать "secret: process.env.NEXTAUTH_SECRET," и вставить его в [...nextauth].ts
// // 'NEXTAUTH_SECRET' - Used to encrypt the NextAuth.js JWT, and to hash email verification tokens. This is the default value for the secret option in NextAuth and Middleware.
// // 'openssl rand -base64 32' - to generate NEXTAUTH_SECRET
// // Then add to '.env.local' - 'NEXTAUTH_SECRET=u3uKycP5qvXM4Npwa1QWw9tl7sGcmv4lWhMJC1de4uM='
// // Но вместо базового поведения мы используем конфигурацию указаную ниже
// export { default as nextAuthMiddleware } from "next-auth/middleware";

import { withAuth } from "next-auth/middleware";

// Define custom redirect routs
// If we don't add here a path to out custom LogIn page, we'll get an Err: Infinite redirect loop with custom signin page and middleware
// Path below is the duplicate from '[...nextauth].ts'
const defaultExport = withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});
export default defaultExport;

// Build in Next JS matcher that applies 'next-auth' only to the matching routes - can be regex
// В массиве мы можем указывать пути которые будут недоступны (будут защищены) до тех пор, пока юзер не залогинится
// Если роут защищен то его перебросят на путь указанный выше
export const config = {
  matcher: [
    // '/',
    // '/about/:path*',
  ],
}