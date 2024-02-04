import React from 'react'
import styles from "./Home.module.scss"
import HeaderDecoy2 from "../components/HeaderDecoy2"
import { Box, Button, Typography } from '@mui/material'
import colors from "../assets/colors.module.scss"
import { Chat } from '@mui/icons-material'

type Props = {
    
}

export default function MessagePage({ }: Props) {
  return (
    <>
    <HeaderDecoy2 />

        <Button
            variant='contained' 
            color='inherit'  
            sx={{
                fontSize:"1.3em",
                position:"absolute", 
                right:"5%", 
                bottom:"15%", 
                borderRadius:"100%",
                height:"5.5rem", 
                minWidth:"5rem"
            }}>
              <Chat/>
        </Button>

        <div className={styles.container}>
          <Box sx={{display:"grid", gridTemplateColumns:"5rem 14rem", justifyContent:"center", alignItems:"center", width:{xs:"100%", sm:"100%", md:"50%", lg:"30%", xl:"30%"}, height:"7.5rem", color:"#fff", background:colors.secondary_blue_softer}}>
            <img style={{borderRadius:"100%", width:"50px", height:"50px"}} src="https://media.licdn.com/dms/image/D4E03AQHrfiYzSpQtfA/profile-displayphoto-shrink_800_800/0/1670598092910?e=2147483647&v=beta&t=ldSIoQ5_ckvbA4B0KfpO1avskwWnuUYaC1P96kaWtew" alt="" />
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"start"}}>
              <img style={{width:"2rem"}} src="https://media.partydeko.de/media/catalog/product/cache/8/image/9df78eab33525d08d6e5fb8d27136e95/h/a/hawaiihemd-sunset-on-the-beach-1146_1.jpg" alt="" />
              <Typography sx={{fontWeight:"bold"}}>
                  Justin Jole
              </Typography>
              <Typography>
                Heyy. Can we trade these items? I thought....
              </Typography>
            </Box>
          </Box>
          <Box sx={{display:"grid", gridTemplateColumns:"5rem 14rem", justifyContent:"center", alignItems:"center", width:{xs:"100%", sm:"100%", md:"50%", lg:"30%", xl:"30%"}, height:"7.5rem", color:"#fff", background:colors.secondary_blue_soft}}>
            <img style={{borderRadius:"100%", width:"50px", height:"50px"}} src="https://media.licdn.com/dms/image/D5603AQFOh9fR8Y6_-A/profile-displayphoto-shrink_800_800/0/1706710766493?e=1712793600&v=beta&t=nETG06NZ3BfrWFhl5tSjjOSJ-PvZp2mM4Qxx6xsJ0IE" alt="" />
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"start"}}>
              <img style={{width:"2rem"}} src="https://i.etsystatic.com/34187105/r/il/42f625/4277147086/il_570xN.4277147086_3tfb.jpg" alt="" />
              <Typography sx={{fontWeight:"bold"}}>
                  Milica Milicavic
              </Typography>
              <Typography>
                But how much are you willing to pay?
              </Typography>
            </Box>
          </Box>
          <Box sx={{display:"grid", gridTemplateColumns:"5rem 14rem", justifyContent:"center", alignItems:"center", width:{xs:"100%", sm:"100%", md:"50%", lg:"30%", xl:"30%"}, height:"7.5rem", color:"#fff", background:colors.secondary_blue}}>
            <img style={{borderRadius:"100%", width:"50px", height:"50px"}} src="https://media.licdn.com/dms/image/C5103AQH28HY5DiAkDA/profile-displayphoto-shrink_400_400/0/1552307079505?e=2147483647&v=beta&t=QLetHtxKGpEz9bbPbjes5KfIAJwSVBHkc_MZnphFff4" alt="" />
            <Box sx={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"start"}}>
              <img style={{width:"2rem"}} src="https://cdn.test.de/file/image/ct/produktbilder/302020183001/v1/u1322-3/hauptbild_original/hauptbild_original;w835.webp" alt="" />
              <Typography sx={{fontWeight:"bold"}}>
                  Pramilla Cheddary
              </Typography>
              <Typography>
                You know I am a student so...
              </Typography>
            </Box>
          </Box>
        </div>
    </>
  )
}