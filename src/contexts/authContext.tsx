"use client"

import { Children, createContext, use, useEffect, useState } from "react";
import { setCookie, parseCookies } from "nookies";
import logarUsuario from "@/services/APIs/userAuthentication";
import api from "@/lib/api";
import { destroySession, fetchMe } from "./authFunctions";

type UserData = {
    id: string,
    nome: string,
    email: string,
    senha: string,
    confirmarSenha:string
    fotoDePerfil?: string
}

type SignInData = {
    email: string,
    password: string
}

type AuthContextType = {
    isAuthenticated: boolean;
    user: UserData | undefined;
    signIn: (data: SignInData) => void;
    signOut: () => void;
    refreshUserData: () => void;
}

export const AuthContext = createContext({} as AuthContextType)

const AuthProvider = ({ children }:any) => {
    const [user, setUser] = useState<UserData | undefined>(undefined)
    const isAuthenticated = !!user;

    const refreshUserData = async () => {
        try {
          const userInfo = await fetchMe();
          setUser(userInfo);
        } catch (error) {
          console.error("Failed to refresh user data", error);
          await signOut();
        }
      };

    useEffect(() => {
        const isUserLoggedIn = async () => {
            const {token} = parseCookies();
            if(token){
                await refreshUserData()
            }
        }
        isUserLoggedIn();
    }, [])

    async function signIn({email, password}: SignInData) {
        const response = await logarUsuario (
            email,
            password,
        )
        const {token, user} = response.data
        setCookie(undefined, 'token', token, {
            maxAge: 60*60*1, //1 hour
        })
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        setUser(user)

    }

    const signOut = async () => {
        await destroySession()
        setUser(undefined)
    }

    return (
        <AuthContext.Provider value={{user, signIn, isAuthenticated, signOut, refreshUserData}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider