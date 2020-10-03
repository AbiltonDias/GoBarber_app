import React,
  { createContext,
    useCallback,
    useState,
    useContext,
    useEffect,
    } from 'react';

import AsyncStorange from '@react-native-community/async-storage';

import api from '../services/api';

interface AuthState{
    token: string;
    user: object;
}

interface SignInCredentials{
    email: string;
    password: string;
}

interface AuthContextData{
    user:object;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut():void;
}
const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData
);

const AuthProvider: React.FC =  ({children}) => {
    const [data, setData] = useState<AuthState>({} as AuthState);

    useEffect(() => {
      async function loadStorageData(): Promise<void>{
        //const token = await AsyncStorange.getItem();
        //const user = await AsyncStorange.getItem();
        const [token, user] = await AsyncStorange.multiGet([
          '@GoBarber:token',
          '@GoBarber:user',
        ]);

        if(token[1] && user[1]){
          setData({token: token[1], user: JSON.parse(user[1])});
        }
      }
    }, [])

    const signIn = useCallback(async ({email, password}) => {
        const response = await api.post('sessions', {
            email,
            password
        });

        const { token, user} = response.data;
        // Preferiu a forma mais simplificada de baixo;
        //await AsyncStorange.setItem('@GoBarber:token', token);
        //await AsyncStorange.setItem('@GoBarber:user', JSON.stringify(user));

        await AsyncStorange.multiSet([
          ['@GoBarber:token', token],
          ['@GoBarber:user', JSON.stringify(user)],
        ])

        setData({ token, user});
    }, []);

    const signOut =useCallback(async () => {
        await AsyncStorange.multiRemove([
          "@GoBarber: token",
          "@GoBaber: user"
        ]);
        //await AsyncStorange.removeItem("@GoBaber: user"); FORMA DE CIMA É MAIS ENCHUTA;

        setData({} as AuthState)
    }, []);

    return(
        <AuthContext.Provider value={{user: data.user, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    );
}

function useAuth(): AuthContextData{
    const context = useContext(AuthContext);

    if(!context){
        throw new Error('UseAuth must be used within an AuthProvider');
    }

    return context;
}

export {AuthProvider, useAuth}
