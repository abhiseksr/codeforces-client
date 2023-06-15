import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api";

class AddProblem extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message ,
      contest: "",
      problems: []
    }
  }


  async componentDidMount(){
    try{
      // console.log(this.props);
      setTimeout(()=>{
        this.setState({message: ""});
      }, 5000);
      const response = await axios.get(`${url}/contest/${this.props.match.params.contestID}`, {
        withCredentials: true
      });
      this.setState({contest: response.data.contest, problems: response.data.contest.problems});
      // console.log(response);
    }
    catch(err){
      const {history} = this.props;
      history.push("/login", {message: err.response.data});
    }
  }

  render(){
    // console.log("add problem");
    const {name="", number="", authors=[], startsAt="", duration="", registrations="", _id=""} = this.state.contest;
    return (
      <div className='addProblem'>
        {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        <table className="table">
            <tr>
                <td colSpan={5}><h3>Contest</h3></td>
            </tr>
            <tbody>
            <tr>
                <th>Name</th>
                <th>Writers</th>
                <th>Start</th>
                <th>Length</th>
                <th>Registrations</th>
            </tr>
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
              </tr>
              </tbody>
            {/* <tr>
                <td><Link to="">Codeforces Round 870 (Div. 2)</Link></td>
                <td><div><a href="">hartik</a><a href="">abhishek</a></div></td>
                <td>Jun/06/2023 20:05UTC+5.5</td>
                <td>120</td>
                <td>6700</td>
            </tr> */}
        </table>
        <div>
          <Link className='m-2 btn btn-outline-dark' to="/contests/organiser">All contests</Link>
          <Link className='m-2 btn btn-outline-dark' to={`/contest/${this.state.contest._id}/edit`}>Edit contest</Link>
          <Link className='m-2 btn btn-outline-dark' to={`/contest/${this.props.match.params.contestID}/announcement`}>Add announcement</Link>
          <Link className='m-2 btn btn-outline-dark' to={`/contest/${this.props.match.params.contestID}/editorial`}>Add editorial</Link>
          </div>
        <table className='table my-4 table-striped'>
            <tr>
                <td colSpan={8}><h3>Problems</h3></td>
            </tr>
            <tbody>
            <tr>
                <th>Code</th>
                <th>Name</th>
                <th>Time limit</th>
                <th>Space limit</th>
                <th>Score decrease rate</th>
                <th>Maximum scores</th>
                <th>Difficulty</th>
                <th>#</th>
            </tr>
            {this.state.problems.map(problem=>{
              const {code, name, timeLimit, spaceLimit, scores, difficulty, scoreDecreaseRate, _id} = problem;
              return (
                <tr>
                  <td>
                    {code}
                  </td>
                  <td>
                    <div>
                      {name}
                    </div>
                  </td>
                  <td>
                    {timeLimit}
                  </td>
                  <td>
                    {spaceLimit}
                  </td>
                  <td>
                    {scoreDecreaseRate}
                  </td>
                  <td>
                    {scores}
                  </td>
                  <td>
                    {difficulty}
                  </td>
                  <td>
                    <Link to={`/problem/${_id}/edit`}>Edit</Link>
                  </td>
                </tr>
              );
            })}
            </tbody>
            {/* <tr>
                <td>2A</td>
                <td><a href="">Codeforces Round 870 (Div. 2)</a></td>
                <td>1000</td>
                <td>256</td>
                <td>4</td>
                <td>500</td>
                <td>800</td>
                <td><a href="">Edit</a></td>
            </tr> */}
        </table>
        <Link className="btn btn-outline-dark" to={`/contest/${_id}/problem`}>Add problem</Link>
      </div>
    )
  }
}

export default withRouter(AddProblem);
