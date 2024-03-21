import React, { useState, useEffect } from "react";
import './search.css'
import axios from "axios";
// import { makeStyles } from '@mui/material/styles'
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import { Link } from "react-router-dom";

import {Circles} from "react-loader-spinner";
import Header from '../header/header'



// const useStyles = makeStyles({
//   root: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 140,
//   },
// });

export default function Search(props) {
  const [gender,setGender] = useState("")
  const [brand,setBrand] = useState("Nike")
  const [year,setYear] = useState("")
  const [price,setPrice] = useState({max:"",min:""})
  const [sneakers,setSneakers] = useState([])
  const [searchedSneakers,setSearchedSneakers] = useState([])
  // const classes = useStyles();
  
  useEffect(() => {
    console.log(searchedSneakers)
    if (!JSON.parse(localStorage.getItem("sneakers"))){
    axios.get(`https://shop-be-5e283fddc3f5.herokuapp.com/sneakers`)
    .then((response) => {
      localStorage.setItem("sneakers",JSON.stringify(response.data))
      let shoes = response.data
      shoes = shoes.filter(sneak => (
        sneak.retailPrice !== null
      ))
      shoes = shoes.filter(sneak => (
        sneak.media.imageUrl !== null
      ))
      setSneakers(shoes)
      if (localStorage.getItem("brand") !== ""){
        shoes = shoes.filter(sneak => (
          sneak.brand === localStorage.getItem("brand")
        ))
      }
      setSearchedSneakers(shoes)
    })
  }
  else{
  setSneakers(JSON.parse(localStorage.getItem("sneakers")))
  if (localStorage.getItem("brand") !== ""){
  setSearchedSneakers(JSON.parse(localStorage.getItem("sneakers")).filter(sneak => (
    sneak.brand === localStorage.getItem("brand")
  )))
  }
  
  else{
    setSearchedSneakers(JSON.parse(localStorage.getItem("sneakers")))

  }
  }
  if (localStorage.getItem("keyword")){
    setSearchedSneakers(searchedSneakers.filter(sneaker => sneaker.title.includes(localStorage.getItem("keyword"))))
    console.log(searchedSneakers.filter(sneaker => sneaker.title.toLowerCase().includes(localStorage.getItem("keyword").toLowerCase())))
    // console.log(searchedSneakers.filter(sneaker => sneaker.title.toLowerCase().includes(localStorage.getItem("keyword").toLowerCase()))
  }

  },[sneakers.length])
 

  const handleGender = (event) => {
    console.log(event.target.value)
    if (event.target.value === gender){
      setGender("")
    }
    else{
    setGender(event.target.value);
    }
  };
  const handleBrand = (event) => {
    if (event.target.value === brand){
      setBrand("")
    }
    else{
      setBrand(event.target.value);
    }
  };
  const handleYear = (event) => {
    setYear(event.target.value);
  };
  const filterShoes = () => {
    console.log(searchedSneakers,sneakers)
    let search = sneakers
  if ( gender !== ""){
    console.log(gender)
    search = search.filter(sneaker => sneaker.gender.toUpperCase() === gender.toUpperCase())
    console.log(gender,searchedSneakers.filter(sneaker => sneaker.gender.toUpperCase() === gender.toUpperCase()))
  }
  if (brand !== "" ){
    console.log(brand)
    search = search.filter(sneaker => sneaker.brand.toUpperCase() === brand.toUpperCase())
    console.log(brand,searchedSneakers.filter(sneaker => sneaker.brand.toUpperCase() === brand.toUpperCase()))
  }
  if (year !== "" ){

    search = search.filter(sneaker => Number(sneaker.year) === Number(year))
    console.log(searchedSneakers)

      }   
    if (price.min !== ""){
      search = search.filter(sneaker => sneaker.retailPrice >= Number(price.min))
    }
    if (price.max !== ""){
      search = search.filter(sneaker => sneaker.retailPrice <= Number(price.max))
    }
    setSearchedSneakers(search)
    console.log(searchedSneakers )
}
const reset = () => {
 setSearchedSneakers(sneakers)
}

  return (
    <div>
    <Header props={props}/>
  <>
  {
    searchedSneakers.length === 0
    ?
    <div style={{"width":"800px", "margin":"0 auto"}}>
    <Circles type="Puff" color="#00BFFF" /> 
    <p>Loading Sneakers... (if search take too long may not have any results,refresh and try again)</p>
    </div>
    :
  <div className="list">
  <div className="grid second-nav">
              <div className="column-xs-12">
                <nav>
                  <ol className="breadcrumb-list">
                  <li className="breadcrumb-item"> <Link to={`/home`}>Home</Link > </li>
                    <li className="breadcrumb-item active">Shop</li>
                    
                  </ol>
                </nav>
              </div>
            </div>
            <br />
            <br />
  <Grid container spacing={3}>
  
        <Grid item xs={12} md={2}>
        <FormControl component="fieldset">
      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={gender} >
        <FormControlLabel value="women" control={<Radio />} label="Female" onClick={handleGender}/>
        <FormControlLabel value="men" control={<Radio />} label="Male" onClick={handleGender} />
        
      </RadioGroup>
    </FormControl>
    <br/>
    <FormControl component="fieldset">
      <FormLabel component="legend">Brands</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={brand} >
        <FormControlLabel value="ASICS" control={<Radio />} label="ASICS" onClick={handleBrand}/>
        <FormControlLabel value="CONVERSE" control={<Radio />} label="CONVERSE" onClick={handleBrand}/>
        <FormControlLabel value="JORDAN" control={<Radio />} label="JORDAN" onClick={handleBrand}/>
        <FormControlLabel value="NEW%20BALANCE" control={<Radio />} label="NEW BALANCE" onClick={handleBrand}/>
        <FormControlLabel value="NIKE" control={<Radio />} label="NIKE" onClick={handleBrand}/>
        <FormControlLabel value="PUMA" control={<Radio />} label="PUMA" onClick={handleBrand}/>
        <FormControlLabel value="REEBOK" control={<Radio />} label="REEBOK" onClick={handleBrand}/>
        <FormControlLabel value="SAUCONY" control={<Radio />} label="SAUCONY" onClick={handleBrand}/>
        <FormControlLabel value="UNDER%20ARMOUR" control={<Radio />} label="UNDER ARMOUR" onClick={handleBrand}/>
        <FormControlLabel value="VANS" control={<Radio />} label="VANS" onClick={handleBrand}/>
        <FormControlLabel value="YEEZY" control={<Radio />} label="YEEZY" onClick={handleBrand}/>
        <FormControlLabel value="ADIDAS" control={<Radio />} label="ADIDAS" onClick={handleBrand}/>
      </RadioGroup>
      <TextField id="standard-basic" label="Year" onChange={handleYear}/>
      <br/>
      <TextField id="standard-basic" label="min Price" onChange={e => {
        setPrice({...price,min:e.target.value})
        console.log(price)
      }
      } value={price.min}/>
      <h3>to</h3>
      <br/>
      <TextField id="standard-basic" label="max Price" onChange={e => setPrice({...price,max:e.target.value})} value={price.max}/>
    </FormControl>
    <br/>
    <br/>
    <Button variant="contained" color="secondary" onClick={filterShoes}>
        Search
      </Button>
      <br/>
    <br/>
         <Button variant="contained" color="secondary" onClick={reset}>
        Reset
      </Button>
      </Grid> 
      
    <div className="products">
    <Grid item xs={12} md={10 + 2} >
      {
        sneakers.length === 0 ? 
        <div> </div> :
        <div> 
           <Grid container spacing={3}>
      {searchedSneakers.map(
        sneaker => (
          
        <Grid item xs={12} md={6}>
          <Link to={`/product/${sneaker.id}`}>
          <Card className={"shoe"}>
          <CardActionArea>
            <CardMedia
            style={{height: "200px"}}
              // className={classes.media}
              image={sneaker.media.smallImageUrl}
              title="Contemplative Reptile"
            />
            
            <CardContent>
            
              <Typography gutterBottom variant="h5" component="h2">
{sneaker.title}

              </Typography>
             
              <Typography variant="body2" color="textSecondary" component="p">
              {sneaker.retailPrice}
              </Typography>
            </CardContent>
            
          </CardActionArea>
        
        </Card>
        </Link>
        </Grid>
        )
      )}
      
      </Grid>
      </div>
      
        }
        </Grid>
        </div>
        
        </Grid>
        </div>
        }
        </>
    </div>
    
  
  )
}
