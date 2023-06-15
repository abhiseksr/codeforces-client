import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api"; 

class Standings extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message,
      standings: []
    }
  }

  async componentDidMount(){
    try{
        setTimeout(()=>{
            this.setState({message: ""});
        }, 5000);
        const response = await axios.get(`${url}/contest/${this.props.match.params.contestID}/standings`, {
            withCredentials: true
        });
        // console.log(response);
        this.setState({standings: response.data.standings});
        }
    catch(err){
        const {history} = this.props;
        history.push("/login", {message: err.response.data});
    }
    
}

  render(){
    // console.log(this.state.problems);
    return (
      <div className='standings'>
                {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        {/* <h2 className='my-4 heading'>{`${this.state.contest.name} #${this.state.contest.number}`}</h2> */}
        <h3 className='my-4'>Standings</h3>
        <table className='table table-striped'>
            <thead>
                <th>#</th>
                <th>Who</th>
                <th>Points</th>
                <th>Accepted Count</th>
            </thead>
            <tbody>
                {this.state.standings.map((standing,idx)=>{
                    return(
                        <tr>
                            <td>{idx+1}</td>
                            <td><Link to={`/profile/${standing.username}`}>{standing.username}</Link></td>
                            <td>{Math.floor(standing.points)}</td>
                            <td>{standing.acceptedCount}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
      </div>
    )
  }
}

export default withRouter(Standings);
