import React from 'react'
import { alpha, Backdrop, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, createTheme, Fade, Modal, styled, Typography } from '@mui/material'
import { Esya } from '../types';
import { Link } from 'react-router-dom';

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


const text = styled('h6')(({ theme }) => ({
  textDecoration: "none"
}));

export default function CardComponent({item}: Props) {

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
        <Card onClick={handleOpen} sx={{ maxWidth: 345 }}>
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
              <Button size="small" color="primary" onClick={handleOpen}>
                Detay              
              </Button>
            </CardActions>
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
