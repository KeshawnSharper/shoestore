import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from '../header/header'
import {getOrders,deleteOrder } from '../../actions/actions'
import { connect } from "react-redux";
import axios from "axios";

 function Orders(props) {
   let [orders,setOrders] = useState([])
    useEffect(() => {
        axios.get(`https://us-central1-shop-be-a532e.cloudfunctions.net/app/orders/${JSON.parse(localStorage.getItem("user")).id}`)
        .then((response) => {
          setOrders(response.data)
        })
    },[orders])
    const deleteOrders = (id) => {
      console.log(id)
      console.log(orders)
      setOrders(orders.filter(order => Number(order.id) !== Number(id)))
      props.deleteOrder(id)
    }
    
    return (
        <div>
        <Header />
        <div className="wrap cf">
        <h1 className="projTitle">My History</h1>
        <div className="heading cf">
          <h1>Orders</h1>
          <Link to="/shop" className="continue">Continue Shopping</Link >
        </div>
        {orders.length > 0 ?
        
        <div className="cart">
          <ul className="cartWrap">
            
              {orders.map(
                  sneaker => (
<li className="items odd">
              <div className="infoWrap"> 
                <div className="cartSection">
                  <img src={sneaker.img} alt="" className="itemImg" />
                  <p className="itemNumber">{sneaker.date_ordered }</p>
                  <h3>{sneaker.name}</h3>
                  <h3>{sneaker.street}</h3>
                  <p className="stockStatus"> Quantity : {sneaker.quantity}</p>
                </div>  
                <div className="prodTotal cartSection">
                  <p>${sneaker.price}</p>
                </div>
                <div className="cartSection removeWrap" onClick={e => deleteOrders(sneaker.id)}>
                  <button className="remove">x</button>
                </div>
              </div>
            </li>
                  )
              )}
            
            
           
           
            {/*<li class="items even">Item 2</li>*/}
          </ul>
        </div>
        :
        null
 }
      </div>
      </div>
    )
            }
            function mapStateToProps(state) {
                return {
                  cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).cart : [],
                  total: localStorage.getItem("total") ? localStorage.getItem("total") :0,
                  orders : state.orders
                };
              }
             
              const mapDispatchToProps = (dispatch) => {
                return {
                  getOrders: () => {
                    dispatch(getOrders());
                  },
                  deleteOrder: (id) => {
                    dispatch(deleteOrder(id));
                  }
                }
              }
              

              export default connect(mapStateToProps,mapDispatchToProps)(Orders);