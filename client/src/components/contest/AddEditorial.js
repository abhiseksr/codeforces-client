import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api";

class AddEditorial extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message ,
      editorial: ""
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
      const response = await axios.put(`${url}/contest/${this.props.match.params.contestID}/editorial`, {...this.state, solution:{language: this.state.language, content: this.state.solution}}, {
        withCredentials: true
      });
      // console.log(response);
      // document.cookie = `accessToken=${response.data.accessToken}`
      history.push(`/contests/organiser`, {message: response.data});
    }
    catch(err){
      history.push(`/contest/${this.props.match.params.contestID}/editorial`, {message: err.response.data});
    }
  }

async componentDidMount(){
    try{
        // console.log(this.props);
        setTimeout(()=>{
            this.setState({message: ""});
        }, 5000);
        const response = await axios.get(`${url}/contest/${this.props.match.params.contestID}/editorial`, {
            withCredentials: true
        });
        this.setState({editorial: response.data.editorial});
        // console.log(response);
        }
    catch(err){
        const {history} = this.props;
        history.push("/login", {message: err.response.data});
    }
    
}

  render(){
    return (
      <div className='addEditorial my-4'>
        {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        <h2>Editorial</h2>
        <form className='my-4 form row' onSubmit={this.handleSubmit}>
            <textarea className='col-md-12' onChange={this.handleChange} value={this.state.editorial} name="editorial" rows={17} cols={100}></textarea>
            <button className="btn btn-outline-dark col-md-3 my-3" type="submit">Save</button>
        </form>
      </div>
    )
  }
}

export default withRouter(AddEditorial);
