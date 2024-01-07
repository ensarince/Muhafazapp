import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.scss'
import { collection, DocumentData, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from './firebase';
import HomePage from './pages/HomePage';
import { Esya } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import LoginPage from "./pages/LoginPage"
import SignupPage from './pages/SignupPage';
import colors from "./assets/colors.module.scss"
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@emotion/react';
import MessagePage from './pages/MessagePage';
import ProfilePage from './pages/ProfilePage';
import Navigator from './components/Navigator';

const saarTheme = createTheme({
  palette: {
      mode: 'dark',
  },
  typography: {
  },
  breakpoints: {
      values: {
          xs: 0,
          sm: 720,
          md: 1080,
          lg: 1440,
          xl: 1800,
      }
  },
  components: {
          MuiButton: {
              variants: [
                  {
                  props: {variant: 'contained'},
                  style: {
                      backgroundColor: colors.primary_green,
                      color: colors.primary_white,
                      fontWeight: '600',
                      fontSize: '18px',
                      fontFamily: 'SiemensSans-Black, arial, sans-serif',
                      lineHeight: '28px',
                      minWidth: '166px',
                      height: '44px',
                      padding: '8px 32px',
                      gap: '8px',
                      textTransform: 'unset',
                      textAlign: 'center',
                      borderRadius: 0,
                      transition:"all .3s ease-in-out",
                      '&:hover': {
                          backgroundColor: colors.secondary_blue_soft
                      },
                      '&:focus': {
                          isolation: 'isolate',
                          outline: `1px solid ${colors.secondary_blue}`,
                          outlineOffset: '2px'
                      },
                      '&:disabled': {
                          background: colors.secondary_blue_softest,
                          color: colors.secondary_blue_softest,

                      }
                  }
              },{
                props: {variant: 'outlined'},
                style: {
                  background: colors.secondary_blue,
                        color: colors.primary_green,
                        fontWeight: '600',
                        fontSize: '18px',
                        fontFamily: 'SiemensSans-Black, arial, sans-serif',
                        lineHeight: '28px',
                        width: '166px',
                        height: '44px',
                        padding: '8px 32px',
                        gap: '8px',
                        textTransform: 'unset',
                        textAlign: 'center',
                        border: `1px solid ${colors.primary_green}`,
                        transition:"all .3s ease-in-out",
                        borderRadius: 0,
                        '&:hover': {
                            background: colors.secondary_blue_softest,
                            color:colors.primary_dark,
                            border: `1px solid ${colors.primary_dark}`,
                        },
                        '&:focus': {
                            isolation: 'isolate',
                            outline: `1px solid ${colors.secondary_blue}`,
                            outlineOffset: '2px',
                        },
                        '&:disabled': {
                            color: colors.primary_grey,
                            border: `1px solid ${colors.primary_grey}`,
                            
                        }
                }
            },
              ]
      },
  }
});

function App() {

      const user = useSelector(selectUser);
      const dispatch = useDispatch();

      //data storing & managing
      const [lostItems, setLostItems] = useState<Esya[]>([])
      const [foundItems, setFoundItems] = useState<Esya[]>([])

      const [pageCount, setPageCount] = useState<number>(0)
  
      //getting lost item data
      useEffect(() => {
        const unsubscribe = onSnapshot(query(collection(db, 'lostItems'), orderBy('timestamp', 'desc')), 
        (snapshot: any) => {
          let itemArray:any = []
            snapshot.forEach((item: any) => {
              itemArray.push(item.data())
              setLostItems(itemArray)
            });
        });
        return unsubscribe
    }, [db])   

    useEffect(() => {
      //!check if logged in or not with onAuthStateChanged, and clean it after(the listener)
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        if(userAuth){
          //logged in
          dispatch(login({
            uid: userAuth.uid,
            email: userAuth.email,
          }))
          //!set localstorage
          window.localStorage.setItem("user", userAuth.uid)
        }else{
          //logged eout
          dispatch(logout())
        }
      })
      return unsubscribe;
    }, [dispatch])

        //getting found item data
        useEffect(() => {
            const unsubscribe = onSnapshot(query(collection(db, 'foundItems'), orderBy('timestamp', 'desc')), 
            (snapshot: any) => {
              let itemArray: any = []
              snapshot.forEach((item: any) => {
                itemArray.push(item.data())
              });
                setFoundItems(itemArray)
            });
            return unsubscribe
        }, [db])   

  return (
    <ThemeProvider theme={saarTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={!user ? <LoginPage /> : <HomePage lostItems={lostItems} foundItems={foundItems}/>} />
          <Route path="/login" element={<LoginPage />}/>
          <Route path="/signup" element={<SignupPage />}/>
          <Route path="/inbox" element={!user ? <LoginPage /> : <MessagePage />}/>
          <Route path="/profile" element={!user ? <LoginPage /> : <ProfilePage />}/>
        </Routes>
        {user &&
          <Navigator pageCount={pageCount} setPageCount={setPageCount} />
        }
      </BrowserRouter>
  </ThemeProvider>
  )
}

export default App
