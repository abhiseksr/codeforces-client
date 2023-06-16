import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";
import Loader from '../Loader';


const url = "http://localhost:4000/api";

class PasswordRecovery extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message ,
      username: "",
      email: "",
      callingAPI: false
    }
  }

  handleChange = (evt)=>{
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  handleSubmit = async (evt) =>{
    const {history} = this.props;
    try{
      this.setState({callingAPI: true});
      evt.preventDefault();
      const response = await axios.post(`${url}/passwordRecovery`, {...this.state},{
        withCredentials: true
      });
      history.push(`/login`, {message: `recovery link sent to ${this.state.email}, click to verify and update the password`});
    }
    catch(err){
      history.push(`/passwordRecovery`, {message: err.response.data});
    }
  }

  componentDidMount(){
    // console.log(this.props);
    setTimeout(()=>{
      this.setState({message: ""});
    }, 5000);
  }

  render(){
    // console.log(this.props);
    return (
      <div className='passwordRecovery d-flex flex-column align-items-center'>
        {this.state.message?(<div className='alert alert-primary style={{width: "100%", textAlign: "center"}}'>{this.state.message}</div>):""}
        <h2 className='mt-5'>Password recovery</h2>
        {this.state.callingAPI?
        <Loader />:<div></div>}
        <form action="passwordRecovery" className='form my-4 d-flex flex-column align-items-center row container-xxs' onSubmit={this.handleSubmit}>
          <div className='username my-1 col-md-12'>
            <label className='col-md-5' htmlFor="username">Username</label>
            <input className='col-md-7' type="text" onChange={this.handleChange} value={this.state.username} name="username"></input>
          </div>
          <div className='email my-1 col-md-12'>
            <label className='col-md-5' htmlFor="email">Email</label>
            <input className='col-md-7' type="email" onChange={this.handleChange} value={this.state.email} name="email"></input>
          </div>
          <button  className= "col-md-8 my-3 btn btn-outline-dark"  type="submit">Recover password</button>
        </form>
      </div>
    )
  }
}

export default withRouter(PasswordRecovery);
