import React from "react";
import { useEffect, useState } from 'react';
import "./style.css";
import fisk_logo from "./component/homepage/img/FISK-LOGO-PLACEHOLDER-1.jpg";
import { Button } from "@mui/base";
import { Box, Grid, TextField } from "@mui/material";
import ExtraCard from "./component/homepage/Card/ExtraCard";
import BuildingCard from "./component/homepage/Card/BuildingCard";
import FundCard from "./component/homepage/Card/FundCard";
import FeaturedCard from "./component/homepage/Card/FeaturedCard";
import {getFeaturedCategory} from "./Service/Home/user.js"
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Route, Routes } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Bottom from "./component/bottom/Bottom"; 
import { getSchoolBuilding, getStates, getCounties } from "./component/collections/Service/data";
import AdvancedSearchResult from "./component/collections/AdvancedSearchResult";
 

export default function Home() {
    const [featuredCategory, setFeaturedCategory] = useState([]);

    const [states, setStates] = useState([]);
    const [counties, setCounties] = useState([]);

    const [selectedState, setSelectedState] = useState('');
    const [selectedCounty, setSelectedCounty] = useState('');
    const [schoolName, setSchoolName] = useState('');
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
      getStatesCat()
        fetchFeaturedCategory()
    }, [])

    const fetchFeaturedCategory = () => {

        getFeaturedCategory().then((response) => {
            setFeaturedCategory(response.data)
            console.log(response.data);
        });
    };

    const getStatesCat = () => {

      getStates().then((response) => {
        setStates(response)
        console.log(response)
        
      });

    }

    const getCountiesCat = (selState) => {

      getCounties(selState).then((response) => {
        setCounties(response)
        console.log(response)
        
      });

    }

    const navigate = useNavigate();

    const navigatePage = (url) => { 
      navigate(url)
  }

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

  const [state, setState] = React.useState('');

  const handleChangeMenu = (event) => {

    getCountiesCat(event.target.value)
    setSelectedState(event.target.value);

  };

  const handleChangeMenuCounty = (event) => {
    setSelectedCounty(event.target.value);
  };


    return (
    //   <div className="home">

    <div className="container">

        <div className="top">
        {/* <div className="logo-container">
          <a href="https://www.fisk.edu/">
            <img className="logo-img"src={fisk_logo} alt="Logo"/>
          </a>
            
        </div> */}

        <p className="rosenwald-header">
            <span className="rosen-span">
              JULIUS ROSENWALD 
              <br/>
            </span>
            <span className="rosenwald-header-2">Digital Collections</span>
          </p> 
    
          <div className="container-2">

          <div className="blue-box">

          <div className="advanced_search">
          <Grid container spacing={3} columnSpacing={5} columns={15}  style={{ alignItems:"center"}}>

            <Grid item xs={5}>
                <Item>Keyword</Item>
            </Grid>
            <Grid item xs={5} md={10}>
                {/* <Item2> SEARCHBOX</Item2> */}
                <Box sx={{width: 500,maxWidth: '100%', }}>
                  <TextField
                   onChange={(event) => {
                    const query = event.target.value;
                    setKeyword(query)}}
                    fullWidth label="keyword" id="keyword" style={{ backgroundColor:"white", borderRadius:"5px"}}/>
                </Box>
            </Grid>

            <Grid item xs={5}>
                <Item>State</Item>
                
            </Grid>
            <Grid item xs={5} md={10}>
                {/* <Item2>Drop_DOWN</Item2> */}
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedState}
                      label="State"
                      onChange={handleChangeMenu}
                      style={{ backgroundColor:"white", borderRadius:"5px"}}
                    >

                       <MenuItem value="">
                        <em>None</em>
                      </MenuItem>

                      {states.map((data, index) => (
                         <MenuItem value={data}>
                          {data}
                        </MenuItem>
                      ))}

                    </Select>
                  </FormControl>
                </Box>
            </Grid>

            <Grid item xs={5}>
                <Item>County</Item>
            </Grid>
            <Grid item xs={5} md={10}>
                {/* <Item2> County_Drop_Down</Item2> */}
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">County</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedCounty}
                      label="County"
                      onChange={handleChangeMenuCounty}
                      style={{ backgroundColor:"white", borderRadius:"5px"}}
                    >
                       <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {counties.map((c, i) => (
                         <MenuItem value={c}>
                          {c}
                        </MenuItem>
                      ))}
                      

                    </Select>
                  </FormControl>
                </Box>
            </Grid>

            <Grid item xs={5}>
                <Item>School Name </Item>
            </Grid>
            <Grid item xs={5} md={10}>
                {/* <Item2> schoolBuilding.schoolNames</Item2> */}
                <Box sx={{width: 500,maxWidth: '100%', }}>
                  <TextField 
                  onChange={(event) => {
                    const query = event.target.value;
                    setSchoolName(query)}}
                    fullWidth label="School Name" id="schoolName" style={{ backgroundColor:"white", borderRadius:"5px"}}/>
                </Box>
            </Grid>
            <Button onClick={()=>navigatePage(`/advanced-search-result?keyword=${keyword}&state=${selectedState}&county=${selectedCounty}&schoolName=${schoolName}`)} 
            variant="outlined" style={{borderRadius: 8, marginLeft:"232px",marginTop: "30px",backgroundColor: "#badeee",padding: "8px 20px",fontSize: "18px", color:"#000", fontWeight:"650"}} > Search</Button>
        </Grid>

        </div>

          </div>

        <div className="yellow-box">
            <p className="text-wrapper-23">What am I searching?</p>
               
                <div class="text-wrapper-24">
                    Rosenwald Digital Collections contains collections of schools, hospitals, blah blah blah. And other
                    be as placeholder words so we can fill up this box.Rosenwald Digital Collections contains collections of schools, hospitals, blah blah blah. And other
                    Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at
                    Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum  " 
                </div>
                <Button onClick={()=>navigatePage("/about")} variant="outlined" style={{borderRadius: 8, marginLeft:"232px",marginTop: "15px",backgroundColor: "#badeee",padding: "8px 10px",fontSize: "18px", color:"#000"}} >See More</Button>
                 
        </div>
        </div>
        </div>

       

        <div className="mid">
        <div className="text-wrapper-22">Rosenwald Catalog</div>
            <div>
            <Grid container spacing={3} style={{marginTop: "22px", marginBottom: "5px",marginLeft:"24px"}}>

            <Grid style={{marginRight: "6px"}}> <FundCard></FundCard></Grid>
            <Grid style={{marginRight: "6px"}} > <BuildingCard></BuildingCard></Grid>
            <Grid style={{marginRight: "15px"}}> <ExtraCard></ExtraCard></Grid>

            </Grid>
            </div>
        </div>

        <div className="bottom">
        <div className="text-wrapper-22">Featured Collections</div>
        <div>
            <Grid container spacing={1} style={{marginTop: "15px", marginBottom: "50px", marginLeft: "60px", marginRight: "10px"}}>
              {featuredCategory.map((data, index) => (
                <Grid item key={index}> <FeaturedCard uid={data.uid} schoolName={data.schoolNames}></FeaturedCard></Grid>
              ))}
            </Grid>

{/* <!-- Bottom Section  --> */}
 {/* <img src={fisk_logo} alt=""/> */}
  {/* <div className="bottomx">
    <div className="logo_address">
      <div className="logo">
      <img className="logo-img"src={fisk_logo} alt="Logo"/>
       
      </div>
      <div className="address">
        <p>1000 17th Avenue N.</p>
        <p>Nashville, TN 37208</p>
      </div>
    </div>
    <div className="about_stuffs">
      <p>About Rosenwald Database</p>
      <p>About Fisk University</p>
      <p>About the Developoer Team</p>
    </div>
    <div className="items">
      <p>Library Catalogue</p>
      <p>Special Collections</p>
      <p>Research Guides</p>
    </div>
    <div class="admin">
      <p>Admin Login</p>
      <p>Contact Us</p>
      <p>Feedback</p>
    </div>
    <div class="contact">
    <div class="container-3">
            <img className="twitter-icon" alt="Twitter icon" src="/images/twitter-icon.svg" />
            <img className="insta-logo" alt="Insta logo" src="/images/insta-logo.svg" />
            <img className="line" alt="Line" src="/images/line-15.svg" />
            <div className="text-wrapper-18">Accesibility Privacy</div>
    </div>
              <p className="p">©The Fisk University John Hope and <br/> Aurelia E. Franklin Library, 2021</p>
    </div>
  </div> */}

  <Bottom/>

  

</div>
        </div>

    </div>
        
    );
}
