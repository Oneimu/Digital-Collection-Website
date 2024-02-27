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




export default class SearchResult extends Component{

  

  constructor(props) {
    super(props);
    console.log("search Here: ", props.search);
    this.state = {
      schools: [],
      currentPage: 1,
      booksPerPage: 50,
      search:props.search,
    };
    this.useEffect();
    
  }

  componentDidMount() {
    this.findAllSchoolBuildings(this.state.currentPage);
  }

  findAllSchoolBuildings(currentPage) {
    document.getElementById('keyword').innerText = this.state.search;
    console.log(this.state.search);
    // this.useEffect();
    currentPage -= 1;
    axios
      .get(
        "http://localhost:5050/api/v1/search/result/" + this.state.search +"?page=" +currentPage
      )
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
    
  }

  clickButton = (event) => {
    let keyword = event.target.value;
    console.log(keyword)
    this.setState({
      search: keyword
    })
    this.findAllSchoolBuildings(0)

    
  };

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

    console.log("HEEEEEERRR", params.get("keyword"));
   
     };
   

  render() {
    // const [searchParams, setSearchParams] = useSearchParams();
    // const keyword = searchParams.get('keyword');
    // this.state.search = keyword;
    // const { searchParams } = this.props;
    // const searchParamValue = searchParams.get('paramName');
    const { schools, currentPage, totalPages, search } = this.state;

  return (
    <div className='container_c'>

      <div className="top_c">
      <div className="about-header_c"> <h2 >Search Result </h2>
      <form 
                        // onSubmit={navigatePage("/search-result?keyword="+"")} 
                        style={{backgroundColor:'white', marginBottom:'10px', marginTop: '10px'}}>
                        <TextField id="outlined-basic" label="Search" variant="outlined" 
               
                        onChange={(event) => {
                            const query = event.target.value;
                            this.state.search = query
                            // setSearch(query)
                            // navigatePage("/search-result?keyword="+query)

                        }}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" >
                                <IconButton 
                                onClick={this.clickButton}
                                    // onClick={(e) => {
                                    //   const query = e.target.value;
                                    //   this.state.search = query
                                    //   this.findAllSchoolBuildings(currentPage)
                                  
                                    //     // const query = e.target.value;
                                    //     // console.log("HERE!!!!!!!!", search)
                                    //     // setSearch(search)
                                        
                                    // }}
                                    edge="end" 
                                >
                                    <Search />
                                </IconButton>
                                </InputAdornment>
                            ),
                            }} 
                            
                            />
                        </form>
 </div> 
        <div className='px_c'><p>Keyword: <a id='keyword'/> </p></div>
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
