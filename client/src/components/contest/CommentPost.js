import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api";

class CommentPost extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message ,
      comment: ""
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
      const response = await axios.post(`${url}/contest/${this.props.match.params.contestID}/comment`, {comment: this.state.comment}, {
        withCredentials: true
      });
      // console.log(response);
      // document.cookie = `accessToken=${response.data.accessToken}`
      history.push(`/contest/${this.props.match.params.contestID}/announcement/get`, {message: response.data});
    }
    catch(err){
      history.push(`/login`, {message: err.response.data});
    }
  }


  render(){
    return (
      <div className='commentPost my-4'>
        {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        <h2>Comment</h2>
        <form className='form my-4 row' onSubmit={this.handleSubmit}>
            <textarea className='col-md-12' onChange={this.handleChange} value={this.state.comment} name="comment" rows={17} cols={100}></textarea>
            <button className="btn btn-outline-dark col-md-3 my-3" type="submit">Save</button>
        </form>
      </div>
    )
  }
}

export default withRouter(CommentPost);
