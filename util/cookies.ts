import cookie from 'cookie';

// export function createSerializedRegisterSessionTokenCookie(token:string){

//     const isProduction = process.env.NODE_ENV === "production"
//     // in deployed version, we want our cookie to be sent under https only.
//     // in development version, we want our cookie to be sent under http.

//     const maxAge = 60 * 60 * 24 ; // amount of seconds in 24 hrs

//     return cookie.serialize('sessionToken', token, {
//         // new browser
//         maxAge: maxAge,
//         // for old browsers (internet explorer)
//         expires: new Date (
//             Date.now() + maxAge *1000 // 24 hrs in milliseconds
//         ),

//         httpOnly: true,
//         secure: isProduction,
//         path: "/",
//         sameSite:'lax',
//     })
// }


export function createSerializedRegisterSessionTokenCookie(token: string) {
    // in the deployed version we want our cookie to be sent only under HTTPS
    // in the development version we want out cookie to be sent under HTTP
    const isProduction = process.env.NODE_ENV === 'production';
  
    const maxAge = 60 * 60 * 24; // 24 hours in seconds
  
    return cookie.serialize('sessionToken', token, {
      // new browser
      maxAge: maxAge,
      // for internet explorer and old browsers
      expires: new Date(
        Date.now() + maxAge * 1000, // 24 hours in milliseconds
      ),
  
      httpOnly: true,
      secure: isProduction,
      path: '/',
      // Be explicit about new default behavior
      // in browsers
      // https://web.dev/samesite-cookies-explained/
      sameSite: 'lax', // this prevents CSRF attacks
    });
  }
  