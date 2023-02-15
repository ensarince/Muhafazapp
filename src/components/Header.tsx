import { AppBar, IconButton, InputBase, ThemeProvider, Toolbar } from '@mui/material'
import { alpha, styled } from '@mui/material/styles';
import { createTheme } from '@mui/material';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import React from 'react'
import {Box}from "@mui/material"; 
import { fontFamily } from '@mui/system';
import { useNavigate } from 'react-router-dom';

type Props = {
  searchLost: string 
  setSearchLost: React.Dispatch<React.SetStateAction<string>>
  searchFound: string 
  setSearchFound: React.Dispatch<React.SetStateAction<string>>
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

export default function Header({searchLost, setSearchLost, searchFound, setSearchFound}: Props) {

  const navigate = useNavigate()

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
            Muhafazapp
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
        </Toolbar>
      </AppBar>
    </Box>
    </ThemeProvider>
  )
}