
// import { Router, Routes, Route  } from 'react-router-dom';
import './App.css';
import Home from './Home';
import AboutPage from "./component/about/AboutPage"

import React from 'react'; 
// import { Switch } from '@mui/base';
import { BrowserRouter, Route, Router , Routes} from 'react-router-dom';
import SchoolCollection from './component/collections/SchoolCollection';
import FundsCollection from './component/collections/FundsCollection';
import ExtraCollection from './component/collections/ExtraCollection';
import Navbar from './component/nav/Navbar';
import Bottom from './component/bottom/Bottom';
import SchoolData from './component/data_page/SchoolData';
import Post from './component/data_page/Post';
import Admin from './component/admin/Admin';
import SearchResult from './component/collections/SearchResult';
import RegistrationForm from './component/admin/RegistrationForm';
import SignInSide from './component/Loginup/SignInSide';
import SignUpSide from './component/Loginup/SignUpSide';
import AdminHome from './component/admin/AdminHome';
import { ScatterPlotSharp } from '@mui/icons-material';
import SchoolDataFund from './component/data_page/SchoolDataFund';
import AdvancedSearchResult from './component/collections/AdvancedSearchResult';
// import {  Switch, Route, Link } from "react-router-dom"; 
// import Navbar from './Components/Navbar'; 

function App() {
  return (

    // <div className="App">
    //   <Home/>
    //  </div>

     <div className='App'>
            
            <BrowserRouter> 
            <Navbar />
                <Routes> 
                    <Route path="/" 
                        element={<Home/>}/>
                    {/* <Route path="/search/:query" 
                        element={<SearchResult/>} />  */}
                    {/* <Route path="/admin-login" 
                        element={<Admin/>} />  */}
                    <Route path="/admin-lading-page" 
                        element={<AdminHome/>} /> 
                    <Route path="/admin-singup"  
                        element={<SignUpSide/>} /> 
                    <Route path="/admin-login" 
                        element={<SignInSide/>} /> 
                    <Route path="/about" 
                        element={<AboutPage/>} /> 
                    <Route path="/all-school-collection" 
                        element={<SchoolCollection/>} /> 
                    <Route path="/all-funds-collection" 
                        element={<FundsCollection/>} /> 
                    <Route path="/all-extra-collection" 
                        element={<ExtraCollection/>} /> 
                    <Route path="/all-school-collection/school-building/:uid" exact element={<SchoolData/>} > 
                        {/* <Route path=':uid' element={<Post />} /> */}
                        
                    </Route>
                    
                    <Route path="/all-school-collection/school-funds/:uid" exact element={<SchoolDataFund/>} > </Route>
                    {/* <Route path="/search-result" exact element={<SearchResult/>} > </Route> */}
      <Route path="/advanced-search-result" exact 
                    element={<AdvancedSearchResult 
                    // keyword={keyword} state={selectedState} county={selectedCounty} schoolNames={schoolName} 
                    />} > </Route>
    
                </Routes> 
            </BrowserRouter> 

     </div>
  );
}

export default App;
