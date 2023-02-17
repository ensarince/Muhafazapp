import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { Button, TextField, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';

type Props = {}

export default function LoginPage({}: Props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e: { preventDefault: () => void; }) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
      .then(() => {
          // Signed in
          navigate("/")
      })
      .catch((error) => {
          const errorMessage = error.message;
          alert(errorMessage)
      });
  }
  return (
    <div style={{height:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", background:"url(/1.png)"}}>
              <div className="form__wrapper" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"0.5em", background:"white", padding:"5%", borderRadius:"1em", opacity:"0.9"}}>                                            
                    <TextField id="outlined-basic" onChange={e => setEmail(e.target.value)} label="Email" variant="outlined" />
                    <TextField id="outlined-basic" onChange={e => setPassword(e.target.value)} type="password" label="Şifre" variant="outlined" />
                    <Button onClick={onLogin} variant='contained' color='primary'>Giriş</Button>
              <Typography id="modal-modal-title" color="black" variant="body1">
                    Hesabınız yok mu?{' '}
                    <NavLink style={{color:"black"}} to="/signup">
                        Kayıt ol
                    </NavLink>
              </Typography>
              </div>          
    </div>
  )
}