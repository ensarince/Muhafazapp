import React, { ChangeEvent, LegacyRef, useRef, useState } from 'react'
import { Box, Button, Checkbox, CheckboxProps, FormControl, FormControlLabel, FormGroup, FormLabel, InputLabel, MenuItem, Modal, Radio, RadioGroup, Select, SelectChangeEvent, TextField, TextareaAutosize, Typography } from '@mui/material'
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import {db, storage} from "../firebase"
import { addDoc, collection, serverTimestamp, doc, updateDoc } from 'firebase/firestore'
import {ref, getDownloadURL, uploadString} from "@firebase/storage"
import { Esya } from '../types';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';
import colors from "../assets/colors.module.scss"

type Props = {
    handleCloseModal: () => void
    openModal: boolean
    setOpenModal: (value: React.SetStateAction<boolean>) => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: colors.secondary_blue_soft,
    color: colors.primary_white,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display:"flex",
    flexDirection:"column",
    gap:"1em"
};

export default function ModalComponent({handleCloseModal, openModal = false, setOpenModal}: Props) {
    //refs and usestates for data handling
    const [category, setCategory] = useState("")
    const [esya, setEsya] = useState<HTMLInputElement | null | string>(null)
    const [description, setDescription] = useState<HTMLInputElement | null | string>(null)
    const [location, setLocation] = useState<HTMLInputElement | null | string>(null)
    const [isSelling, setIsSelling] = useState<boolean>(false);
    const [isTrading, setIsTrading] = useState<boolean>(false);
    const [isLending, setIsLending] = useState<boolean>(false);
    const [contact, setContact] = useState<HTMLInputElement | null | string>(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const filePickerRef = useRef<HTMLInputElement>(null)
    const user = useSelector(selectUser);

    //change function for category showing
    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        switch (event.target.name) {
            case 'isSelling':
                setIsSelling(event.target.checked);
                break;
            case 'isTrading':
                setIsTrading(event.target.checked);
                break;
            case 'isLending':
                setIsLending(event.target.checked);
                break;
            default:
                break;
        }
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

        const docRef = await addDoc(collection(db, 'items'), {
            user: user.email,
            esya: esya,
            category: category,
            contact: contact,
            location: location,
            description: description,
            isSelling: isSelling,
            isTrading: isTrading,
            isLending: isLending,
            timestamp: serverTimestamp(),
        })

        const imageRef = ref(storage, `items/${docRef.id}`);
        await uploadString(imageRef, selectedFile!, "data_url")
        .then(async snapshot => {
            const downloadURL = await getDownloadURL(imageRef);
            await updateDoc(doc(db, 'items', docRef.id), {
                id: docRef.id,
                image: downloadURL
            })
        });

        setOpenModal(false)
        setLoading(false)
        setSelectedFile(null)
    }

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{
                
            }}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" >
                    Add Item
                </Typography>
                <TextField id="outlined-basic" onChange={e => setEsya(e.target.value)} label="Item name" variant="outlined" />
                {/* <TextField id="outlined-basic" multiline onChange={e => setContact(e.target.value)} label="Contact" variant="outlined" /> */}
                <FormGroup sx={{ display: 'flex', flexDirection: 'row' }}>
                    <FormControlLabel
                        control={<Checkbox checked={isSelling} onChange={handleCheckboxChange} name="isSelling" />}
                        label="Selling"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={isTrading} onChange={handleCheckboxChange} name="isTrading" />}
                        label="Trading"
                    />
                    <FormControlLabel
                        control={<Checkbox checked={isLending} onChange={handleCheckboxChange} name="isLending" />}
                        label="Lending"
                    />
                </FormGroup>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={category}
                        label="Category"
                        onChange={handleChange}
                        >
                            <MenuItem value="Clothing">Clothing</MenuItem>
                            <MenuItem value="Accessories">Accessories</MenuItem>
                            <MenuItem value="Appliances">Appliances</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </Select>
                </FormControl>
                <TextField id="outlined-basic" onChange={e => setLocation(e.target.value)} label="Location" variant="outlined" />
                <TextareaAutosize
                onChange={e => setDescription(e.target.value)}
                minRows={2}
                placeholder="Detailed description"
                /* size="lg" */
                />
                <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", background:"transparent", padding:"0.1em", overflow:"hidden"}}>
                    {selectedFile ? 
                        (
                            <div style={{position:"relative"}}>
                                    <CloseOutlinedIcon  onClick={() => setSelectedFile(null)} sx={{position:"absolute", fontSize:"2em", '&:hover': {color:"red"}, }} />
                                    <img src={selectedFile} style={{width:"12.5em"}} onClick={() => setSelectedFile} alt="" />
                            </div> 
                        ) : (
                            <div onClick={() =>filePickerRef.current?.click()} style={{display:"flex", justifyContent:"space-evenly", alignItems:"center", cursor:"pointer"}}>
                            <Typography color={"#fff"} id="modal-modal-title" variant="body1" component="h5">
                                Add image
                            </Typography>
                                <AddToPhotosIcon sx={{width:"5em", height:"2em", color:"#fff", '&:hover': {color:colors.primary_green}}} />
                                <input type="file" ref={filePickerRef} hidden onChange={addImageToPost}/>
                            </div>
                        )
                    }
                </div>
                <Button sx={{alignSelf:"center"}} onClick={uploadPost} 
                    disabled={
                        loading && 
                        category == null || 
                        (!isSelling && !isTrading && !isLending) || 
                        esya === null || 
                        location === null ||
                        !selectedFile
                    } variant='outlined' color='primary'>Send</Button>
            </Box>
        </Modal>
  )
}
