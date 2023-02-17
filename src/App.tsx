import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { collection, DocumentData, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { auth, db } from './firebase';
import HomePage from './pages/HomePage';
import { Esya } from './types';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import LoginPage from "./pages/LoginPage"
import SignupPage from './pages/SignupPage';

function App() {

      const user = useSelector(selectUser);
      const dispatch = useDispatch();

      //data storing & managing
      const [lostItems, setLostItems] = useState<Esya[]>([])
      const [foundItems, setFoundItems] = useState<Esya[]>([])
  
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
          console.log(userAuth)
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
    <BrowserRouter>
    <Routes>
      <Route path="/" element={!user ? <LoginPage /> : <HomePage lostItems={lostItems} foundItems={foundItems}/>} />
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/signup" element={<SignupPage />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
