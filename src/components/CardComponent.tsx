import React from 'react'
import { Backdrop, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Fade, Modal, Typography } from '@mui/material'
import { Esya } from '../types';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';
import colors from "../assets/colors.module.scss"

type Props = {
  item: Esya
}

const style = {
  position: 'absolute' as 'absolute',
  color:"#fff",
  display:"flex",
  justifyContent:"center",
  alignItems:"center",
  flexDirection:"column",
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: colors.primary_dark,
  border: `2px solid ${colors.secondary_blue_softest}`,
  boxShadow: 24,
  p: 4,
};

export default function CardComponent({item}: Props) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useSelector(selectUser);
  //const [collection, setCollection] = useState("")

  //delete post func
  const handleDelete = async() => {
    try{
      await deleteDoc(doc(db, "items", item.id))
          .then(()=>{
            alert("successfully deleted! ")
          })
        } catch (error) {
          alert(error)
        }
        window.location.reload()
  }
  
  return (
    <div>
        <Card sx={{ maxWidth: 345}}>
            <CardActionArea sx={{pointerEvents:"none"}}>
              <CardMedia
                component="img"
                height="140"
                image={item?.image !== undefined ? item.image : "https://cdn.pixabay.com/photo/2017/06/26/15/46/help-2444110__340.png"}
                alt="green iguana"
                sx={{objectFit:"contain", overflow:"hidden", width:"100%", height:"7.5rem", marginTop:"1rem"}}
              />
              <CardContent sx={{}}>
                <Typography gutterBottom variant="h6" sx={{display:"inline"}}>
                  {item.esya}
                </Typography>
                <Typography variant="inherit" style={{textTransform:"uppercase"}} color="text.secondary">
                  {item.category}
                </Typography>
                <Typography variant="body1" noWrap sx={{ marginTop:"0.5em"}} color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button onClick={handleOpen} size="small" color="primary">
                Details              
              </Button>
            </CardActions>
            {item.user === user.email ? (
            <CardActions>
            <Typography variant="body2" style={{fontSize:"0.7em"}} color="text.secondary">
                  Gone already?
                </Typography>
              <Button onClick={handleDelete} size="small" sx={{fontSize:"0.7em"}} color="secondary">
                Remove ad      
              </Button>
            </CardActions>
              ) : (<></>)
            }
          </Card>

          <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                {item.esya}
              </Typography>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                {item.isSelling && item.isTrading && item.isLending ? "For sale + trade + lend" : 
                  item.isSelling && item.isTrading ? "For sale + trade" : 
                  item.isSelling && item.isLending ? "For sale + lend" :
                  item.isLending && item.isTrading ? "For trade + lend" :
                  item.isSelling ? "For sale" : 
                  item.isTrading ? "For trade" : 
                  item.isLending ? "For lend" : null}
              </Typography>
              <img src={item.image} style={{width:"50%", height:"50%"}} alt="item" />
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {item.description}
              </Typography>
              <Typography id="transition-modal-title" variant="h6">
              Contact: <span style={{textDecoration:"underline"}}>{item.user}</span>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      

    </div>
  )
}
