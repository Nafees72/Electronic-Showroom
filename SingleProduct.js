import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./SingleProduct.css";
import {useDispatch} from 'react-redux';
import { addInBasket } from '../redux/basket';

export default function SingleProduct() {

  const params = useParams();
  console.log(
    `http://localhost:3001/products?id=${params.id}&cid=${params.cid}`
  );
  let [product, setProduct] = useState({});

  const dispatch = useDispatch()

  const addProduct = (obj)=>{
      dispatch(addInBasket(obj));
  }

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch(
          `http://localhost:3001/products?id=${params.id}&cid=${params.cid}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setProduct(data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchCategories();
  }, [params.id, params.cid]);

  return (
    <div className="single container mx-auto p-6">
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-lg md:flex-row md:max-w-4xl mx-auto hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          className="object-cover w-full rounded-t-lg h-64 md:h-auto md:w-1/2 md:rounded-none md:rounded-l-lg"
          src={product.img}
          alt={product.title || "Product Image"}
        />
        <div className="flex flex-col justify-between p-6 leading-normal w-full">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {product.title}
          </h2>
          <h6 className="mb-4 text-xl text-gray-900 dark:text-white">
            {product.price}
          </h6>
          <p className="mb-4 text-gray-700 dark:text-gray-400">
            {product.desc}
          </p>
          <p className="mb-4 text-gray-700 dark:text-gray-400">
            <strong>Warranty:</strong>{product.warranty}
          </p>
          <button
            onClick={()=>addProduct(product)}
            className="w-full text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg px-6 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
}
