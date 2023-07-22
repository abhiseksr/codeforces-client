import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api";

class Login extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message ,
      username: "",
      password: ""
    }
  }

  handleChange = (evt)=>{
    try{
      this.setState({
        [evt.target.name] : evt.target.value
      })
    }
    catch(err){
      console.log(err);
    }
  }

  handleSubmit = async (evt) =>{
    const {history} = this.props;
    try{
      evt.preventDefault();
      const response = await axios.post(`${url}/login`, {...this.state},{
        withCredentials: true
      });
      // console.log(response);
      // document.clearCookie("accessToken");
      document.cookie = `accessToken=${response.data.accessToken}`
      history.push(`/profile/${this.state.username}`, {message: response.data});
    }
    catch(err){
      history.push(`/login`, {message: err.response.data});
    }
  }

  componentDidMount(){
    // console.log(this.props);
    setTimeout(()=>{
      this.setState({message: ""});
    }, 5000);
  }

  render(){
    return (
      <div className='login d-flex flex-column align-items-center'>
        {this.state.message?(<div className='alert alert-primary' style={{width: "100%", textAlign: "center"}}>{this.state.message}</div>):""}
        <h2 className='mt-5'>Login</h2>
        <form action="/login" className='username form d-flex flex-column align-items-center my-4 row container-xxs' onSubmit={this.handleSubmit}>
          <div className='username col-md-12 my-1'>
            <label htmlFor="username" className= "col-md-5">Username</label>
            <input type="text" onChange={this.handleChange} className= "col-md-7" value={this.state.username} name="username"></input>
          </div>
          <div className='password col-md-12 my-1'>
            <label htmlFor="password" className= "col-md-5">Password</label>
            <input type="password" minLength={8} className= "col-md-7" onChange={this.handleChange} value={this.state.password} name="password"></input>
          </div>
          <button type="submit" className= "col-md-4  my-3 btn btn-outline-dark">Login</button>
          <Link to='/passwordRecovery' className='forgotPassword'>Forgot password</Link>
          <span className='newUser'>New user? <Link to='/register'>Register</Link></span>
        </form>
      </div>
    )
  }
}

export default withRouter(Login);
