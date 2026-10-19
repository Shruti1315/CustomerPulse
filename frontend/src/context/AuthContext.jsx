import {createContext,useContext,useMemo,useState} from 'react';
import api from '../services/api';
const AuthContext=createContext(null);
export function AuthProvider({children}){const [user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('cp_user')||'null')}catch{return null}});const [loading,setLoading]=useState(false);
const login=async(credentials)=>{setLoading(true);try{const {data}=await api.post('/auth/login',credentials);localStorage.setItem('cp_token',data.data.token);localStorage.setItem('cp_user',JSON.stringify(data.data.user));setUser(data.data.user);return data.data.user;}finally{setLoading(false)}};
const register=async(payload)=>{setLoading(true);try{const {data}=await api.post('/auth/register',payload);localStorage.setItem('cp_token',data.data.token);localStorage.setItem('cp_user',JSON.stringify(data.data.user));setUser(data.data.user);return data.data.user;}finally{setLoading(false)}};
const logout=()=>{localStorage.removeItem('cp_token');localStorage.removeItem('cp_user');setUser(null);};
const value=useMemo(()=>({user,loading,login,register,logout}),[user,loading]);return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>}
export const useAuth=()=>useContext(AuthContext);
