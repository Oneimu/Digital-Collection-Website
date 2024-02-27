import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';

// import fisk_logo from "./img/FISK-LOGO-PLACEHOLDER-1.jpg";
import catalog_name from "./images/Rosenwald_school1.jpg";
import { useNavigate } from 'react-router-dom';

export default function CatatlogueCard(proops) {

  const navigate = useNavigate();

    const navigatePage = (url) => { 
      navigate(url)
  }

  return (
    <Card sx={{ maxWidth: 335 }} >
      <CardActionArea onClick={()=>navigatePage(`/all-school-collection/school-funds/${proops.uid}`)}>
        <CardMedia
          component="img"
          height="250"
          image={'/school_images/'+proops.uid + '.jpeg'}
          alt="Digital Collection Image"
        />
        <CardContent  style={{background:"#ffc107", height:"35px"}}>
          <Typography style={{color:"#000000",fontFamily: "Helvetica", fontSize: 20, fontWeight:'bold', textAlign:"center"  }} variant="h4" component="div">
            {proops.schoolName}
          </Typography>
          {/* <Typography variant="body2" style={{color:"#000000",fontFamily: "Helvetica", fontSize: 19 }}>
            Julius Rosenwald funds building collection
          </Typography> */}
        </CardContent>
      </CardActionArea>

    </Card>
  );
}