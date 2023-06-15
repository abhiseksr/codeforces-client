import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api"; 

class Submissions extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message,
      verdicts:  [],
      problems: []
    }
  }

  async componentDidMount(){
    try{
        setTimeout(()=>{
            this.setState({message: ""});
        }, 5000);
        const response = await axios.get(`${url}/submissions/${this.props.match.params.username}`, {
            withCredentials: true
        });
        // console.log(response);
        this.setState({verdicts: response.data.verdicts, problems: response.data.problems});
        }
    catch(err){
        const {history} = this.props;
        history.push("/login", {message: err.response.data});
    }
    
}

  render(){
    let submissionSize = this.state.problems.length;
    return (
      <div className='Submissions'>
        <h3 className='heading my-4'>{this.props.match.params.username} submissions</h3>
        <table className='table table-striped'>
            <tr>
                <th>#</th>
                <th>When</th>
                <th>Who</th>
                <th>Problem</th>
                <th>Lang</th>
                <th>Verdict</th>
                <th>Time</th>
                <th>Memory</th>
            </tr>
          <tbody>
            {this.state.problems.map((problem, idx)=>{
              let verdict = this.state.verdicts[idx];
              return (
                <tr>
                  <td>{submissionSize-idx}</td>
                  <td>{verdict.created_at}</td>
                  <td><Link to={`/profile/${this.props.match.params.username}`}>{this.props.match.params.username}</Link></td>
                  <td><Link to={`/problem/${problem._id}`}>{`${problem.code} - ${problem.name}`}</Link></td>
                  <td>{verdict.language.name}</td>
                  <td className={verdict.status.id==3?'text-success fw-bold text':'text-dark text'}>{verdict.status.description}</td>
                  <td>{verdict.time*1000} ms</td>
                  <td>{verdict.memory} KB</td>
                </tr>
              )
            })}
            {/* <tr>
                <td><a href="">206555688</a></td>
                <td>May/19/2023 23:20UTC+5.5</td>
                <td><a href="">abhishekJr</a></td>
                <td><a href="">G - Ksyusha and Chinchilla</a></td>
                <td>GNU C++20 (64)</td>
                <td>Accepted</td>
                <td>187 ms</td>
                <td>19000 KB</td>
            </tr> */}
            </tbody>
        </table>
      </div>
    )
  }
}

export default withRouter(Submissions);
