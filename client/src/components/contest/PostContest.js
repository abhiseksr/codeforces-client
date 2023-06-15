import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api";

class PostContest extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message ,
      name: "",
      number: "",
      startsAt: "",
      duration: "",
      authors: [],
      author: "",
    }
  }

  handleChange = (evt)=>{
    this.setState({
      [evt.target.name] : evt.target.value
    })
    // console.log(this.state);
  }

  addAuthor = (evt) =>{
    let authorname = this.state.author;
    this.setState({
      authors: [...this.state.authors, authorname],
      author: ""
    })
  }

  handleSubmit = async (evt) =>{
    const {history} = this.props;
    try{
      evt.preventDefault();
      // console.log(this.state);
      const response = await axios.post(`${url}/contest`, {...this.state}, {
        withCredentials: true
      });
      // console.log(response);
      // document.cookie = `accessToken=${response.data.accessToken}`
      history.push(`/contests/organiser`, {message: response.data});
    }
    catch(err){
      // console.log(err);
      history.push(`/contest`, {message: err.response.data});
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
      <div className='postContest my-4'>
        {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        <h2>Add a contest</h2>
        <form className='my-4 form container-xxs row' onSubmit={this.handleSubmit}>
            <div className='name my-1'>
                <label className='col-md-2' htmlFor='name'>Name</label>
                <input className='col-md-4' id="name" onChange={this.handleChange} value={this.state.name} name="name"></input>
            </div>
            <div className='number my-1'>
                <label className='col-md-2' htmlFor='number'>Number</label>
                <input className='col-md-4' id="number" onChange={this.handleChange} value={this.state.number} name="number"></input>
            </div>
            <div className='startsAt my-1'>
                <label className='col-md-2' htmlFor='startsAt'>Starts at</label>
                <input className='col-md-4' type="datetime-local" id="startsAt" onChange={this.handleChange} value={this.state.startsAt} name="startsAt"></input>
            </div>
            <div className='duration my-1'>
                <label className='col-md-2' htmlFor='duration'>Length</label>
                <input className='col-md-4' id="duration" onChange={this.handleChange} value={this.state.duration} name="duration"></input>
            </div>
            <div className='authors my-1'>
                <label className='col-md-2' htmlFor='authors'>Enter authors</label>
                <input className='col-md-3' id="authors" onChange={this.handleChange} value={this.state.author} name="author"></input>
                <button className='col-md-1 btn py-1 btn-outline-dark' type="button" onClick={this.addAuthor}>Add</button>
            </div>
            <button className='my-4 col-md-2 btn btn-outline-dark' type='submit'>Save</button>
        </form>
      </div>
    )
  }
}

export default withRouter(PostContest);
