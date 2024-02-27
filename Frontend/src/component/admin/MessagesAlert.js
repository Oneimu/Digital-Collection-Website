import React from 'react'

import Alert from '@mui/material/Alert';


export default function MessagesAlert(props) {
    if (props.message.length === 0) {
      return null;
    }
  
    if (props.message.includes("Successfully")) {
      return (
        <Alert sx={{ mb: 4 }} severity="success">
          {props.message}
        </Alert>
      );
    } else {
      return (
        <Alert sx={{ mb: 4 }} severity="error">
          {props.message}
        </Alert>
      );
    }
}
