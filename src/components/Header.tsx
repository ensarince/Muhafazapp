import { AppBar, Button, IconButton, InputBase, ThemeProvider, Toolbar } from '@mui/material'
import { alpha, styled } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import React from 'react'
import {Box}from "@mui/material"; 
import { useNavigate } from 'react-router-dom';
import userSlice, { selectUser } from '../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
  searchLost: string 
  setSearchLost: React.Dispatch<React.SetStateAction<string>>
  searchFound: string 
  setSearchFound: React.Dispatch<React.SetStateAction<string>>
  handleLogout: () => void
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
      // vertical padding + font size from searchIcon
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

export default function Header({searchLost, setSearchLost, searchFound, setSearchFound, handleLogout}: Props) {

  const navigate = useNavigate()
  const user = useSelector(selectUser);

  return (
     <ThemeProvider theme={theme}> 
      <Box>
      <AppBar color='primary' position="static">
        <Toolbar>
          <Typography
            onClick={() => navigate("/")}
            variant="h5"
            color="secondary"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', fontFamily:"monospace", cursor:"pointer" } }}
          >
            muhafazapp
          </Typography>
          <Search>
            <SearchIconWrapper> 
              <SearchIcon  color='secondary'/>
            </SearchIconWrapper>
            <StyledInputBase onChange={(e) => {setSearchFound(e.target.value); setSearchLost(e.target.value);}} color='secondary'
              placeholder="Ara..."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          <Typography
            onClick={() => navigate("/")}
            variant="body2"
            color="secondary"
            noWrap
            sx={{ marginX:"0.5em", display: { fontFamily:"monospace" } }}
          >
            {user?.email}
          </Typography>
          <Button onClick={handleLogout} variant='outlined' sx={{marginLeft:"0.3em", fontSize:"0.8em"}} color='inherit'>ÇIKIŞ</Button>
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  )
}