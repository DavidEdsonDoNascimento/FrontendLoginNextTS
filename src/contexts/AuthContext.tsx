import Router from "next/router";
import { parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { recoverUserInformation, signInRequest } from "../services/auth";
import { SignInRequest } from "../types/SignIn";
import { User } from "../types/User";

type AuthContextProps = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (data: SignInRequest) => Promise<void>;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;

    const signIn = async ({ email, password }: SignInRequest) => {
        const { token, user } = await signInRequest({
            email,
            password
        })

        setCookie(undefined, 'fakeatm.token', token, {
            maxAge: 60 * 60 * 1 // 1h
        })
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user);
        Router.push('/');
    }

    // quando AuthProvider for renderizado em tela valida-se a existencia do cookie
    // para identificar se o usuário já está logado no sistema
    useEffect(() => {

        const { 'fakeatm.token': token } = parseCookies();

        if (token) {
            // busca em auth.ts as informações de usuario la do back-end e salva no estado do usuario
            recoverUserInformation(token).then(response => setUser(response.user));
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
}