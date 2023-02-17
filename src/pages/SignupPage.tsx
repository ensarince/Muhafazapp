import { Button, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

type Props = {}

export default function SignupPage({}: Props) {

    const navigate = useNavigate();
 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
 
    const onSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()

    await createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            // Signed in
            navigate("/login")
            // ...
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage)
            // ..
        });
    }
return (
    <div style={{height:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", background:"url(/1.png)"}}>
    <div className="form__wrapper" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"0.5em", background:"white", padding:"2%", borderRadius:"1em", opacity:"0.9"}}>                                            
        <TextField id="outlined-basic" onChange={e => setEmail(e.target.value)} label="Email" variant="outlined" />
        <TextField id="outlined-basic" onChange={e => setPassword(e.target.value)} type="password" label="Şifre" variant="outlined" />
        <Button onClick={onSubmit} variant='contained' color='primary'>Kayıt ol</Button>
    <Typography id="modal-modal-title" color="black" variant="body1">
        Zaten hesabınız var mı?{' '}
        <NavLink style={{color:"black"}} to="/login">
            Giriş yap
        </NavLink>
    </Typography>
    </div>          
</div>
)
}