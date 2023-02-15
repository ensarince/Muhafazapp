import { Button, Grid, Pagination, Typography } from '@mui/material';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import CardComponent from '../components/CardComponent';
import FoundModalComponent from '../components/FoundModalComponent';
import Header from '../components/Header'
import LostModalComponent from '../components/LostModalComponent';
import { db } from '../firebase';
import { Esya } from '../types';
import styles from "./Home.module.css"

type Props = {
    lostItems: Esya[]
    foundItems: Esya[]
}

function HomePage({lostItems, foundItems}: Props) {
    //open close controller for modals
    const [openLost, setOpenLost] = useState(false)
    const handleOpenLost = () => setOpenLost(true);
    const handleCloseLost = () => setOpenLost(false);

    const [openFound, setOpenFound] = useState(false)
    const handleOpenFound = () => setOpenFound(true);
    const handleCloseFound = () => setOpenFound(false);

    const [lostPage, setlostPage] = useState(false)
    const [page, setPage] = useState<number>(1)

    //search ınput
    const [searchLost, setSearchLost] = useState<any>("")
    const [searchFound, setSearchFound] = useState<any>("")

    const handleSearchLost = () => {
        return lostItems?.filter((item: Esya) => (
            item.esya?.toLowerCase().includes(searchLost?.toLowerCase()) ||
            item.category?.toLowerCase().includes(searchLost?.toLowerCase()) ||
            item.location?.toLowerCase().includes(searchLost?.toLowerCase()) ||
            item.contact?.toLowerCase().includes(searchLost?.toLowerCase()) 
        ))
    }

    const handleSearchFound = () => {
        return foundItems?.filter((item: Esya) => (
            item.esya?.toLowerCase().includes(searchLost?.toLowerCase()) ||
            item.category?.toLowerCase().includes(searchLost?.toLowerCase()) ||
            item.location?.toLowerCase().includes(searchLost?.toLowerCase()) ||
            item.contact?.toLowerCase().includes(searchLost?.toLowerCase()) 
        ))
    }


return (
    <>
    <Header searchLost={searchLost} setSearchLost={setSearchLost} searchFound={searchFound} setSearchFound={setSearchFound} />

    <div className={styles.container}>
        <LostModalComponent openLost={openLost} setOpenLost={setOpenLost} handleCloseLost = {handleCloseLost}/>
        <FoundModalComponent openFound={openFound} setOpenFound={setOpenFound} handleCloseFound = {handleCloseFound}/>

        {lostPage ? 
        (
            <>
            <Button sx={{fontSize:"1.1em"}} variant="contained" color='primary' onClick={() => setlostPage(false)}>Bulunanlar</Button>

        <div style={{display:"flex", gap:"1em", alignItems:"center"}}>
            <Typography id="transition-modal-title" sx={{color:"white", textTransform:"uppercase"}} variant="h5" component="h2">Aranan Esyalar</Typography>
            
            <Button variant='contained' color='inherit'  sx={{fontSize:"1.3em"}} onClick={handleOpenLost}>+</Button>
        </div>


        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg:16, xl: 20 }}>
        {handleSearchLost().map((item, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
            <CardComponent item={item} />
            </Grid>
        ))}
        </Grid>

        <Pagination 
        style={{padding: 20,
                width:"100%",
                display:"flex",
                justifyContent:"center",
                color:"default"
            }}
        count={(handleSearchLost()?.length / 10)/* .toFixed() */}
        onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 10)
        }}/>
            </>
        ) : (
            <>
            <Button sx={{fontSize:"1.1em"}} variant='contained' color='secondary' onClick={() => setlostPage(true)}>Arananlar</Button>
            
            <div style={{display:"flex", gap:"1em", alignItems:"center"}}>
                <Typography id="transition-modal-title" sx={{color:"white", textTransform:"uppercase"}} variant="h5">Bulunan Esyalar</Typography>

                <Button variant='contained' sx={{fontSize:"1.3em"}} color='inherit' onClick={handleOpenFound}>+</Button>
            </div>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 16, xl:20 }}>
            {handleSearchFound().slice((page - 1) * 10, (page - 1) * 10 + 10)?.map((item, index) => (
                <Grid item xs={2} sm={4} md={4} key={index}>
                <CardComponent item={item} />
                </Grid>
            ))}
            </Grid>

            <Pagination 
            style={{padding: 20,
                    width:"100%",
                    display:"flex",
                    justifyContent:"center",
                    color:"default"
                }}
            count={(handleSearchFound().slice((page - 1) * 10, (page - 1) * 10 + 10)?.length / 10)/* .toFixed() */}
            onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 10)
        }}/>
            </>
        )
        }
    </div>
    </>
)
}

export default HomePage