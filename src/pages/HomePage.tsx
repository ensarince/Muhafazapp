import { Box, Button, Grid, Pagination, Typography } from '@mui/material';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import CardComponent from '../components/CardComponent';
import Header from '../components/Header'
import LostModalComponent from '../components/ModalComponent';
import { auth } from '../firebase';
import { Esya } from '../types';
import styles from "./Home.module.scss"
import colors from "../assets/colors.module.scss"

type Props = {
    items: Esya[]
}

function HomePage({items}: Props) {
    //open close controller for modals
    const [openModal, setOpenModal] = useState(false)
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);

    const [page, setPage] = useState<number>(1)

    //search ınput
    const [searchItem, setSearchItem] = useState<any>("")

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
        return items?.filter((item: Esya) => {
            // Check if the item should be filtered based on category checkboxes
            const categoryFilter =
                (!filtered.includes(0) || item.isSelling) &&
                (!filtered.includes(1) || item.isTrading) &&
                (!filtered.includes(2) || item.isLending);
            // Check if the item matches the search text
            const searchFilter =
                item.esya?.toLowerCase().includes(searchItem?.toLowerCase()) ||
                item.category?.toLowerCase().includes(searchItem?.toLowerCase()) ||
                item.location?.toLowerCase().includes(searchItem?.toLowerCase()) ||
                item.price?.toLowerCase().includes(searchItem?.toLowerCase());

            return categoryFilter && searchFilter;
        });
    };

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
        searchItem={searchItem} 
        setSearchItem={setSearchItem} 
    />

    <div className={styles.container}>
        <LostModalComponent openModal={openModal} setOpenModal={setOpenModal} handleCloseModal = {handleCloseModal}/>
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

            <>
                <Button 
                    variant='contained' 
                    color='inherit'  
                    sx={{
                        position:"sticky", 
                        top:"75%",
                        left:"100%", 
                        borderRadius:"100%",
                        height:"5.5rem", 
                        minWidth:"5.5rem",
                        fontSize:"30px",
                        zIndex:"1000"
                    }} 
                    onClick={handleOpenModal}>+
                </Button>
                <Grid container sx={{position:"relative", top:"-4rem"}} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg:16, xl: 20 }}>
                {handleSearchLost()?.map((item, index) => (
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
                    }}
                />
            </>
    </div>
    </>
)
}

export default HomePage
