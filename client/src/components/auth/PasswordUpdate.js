import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api";

class PasswordUpdate extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message ,
      password: ""
    }
  }

  handleChange = (evt)=>{
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  handleSubmit = async (evt) =>{
    const {history} = this.props;
    const {userId, accessToken} = this.props.match.params;
    try{
      evt.preventDefault();
      const response = await axios.patch(`${url}/updatePassword/${userId}/${accessToken}`, {...this.state},{
        withCredentials: true
      });
      history.push(`/login`, {message: "password updated"});
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
    return (
      <div className='passwordUpdate d-flex flex-column align-items-center'>
        {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        <h2 className='mt-5'>Password update</h2>
        <form onSubmit={this.handleSubmit} className='form d-flex flex-column align-items-center my-4 row container-xxs'>
        <div className='password my-1 col-md-12'>
            <label className='col-md-5' htmlFor="password">Enter new password</label>
            <input className='col-md-7' type="password" minLength={8} onChange={this.handleChange} value={this.state.password} name="password"></input>
          </div>
          <button className= "col-md-5 my-3 btn btn-outline-dark" type='submit'>Reset password</button>
        </form>  
      </div>
    )
  }
}

export default withRouter(PasswordUpdate);
