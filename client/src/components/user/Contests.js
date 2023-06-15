import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api"; 

class Contests extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message,
      upcommingContests: [],
      historyContests: []
    }
  }

  async componentDidMount(){
    try{
        // console.log(this.props);
        setTimeout(()=>{
            this.setState({message: ""});
        }, 5000);
        const response = await axios.get(`${url}/allContests`, {
            withCredentials: true
        });
        // console.log("hello");
        // console.log(response);
        this.setState({upcommingContests: response.data.upcommingContests, historyContests: response.data.historyContests});
        }
    catch(err){
        const {history} = this.props;
        history.push("/login", {message: err.response.data});
    }
    
}

  render(){
    // console.log(this.state);
    return (
      <div className='contests'>
                {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        <h2 className='my-4 heading'>Contests</h2>
        <table className='table'>
          <thead>
            <tr>
              <td colSpan={5}>Upcomming contests</td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>Contest</th>
                <th>Start time</th>
                <th>Authors</th>
                <th>Registrations</th>
                <th>Length</th>
            </tr>
            {this.state.upcommingContests.map(contest=>{
              return (
              <tr>
                <td><Link to={`/contest/${contest._id}/announcement/get`}>{`${contest.name} #${contest.number}`}</Link></td>
                <td>{String(new Date(new Date(contest.startsAt).getTime() + (5.5 * 60 * 60 * 1000)))}</td>
                <td className='d-flex flex-column align-items-center'>{contest.authors.map(author=>{
                  return (<Link to={`/profile/${author.username}`} className='badge text-bg-light my-1'>
                    {author.username}
                  </Link>)
                })}</td>
                <td>{contest.registrations.length}</td>
                <td>{contest.duration}</td>

              </tr>)
            })}</tbody>
        </table>
        <table className='table'>
          <thead>
            <tr>
              <td colSpan={5}>History contests</td>
            </tr>
            </thead>
            <tbody>
            <tr>
                <th>Contest</th>
                <th>Start time</th>
                <th>Authors</th>
                <th>Registrations</th>
                <th>Length</th>
            </tr>
            {this.state.historyContests.map(contest=>{
              return (
              <tr>
                <td><Link to={`/contest/${contest._id}/announcement/get`}>{`${contest.name} #${contest.number}`}</Link></td>
                <td>{String(new Date(new Date(contest.startsAt).getTime() + (5.5 * 60 * 60 * 1000)))}</td>
                <td className='d-flex flex-column align-items-center'>{contest.authors.map(author=>{
                  return (<Link to={`/profile/${author.username}`} className='badge text-bg-light my-1'>
                    {author.username}
                  </Link>)
                })}</td>
                <td>{contest.registrations.length}</td>
                <td>{contest.duration}</td>

              </tr>)
            })}</tbody>
        </table>
      </div>
    )
  }
}

export default withRouter(Contests);
