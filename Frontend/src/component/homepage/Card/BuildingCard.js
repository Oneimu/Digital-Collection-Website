import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

// import fisk_logo from "./img/FISK-LOGO-PLACEHOLDER-1.jpg";
import catalog_name from "./images/Rosenwald_school1.jpg";
import { useNavigate } from 'react-router-dom';

export default function CatatlogueCard() {
  const navigate = useNavigate();

    const navigatePage = (url) => { 
      navigate(url)
  }

  return (
    <Card sx={{ maxWidth: 480 }} >
      <CardActionArea onClick={()=>navigatePage("/all-school-collection")}>
        <CardMedia
          component="img"
          height="300"
          image={catalog_name}
          alt="green iguana"
        />
        <CardContent  style={{background:"#ffc107"}}>
          <Typography gutterBottom style={{color:"#000000",fontFamily: "Helvetica", fontSize: 32, fontWeight:'bold', textAlign:"center" }} variant="h5" component="div">
            School Building
          </Typography>
          <Typography variant="body2" style={{color:"#000000",fontFamily: "Helvetica", fontSize: 19, textAlign:"center" }}>
            Julius Rosenwald school building collection
          </Typography>
        </CardContent>
      </CardActionArea>

    </Card>
  );
}