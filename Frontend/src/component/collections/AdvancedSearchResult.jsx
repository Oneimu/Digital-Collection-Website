import React, { useEffect, useState, Component} from 'react';
import "./style.css"
import {getAllSchoolBuildings} from "./Service/data.js"
import { useNavigate } from "react-router-dom";
import { Grid } from '@mui/material';
import Bottom from '../bottom/Bottom';
import SchoolCard from './SchoolCard'
import { ConstructionRounded } from '@mui/icons-material';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import {AppBar, Toolbar, Tabs, Tab, TextField, InputAdornment, Typography, Drawer, SearchIconWrapper, useMediaQuery, useTheme } from '@mui/material';
import { Search } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

// import { toast } from 'react-toastify'
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Card,
  Table,
  Image,
  ButtonGroup,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faEdit,
  faTrash,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { Row, Col, Pagination, PaginationItem, PaginationLink, Container } from 'reactstrap'




export default class AdvancedSearchResult extends Component{

  

  constructor(props) {
    super(props);
    // console.log("Keyword Here: ", props.keyword);
    this.state = {
      schools: [],
      currentPage: 1,
      booksPerPage: 50,
      totalElements: 0,
      keyword:' ',
      stateX: ' ',
      county: ' ',
      schoolName: " "

    };
    this.useEffect();
    console.log("STATE", document.getElementById('state'));
    
  }

  componentDidMount() {
    this.findAllSchoolBuildings(this.state.currentPage);
  }

  findAllSchoolBuildings(currentPage) {
    // this.testApp()
    // 
    
    // document.getElementById('county').innerText = this.state.county;
    // document.getElementById('schoolName').innerText = this.state.schoolName;
    console.log(this.state.stateX);
    // this.useEffect();
    const formData = new FormData();
    formData.append('state', this.state.stateX);
    formData.append('county', this.state.county)
    formData.append('schoolNames', this.state.schoolName)
    // formData.append('keyword', "result/{keyword}/{state}/{county}/{schoolName}""result/{keyword}/{state}/{county}/{schoolName}")
    console.log("HEEEEEERRR",formData );
    
    
    currentPage -= 1;
    axios
      .post(
      `http://localhost:5050/api/v1/advance-search/result/${this.state.keyword}/${this.state.stateX}/${this.state.county}/${this.state.schoolName}`)
      .then((response) => response.data)
      .then((data) => {
        this.setState({
          schools: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          currentPage: data.number + 1,
          
        });
        // console.log(data);
      })
      .catch((error) => {
        console.log(error);
        // localStorage.removeItem("jwtToken");
        // this.props.history.push("/");
      });

    // console.log(currentPage);
    document.getElementById('keyword').innerText = this.state.keyword;
    document.getElementById('state').innerText = this.state.stateX;
    document.getElementById('county').innerText = this.state.county;
    document.getElementById('schoolname').innerText = this.state.schoolName;
    document.getElementById('record').innerText = this.state.totalElements;
   
    
  }

  // testApp = () => {
  //   const params = new URLSearchParams(window.location.pathname);

  //   console.log(params.get("state"))
  
  //   return <p>{params.get("userId")}</p>;
  // };

  // clickButton = (event) => {
  //   let keyword = event.target.value;
  //   console.log(keyword)
  //   this.setState({
  //     search: keyword
  //   })
  //   this.findAllSchoolBuildings(0)

    
  // };

  changePage = (event) => {

    let targetPage = parseInt(event.target.value);
    this.findAllSchoolBuildings(targetPage);
  
    this.setState({
      [event.target.name]: targetPage,
    });
  };

  firstPage = () => {
    let firstPage = 1;
    if (this.state.currentPage > firstPage) {
        this.findAllSchoolBuildings(firstPage);
    }
  };

  prevPage = () => {
    let prevPage = 1;
    if (this.state.currentPage > prevPage) {
      
        this.findAllSchoolBuildings(this.state.currentPage - prevPage);
    }
  };

  lastPage = () => {
    let condition = Math.ceil(
      this.state.totalElements / this.state.booksPerPage
    );
    if (this.state.currentPage < condition) {
      
        this.findAllSchoolBuildings(condition);
    
    }
  };

  nextPage = () => {
    this.findAllSchoolBuildings(this.state.currentPage + 2);
   
    if (
      this.state.currentPage <
      Math.ceil(this.state.totalElements / this.state.booksPerPage)
    ) {
  
      this.findAllSchoolBuildings(this.state.currentPage + 1);
  
    }
  };

  useEffect= () => {

    const urlSearchString = window.location.search;
   
    const params = new URLSearchParams(urlSearchString);

    if (params.get("keyword")){
      this.state.keyword = params.get("keyword")
    }else {
      this.state.keyword = "-"
    }
    
    if ( params.get("state")){
      this.state.stateX = params.get("state")
    }else {
      this.state.stateX = "-"
    }
    
    if (params.get("county")){
      this.state.county = params.get("county")
    }else {
      this.state.county = "-"
    }
    
    if (params.get("schoolName")){
      console.log("HHHHHHHEEEEERRRRREREEEEE")
      this.state.schoolName = params.get("schoolName")
    }else {
      this.state.schoolName = "-"
    }
    
    

   
   
     };
   


  render() {
    // const [searchParams, setSearchParams] = useSearchParams();
    // const keyword = searchParams.get('keyword');
    // this.state.search = keyword;
    // const { searchParams } = this.props;
    // const searchParamValue = searchParams.get('paramName');
    const { schools, currentPage, totalPages, } = this.state;

  return (
    <div className='container_c'>

      <div className="top_c">
      <div className="about-header_c"> <h2 >Advanced Search Result </h2>
    
 </div> 
        <div className='px_c'><p>Keyword: <a id='keyword'/>,
    
        State: <a id='state'/>,


        County: <a id='county'/>,

        School Name: <a id='schoolname'/></p>

        <p>Number of records found:  <a id='record'/> </p></div>
      </div>
      
      <div className='mid_cx'>
      
      <Grid container spacing={1} style={{marginTop: "15px",marginLeft: "60px", marginRight: "10px"}}>
              {schools.map((data, index) => (
                <Grid item key={index}> <SchoolCard uid={data.uid} schoolName={data.schoolNames}></SchoolCard></Grid>
              ))}
      </Grid>

      <div className='bottom_c'>
        <div className='bottom_content'>

      {schools.length > 0 ? (
            <Card.Footer>
              <div style={{ float: "left" , marginLeft: "70px", marginRight:"80px"}}>
                Showing Page {currentPage} of {totalPages}
              </div>
              <div >
                <InputGroup size="sm">
                  <InputGroup.Text>

                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.firstPage}
                    >
                    <FontAwesomeIcon icon={faFastBackward} /> First
                    </Button>

                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === 1 ? true : false}
                      onClick={this.prevPage}
                    >
                      <FontAwesomeIcon icon={faStepBackward} /> Prev
                    </Button>

                  </InputGroup.Text>

                  <FormControl
                    className={"page-num bg-dark"}
                    name="currentPage"
                    value={currentPage}
                    onChange={this.changePage}
                  />
                  

                  <InputGroup.Text>

                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.nextPage}
                    >
                      <FontAwesomeIcon icon={faStepForward} /> Next
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline-info"
                      disabled={currentPage === totalPages ? true : false}
                      onClick={this.lastPage}
                      
                    >
                      <FontAwesomeIcon icon={faFastForward} /> Last
                    </Button>

                  </InputGroup.Text>
                </InputGroup>
              </div>
            </Card.Footer>
          ) : null}


             
      </div>
      </div>
      </div>
      
      {/* <div className='bottom_c'>
      <h1>JEYYUBI</h1>
      </div> */}

        <Bottom/>

  </div>
  );

}
}
