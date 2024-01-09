import { AppBar, Button,  InputBase, Toolbar } from '@mui/material'
import { styled, alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import {Box}from "@mui/material"; 
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@emotion/react';
import colors from "../assets/colors.module.scss"

type Props = {
}

  const theme = createTheme({
    palette: {
      primary: {
        main:  colors.primary_dark,
      },
      secondary: {
        main: colors.primary_white,
      },
    },
  });

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

export default function Header({ }: Props) {

  //const navigate = useNavigate()
  //const user = useSelector(selectUser);

  return (
     <ThemeProvider theme={theme}> 
      <Box>
      <AppBar color='primary' position="static">
        <Toolbar>
{/*           <Typography
            onClick={() => navigate("/")}
            variant="h5"
            color="secondary"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { sm: 'block', fontFamily:"monospace", cursor:"pointer", width:"80%"} }}
          >
            SaarSwap
          </Typography> */}
{/*           <Box sx={{display:"flex", gap:"1rem", justifyContent:"center", alignItems:"start"}}>
            <Typography
              onClick={() => setlostPage(false)}
              variant="h5"
              color="secondary"
              noWrap
              component="div"
              sx={{ display: { sm: 'block', fontFamily:"monospace", cursor:"pointer" } }}
            >
              Buy
            </Typography>
            <Typography
              onClick={() => setlostPage(true)}
              variant="h5"
              color="secondary"
              noWrap
              component="div"
              sx={{ display: { sm: 'block', fontFamily:"monospace", cursor:"pointer", marginRight:"1rem" } }}
            >
              Trade
            </Typography>
          </Box> */}
{/*           <Search sx={{marginRight:"0.5rem"}}>
            <SearchIconWrapper> 
              <SearchIcon  color='secondary'/>
            </SearchIconWrapper>
            <StyledInputBase  color='secondary'
              placeholder="Search"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
{/*           <Typography
            onClick={() => navigate("/")}
            variant="body2"
            color="secondary"
            noWrap
            sx={{ marginX:"0.5em", display: { fontFamily:"monospace" } }}
          >
            {user?.email}
          </Typography> */}
          <Button variant='outlined' sx={{marginLeft:"0.3em", fontSize:"0.8em", position:"absolute", right:"5%"}} color='inherit'>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  )
}