import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api"; 

class Favourites extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message,
      favourites:  []
    }
  }


  async componentDidMount(){
    try{
        // console.log(this.props);
        setTimeout(()=>{
            this.setState({message: ""});
        }, 5000);
        const response = await axios.get(`${url}/favourites`, {
            withCredentials: true
        });
        // console.log("hello");
        // console.log(response);
        this.setState({favourites: response.data.favourites});
        }
    catch(err){
        const {history} = this.props;
        history.push("/login", {message: err.response.data});
    }
    
}

  render(){
    // if (this.state.problems.length)
    // console.log(this.state.problems[0]._id);
    return (
      <div className='favourites'>
                {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        <h2 className='my-4 heading'>Favourites</h2>
        <table className='table'>
            <tbody>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Tags</th>
                <th>Submissions</th>
            </tr>
            {this.state.favourites.map((favourite,index)=>{
              return (
              <tr>
                <td>{index+1}</td>
                <td><Link to='/'>{favourite.name}</Link></td>
                <td>{favourite.tags.map(tag=>{
                  return (<span className='badge text-bg-light'>{tag}</span>)
                })}</td>
                <td>{favourite.submissions}</td>
              </tr>)
            })}</tbody>
        </table>
      </div>
    )
  }
}

export default withRouter(Favourites);
