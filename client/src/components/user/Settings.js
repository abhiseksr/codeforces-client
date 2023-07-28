import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api";
// import '../styles/Login.css';

class Settings extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message ,
      name: "",
      birthDate: "",
      country: "",
      city: "",
      organisation: ""
    }
  }

  handleChange = (evt)=>{
    this.setState({
      [evt.target.name] : evt.target.value
    })
    // console.log(this.state);
  }

  handleSubmit = async (evt) =>{
    // console.log("handlesubmit");
    const {history} = this.props;
    try{
      evt.preventDefault();
      // console.log(this.state);
      const response = await axios.put(`${url}/settings`, {...this.state}, {
        withCredentials: true
      });
      console.log(response);
      // document.cookie = `accessToken=${response.data.accessToken}`
      this.props.history.goBack();
    }
    catch(err){
      history.push(`/settings`, {message: err.response.data});
    }
  }

async componentDidMount(){
    try{
        // console.log(this.props);
        setTimeout(()=>{
            this.setState({message: ""});
        }, 5000);
        const response = await axios.get(`${url}/settings`, {
            withCredentials: true
        });
        console.log(response.data);
        this.setState({...response.data});
        // console.log(response);
        }
    catch(err){
        const {history} = this.props;
        history.push("/login", {message: err.response.data});
    }
    
}

  render(){
    return (
      <div className='settings mt-5'>
                        {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        <h2>Settings</h2>
        <form action="/settings" onSubmit={this.handleSubmit} className='row my-4'>
          <div className='name col-md-12 my-1'>
            <label className='col-md-2' htmlFor="name">Name</label>
            <input onChange={this.handleChange} value={this.state.name} className='col-md-2' type="text" name="name" id="name"></input>
          </div>
          <div className='birth col-md-12 my-1'>
            <label className='col-md-2' htmlFor="birthDate">Birth date</label>
            <input onChange={this.handleChange} value={this.state.birthDate} className='col-md-2' type="date" name="birthDate" id="birth"></input>
          </div>
          <div className='country col-md-12 my-1'>
            <label className='col-md-2' htmlFor="country">Country</label>
            <input onChange={this.handleChange} value={this.state.country} className='col-md-2' type="text" name="country" id="country"></input>
          </div>
          <div className='city col-md-12 my-1'>
            <label className='col-md-2' htmlFor="city">City</label>
            <input onChange={this.handleChange} value={this.state.city} className='col-md-2' type="text" name="city" id="city"></input>
          </div>
          <div className='organisation col-md-12 my-1'>
            <label className='col-md-2' htmlFor="organisation">Organisation</label>
            <input onChange={this.handleChange} value={this.state.organisation} className='col-md-2' type="text" name="organisation" id="organisation"></input>
          </div>
          <button className='my-2 col-md-2 btn btn-outline-dark' type="submit">Save</button>
        </form>
      </div>
    )
  }
}

export default Settings;
