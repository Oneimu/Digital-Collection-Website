import React, {useState} from 'react';
import {AppBar, Toolbar, Tabs, Tab, TextField, InputAdornment, Typography, Drawer, SearchIconWrapper, useMediaQuery, useTheme } from '@mui/material';
// import { AppBar, Tabs, Tab, Toolbar, TextField, InputAdornment, IconButton } from '@mui/material';
import { Search } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
// import SearchResult from './component/collections/SearchResult';
// import './style.css';
import DrawerComponent from './DrawerComponent';
import { Route, Routes, useNavigate } from 'react-router-dom';
import SearchResult from '../collections/SearchResult';

export default function Navbar() {
    const [value, setValue] = useState();
    const [search, setSearch] = useState();
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down("md"));
    console.log(isMatch)
    const PAGES = ["School Building", "School Funds", "About Us", "Admin"]

    const navigate = useNavigate();

    const navigatePage = (url) => { 
      navigate(url)
  }

//   const handleSearch = (event) => {
//     setSearchQuery(event.target.value);
//   };

//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     history.push(`/search/${searchQuery}`);
//   };
     
    return (
                <nav>
                <AppBar sx={{ background: "#badeee" }}>
                    <Toolbar>

                        {isMatch ? (
                            <>
                                <Typography sx={{color:'black'}}>
                                ROSENWALD COLLECTIONS
                                </Typography>
                                <DrawerComponent />
                            </>
                        ) : (
                            <>
                                <Tabs textColor="inherit"
                                    value={value}
                                    // onChange={(e, value) => setValue(value)}
                                    indicatorColor="black"
                                    sx={{ color: 'black',  fontWeight: 'bold' }}>
                                    {/* Change Fisk Univerity to a logo */}

                                    <Tab label="ROSENWALD COLLECTIONS" onClick={()=>navigatePage("/")}>
                    
                                    </Tab>

                                </Tabs>
                                <Tabs textColor="inherit"
                                    value={value}
                                    onChange={(e, value) => setValue(value)}
                                    indicatorColor="black" sx={{ color: 'black',  fontWeight: 'bold', marginLeft: 'auto' }}>
                                    <Tab label="School Buildings" onClick={()=>navigatePage("/all-school-collection")} />
                                    <Tab label="School Funds" onClick={()=>navigatePage("/all-funds-collection")}/>
                                    <Tab label="About Us" onClick={()=>navigatePage("/about")}/>
                                    <Tab label="Admin" onClick={()=>navigatePage("/admin-login")}/>
                                </Tabs>
                            </>
                        )}
                        <form 
                        // onSubmit={navigatePage("/search-result?keyword="+"")} 
                        style={{backgroundColor:'white', marginBottom:'10px', marginTop: '10px'}}>
                        <TextField id="outlined-basic" label="Search" variant="outlined" 
                        // value={searchQuery}
                        //     onChange={handleSearch} 
                        onChange={(event) => {
                            const query = event.target.value;
                            setSearch(query)
                            // navigatePage("/search-result?keyword="+query)

                        }}
                            InputProps={{
                            endAdornment: (
                                <InputAdornment position="end" >
                                <IconButton 
                                    onClick={(e) => {
                                        const query = e.target.value;
                                        console.log("HERE!!!!!!!!", search)
                                        setSearch(search)
                                        navigatePage("/search-result?keyword="+search)
                                    }}
                                    edge="end" 
                                >
                                    <Search />
                                </IconButton>
                                </InputAdornment>
                            ),
                            }} 
                            
                            />
                        </form>
                        
                    </Toolbar>

                </AppBar>
                <Routes>
                    <Route path="/search-result" exact element={<SearchResult search={search} />} > </Route>
                </Routes>
                </nav>
                
    );
};