import React, { useState } from 'react';
// import TextField from '@material/core/TextField';
// import Button from '@material/core/Button';
// import CloudUploadIcon from '@material-ui/icons/CloudUpload';
// import VisuallyHiddenInput from '@material-ui/core/Input';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Button, Container, Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

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

const Admin = () => {
  const [fileType, setFileType] = useState('');
  const [fileName, setFileName] = useState(null);

//   const onFileTypeChange = (event) => {
//     setFileType(event.target.value);
//   };

  const onFileChangeHandler = (event) => {
    const fileName = event.target.files[0];
    setFileName(fileName);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Send the file type and file name to the server
    console.log(`File type: ${fileType}`);
    console.log(`File name: ${fileName}`);

    // Reset the form
    // setFileType('');
    // setFileName('');
  };

  return (
    <form >
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="FileType"
        label="File Type"
        type="text"
        id="FileType"
        autoComplete="current-password"
        onChange={e => setFileName(e.target.value)}
        onClick={e => setFileName(e.target.value)}
        // value={fileType}
      />

      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        // onClick={onFileChangeHandler}
      >
        Upload file
        <VisuallyHiddenInput
          type="file"
          id="fileInput"
          onChange={e => setFileName(e.target.value)}
        />
      </Button>

      <Button type="submit" variant="contained" color="primary" onClick={onFileChangeHandler}>
        Submit
      </Button>
    </form>
  );
};

export default Admin;
