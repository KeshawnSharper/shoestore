import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import {removeCart} from '../../actions/actions'
import {Circles} from "react-loader-spinner";
// toast.configure;
const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeCart: (item) => {
      dispatch(removeCart(item));
    }
  };
};
function Stripe(props) {
  console.log(props.total)
  console.log(Number((Number(localStorage.getItem("total")) + Number(4.99) + Number(localStorage.getItem("total") * 0.07)).toFixed(2)))
  const [product] = React.useState({
    name: "$" + props.total,
    price: props.total
  })
  async function handleToken(token, address) {
    const response = await axios.post("https://api-ikllluvkea-uc.a.run.app/checkout",
      {
        token,
        product
      }
    );
    const { status } = response.data;
    
    if (status === "success") {
      console.log(address);
      purchaseCartItems(address);
    } else {
      toast("Failed, please try again", { type: "error" });
    }
    console.log(response.data);
  }
  const purchaseCartItems = (info) => {
    props.cart.forEach((item,i) => {
      console.log(item)
      const product = {}
      product.index = i
      product.user_id = Number(localStorage.getItem("id"))
      product.price = item.total
      product.quantity = item.quantity
      product.img = item.media.smallImageUrl
      product.name = item.title
      product.product_id = item.id;
      product.email = localStorage.getItem("email");
      product.street =
        info.billing_address_line1 +
        info.billing_address_state +
        info.billing_address_zip;
        product.city = info.shipping_address_city;
        product.country = info.shipping_address_country;
        product.delivered = false;
        product.date_ordered = new Date();
        axios.post("https://api-ikllluvkea-uc.a.run.app/orders", product).then((res) => {
          console.log("res",res);
        })
        .catch((err) => console.log(err))
    });
    localStorage.setItem("cart",[])
    localStorage.setItem("total",0)
    props.removeCart()
  };
  return (
    <>
    {
      !props.total ?
      <div style={{"width":"800px", "margin":"0 auto"}}>
    <Circles type="Puff" color="#00BFFF" /> 
    <p>Loading Sneakers</p>
    </div>
    :
    <div className="container">
      <StripeCheckout
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        token={handleToken}
        amount={props.total * 100}
        billingAddress
        shippingAddress
        name={`$ ${props.total} `}
      />
      </div>
    }
    </>
  );
}
export default connect(mapStateToProps,mapDispatchToProps)(Stripe);
