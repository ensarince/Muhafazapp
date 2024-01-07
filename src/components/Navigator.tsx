import { Box } from '@mui/material'
import React from 'react'
import colors from "../assets/colors.module.scss"
import { Email, Home, Person } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

type Props = {
    setPageCount: React.Dispatch<React.SetStateAction<number>>;
    pageCount: number
}

function Navigator({ pageCount, setPageCount }: Props) {

    const navigate = useNavigate()

  return (
    <Box sx={{
        position:"sticky",
        bottom:"0",
        background: colors.primary_dark,
        width:"100%",
        height:"4.5rem"
    }}>
        <Box 
            sx={{
                display:"flex",
                justifyContent:"space-evenly",
                alignItems:"center",
                height:"100%",
                width:"100%",
            }}>
                <Home  onClick={() => {navigate("/"); setPageCount(0)}}
                    sx={{
                        width:"5rem",
                        transform:pageCount === 0 ? "scale(1.3)" : "none",  
                        color:pageCount === 0 ? colors.secondary_blue_softest : colors.primary_green, 
                        cursor:"pointer"
                    }}
                />
                <Email  onClick={() => {navigate("/inbox"); setPageCount(1)}}
                    sx={{
                        width:"5rem",
                        transform:pageCount === 1 ? "scale(1.3)" : "none",  
                        color:pageCount === 1 ? colors.secondary_blue_softest : colors.primary_green, 
                        cursor:"pointer"
                    }}
                />
                <Person  onClick={() => {navigate("/profile"); setPageCount(2)}}
                    sx={{
                        width:"5rem",
                        transform: pageCount === 2 ? "scale(1.3)" : "none", 
                        color:pageCount === 2 ? colors.secondary_blue_softest : colors.primary_green, 
                        cursor:"pointer"
                    }}
                />
        </Box>


    </Box> )
}

export default Navigator