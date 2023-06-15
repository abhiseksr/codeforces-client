import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api"; 

class Arena extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message,
      problems: [],
      contest: []
    }
  }

  async componentDidMount(){
    try{
        setTimeout(()=>{
            this.setState({message: ""});
        }, 5000);
        const response = await axios.get(`${url}/contest/${this.props.match.params.contestID}/enter`, {
            withCredentials: true
        });
        // console.log(response);
        this.setState({contest: response.data.contest, problems: response.data.problems});
        }
    catch(err){
        const {history} = this.props;
        history.push("/login", {message: err.response.data});
    }
    
}

  render(){
    // console.log(this.state.problems);
    return (
      <div className='arena'>
                {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        <h2 className='my-4 heading'>{`${this.state.contest.name} #${this.state.contest.number}`}</h2>
        <table className='table'>
            <tbody>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Submissions</th>
            </tr>
            {this.state.problems.map(problem=>{
              return (
              <tr>
                <td><a href="">#{`${this.state.contest.number}${problem.code}`}</a></td>
                <td><Link to={`/problem/${problem._id}`}>{problem.name}</Link></td>
                <td>{problem.submissions}</td>
              </tr>)
            })}</tbody>
        </table>
      </div>
    )
  }
}

export default withRouter(Arena);
