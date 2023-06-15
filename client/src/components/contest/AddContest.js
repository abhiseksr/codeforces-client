import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api";

class AddContest extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message ,
      contests: []
    }
  }

  async componentDidMount(){
    try{
      // console.log(this.props);
      setTimeout(()=>{
        this.setState({message: ""});
      }, 5000);
      const response = await axios.get(`${url}/contests/organiser`, {
        withCredentials: true
      });
      this.setState({contests: response.data.contests});
      // console.log(response);
    }
    catch(err){
      const {history} = this.props;
      history.push("/login", {message: err.response.data});
    }
  }


  render(){
    // console.log(this.state.contests);
    return (
      <div className='addContest'>
        {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        <div className='heading my-4'><h3>Contests</h3></div>
        <table className='table  my-4'>
            <tbody>
            <tr>
                <th>Name</th>
                <th>Writers</th>
                <th>Start</th>
                <th>Length</th>
                <th>Registrations</th>
                <th>#</th>
            </tr>
            {this.state.contests.map(contest=>{
              const {name, number, authors, duration, registrations, startsAt, _id} = contest;
              return (
                <tr>
                  <td>
                    <Link to = {`/contest/${_id}`} >{name} #{number}</Link>
                  </td>
                  <td>
                    <div>
                      {authors.map(author=>{
                        return(
                          <Link className='badge text-bg-light' to={`/profile/${author.username}`}>{author.username}</Link>
                        )
                      })}
                    </div>
                  </td>
                  <td>
                    {String(new Date(new Date(startsAt).getTime() + (5.5 * 60 * 60 * 1000)))}
                  </td>
                  <td>
                    {duration}
                  </td>
                  <td>
                    {registrations.length}
                  </td>
                  <td>
                    <Link to={`/contest/${_id}`}>Edit</Link>
                  </td>
                </tr>
              );
            })}
            </tbody>
            {/* <tr>
                <td><a href="">Codeforces Round 870 (Div. 2)</a></td>
                <td><div><a href="">hartik</a><a href="">abhishek</a></div></td>
                <td>Jun/06/2023 20:05UTC+5.5</td>
                <td>120</td>
                <td>6700</td>
                <td><a href="">Edit</a></td>
            </tr> */}
        </table>
        <Link className="btn btn-outline-dark" to="/contest">Add contest</Link>
      </div>
    )
  }
}

export default withRouter(AddContest);
