import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CardComponent from '../components/CardComponent';
import FoundModalComponent from '../components/FoundModalComponent';
import Header from '../components/Header'
import LostModalComponent from '../components/LostModalComponent';
import { auth } from '../firebase';
import { Esya } from '../types';
import styles from "./Home.module.scss"
import colors from "../assets/colors.module.scss"

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

    const [page, setPage] = useState<number>(1)
    const [lostPage, setlostPage] = useState(false)

    //search ınput
    const [searchLost, setSearchLost] = useState<any>("")
    const [searchFound, setSearchFound] = useState<any>("")

    const [filtered, setFiltered] = useState<number[]>([])

    const navigate = useNavigate()

    //user auth checking
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
            const uid = user.uid;
              // ...
            } else {
              // User is signed out
            console.log("user is logged out")
            }
        });
    }, [])

    //logout
    const handleLogout = () => {     
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
        }).catch((error) => {
        alert(error)
        });
    }

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

    const handleFiltering = (index: number) => {
        if (filtered.includes(index)) {
            setFiltered(prevFiltered => prevFiltered.filter(item => item !== index));
        } else {
            setFiltered(prevFiltered => [...prevFiltered, index]);
        }
    };

return (
    <>
    <Header 
        handleLogout={handleLogout} 
        searchLost={searchLost} 
        setSearchLost={setSearchLost} 
        searchFound={searchFound} 
        setSearchFound={setSearchFound}
        setlostPage={setlostPage}
    />

    <div className={styles.container}>
        <LostModalComponent openLost={openLost} setOpenLost={setOpenLost} handleCloseLost = {handleCloseLost}/>
        <FoundModalComponent openFound={openFound} setOpenFound={setOpenFound} handleCloseFound = {handleCloseFound}/>

        <Box 
            sx={{
                display:"flex",
                justifyContent:"space-evenly",
                alignItems:"center",
                width:"100%",
                height:"5rem",
                position:"absolute",
                top:"6%",
                //background:"red",
            }}>
                <Typography paragraph={true} onClick={() => setFiltered([])}
                    sx={{
                        fontWeight:"bold",
                        color: filtered.length === 0 ? "#fff" : colors.secondary_blue_softest,
                        borderRadius:"3%",
                        background: filtered.length === 0 ? "rgba(57, 62, 70, 1)" : "#222831",
                        border: filtered.length === 0 ? "none" : `1px solid ${colors.secondary_blue_softest}`,
                        padding:"0.3rem 0.7rem",
                        transition:"all .3s ease-out",
                        cursor:"pointer",
                    }}
                >
                    All
                </Typography>
                <Typography paragraph={true} onClick={() => handleFiltering(0)}
                    sx={{
                        fontWeight: "bold",
                        color: filtered.includes(0) ? "#fff" : colors.secondary_blue_softest,
                        background: filtered.includes(0) ? "rgba(57, 62, 70, 1)" : "#222831",
                        borderRadius:"3%",
                        border: filtered.includes(0) ? "none" : `1px solid ${colors.secondary_blue_softest}`,
                        padding:"0.3rem 0.7rem",
                        transition:"all .3s ease-out",
                        cursor:"pointer",
                    }}
                >
                    Selling
                </Typography>
                <Typography paragraph={true} onClick={() => handleFiltering(1)}
                    sx={{
                        fontWeight:"bold",
                        color: filtered.includes(1) ? "#fff" : colors.secondary_blue_softest,
                        borderRadius:"3%",
                        background: filtered.includes(1) ? "rgba(57, 62, 70, 1)" : "#222831",
                        border: filtered.includes(1) ? "none" : `1px solid ${colors.secondary_blue_softest}`,
                        padding:"0.3rem 0.7rem",
                        transition:"all .3s ease-out",
                        cursor:"pointer",
                    }}
                >
                    Trading
                </Typography>
                <Typography paragraph={true} onClick={() => handleFiltering(2)}
                    sx={{
                        fontWeight:"bold",
                        color: filtered.includes(2) ? "#fff" : colors.secondary_blue_softest,
                        borderRadius:"3%",
                        background: filtered.includes(2) ? "rgba(57, 62, 70, 1)" : "#222831",
                        border: filtered.includes(2) ? "none" : `1px solid ${colors.secondary_blue_softest}`,
                        padding:"0.3rem 0.7rem",
                        transition:"all .3s ease-out",
                        cursor:"pointer",
                    }}
                >
                    Lending
                </Typography>
        </Box>

        <Button 
            variant='contained' 
            color='inherit'  
            sx={{
                fontSize:"1.3em",
                position:"absolute", 
                right:"5%", 
                bottom:"15%", 
                borderRadius:"100%",
                height:"4.5rem", 
                minWidth:"4rem"
            }} 
            onClick={lostPage ? handleOpenLost : handleOpenFound}>+
        </Button>
        {lostPage ? 
        (
            <>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg:16, xl: 20 }}>
                {handleSearchLost()?.map((item, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <CardComponent /* setPostIdToBeDeleted={setPostIdToBeDeleted} handleDelete={handleDelete} */ item={item} />
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
                    }}
                />
            </>
        ) : (
            <>            
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