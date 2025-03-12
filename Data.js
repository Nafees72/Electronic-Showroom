import React from 'react'
import { useState ,  useEffect  } from 'react';
import './Data.css';

export default function Data() {

    async function bringProductsFridge(id){
        try {
            const response = await fetch('http://localhost:3001/products?id=' + id); // Replace '/data' with the actual endpoint
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        }
    
    async function fetchCategories() {
            try {
              const response = await fetch('http://localhost:3001/categories'); // Replace '/data' with the actual endpoint
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              console.log(data);
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          
    
  return (

    <>
       <button onClick={()=>bringProductsFridge(3)}>data</button>
    </>
  )
}
