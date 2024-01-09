import styles from "./Home.module.scss"
import HeaderDecoy from '../components/HeaderDecoy'
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { Box, Typography } from "@mui/material";

type Props = {

}

export default function ProfilePage({ }: Props) {

  const user = useSelector(selectUser);

  return (
    <>
        <HeaderDecoy  />
        <div className={styles.container}>

          <Box sx={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}}>
              <img style={{borderRadius:"100%", width:"10rem", height:"10rem"}} src="https://is5-ssl.mzstatic.com/image/thumb/Purple113/v4/08/eb/14/08eb145d-fcef-a14e-0966-fc74074d27d1/source/256x256bb.jpg"  alt="" />
              <Typography
                  variant="h6"
                  color="secondary"
                  noWrap
                  sx={{ marginX:"0.5em", fontWeight:"bold", display: { fontFamily:"monospace" } }}
                >
                  {user?.email}
              </Typography>
          </Box>

          
          <Box sx={{display:"flex", justifyContent:"center", alignItems:"start", flexDirection:"column", gap:"1rem"}}>
              <Typography
                  sx={{fontWeight:"bold", color:"#BBE1FA"}}
                >
                  Number of transactions: <span style={{border:"1px solid #fff", padding:"0.3rem", color:"#3282B8"}}>25</span>
              </Typography>
              <Box sx={{}}>
                <Typography
                    sx={{fontWeight:"bold", color:"#00ADB5"}}
                  >
                    Trading now:
                </Typography>
                <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"0.5rem"}}>
                  <img style={{width:"5rem", height:"5rem"}} src="https://cdn2.lvr-cycles.com/22675-large_default/leatt-mtb-30-trail-mountain-bike-helmet.jpg" alt="" />
                  <img style={{width:"5rem", height:"5rem"}} src="https://vectorebike.com/images/virtuemart/product/resized/IMG_64885_654x520.jpg" alt="" />
                  <img style={{width:"5rem", height:"5rem"}} src="https://target.scene7.com/is/image/Target/GUEST_5274a351-c35b-48fa-9831-9595b268ead1?wid=1200&hei=1200&qlt=80&fmt=webp" alt="" />
                </Box>
              </Box>
          </Box>
          

        </div>
    </>
  )
}