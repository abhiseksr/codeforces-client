import React from 'react';
import axios from "axios";
import Navbar from "../Navbar"
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api";

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


class Profile extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      message: this.props.location.state?.message,
      username: "",
      name: "",
      email: "",
      accountType: "",
      country: "",
      city: "",
      organisation: "",
      birthDate: "",
      followers: "",
      online: false ,
      friends: "",
      registeredAt: "",
      lastActive: "",
      liveUser: ""
    }
  }

  addFriend = async(evt) =>{
    const {history} = this.props;
    try{
      const response = await axios.get(`${url}/profile/${this.props.match.params.username}/addFriend`, {
        withCredentials: true
      })
      // console.log(response);
      history.push(`/profile/${this.props.match.params.username}`, {message: response.data});
    }
    catch(err){
      history.push('/login', {message: err.response.data});
    }
  }

  async componentDidMount(){
    try{
        // console.log(this.props);
        setTimeout(()=>{
            this.setState({message: ""});
        }, 5000);
        const response = await axios.get(`${url}/profile/${this.props.match.params.username}`, {
            withCredentials: true
        });
        this.setState({...response.data});
        // console.log(response);
        }
    catch(err){
        const {history} = this.props;
        history.push("/login", {message: err.response.data});
    }
    
}

  render(){
    // console.log(this.state);
    return (
      // <div><Navbar />
      <div className='profile mt-5'>
                {/* {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""} */}
        <div>
            <Link className='text-uppercase badge text-bg-light' to={`/profile/${this.state.username}`}>{this.state.username}</Link>
            <Link className='text-uppercase badge text-bg-light' to={`/submissions/${this.state.username}`}>Submissions</Link>
            <Link className='text-uppercase  badge text-bg-light' to={`/contests`}>Contests</Link>
        </div>
        <div className='information row g-2 my-3'>
            <div className='info col-md-6 bg-light p-4'>
                <div className='btn p-2 username fw-bold fs-5'>@{this.state.username}<span className='fw-light fs-6 mx-2 text-decoration-underline'>{this.state.accountType}</span></div>
                <div className='address my-2'>
                  <div className='location fst-italic'>{this.state.name?this.state.name:"Undefined"}, {this.state.city?this.state.city:"Undefined"}, {this.state.country?this.state.country:"Undefined"}</div>
                  <div className='college fst-italic'>From {this.state.organisation?this.state.organisation:"Undefined"}</div>
                </div>
                <span onClick={this.addFriend} className='my-2 text-primary text-decoration-underline' type="button">Add to friend</span>
                <div className='friends my-1'>
                  <i class="fa-solid fa-star me-2" style={{color: "#e6df1e"}}></i>
                  <span>Friend of: {this.state.followers} users</span>
                </div>
                {this.state.liveUser==this.state.username?(
                <div className='following my-1'>
                  <i class="me-2 fa-solid fa-star" style={{color: "#e6df1e"}}></i>
                  <Link to="/friends">My friends</Link>
                </div>
                ):(<div></div>)}
                {this.state.liveUser==this.state.username?(
                <div className='settings my-1'>
                  <i class="me-2 fa-solid fa-gear"></i>
                  <Link to="/settings">Change settings</Link>
                </div>
                ):(<div></div>)}
                <div className='email my-1'>
                  <i class="me-2 fa-regular fa-envelope-open"></i>
                  <span>{this.state.email}</span>
                </div>
                <div className='online my-1'>
                  <span>Last visit: {this.state.online?"online":getTimeAgo(this.state.lastActive)}</span>
                </div>
                <div className='registered my-1'>
                  <span>Registered {getTimeAgo(this.state.registeredAt)}</span>
                </div>
                <div className='comments my-1'>
                  <i class="me-2 fa-regular fa-comment"></i>
                  <a href="">Comments, </a>
                  {this.state.liveUser==this.state.username?(
                    <Link to='/talks'>view my talks</Link>
                ):(<div></div>)}
                </div>
                {this.state.liveUser!=this.state.username?(<div className='message my-1'>
                  <i class="me-2 fa-regular fa-message"></i>
                    <Link to={`/message/${this.state.username}`}>Send message</Link>
                </div>):(<div></div>)}
            </div>
            <div className='profileImage col-md-3 bg-light position-relative'>
                <img className='position-absolute end-0' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLGxsb7+/vT09PJycn19fXq6urb29ve3t7w8PDOzs7n5+f5+fnt7e30nlkBAAAFHUlEQVR4nO2dC5qqMAyFMTwUBdz/bq+VYYrKKJCkOfXmXwHna5uTpA+KwnEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcA2iO9cdIc5PUdO257y+BU39u66b4HplE3fk6VIcnqmNfl1+gksr6+iIucjl3WYukor7+re6Hoe1y1UhNO3zUd+fUFRmKpOa0Tt6dY5ubRCrOG/QFLk1WGmnt/JxzykcjdZ/jyxJDLlOV2l36AtcsJJb9boG3YcR3DuqODIE3ztYKPkDdmwRmpUToUaSaq++AvRgZMWbOpbQW8hdCAm8ZDugoikzREdCJ2okJPBx6azFLNOwoOgcxojJ98JkaTSJxMpklKrCAKhZGI0drTY/wU5lXoJYibannV9NYy4oozNEAkPHTjop+DTDxVGkIgYJNoyQQJtiIW+EMjGAjm649AjGIaqswcEFQKJ2QPlJbqytki6ZXAAZRJ52J2McaUowzAfs+uFzrYhnzaapphiPWdaJWShqxjqa6kTTQ205TVbsfMa6htL0iYOsXpJrQjHSmCkv1QGPtiHqlYcQ21Gj7fcDU8xOEUuNgSltPzexh+HqFlanCBHZ4OLhCV+gK/3OF6vWvucLv98MUOY2pwu/PS/+D2qJU7pYGbOvDFDW+bbON9p3o3oRxn0bfLgZTgSn6pSfrtr56qLHemtHPTK2319SzGvtjQ9qeb39WgS66Cm073nd0U1PzDdJCO3Gzn6TKpl9Zq7ujGWsQhlA3NwWIMwG9zM08Y/tBrR9VWeczv5CSQuuUNKIUTk23ZJ5RKfVhjnkXotfWIlgX2BSCDYbZR+QTcLhb3dKZDUY2M0d4KWItwhHRah/zsrOgKw4wycwjcgEVcgQDQo23CqSiWEJkFAfod2oE1uIFdA1OsCPqFXYNTjCfb8Ez+iX2x5sKLlVbhtqdDcar9ZevhnbZxoBUD35k23t0d304LYs1ELVbnfFaZ/REJJX9niP8Q19moZGo3m8XR/yBvOnjFfsXcI2c8ZuNo7WMP5HQh6yRGrlmFOJTnyTcT+zRlqPUBI2gTVWNUzUna1ERgecgF4GpNBQ38jGqxVLzQA1A31Rrhk6Yz9QEh/WND0GnuG9huhiTXJkxfAizTHLr6cbJKN6UCU6x/2DTRE1xEeEXi3O0ZUqBN4nJRzHhFB1JPlFTBZlI2kQ8zc3KJ1Le8DIRmFJiknuVS6RK4Ej/JtBfJErDSzOBiY4wJHX6Z1I4v1GUmdCPNirnLLeg3oJLcbX5PcpHNbRvOa1A956QmRPOUXVF+zkaUJynpkYR0bOMJH2nNej1pqyV/aKkz9jr5yj5vrXXz1F5SQLACiMapmierj2ikLyleKdlA/I/2oFxiglxx9B+mHwz0lf34IZQfhDRhlD6bhvgEAoPYooHkTczSIZTLC+cEExsoNKZiGBiY9cCfo/Y/SjIOBMQizWWTe73CMUasJx7jlD+DdKdWUKoY4PRYFtGpO0G1Lx4RaadgTtJhf4fiGqGIwKWCGuGIwKWqP+7IxYCzygjR9IAO5pC7Da9g70TBVpWRNgFBlgT8RV2WxHbKwJMv4BOaEaYaU2K16yZMN/qgV+G7IWIvwyZCxHeDQMsR8wg0DBDDXB5H2EV+hkEGmaoySHQsEJNFoGGFWrAq98JRhUMX1iMMMqLLEIpK5jCbd4vw9nSt/72lewXiN6jmdjfq8Hdknlk92ZwJnbIMMRM7JBhiFlUFoHd1UWaP1QKsPsHA5mkNB+Smn9JqV3wskatnQAAAABJRU5ErkJggg=="
                alt = "User image" />
            </div>
        </div>
      </div>
      // </div>
    )
  }
}

export default withRouter(Profile);
<div class="btn-group" role="group" aria-label="Basic outlined example">
  <button type="button" class="btn btn-outline-primary">Left</button>
  <button type="button" class="btn btn-outline-primary">Middle</button>
  <button type="button" class="btn btn-outline-primary">Right</button>
</div>