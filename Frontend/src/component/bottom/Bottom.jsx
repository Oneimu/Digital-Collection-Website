import React from 'react';
import "./style.css"
// import fisk_logo from "./component/homepage/img/FISK-LOGO-PLACEHOLDER-1.jpg";

export default function Bottom() {
  return (
    <div>

<div className="bottomx">
    <div className="logo_address">
      <div className="logo">
      <img className="logo-img"src="/images/FISK-LOGO-PLACEHOLDER-1.jpg" alt="Logo"/>
       
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
  </div>


    </div>
  )
}
