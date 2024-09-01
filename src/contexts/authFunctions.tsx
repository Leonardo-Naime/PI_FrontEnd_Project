'use server';


import UserProfile from '@/services/APIs/userProfile';
import * as jose from 'jose';
import { cookies } from 'next/headers';

export async function openSessionToken() {
    try {
        //pega o token
        const sessionToken = cookies().get("token");
    
        if (!sessionToken) return null;

        // verifica se a assinatura do token é valida (cai no catch caso nao for)
        const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_AUTH_SECRET);
        const { payload } = await jose.jwtVerify(sessionToken.value, secret);
        console.log(payload)
        // verifica se o token expirou
        // if( (payload.exp as number) * 1000 > new Date().getTime() ) return null;

        // retorna o payload do token
        return payload;
    } catch (e){
        return null;
    }
}

export async function destroySession() {
  cookies().delete('token');
}


export async function fetchMe() {
  const payload = await openSessionToken();

  //se não tiver payload, retorna null (usuario nao logado)
  if (!payload) return undefined;

  // se tiver payload, retorna os dados do usuario do banco de dados
  return await UserProfile(payload.sub);
}


// export async function createSessionToken(payload = {}) {
//   const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
//   const session = await new jose.SignJWT(payload)
//     .setProtectedHeader({ alg: 'HS256' })
//     .setExpirationTime('1d')
//     .sign(secret);
//   const { exp } = await openSessionToken(session);
//   cookies().set('session', session, {
//     expires: (exp as number) * 1000,
//     path: '/',
//     httpOnly: true,
//     sameSite: 'strict',
//   });
// }

// export async function isUserAdmin(){
//   const sessionCookie = cookies().get('session');
//   if (!sessionCookie) return null;
//   const user = await openSessionToken(sessionCookie.value);
//   return user.isAdmin;
// }


