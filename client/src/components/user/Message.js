import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api";

class Message extends React.Component{


  
  constructor(props){
      super(props);
      this.state = {
        message: this.props.location.state?.message,
        msg: ""
      }
    }

    handleChange = (evt)=>{
      this.setState({
        [evt.target.name] : evt.target.value
      })
      // console.log(this.state);
    }
  
    handleSubmit = async (evt) =>{
      // console.log("handlesubmit");
      const {history} = this.props;
      try{
        evt.preventDefault();
        // console.log(this.state);
        const response = await axios.post(`${url}/message/${this.props.match.params.username}`, {message: this.state.msg}, {
          withCredentials: true
        });
        // console.log(response);
        // document.cookie = `accessToken=${response.data.accessToken}`
        history.push(`/profile/${this.props.match.params.username}`, {message: response.data});
      }
      catch(err){
        history.push(`/message/${this.props.match.params.username}`, {message: err.response.data});
      }
    }
  
    componentDidMount(){
      // console.log(this.props);
      setTimeout(()=>{
        this.setState({message: ""});
      }, 5000);
    }
    
    render(){
    return (
      <div className='message mt-5 container'>
                {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        <h2>Message to</h2>
        <form onSubmit={this.handleSubmit} className='form my-4 row'>
          <div className='to col-md-2'>
            <div className='col-md-12'>
              <img className='col-md-7' src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAMFBMVEXFxcX////CwsLGxsb7+/vT09PJycn19fXq6urb29ve3t7w8PDOzs7n5+f5+fnt7e30nlkBAAAFHUlEQVR4nO2dC5qqMAyFMTwUBdz/bq+VYYrKKJCkOfXmXwHna5uTpA+KwnEcx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3Ecx3EcA2iO9cdIc5PUdO257y+BU39u66b4HplE3fk6VIcnqmNfl1+gksr6+iIucjl3WYukor7+re6Hoe1y1UhNO3zUd+fUFRmKpOa0Tt6dY5ubRCrOG/QFLk1WGmnt/JxzykcjdZ/jyxJDLlOV2l36AtcsJJb9boG3YcR3DuqODIE3ztYKPkDdmwRmpUToUaSaq++AvRgZMWbOpbQW8hdCAm8ZDugoikzREdCJ2okJPBx6azFLNOwoOgcxojJ98JkaTSJxMpklKrCAKhZGI0drTY/wU5lXoJYibannV9NYy4oozNEAkPHTjop+DTDxVGkIgYJNoyQQJtiIW+EMjGAjm649AjGIaqswcEFQKJ2QPlJbqytki6ZXAAZRJ52J2McaUowzAfs+uFzrYhnzaapphiPWdaJWShqxjqa6kTTQ205TVbsfMa6htL0iYOsXpJrQjHSmCkv1QGPtiHqlYcQ21Gj7fcDU8xOEUuNgSltPzexh+HqFlanCBHZ4OLhCV+gK/3OF6vWvucLv98MUOY2pwu/PS/+D2qJU7pYGbOvDFDW+bbON9p3o3oRxn0bfLgZTgSn6pSfrtr56qLHemtHPTK2319SzGvtjQ9qeb39WgS66Cm073nd0U1PzDdJCO3Gzn6TKpl9Zq7ujGWsQhlA3NwWIMwG9zM08Y/tBrR9VWeczv5CSQuuUNKIUTk23ZJ5RKfVhjnkXotfWIlgX2BSCDYbZR+QTcLhb3dKZDUY2M0d4KWItwhHRah/zsrOgKw4wycwjcgEVcgQDQo23CqSiWEJkFAfod2oE1uIFdA1OsCPqFXYNTjCfb8Ez+iX2x5sKLlVbhtqdDcar9ZevhnbZxoBUD35k23t0d304LYs1ELVbnfFaZ/REJJX9niP8Q19moZGo3m8XR/yBvOnjFfsXcI2c8ZuNo7WMP5HQh6yRGrlmFOJTnyTcT+zRlqPUBI2gTVWNUzUna1ERgecgF4GpNBQ38jGqxVLzQA1A31Rrhk6Yz9QEh/WND0GnuG9huhiTXJkxfAizTHLr6cbJKN6UCU6x/2DTRE1xEeEXi3O0ZUqBN4nJRzHhFB1JPlFTBZlI2kQ8zc3KJ1Le8DIRmFJiknuVS6RK4Ej/JtBfJErDSzOBiY4wJHX6Z1I4v1GUmdCPNirnLLeg3oJLcbX5PcpHNbRvOa1A956QmRPOUXVF+zkaUJynpkYR0bOMJH2nNej1pqyV/aKkz9jr5yj5vrXXz1F5SQLACiMapmierj2ikLyleKdlA/I/2oFxiglxx9B+mHwz0lf34IZQfhDRhlD6bhvgEAoPYooHkTczSIZTLC+cEExsoNKZiGBiY9cCfo/Y/SjIOBMQizWWTe73CMUasJx7jlD+DdKdWUKoY4PRYFtGpO0G1Lx4RaadgTtJhf4fiGqGIwKWCGuGIwKWqP+7IxYCzygjR9IAO5pC7Da9g70TBVpWRNgFBlgT8RV2WxHbKwJMv4BOaEaYaU2K16yZMN/qgV+G7IWIvwyZCxHeDQMsR8wg0DBDDXB5H2EV+hkEGmaoySHQsEJNFoGGFWrAq98JRhUMX1iMMMqLLEIpK5jCbd4vw9nSt/72lewXiN6jmdjfq8Hdknlk92ZwJnbIMMRM7JBhiFlUFoHd1UWaP1QKsPsHA5mkNB+Smn9JqV3wskatnQAAAABJRU5ErkJggg==" 
              alt="recipient image"></img></div>
              <Link className='col-md-12' to={`/profile/${this.props.match.params.username}`}>{this.props.match.params.username}</Link>
          </div>
          <div className='col-md-6'>
            <textarea onChange={this.handleChange} value={this.state.msg} id="msg" name="msg" rows="15" cols="80">
            </textarea>
            <ul className='conditions'>
                <li>Advertising, hiring, commercial offers, spam are prohibited.</li>
                <li>Rudeness, insults and intimidation are prohibited.</li>
                <li>Requests for solutions of future or current contests are prohibited.</li>
            </ul>
            <button className='col-md-2 btn btn-outline-dark' type="submit">Send</button>
            </div>
        </form>
      </div>
    )
  }
}

export default withRouter(Message);
