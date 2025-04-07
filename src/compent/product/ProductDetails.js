import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Product from './Product';

function ProductDetails() {
    const api_url="https://fakestoreapi.com/products";
    const [product,setproduct]=useState({});
    const params=useParams();

    useEffect(()=>{
        fetch(`${api_url}/${params.productId}`).then((res)=>res.json()).then((product)=>setproduct(product))
    },[]);
    
  return (
    <Product product={product} showbutton={false}></Product>
  )
}

export default ProductDetails;
