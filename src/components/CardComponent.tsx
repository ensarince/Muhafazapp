import React, { useEffect, useState } from 'react'
import { alpha, Backdrop, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, createTheme, Fade, Modal, styled, Typography } from '@mui/material'
import { Esya } from '../types';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';
import { deleteDoc, doc } from 'firebase/firestore';

type Props = {
  item: Esya
}

const theme = createTheme({
  palette: {
    primary: {
      main:  '#222831',
    },
    secondary: {
      main:  '#EEEEEE',
    },
  },
});


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function CardComponent({item}: Props) {
  
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useSelector(selectUser);
  const [collection, setCollection] = useState("")

  useEffect(() => {
    item.isMissing ? setCollection("lostItems") : setCollection("foundItems")
  }, [])
  
  //there are two collections, reach the right one from the item isMissing, isFound values

  //delete post func
  const handleDelete = async() => {
    try{
      await deleteDoc(doc(db, collection, item.id))
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
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={item.image || "https://cdn.pixabay.com/photo/2017/06/26/15/46/help-2444110__340.png"}
                alt="green iguana"
                style={{objectFit:"contain"}}
              />
              <CardContent>
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
                Detay              
              </Button>
            </CardActions>
            {item.user === user.email ? (
            <CardActions>
            <Typography variant="body2" style={{fontSize:"0.7em"}} color="text.secondary">
                  Bu item bulundu mu?
                </Typography>
              <Button onClick={handleDelete} size="small" sx={{fontSize:"0.7em"}} color="secondary">
                Ilan kaldır              
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
                {item.contact}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                {item.description}
              </Typography>
              <Typography id="transition-modal-title" sx={{textDecoration:"underline"}} variant="h6">
                {item.user}
              </Typography>
            </Box>
          </Fade>
        </Modal>
      

    </div>
  )
}
