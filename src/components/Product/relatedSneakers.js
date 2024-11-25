import React, { useState, useEffect } from "react";
import axios from "axios";
// import { makeStyles } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import {Grid} from '@mui/material';
import Box from '@mui/material/Box';
import { minWidth } from "@mui/system";
// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     backgroundColor: theme.palette.background.paper,
//   },
//   gridList: {
//     flexWrap: 'nowrap',
//     // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
//     transform: 'translateZ(0)',
//   },
//   title: {
//     color: '#daae51',
//   },
//   titleBar: {
//     background:
//       'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
//   },
// }));

export default function RelatedSneakers({id}) {
    const [relatedSneakers,setRelatedSneakers] = useState([])
    useEffect(() => {
    axios
        .get(`https://app-qmkzjxzkka-uc.a.run.app/sneakers/reccommended/${id}`)
        .then((response) => {
            let shoes = response.data
            shoes = shoes.filter(sneak => (
              sneak.retailPrice !== null
            ))
            shoes = shoes.filter(sneak => (
              sneak.media.imageUrl !== null
            ))
          setRelatedSneakers(shoes)
          console.log("shoes",response.data.results)
        })
    },[id])
    return (
//         <div style={{"overflow-y":"scroll"}}>
//          <Grid container spacing={1}>
//         <Grid container item spacing={3}>
//         {relatedSneakers.map((sneaker) => (
            
//             <GridListTile key={sneaker.id} >
//   <Link to={`/product/${sneaker.id}`} >
//    <div >
//               <img src={sneaker.media.imageUrl} alt={sneaker.title} />
//               <GridListTileBar
//                 title={sneaker.title}
//                 classes={{
//                   root: classes.titleBar,
//                   title: classes.title,
//                 }}
//                 actionIcon={
//                   <IconButton aria-label={`star ${sneaker.title}`}>
//                   </IconButton>
//                 }
//               />
//               </div>
//               </Link>
//             </GridListTile>
            
//           ))}
//         </Grid>
//         <Grid className={classes.gridList} cols={2.5}>
//         {relatedSneakers.map((sneaker) => (
            
//           <GridListTile key={sneaker.id} >
// <Link to={`/product/${sneaker.id}`} >
//  <div >
//             <img src={sneaker.media.imageUrl} alt={sneaker.title} />
//             <GridListTileBar
//               title={sneaker.title}
//               classes={{
//                 root: classes.titleBar,
//                 title: classes.title,
//               }}
//               actionIcon={
//                 <IconButton aria-label={`star ${sneaker.title}`}>
//                 </IconButton>
//               }
//             />
//             </div>
//             </Link>
//           </GridListTile>
          
//         ))}
//       </GridList>
<div style={{
  "overflow-x": "scroll",
  "overflow-y": "hidden",
  "height": "200px",
  "white-space":"nowrap"
}}>
        {relatedSneakers.map((sneaker) => (
          <>
          <Link to={`/product/${sneaker.id}`}>
          <div key={sneaker.id} style={{
            "box-shadow":" 1px 1px 10px #999",
            "margin": "2px",
            "max-height": "50px",
            "cursor": "pointer",
            "display":"inline-block",
            "vertical-align":"top",
            "width":"33%"
          }}>
             <div >
             <img src={sneaker.media.imageUrl} alt={sneaker.title} />
            </div>
          </div>
          </Link>
          </>
        ))}
    </div>

    )
            }
