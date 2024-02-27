import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import HomeIcon from '@mui/icons-material/Home';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import { textAlign } from '@mui/system';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import { FileUpload } from '@mui/icons-material';
import { Button, Container, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import "./style.css"
import { upload } from '../collections/Service/data';
import MessagesAlert from './MessagesAlert';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
    //   margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  paper: {
    // margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    
  },
}));
export default function AdminHome() {


    const [name, setName] = React.useState("");
    // const [status, setStatus] = React.useState("");
    const [fileName, setFileName] = React.useState(null);

    const [status,setSatus] = React.useState({
        data: '',
        loading: true
    })
  
    const classes = useStyles();

    const onFileChangeHandler = (e) => {
        

        e.preventDefault();
        console.log(`File type: ${name}`);
        console.log(`File name: ${fileName}`);

        if (fileName === null){
            setSatus({
                data: "File Error: No file was uploaded!!!",
                loading: false
            })
        }

        const formData = new FormData();
        formData.append('file', fileName);
        upload(name, formData)
            .then(res => {
                    console.log(res.data);
                    setSatus({
                        data: res.data,
                        loading: false
                    })
                    // alert(res.data)
                    
                }).catch(() => {
                    // alert("Error", "Zip File failed upload")
                })
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
  
      // Send the file type and file name to the server
      console.log(`File type: ${name}`);
      console.log(`File name: ${fileName}`);
    };




  return (
    
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
     
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
         
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar  />
        <Divider />
        <List>
          {['Admin Home Page', 'School Data', 'Modify Entries'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                {index === 0 ? <HomeIcon /> : (
                    index === 1 ? <FindInPageIcon /> : (
                        index === 2 ? <FindInPageIcon /> : null
                    ))}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Data Update', 'Account', 'Logout'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                {index === 0 ? <FindInPageIcon /> : (
                    index === 1 ? <AccountBoxIcon /> : (
                        index === 2 ? <LogoutIcon /> : null
                    ))}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 6 }}
      >
        <Toolbar />
        <Typography 
        style={{
        // marginTop: "30px",
        fontFamily: "Source Sans Pro",
        fontSize: "28px",
        fontWeight: 500,
        textAlign: 'center'}}>
          Welcome to Admin Home Page
          
        </Typography>

       <div className='container_admin'>

       <Container component="main" >
      <Grid item xs={12} sm={5} md={8} elevation={6} square >
      <div className={classes.paper}>
       Upload digitalized metadata here
      <form >
      <p><TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="File Type"
              label="File Type"
              type="File Type"
              id="File Type"
              autoComplete="current-password"
              onChange={e => setName(e.target.value)}
              onClick={e => setName(e.target.value)}
            /></p>
      
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
         Upload file
         <VisuallyHiddenInput
            type="file"
            id="fileInput"
            onChange={(event) => {
            const fileName = event.target.files[0].name;
            const fileNameElement = document.getElementById('fileName');
            fileNameElement.textContent = fileName;
            setFileName(event.target.files[0])
            }}
        />
        </Button>
        {/* onSubmit={onFileChangeHandler} */}
        <p><Button type="submit" variant="contained" color="primary" onClick={onFileChangeHandler}>
        Submit
      </Button></p>
        
        </form>
        <p id="fileName"></p>
        {/* <p>{status}</p> */}
        {/* <div>
            {status.loading?'':
            status.data}
        </div> */}

        <MessagesAlert message={status.loading?'':
            status.data} />

        </div>
        </Grid>
        </Container>
       </div>

        <Typography>
        </Typography>
      </Box>
    </Box>
  );
}