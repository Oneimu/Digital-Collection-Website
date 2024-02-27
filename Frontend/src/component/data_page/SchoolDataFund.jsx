import React, { useEffect,useState } from 'react'
import ImageDisplay from './ImageDisplay';
// import '/bootstrap/dist/css/bootstrap. css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import "./data.css";
import Bottom from '../bottom/Bottom';
import { getSchoolFund } from '../collections/Service/data';
import { useParams } from 'react-router-dom';




export default function SchoolDataFund() {
    let params = useParams()

    const [schoolFund, setSchoolFund] = useState([]);

    useEffect(() => {
        fetchSchoolFund()
    }, [])

    const fetchSchoolFund = () => {

        getSchoolFund(params.uid).then((response) => {
            setSchoolFund(response)
            console.log(response);
        });
    };

    const Item = styled(Paper)(() => ({
        backgroundColor: '#badeee',
        // fontSize: 15,
        fontWeight: 650,
        padding: 8,
        textAlign: 'center',
        color: 'black',
        padding: 10,
      }));

    const Item2 = styled(Paper)(() => ({
        backgroundColor: '#e9e9e9',
        padding: 8,
        fontWeight: 450,
        textAlign: 'left',
        color: 'black',
        height: 40,
        paddingTop: 15,
        paddingLeft: 50,
        paddingRight: 10,
      }));
    
  return (
   
    <div>
         
    <div className='container_ss'>

        <div className='img_display_ss'>

        <div class="first_ss">
        <div class="image_ss">
          <img  src={'/school_images/'+schoolFund.uid + '.jpeg'} alt="" />
        </div>

        </div>

            
        </div>

        <div className='image_content_ss'>
        <Grid container spacing={3} columnSpacing={5} columns={70} >
        <Grid item xs={15}>
            <Item>School Name </Item>
        </Grid>
        <Grid item xs={6} md={50}>
            <Item2> {schoolFund.schoolNames}</Item2>
        </Grid>
        <Grid item xs={15}>
            <Item> State </Item>
        </Grid>
        <Grid item xs={6} md={50}>
            <Item2>{schoolFund.state}</Item2>
        </Grid>

        <Grid item xs={15}>
            <Item> Country </Item>
        </Grid>
        <Grid item xs={6} md={50}>
            <Item2>{schoolFund.county}</Item2>
        </Grid>

        <Grid item xs={15}>
            <Item> Description </Item>
        </Grid>
        <Grid item xs={6} md={50}>
            <Item2>{schoolFund.description} </Item2>
        </Grid>

        <Grid item xs={15}>
            <Item> Title </Item>
        </Grid>
        <Grid item xs={6} md={50}>
            <Item2>{schoolFund.title}</Item2>
        </Grid>

        <Grid item xs={15}>
            <Item> Other Names </Item>
        </Grid>
        <Grid item xs={6} md={50}>
            <Item2>{schoolFund.alternateNames}</Item2>
        </Grid>
        </Grid>
        
        </div>
    
    
    <div className='bottom_ss'>
    <Bottom/>
    </div>
    </div>
    </div>
  )
}
