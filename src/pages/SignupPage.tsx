import { Button, TextField, Typography } from '@mui/material';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { SetStateAction, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import colors from "../assets/colors.module.scss"

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
    <div style={{height:"100vh", display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", background:"url(/1.jpg)", backgroundSize:"cover"}}>
        <Typography variant='h3'
            sx={{
                color:"#fff",
                fontWeight:"bold",
                position:"absolute",
                top:"15%",
                left:{sm:"15%",md:"30%",lg:"42.5%",xl:"30%"},
                
            }}>
            <span style={{color:colors.primary_green}}>Saar</span>
            <span style={{color:colors.primary_grey}}>Swap</span>
        </Typography>   
        <div className="form__wrapper" style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", gap:"0.5em", background:colors.secondary_blue, padding:"5%", borderRadius:"1em", opacity:"0.9"}}>                                            
        <TextField id="outlined-basic" onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)} label="Email" variant="outlined" />
        <TextField id="outlined-basic" onChange={(e: { target: { value: SetStateAction<string>; }; }) => setPassword(e.target.value)} type="password" label="Password" variant="outlined" />
        <Button onClick={onSubmit} variant='contained' color='primary'>Sign up</Button>
    <Typography id="modal-modal-title" color={colors.primary_green} variant="body1">
        Already have an account?{' '}
        <NavLink style={{color:colors.primary_green, fontWeight:"bold"}} to="/login">
            Login
        </NavLink>
    </Typography>
    </div>          
</div>
)
}