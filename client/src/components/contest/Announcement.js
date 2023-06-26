import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";
import CountdownTimer from '../CountdownTimer';


function getTimeAgo(timestamp) {
    // console.log(timestamp);
    let currentTime = new Date().getTime();
    let activityTime = new Date(timestamp).getTime();
    let timeDifference = currentTime - activityTime;
    
    let seconds = Math.floor(timeDifference / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);
    let days = Math.floor(hours / 24);
    let months = Math.floor( days / 30);
    let years = Math.floor(months / 12);
  
    if (years > 0) {
      return years + (years === 1 ? " year ago" : " years ago");
    }
    else if (months > 0) {
      return months + (months === 1 ? " month ago" : " months ago");
    }
    else if (days > 0) {
      return days + (days === 1 ? " day ago" : " days ago");
    } 
    else if (hours > 0) {
      return hours + (hours === 1 ? " hour ago" : " hours ago");
    } 
    else if (minutes > 0) {
      return minutes + (minutes === 1 ? " minute ago" : " minutes ago");
    } 
    else {
      return seconds + (seconds === 1 ? " second ago" : " seconds ago");
    }
  }

const url = "http://localhost:4000/api"; 

class Announcement extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message,
      contest: "",
      usernames: "",
      fetched: false
    }
  }

  upvote = async(evt)=>{
    // console.log("inside upvote");
      try{
        const {history} = this.props;
        const response = await axios.get(`${url}/contest/${this.state.contest._id}/comment/${evt.target.getAttribute("name")}/upvote`, {
            withCredentials: true
        })
        history.push(`/contest/${this.state.contest._id}/announcement/get`, {message: response.data});
    }
    catch(err){
        const {history} = this.props;
        // console.log(err);
        history.push("/login", {message: err.response.data});
    }
  }

  upvoteContest = async(evt)=>{
    const {history} = this.props;
      try{
        const response = await axios.get(`${url}/contest/${evt.target.getAttribute("name")}/upvote`, {
            withCredentials: true
        })
        // console.log(response);
        // this.setState({key: uuid()});
        history.push(`/contest/${this.state.contest._id}/announcement/get`, {message: response.data});
    }
    catch(err){
        // const history = this.props;
        // console.log(err);
        history.push("/login", {message: err.response.data});
    }
  }

  register = async(evt)=>{
    // console.log("inside upvote");
      const {history} = this.props;
      try{
        const response = await axios.get(`${url}/contest/${this.state.contest._id}/register`, {
            withCredentials: true
        })
        history.push(`/contest/${this.state.contest._id}/announcement/get`, {message: response.data});
    }
    catch(err){
        history.push("/login", {message: err.response.data});
    }
  }

  async componentDidMount(){
    try{
        // console.log(this.props);
        setTimeout(()=>{
            this.setState({message: ""});
        }, 5000);
        const response = await axios.get(`${url}/contest/${this.props.match.params.contestID}/announcement`, {
            withCredentials: true
        });
        // console.log("hello");
        // console.log(response);
        this.setState({contest: response.data.contest, fetched: true, usernames: response.data.usernames});
        }
    catch(err){
        const {history} = this.props;
        history.push("/login", {message: err.response.data});
    }
    
}

  render(){
    // if (this.state.problems.length)
    // console.log(this.state);
    // console.log(this.state.problems[0]._id);
    let timestmp = 0;
    if (new Date(this.state.contest.startsAt).getTime()>Date.now()) timestmp = new Date(this.state.contest.startsAt).getTime()-Date.now();
    else timestmp = new Date(this.state.contest.endsAt).getTime() - Date.now();
    timestmp = Math.floor(timestmp/1000);
    // console.log(Date.now());
    // console.log(timestmp);
    let hr = Math.floor(timestmp/3600);
    let mn = Math.floor((timestmp%3600)/60);
    let sc = timestmp%60;
    let commsize = this.state.contest.comments && this.state.contest.comments.length;
    return (
      <div className='announcement'>
                {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        <h2 className='my-4 heading mx-2'>Announcement</h2>
        {this.state.fetched?(
        <div className='m-2 bg-light'>
            <div className='border-bottom text text-dark d-flex justify-content-between p-3'>
              <span className='d-flex flex-column align-items-start'>
                <Link to={`/contest/${this.state.contest._id}/announcement/get`}>{`${this.state.contest.name} #${this.state.contest.number}`}</Link>
                {new Date(this.state.contest.endsAt).getTime()<Date.now()
                ?
                <div></div>
                :
                <div className='badge text-bg-light'>
                  <span>{new Date(this.state.contest.startsAt).getTime()<=Date.now()?"Ends in":"Starts in"} </span>
                  {hr<24?(<CountdownTimer hours={hr} minutes={mn} seconds={sc} />):(<div>{Math.floor(hr/24)} days</div>)}
                  </div>}
                </span>
                <span>{String(new Date(new Date(this.state.contest.startsAt).getTime() + (5.5 * 60 * 60 * 1000)))}<div>
                {new Date(this.state.contest.startsAt)>Date.now()?(<span onClick={this.register} className='ms-4 badge btn text-bg-light text-decoration-underline'>Register</span>):(<span></span>)}
                {new Date(this.state.contest.startsAt)<Date.now()?(<Link to={`/contest/${this.state.contest._id}/standings`} className='ms-4 badge btn text-bg-light text-decoration-underline'>Standings</Link>):(<span></span>)}
                <Link to={`/contest/${this.state.contest._id}/enter`} className='badge text-bg-light btn text-decoration-underline'>Enter</Link></div></span>
            </div>
            <div className='border-bottom  p-3'>{this.state.contest.announcement}</div>
            <div className='border-bottom text text-dark d-flex justify-content-between p-3'>
                <span name={this.state.contest._id} className='btn' onClick={this.upvoteContest}>
                    <i name={this.state.contest._id} class="px-2 fa-regular fa-thumbs-up"></i>{this.state.contest.upvotes.length}
                    </span>
                    <div>
                    <Link to={`/contest/${this.state.contest._id}/comment`}>Comment</Link>
                    <Link to={`/contest/${this.state.contest._id}/announcement/get`} className='btn'>
                        <i class="px-2 fa-solid fa-user"></i>
                        {this.state.contest.comments.length}</Link></div>
                        </div>
        </div>):(<div></div>)}
        {this.state.fetched?(
        <table className='table'>
            <tbody>
            {this.state.contest.comments.map((comm,idx)=>{
              idx = commsize-idx-1;
              let comment = this.state.contest.comments[idx];
              return (
                <tr className='row px-4'>
                  <td className='col-md-3'>
                    <div className='col-md-12'>
                <img className='col-md-3' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLGxsb7+/vT09PJycn19fXq6urb29ve3t7w8PDOzs7n5+f5+fnt7e30nlkBAAAFHUlEQVR4nO2dC5qqMAyFMTwUBdz/bq+VYYrKKJCkOfXmXwHna5uTpA+KwnEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcA2iO9cdIc5PUdO257y+BU39u66b4HplE3fk6VIcnqmNfl1+gksr6+iIucjl3WYukor7+re6Hoe1y1UhNO3zUd+fUFRmKpOa0Tt6dY5ubRCrOG/QFLk1WGmnt/JxzykcjdZ/jyxJDLlOV2l36AtcsJJb9boG3YcR3DuqODIE3ztYKPkDdmwRmpUToUaSaq++AvRgZMWbOpbQW8hdCAm8ZDugoikzREdCJ2okJPBx6azFLNOwoOgcxojJ98JkaTSJxMpklKrCAKhZGI0drTY/wU5lXoJYibannV9NYy4oozNEAkPHTjop+DTDxVGkIgYJNoyQQJtiIW+EMjGAjm649AjGIaqswcEFQKJ2QPlJbqytki6ZXAAZRJ52J2McaUowzAfs+uFzrYhnzaapphiPWdaJWShqxjqa6kTTQ205TVbsfMa6htL0iYOsXpJrQjHSmCkv1QGPtiHqlYcQ21Gj7fcDU8xOEUuNgSltPzexh+HqFlanCBHZ4OLhCV+gK/3OF6vWvucLv98MUOY2pwu/PS/+D2qJU7pYGbOvDFDW+bbON9p3o3oRxn0bfLgZTgSn6pSfrtr56qLHemtHPTK2319SzGvtjQ9qeb39WgS66Cm073nd0U1PzDdJCO3Gzn6TKpl9Zq7ujGWsQhlA3NwWIMwG9zM08Y/tBrR9VWeczv5CSQuuUNKIUTk23ZJ5RKfVhjnkXotfWIlgX2BSCDYbZR+QTcLhb3dKZDUY2M0d4KWItwhHRah/zsrOgKw4wycwjcgEVcgQDQo23CqSiWEJkFAfod2oE1uIFdA1OsCPqFXYNTjCfb8Ez+iX2x5sKLlVbhtqdDcar9ZevhnbZxoBUD35k23t0d304LYs1ELVbnfFaZ/REJJX9niP8Q19moZGo3m8XR/yBvOnjFfsXcI2c8ZuNo7WMP5HQh6yRGrlmFOJTnyTcT+zRlqPUBI2gTVWNUzUna1ERgecgF4GpNBQ38jGqxVLzQA1A31Rrhk6Yz9QEh/WND0GnuG9huhiTXJkxfAizTHLr6cbJKN6UCU6x/2DTRE1xEeEXi3O0ZUqBN4nJRzHhFB1JPlFTBZlI2kQ8zc3KJ1Le8DIRmFJiknuVS6RK4Ej/JtBfJErDSzOBiY4wJHX6Z1I4v1GUmdCPNirnLLeg3oJLcbX5PcpHNbRvOa1A956QmRPOUXVF+zkaUJynpkYR0bOMJH2nNej1pqyV/aKkz9jr5yj5vrXXz1F5SQLACiMapmierj2ikLyleKdlA/I/2oFxiglxx9B+mHwz0lf34IZQfhDRhlD6bhvgEAoPYooHkTczSIZTLC+cEExsoNKZiGBiY9cCfo/Y/SjIOBMQizWWTe73CMUasJx7jlD+DdKdWUKoY4PRYFtGpO0G1Lx4RaadgTtJhf4fiGqGIwKWCGuGIwKWqP+7IxYCzygjR9IAO5pC7Da9g70TBVpWRNgFBlgT8RV2WxHbKwJMv4BOaEaYaU2K16yZMN/qgV+G7IWIvwyZCxHeDQMsR8wg0DBDDXB5H2EV+hkEGmaoySHQsEJNFoGGFWrAq98JRhUMX1iMMMqLLEIpK5jCbd4vw9nSt/72lewXiN6jmdjfq8Hdknlk92ZwJnbIMMRM7JBhiFlUFoHd1UWaP1QKsPsHA5mkNB+Smn9JqV3wskatnQAAAABJRU5ErkJggg=="
                    alt="author image"></img></div>
                    <Link className='col-md-2' to={`/profile/${this.state.usernames[idx]}`}>{this.state.usernames[idx]}</Link>
                </td>
                <td className='col-md-5'>{comment.comment}</td>
                <td className='col-md-2'>{getTimeAgo(comment.time)}</td>
                <td onClick={this.upvote} name={comment._id} className='btn col-md-2'><span name={comment._id}>{comment.upvotes.length}</span><i name={comment._id} class="p-2 fa-regular fa-thumbs-up"></i></td>
                </tr>
              )
            })}</tbody>
        </table>):(<div></div>)}
      </div>
    )
  }
}

export default withRouter(Announcement);
