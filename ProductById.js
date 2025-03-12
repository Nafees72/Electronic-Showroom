import React, { useEffect , useState } from 'react';
import { useParams } from 'react-router-dom';
import './Products.css';
import {useDispatch} from 'react-redux';
import { addInBasket } from '../redux/basket';

export default function ProductById() {
    const params = useParams();
    let[products , setProducts] = useState([]);

    const dispatch = useDispatch()

    const addProduct = (obj)=>{
        dispatch(addInBasket(obj));
    }

    useEffect(()=>{
        async function fetchCategories() {
            try {
                console.log(params.id);
                console.log(`http://localhost:3001/products?id=${params.id}`)
              const response = await fetch(`http://localhost:3001/products?id=${params.id}`); // Replace '/data' with the actual endpoint
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              setProducts(data);
              console.log(data)
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          }
          fetchCategories();
          
    } , [])
    return (
        <div className="products">
     
          {
            products.length===0?
            <div style={{
                textAlign: 'center',
                marginTop: '20px',
                color: '#555',
                fontFamily: 'Arial, sans-serif',
                fontSize: '18px',
                backgroundColor: '#f9f9f9',
                padding: '20px 0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                width: '1000px',
                marginLeft:'100px',
                // maxWidth: '100%',
                boxSizing: 'border-box'
              }}>
                <em>There are no items available.</em>
              </div>
              

        :
        products.map((res, key) => {
            return (
                <div
                    key={key}
                    className="product-card flex border border-gray-200 rounded-lg shadow bg-white dark:bg-gray-800 dark:border-gray-700"
                    style={{ marginBottom: '1rem', padding: '1rem' }}
                >
                    {/* Image Section */}
                    <div
                        className="product-image"
                        style={{
                            flex: '1',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '1rem',
                        }}
                    >
                        <img
                            className="rounded-lg"
                            src={res.img}
                            alt="product image"
                            style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain' }}
                        />
                    </div>

                    {/* Details Section */}
                    <div className="product-details" style={{ flex: '2', paddingLeft: '1rem' }}>
                        <a href={`/products/${res.id}/${res.cid}`}>
                            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                {res.title}
                            </h5>
                        </a>
                        <div className="flex items-center mt-2.5 mb-5">
                            {/* Stars */}
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, index) => (
                                    <svg
                                        key={index}
                                        className={`w-4 h-4 ${
                                            index < 4
                                                ? 'text-yellow-300'
                                                : 'text-gray-200 dark:text-gray-600'
                                        }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 22 20"
                                    >
                                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                    </svg>
                                ))}
                            </div>
                            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                                5.0
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                {res.price}
                            </span>
                            <button
                                onClick={()=>addProduct(res)}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Add to Basket
                            </button>
                        </div>
                    </div>
                </div>
            );
        })
          }
        </div>
       )
     
}
