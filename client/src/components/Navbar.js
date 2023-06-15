import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api";

class Navbar extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          message: this.props.location.state?.message,
          accountType: "",
          liveUser: "",
          search: "",
          unseenNotifications: 0,
        }
      }

      handleChange = (evt)=>{
        this.setState({
          [evt.target.name] : evt.target.value
        })
        // console.log(this.state);
      }

      handleTalks = (evt)=>{
        const {history} = this.props;
        try{
            history.push('/talks');
        }
        catch(err){
            history.push('/login', {message: err.response.data});
        }
      }

      handleLogout = async(evt)=>{
        const {history} = this.props;
        try{
            const response = await axios.get(`${url}/logout`,{
                withCredentials: true
            })
            document.cookie = `accessToken=`;
            history.push('/login', {message: response.data});
        }
        catch(err){
            history.push('/login', {message: err.response.data});
        }
      }

      handleSubmit = async (evt) =>{
        // console.log("handlesubmit");
        const {history} = this.props;
        try{
          evt.preventDefault();
          // console.log(this.state);
          // document.cookie = `accessToken=${response.data.accessToken}`
          const search = this.state.search;
          this.setState({search: ""});
          history.push(`/profile/${search}`);
        }
        catch(err){
            history.push(`/profile/${this.state.liveUser}`);
        }
      }
    
      async componentDidMount(){
        try{
            if (["/login", "/register", "/passwordRecovery"].includes(this.props.location.pathname) || this.props.location.pathname.includes("/updatePassword")) return;
            // console.log("golgappa");
            setTimeout(()=>{
                this.setState({message: ""});
            }, 5000);
            const response = await axios.get(`${url}/profile/liveUser`, {
                withCredentials: true
            });
            this.setState({liveUser: response.data.liveUser, accountType: response.data.accountType, unseenNotifications: response.data.unseenNotifications});
            // console.log(response);
            }
        catch(err){
            const {history} = this.props;
            history.push("/login", {message: err.response.data});
        }
        
    }  

  render(){
    // console.log(this.state);
    let flag = ["/login", "/register", "/passwordRecovery"].includes(this.props.location.pathname);
    flag = flag || this.props.location.pathname.includes("/updatePassword");
    return (<div>{flag?(<></>):(<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <Link class="navbar-brand" to="/">Home</Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <Link class="nav-link" aria-current="page" to="/problems">PROBLEMSET</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/allContests">CONTESTS</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/settings">SETTINGS</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/favourites">FAVOURITES</Link>
          </li>
          {this.state.accountType=="organiser"?
            (<li class="nav-item">
            <Link class="nav-link" to="/contests/organiser">HOST CONTEST</Link>
          </li>):(<></>)
            }
        </ul>
        <form class="d-flex" role="search" onSubmit={this.handleSubmit}>
          <input onChange={this.handleChange} class="form-control me-2" style={{width: "180px"}} value={this.state.search} name="search" type="search" placeholder="Search username" aria-label="Search"></input>
        </form>
        <div className='mx-3'>
        <span onClick={this.handleTalks} type="button" to="/talks" class="btn btn-light position-relative">
        <i class="fa-regular fa-bell fs-4"></i> 
    <span class="position-relative top-0 start-95 translate-middle badge rounded-pill bg-danger">
      {this.state.unseenNotifications}
      <span  class="visually-hidden">unread messages</span>
    </span>
  </span> | 
          <Link to={`/profile/${this.state.liveUser}`} className='fs-6 mx-1 btn btn-light text-decoration-underline'> {this.state.liveUser}</Link>
          <button onClick={this.handleLogout} className='fs-6  btn btn-light text-decoration-underline'> Logout</button>
        </div>
      </div>
    </div>
  </nav>)}</div>
    )
  }
}

export default withRouter(Navbar);
