import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";
import "../styles/Loader.css";

class Loader extends React.Component{ 
  render(){
    return(
      <div v-if="loading" class="spinner">
      <div class="rect1"></div>
      <div class="rect2"></div>
      <div class="rect3"></div>
      <div class="rect4"></div>
      <div class="rect5"></div>
    </div>)
  }
}

export default withRouter(Loader);
