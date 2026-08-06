import React from 'react'
import { useState,useEffect } from 'react'
export const Formations_sa = () => {
    // hook
    const [formations,setFormations] = useState([]);

    // données depuis la base de données
    useEffect(() => {
        fetch("https://localhost:5000/Dashboard/SuperAdmin/Formations")//routes temporaires
        .then((response) => response.json()) 
        .then((data) =>setFormations(data))
        .catch((error) => console.log(error));   
    },[]);
  return (
    <div>
        {/* {formations.map((formation) =>(
            <div key={formation.id}></div>
        )
    )} */}
    </div>
  )
}
