'use client'

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { RegisterResponseBody } from '../../api/(auth)/register/route';

export default function RegisterForm (){
    const [username, setUsername]= useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();


    return (
    <form onSubmit = {async(event)=>{
        event.preventDefault();

        const response = await fetch("/api/register", {
            method: 'POST', 
            body: JSON.stringify({username, password}),
        });
        const data: RegisterResponseBody = await response.json();

        if ('errors' in data){
            return ;
        }
console.log(data.user);
    router.push('/') 

    }}>
        <label>
            username:
             <input 
             value={username}
            onChange={(event)=>setUsername(event.currentTarget.value)}/>
        </label>
        <label>
            password: 
            <input 
            value={password}
            onChange={(event)=>setPassword(event.currentTarget.value)} />
        </label>
        <button>Register</button>

    </form>
    )
}