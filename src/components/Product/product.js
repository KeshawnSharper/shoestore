import React, { useState, useEffect } from "react";
import './Product.scss'
import Header from '../header/header'
import RelatedSneakers from './relatedSneakers'
import {addToCart} from '../../actions/actions'
import {Circles} from "react-loader-spinner";
import { Link,useParams } from "react-router-dom";
import { connect } from "react-redux"
import QuantityBox from "../Cart/QuantityBox";


function Product(props) {
  const location = useParams()
    const [sneaker,setSneaker] = useState({})
    console.log(location)
    useEffect(() => {
        setSneaker(JSON.parse(localStorage.getItem("sneakers")).filter(item => item.id === location.id)[0])
      
      },[location.id])
    
    return (
      <div>
      { 
        
        !sneaker.id ?
        <div>
      <Header />
        
    
      
     <Circles type="Puff" color="#00BFFF" height={100} width={100} /> 
     </div>
     : 
     <div style={{"marginBottom":"2000px"}}>
       <Header />
        <main style={{"marginBottom":"2000px"}}>
          <div className="container">
            <div className="grid second-nav">
              <div className="column-xs-12">
                <nav>
                  <ol className="breadcrumb-list">
                    <li className="breadcrumb-item"><Link to={`/`}>Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/shop`}>Shop</Link></li>
                    <li className="breadcrumb-item active">{sneaker.title}</li>
                  </ol>
                </nav>
              </div>
            </div>
            <div className="grid product">
              <div className="column-xs-12 column-md-7">
                <div className="product-gallery">
                  <div className="product-image">
                    <img alt="" className="active" src={sneaker.media.thumbUrl} />
                  </div>
                 
                </div>
              </div>
              <div className="column-xs-12 column-md-5">
                <h1>{sneaker.title}</h1>
               
                <h2>${sneaker.retailPrice}</h2>
                
                <div style={{"display":"inline-flex"}}>
                <QuantityBox amount={props.cart.filter(item => item.id === sneaker.id).length === 1 ? props.cart.filter(item => item.id === sneaker.id)[0].quantity  : 0} item={sneaker} addToCart={props.addToCart} cart={false}/>
                </div>
                {/* <div className="description">
                  <p>The purposes of bonsai are primarily contemplation for the viewer, and the pleasant exercise of effort and ingenuity for the grower.</p>
                  <p>By contrast with other plant cultivation practices, bonsai is not intended for production of food or for medicine. Instead, bonsai practice focuses on long-term cultivation and shaping of one or more small trees growing in a container.</p>
                </div> */}
                
              </div>
            </div>
            <div className="grid related-products">
              <div className="column-xs-12">
                <h3>You may also like</h3>
              </div>
              <RelatedSneakers id={location.id} />

            </div>
          </div>
        </main>
     
        </div>
     }
    
      </div>
    )

}
function mapStateToProps(state) {
    return {
      cart: state.cart
    };
  }
  const mapDispatchToProps = (dispatch) => {
    return {
        addToCart : (item,quantity) => {
        dispatch(addToCart(item,quantity))
      }
    }
  }
  export default connect(mapStateToProps,mapDispatchToProps)(Product);