import React from 'react';
import '../styles/product.css';
import { useCallback, useReducer, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialValue = {value: 0}
const reducer = (prevstate, action) =>{
    switch(action.type) {
        case "Plus" :
            // 위에서 객체형태로{} 선언했기때문에 리턴값도 객체형태로
            return {value : prevstate.value +1};
        case "Minus" :
          if (prevstate.value > 0) {
            // 1보다 클 경우에만 감소
            return { value: prevstate.value - 1 };
          } else {
            return prevstate; // 1 이하일 경우에는 상태 그대로 반환
          }
        default :
        return {value : prevstate.value};
    }
}

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
      case "RESET_CART":
      return {
        ...state,
        products: [],
      };
    default:
      return state;
  }
};



const products = [
  {
    id: 1,
    name: '상품 1',
    description: 'Full set : tray + whitening gel',
    price : "150000",
    quantity : "수량 : ",
    image: './product1.webp',
  },
  {
    id: 2,
    name: '상품 2',
    description: 'special kit : tray + whitening gel +case + 미백치약',
    price : "250000",
    quantity : "수량 : ",
    image: './product2.png',
  },
  {
    id: 3,
    name: '상품 3',
    description: '자가치아미백제',
    price : "100000",
    quantity : "수량 : ",
    image: './product3.jpg',
  },
  {
    id: 4,
    name: '상품 4',
    description: 'Premium set : 기성tray + 광중합기 + 자가치아미백제',
    price : "350000",
    quantity : "수량 : ",
    image: './product4.jpg',
  },
  {
    id: 5,
    name: '상품 5',
    description: 'custom tray + 자가미백제',
    price : "200000",
    quantity : "수량 : ",
    image: './product5.jpg',
  },
  {
    id: 6,
    name: '상품 6',
    description: 'shade light',
    price : "56000",
    quantity : "수량 : ",
    image: './product6.jpg',
  },

];

const ProductComponent = ({ product, addToCart }) => {

    const [state, dispatch] = useReducer(reducer, initialValue);
    const [quantity, setQuantity] = useState(0);
    const handleChangeNumber = useCallback((e)=>setQuantity(e.target.value),[])

    const plus = () => dispatch({type: "Plus"})
    const minus = () => dispatch({type: "Minus"})

    const addToCartHandler = () => {
      addToCart({ price: product.price, quantity: state.value + 1 });
    };

    const deleteCartHandler = () =>{
      addToCart({ price: product.price, quantity: state.value - 1 });    }
    

  return (
    <>
    {/* <div className='procart_outside'> */}

    <div className="product_container">
      <div className="product_image">
        <img style={{borderRadius: "20px"}} width={"290px"}  height={"280px"} src={product.image} alt={product.name} />
      <div className="product_description">
        <h3 style={{marginTop: "10px", marginBottom:"8px", fontSize:"22px"}}>{product.name}</h3>
        <p style={{margin: "0", marginBottom:"5px", fontSize:"18px"}}>{product.description}</p>
        <p style={{margin: "0", marginBottom:"5px", fontSize:"18px"}}> 가격 : {product.price}원</p>
        <p style={{margin: "0", marginBottom:"5px", fontSize:"18px"}}>{product.quantity} <button className='btn_plus' onClick={plus}>+</button>{state.value +1}<button className='btn_minus' onClick={minus}>-</button></p>
        <br />
      </div>

      <div>
        <button className='btn_addcart' onClick={addToCartHandler}>담기</button>
        <button className='btn_deletecart' onClick={deleteCartHandler}>빼기</button>

      </div>

      </div>
    </div>

    {/* </div> */}

    </>
    

  );
};

const Product = () => {
  const [cart, dispatch] = useReducer(cartReducer, { products: [] });
  
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
  const navigate = useNavigate();

  const calculateTotalQuantity = () => {
    let totalQuantity = 0;
    cart.products.forEach((product) => {
      totalQuantity += product.quantity;
    });
    return totalQuantity;
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cart.products.forEach((product) => {
      totalPrice += product.price * (parseInt(product.quantity));
    });
    return totalPrice;
  };

  // 배송비와 총 주문금액 계산

  const calculateShippingFee = () => {
    if (calculateTotalQuantity() === 0) {
      return 0;
    }

    const totalPrice = calculateTotalPrice();
    if (totalPrice < 300000) {
      return 2500;
    } else {
      return 0;
    }
  };
  const shippingFee = calculateShippingFee();
  const totalOrderPrice = calculateTotalPrice() + shippingFee;


  const orderHandler = () => {
    if (!isLoggedIn) {
      const confirmResult = window.confirm("로그인 후 이용할 수 있습니다.");
  
      if (confirmResult) {
        navigate("/login");
      } else {
        return;
      }
    } else {
      if (calculateTotalQuantity() === 0) {
        alert("상품을 담아주세요.");
      } else {
        dispatch({ type: "RESET_CART" });
        alert("주문이 완료되었습니다.");
      }
    }
  };
  
  const resetCartHandler = () => {
    if (calculateTotalQuantity() === 0) {
      alert("취소할 상품이 없습니다.");
    } else {
      const confirmReset = window.confirm("정말 전부 취소하시겠습니까?");
      if (confirmReset) {
        dispatch({ type: "RESET_CART" });
      }
    }
  };  return (
    <div>
      <h1 className='productName' style={{textAlign : "center", margin: "0", padding:"10px"}}>상품 목록</h1>
      <div className="container-wrapper">
      <div className="container">

        <div className="product_container">

          {products.map((product) => (
            <ProductComponent key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
        <div className="cart">
            <div style={{fontWeight: "bold", paddingBottom:"20px"}}>장바구니
            </div>

          <div className="cart_outside">

            <div className='cart_inside'>
            <div>총 수량</div>
            <div className='cart_end'>{calculateTotalQuantity()} 개</div>
            </div>
          <br/>

            <div className='cart_inside'>
            <div>총 상품 금액</div>
            <div className='cart_end'>{calculateTotalPrice()} 원</div>
            </div>
          <br/>
            <div className='cart_inside'>
            <div>배송비</div>
            <div className='cart_end'> {shippingFee}원</div>
            </div>
          <br/>
            <div className='cart_inside'>
            <div>총 주문금액</div>
            <div className='cart_end'> {totalOrderPrice}원</div>
            </div>

          </div>

            <div className='paybtn_outside'>
          <button className='paybtn' onClick={orderHandler}>주문하기</button>
          <button className='paybtn_delete' onClick={resetCartHandler}>전체 취소</button>
            </div>

        </div>
        </div>
      </div>
    </div>

  );
};

export default Product;
