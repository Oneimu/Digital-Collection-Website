import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // try {
    //   const response = await axios.post('/api/register', { name, email, password });
    //   if (response.status === 200) {
    //     // Registration successful
    //     setName('');
    //     setEmail('');
    //     setPassword('');
    //     setErrorMessage('Registration successful!');
    //   }
    // } catch (error) {
    //   setErrorMessage(error.message);
    // }
  };

  return (
    <div className="containerx">

    <div className="topx">
   <div className="about-headerx"> <h2 >ADMIN REGISTRATION</h2> </div> 
        <form 
    onSubmit={handleSubmit}
    >
      <label>Name:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <label>Email:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <label>Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Register</button>
      <p>{errorMessage}</p>
    </form>
        </div>
        

    
    </div>
  );
};

export default RegistrationForm;
