import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
//   import { Provider } from "./Components";
import Content from './components/content/content'
import Search from './components/search/search'
import Product from './components/Product/product'
import Cart from './components/Cart/cart'
import Orders from './components/Orders/orders'
import Protected from './components/Protected'

import './styles.css'
import SignIn from './SignIn'
import SignUp from './SignUp'
function App() {
   
  return (
    <div className="app">
    <BrowserRouter>
      <Routes>
      <Route path="/" element={
           <Protected>
             <Content />
           </Protected>
         } />
      <Route  path="/home" element={
           <Protected><Content /> 
  </Protected>
} />
      <Route  path="/signin" element={
          <SignIn />
} />
      <Route  path="/signup" element={
           <SignUp />
} />
        <Route exact path="/shop" element={
           <Protected><Search />
</Protected>
} />
        <Route exact path="/shop/:shoe" element={
           <Protected><Search />
</Protected>
} />
        <Route exact path="/product/:id" element={
           <Protected><Product />
</Protected>
} />
        <Route exact path="/cart" element={
           <Protected><Cart />
</Protected>
} />
        <Route exact path="/orders" element={
           <Protected><Orders />
</Protected>
} />
      {/* <Content /> */}
      {/* <Cards /> */}
      </Routes>
      </BrowserRouter>
      </div>
  )
      
   
}
export default App;