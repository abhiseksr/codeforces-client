import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api";


class Friends extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      following: []
    }
  }

  async componentDidMount(){
    try{
        // console.log(this.props);
        setTimeout(()=>{
            this.setState({message: ""});
        }, 5000);
        const response = await axios.get(`${url}/friends`, {
            withCredentials: true
        });
        this.setState({following: response.data.following});
        // console.log(response);
        }
    catch(err){
        const {history} = this.props;
        history.push("/login", {message: err.response.data});
    }
    
}

  render(){
    return (
      <div className='friends'>
        <table>
            <thead>
              <tr>
                  <th colSpan={3}>My friends</th>
              </tr>
              <tr>
                  <th></th>
                  <th>Who</th>
                  <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.following.map((user,index)=>{
                return (
                  <tr>
                    <td>{index+1}</td>
                    <td><Link to={`profile/${user.username}`}>{user.username}</Link></td>
                    <td><i class="fa-solid fa-star" style={{color: "#e6df1e"}}></i></td>
                  </tr>
                )
              })}
              {/* <tr>
                  <td>1</td>
                  <td><a href="">tourist</a></td>
                  <td><i class="fa-solid fa-star" style={{color: "#e6df1e"}}></i></td>
              </tr> */}
            </tbody>
        </table>
      </div>
    )
  }
}

export default withRouter(Friends);
