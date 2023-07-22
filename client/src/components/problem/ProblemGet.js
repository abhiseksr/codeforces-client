import React from 'react';
import axios from "axios";
import Editor from "@monaco-editor/react";
import {withRouter, Link} from "react-router-dom";
import Loader from "../Loader";

const url = "http://localhost:4000/api";

const dictionary = {
    "javascript" : 93,
    "cpp": 53,
    "java": 91,
    "python": 92
};

class ProblemGet extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          message: this.props.location.state?.message ,
          callingAPI: true,
          name: "",
          code: "",
          timeLimit: "",
          spaceLimit: "",
          difficulty: "",
          scoreDecreaseRate: "",
          scores: "",
          tags: [],
          legend: "",
          inputFormat: "",
          outputFormat: "",
          sampleInput: "",
          sampleOutput: "",
          notes: "",
          language: "cpp",
          solution: "",
          username: "",
          contestID: ""
        }
      }
    
      handleChange = (value)=>{
        this.setState({
          solution: value
        })
        // console.log(this.state);
      }

      handleSelect = (evt)=>{
        this.setState({
            language: evt.target.value
        })
      }
    
    
      handleSubmit = async (evt) =>{
          evt.preventDefault();
        // console.log("handlesubmit");
        this.setState({callingAPI: true})
        const {history} = this.props;
        try{
          // console.log(this.state);
          const response = await axios.post(`${url}/submission/${this.props.match.params.problemID}`, {language: dictionary[this.state.language], solution: this.state.solution}, {
            withCredentials: true
          });
          // console.log(response);
          // document.cookie = `accessToken=${response.data.accessToken}`
          history.push(`/submissions/${this.state.username}`, {message: response.data});
        }
        catch(err){
          history.push(`/problem/${this.props.match.params.problemID}`, {message: err.response.data});
        }
        this.setState({callingAPI: false});
      }
    
     async componentDidMount(){
        // console.log(this.props);
        const {history} = this.props;
        setTimeout(()=>{
          this.setState({message: ""});
        }, 5000);
        try{
            const response = await axios.get(`${url}/problem/${this.props.match.params.problemID}`, {
                withCredentials: true
            })
            const tempObj = {};
            // console.log(response);
            for (let key in this.state){
                tempObj[key] = response.data.problem[key]; 
            }
            tempObj.solution = "";
            tempObj.language = "cpp";
            tempObj.username = response.data.username;
            // console.log(tempObj);
            this.setState({...tempObj, callingAPI: false});
        }
        catch(err){
            history.push('/login' ,{message: err.response.data});
        }
      }

  render(){
    // console.log(this.state.language);
    return (
    <div>
                {this.state.message?(<div className='alert alert-primary'>{JSON.stringify(this.state.message)}</div>):""}
        <Link className='badge text-bg-light mt-4 mx-3 px-4' to={`/contest/${this.state.contestID}/announcement/get`}>contest</Link>
        <div className='about my-4 d-flex flex-column justify-content-center align-items-center'>
            <div className='fs-4 my-3 text'>{`${this.state.code}. ${this.state.name}`}</div>
            <div>time limit: {`${this.state.timeLimit} ms`}</div>
            <div>space limit: {`${this.state.spaceLimit} megabytes`}</div>
            <div>Maximum scores: {`${this.state.scores}`}</div>
            <div>input: standard input</div>
            <div>output: standard output</div>
        </div>
        <div className='description my-4'>
            <div className='legend my-2'>{this.state.legend}</div>
            <div className='inputFormat my-2'><b>Input:</b><div>{this.state.inputFormat}</div></div>
            <div className='outputFormat my-2'><b>Output:</b><div>{this.state.outputFormat}</div></div>
            <div className='example my-4'>
                <table className='table table-striped bg-light'>
                    <thead>
                        <th className='px-3 py-1'>input:</th>
                    </thead>
                    <tbody>
                        <td className='px-3 py-1'>
                            {this.state.sampleInput}
                        </td>
                    </tbody>
                </table>
                <table className='table table-striped bg-light'>
                    <thead>
                        <th className='px-3 py-1'>output:</th>
                    </thead>
                    <tbody>
                        <td className='px-3 py-1'>
                            {this.state.sampleOutput}
                        </td>
                    </tbody>
                </table>
            </div>
            <div className='notes'><b>Notes:</b><div>{this.state.notes}</div></div>
        </div>
        <form className='editor bg-light px-3 py-1' onSubmit={this.handleSubmit}>
            <div className='d-flex justify-content-between my-4'>
            <div>Tags: {
                this.state.tags.map(tag=>{
                    return(
                        <span className='badge text-bg-light'>{tag}</span>
                    )
                })
            }</div>
            <div>
            <label htmlFor='language' className='mx-3' >Choose programming language</label>
            <select onChange={this.handleSelect} name="language" id="language">
                <option value="cpp">C++ (GCC 8.3.0)</option>
                <option  value="javascript">JavaScript (Node.js 18.15.0)</option>
                <option  value="python">Python (3.11.2)</option>
                <option  value="java">Java (JDK 17.0.6)</option>
            </select>
            </div>
            </div>
            <Editor
                height="65vh"
                // width={`100%`}
                language={this.state.language}
                value={this.state.solution}
                theme={"vs-dark"}
                name="solution"
                onChange={this.handleChange}
            />
            {this.state.callingAPI?(<Loader />):(<button type='submit' className='btn btn-outline-dark my-3'>Submit code</button>)}
            
        </form>
      </div>
    )
  }
}

export default withRouter(ProblemGet);
