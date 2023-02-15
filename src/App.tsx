import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { collection, DocumentData, onSnapshot, orderBy, query, QuerySnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import HomePage from './pages/HomePage';
import { Esya } from './types';

function App() {

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
      <Route path="/" element={<HomePage lostItems={lostItems} foundItems={foundItems}/>} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
