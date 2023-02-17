import React, { ChangeEvent, LegacyRef, useRef, useState } from 'react'
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField, Typography } from '@mui/material'
import { Textarea } from '@mui/joy'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {db, storage} from "../firebase"
import { addDoc, collection, serverTimestamp, doc, updateDoc } from 'firebase/firestore'
import {ref, getDownloadURL, uploadString} from "@firebase/storage"
import { Esya } from '../types';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

type Props = {
    handleCloseLost: () => void
    openLost: boolean
    setOpenLost: (value: React.SetStateAction<boolean>) => void
}

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
    display:"flex",
    flexDirection:"column",
    gap:"1em"
};

export default function ModalComponent({handleCloseLost, openLost = false, setOpenLost}: Props) {
    //refs and usestates for data handling
    const [category, setCategory] = useState("")
    const [esya, setEsya] = useState<HTMLInputElement | null | string>(null)
    const [description, setDescription] = useState<HTMLInputElement | null | string>(null)
    const [location, setLocation] = useState<HTMLInputElement | null | string>(null)
    const [contact, setContact] = useState<HTMLInputElement | null | string>(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const filePickerRef = useRef<HTMLInputElement>(null)
    const user = useSelector(selectUser);

    //change function for category showing
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    //*set image
    const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (!e.target.files) return;

        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }
        reader.onload = (readerEvent: any) => {
            setSelectedFile(readerEvent.target.result)
        }
    }

    const uploadPost = async() => {
        if(loading) return

        setLoading(true)

        //1. create a post and add to firestore 'posts' collection
        //2. get the post id 
        //3. upload the image to storage
        //4. get the imgUrl and update the post with added id

        const docRef = await addDoc(collection(db, 'lostItems'), {
            user: user.email,
            esya: esya,
            category: category,
            contact: contact,
            location: location,
            description: description,
            isMissing: true,
            timestamp: serverTimestamp(),
        })

        const imageRef = ref(storage, `lostItems/${docRef.id}`);
        await uploadString(imageRef, selectedFile!, "data_url")
        .then(async snapshot => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, 'lostItems', docRef.id), {
                id: docRef.id,
                image: downloadURL
            })
        });

        setOpenLost(false)
        setLoading(false)
        setSelectedFile(null)
    }

  return (
    <div>
        <Modal
            open={openLost}
            onClose={handleCloseLost}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{position: "fixed", top: 10, left: 10, m: 0 }}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" >
                    Kayıp Eşya Form
                </Typography>
                <TextField id="outlined-basic" onChange={e => setEsya(e.target.value)} label="Eşya adı" variant="outlined" />
                <TextField id="outlined-basic" onChange={e => setLocation(e.target.value)} label="Lokasyon" variant="outlined" />
                <TextField id="outlined-basic" multiline onChange={e => setContact(e.target.value)} label="Kontakt" variant="outlined" />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Kategori</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={category}
                    label="Category"
                    onChange={handleChange}
                    >
                    <MenuItem value="Elektrik-Elektronik">Elektrik-Elektronik</MenuItem>
                    <MenuItem value="Ev eşyası">Ev eşyası</MenuItem>
                    <MenuItem value="Mücevherat">Mücevherat</MenuItem>
                    <MenuItem value="Diğer">Diğer</MenuItem>
                    </Select>
                </FormControl>
                <Textarea
                onChange={e => setDescription(e.target.value)}
                minRows={2}
                placeholder="Detaylı açıklama"
                size="lg"
                />
                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", background:"white", padding:"1em", overflow:"hidden"}}>
                    {selectedFile ? 
                        (
                            <div style={{position:"relative"}}>
                                    <CloseOutlinedIcon  onClick={() => setSelectedFile(null)} sx={{position:"absolute", fontSize:"2em", '&:hover': {color:"red"}, }} />
                                    <img src={selectedFile} style={{width:"12.5em"}} onClick={() => setSelectedFile} alt="" />
                            </div> 
                        ) : (
                            <div onClick={() =>filePickerRef.current?.click()} style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", cursor:"pointer"}}>
                            <Typography id="modal-modal-title" variant="body1" component="h5">
                                Resim ekle
                            </Typography>
                                <AddToPhotosIcon sx={{width:"5em", height:"2em", '&:hover': {color:"green"}}} />
                                <input type="file" ref={filePickerRef} hidden onChange={addImageToPost}/>
                            </div>
                        )
                    }
                </div>
                <Button onClick={uploadPost} disabled={loading && !category || !esya || !location || !contact || !description || !selectedFile} variant='contained' color='primary'>Gönder</Button>
            </Box>
        </Modal>
    </div>
  )
}
