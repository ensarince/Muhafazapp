import React, { useEffect, useState } from 'react'
import { Backdrop, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Fade, Modal, Typography } from '@mui/material'
import { Esya } from '../types';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { db } from '../firebase';
import { QueryDocumentSnapshot, collection, deleteDoc, doc, onSnapshot, query, runTransaction } from 'firebase/firestore';
import colors from "../assets/colors.module.scss"
import { Favorite, FavoriteBorder } from '@mui/icons-material';

type Props = {
  item: Esya
}

export default function CardComponent({item}: Props) {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = useSelector(selectUser);
  //const [collection, setCollection] = useState("")
  const [likes, setLikes] = useState<any>([])

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
    bgcolor: item.user === user.email ? colors.secondary_blue_soft : colors.primary_dark,
    border: `2px solid ${colors.secondary_blue_softest}`,
    boxShadow: 24,
    p: 4,
  };
  
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

  const likePost = async (item_id: any) => {
    const itemRef = doc(db, 'likes', item_id);

    await runTransaction(db, async (transaction) => {
      const itemDoc = await transaction.get(itemRef);

      if (itemDoc.exists()) {
        // The document exists, update it to add or remove the user email
        let existingUsers = itemDoc.data().users || [];
        const userEmail = user.email;

        if (existingUsers.includes(userEmail)) {
          // User has already liked the post, remove the like
          existingUsers = existingUsers.filter((email: any) => email !== user.email);
        } else {
          // User hasn't liked the post, add the like
          existingUsers.push(userEmail);
        }

        // Update the document with the modified users array
        transaction.update(itemRef, { users: existingUsers });
      } else {
        // The document doesn't exist, create it with the new user email
        transaction.set(itemRef, {
          users: [user.email]
        });
      }
    });
};

  //getting like data
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(db, 'likes')), 
      (snapshot: any) => {
        let itemArray: any = [];
        snapshot.forEach((item: QueryDocumentSnapshot) => {
          const itemObject = {
            id: item.id,
            data: item.data()
          };
          itemArray.push(itemObject);
        });
      setLikes(itemArray);
    });
  
    return () => {
      unsubscribe();
    };
  }, [db, likePost]);   
  
  return (
    <div>
        <Card sx={{ maxWidth: 345, background: item.user === user.email ? colors.secondary_blue_soft : colors.primary_dark}}>
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
                  {item.esya}<span style={{fontWeight:"bold", color:"#fff"}}>{item.price && item.isSelling ?  " " + item.price + "€" : null}</span>
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
                    <Box sx={{paddingLeft:"5rem", alignSelf:"center"}}>
                      {(likes.length !== 0 && likes.some((like: any) => like.id === item.id && like.data.users.includes(user.email))) ? 
                        (
                          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"0.25rem"}}>
                            <Favorite sx={{color:"red"}} onClick={() => likePost(item.id)} />
                            <span>{likes.filter((like: any) => like.id === item.id)[0]?.data.users.length.toString()}</span>
                          </Box>
                        ) :
                        (
                          <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", gap:"0.25rem"}}>
                            <FavoriteBorder sx={{}} onClick={() => likePost(item.id)} />
                            <span>{likes.filter((like: any) => like.id === item.id)[0]?.data.users.length.toString()}</span>
                          </Box>
                        )}         
                    </Box>
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
                {item.esya}<span style={{fontWeight:"bold", color:"#fff"}}>{" "}-{item.price && item.isSelling ?  " " + item.price + "€" : null}</span>
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
