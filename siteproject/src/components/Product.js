import React from 'react';
import '../styles/product.css';
import { useCallback, useReducer, useState } from "react";

const initialValue = {value: 0}
const reducer = (prevstate, action) =>{
    switch(action.type) {
        case "Plus" :
            // 위에서 객체형태로{} 선언했기때문에 리턴값도 객체형태로
            return {value : prevstate.value +1};
        case "Minus" :
            return {value : prevstate.value -1};

        default :
        return {value : prevstate.value};
    }
}

const products = [
  {
    id: 1,
    name: '상품 1',
    description: 'Full set : tray + whitening gel',
    price : "가격 : 150,000",
    quantity : "수량 : ",
    image: './product1.webp',
  },
  {
    id: 2,
    name: '상품 2',
    description: 'special kit : tray + whitening gel +case + 미백치약',
    price : "가격 : 250,000",
    quantity : "수량 : ",
    image: './product2.png',
  },
  {
    id: 3,
    name: '상품 3',
    description: '자가치아미백제',
    price : "가격 : 100,000",
    quantity : "수량 : ",
    image: './product3.jpg',
  },
  {
    id: 4,
    name: '상품 4',
    description: 'Premium set : 기성tray + 광중합기 + 자가치아미백제',
    price : "가격 : 350,000",
    quantity : "수량 : ",
    image: './product4.jpg',
  },
  {
    id: 5,
    name: '상품 5',
    description: 'custom tray + 자가미백제',
    price : "가격 : 200,000",
    quantity : "수량 : ",
    image: './product5.jpg',
  },
  {
    id: 6,
    name: '상품 6',
    description: 'shade light',
    price : "가격 : 56,000",
    quantity : "수량 : ",
    image: './product6.jpg',
  },

];

const ProductComponent = ({ product }) => {

    const [state, dispatch] = useReducer(reducer, initialValue);
    const [quantity, setQuantity] = useState(0);
    const handleChangeNumber = useCallback((e)=>setQuantity(e.target.value),[])

    const plus = () => dispatch({type: "Plus"})
    const minus = () => dispatch({type: "Minus"})


  return (
    <div className="product_container">
      <div className="product_image">
        <img src={product.image} alt={product.name} />
      <div className="product_description">
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price} </p>
        <p>{product.quantity}{state.value +1} <button onClick={plus}>+</button><button onClick={minus}>-</button></p>
        <button>장바구니</button>
      </div>
      </div>
    </div>
  );
};

const Product = () => {
  return (
    <div>
      <h1 style={{textAlign : "center", backgroundColor : "ivory", margin: "0", padding:"10px"}}>상품 목록</h1>
      <div className="product_container">

      {products.map((product) => (
        <ProductComponent key={product.id} product={product} />
      ))}
    </div>
    </div>

  );
};

export default Product;
