import React from 'react';
import axios from "axios";
import {withRouter, Link} from "react-router-dom";

const url = "http://localhost:4000/api";

const possibleTags = ['greedy', 'dp', 'trees', 'graphs', 'number theory',
'maths', 'brute force', 'implementation', 'backtracking', 'dsu',
'data structures', 'binary search', 'combinatorics', 'sortings',
'strings', 'two pointers', 'bitmasks', 'probabilities']

class ProblemPut extends React.Component{

    constructor(props){
        super(props);
        this.state = {
          message: this.props.location.state?.message ,
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
          notes: "",
          language: "53",
          solution: ""
        }
      }
    
      handleChange = (evt)=>{
        this.setState({
          [evt.target.name] : evt.target.value
        })
        // console.log(this.state);
      }
    
      addTag = (evt) =>{
        let tags = this.state.tags;
        // console.log(evt.target);
        this.setState({
          tags: [...tags, evt.target.name],
        })
        // console.log(this.state);
      }
    
      handleSubmit = async (evt) =>{
        // console.log("handlesubmit");
        const {history} = this.props;
        try{
          evt.preventDefault();
          // console.log(this.state);
          const response = await axios.put(`${url}/problem/${this.props.match.params.problemID}`, {...this.state, solution:{language: this.state.language, content: this.state.solution}}, {
            withCredentials: true
          });
          // console.log(response);
          // document.cookie = `accessToken=${response.data.accessToken}`
          history.push(`/contests/organiser`, {message: response.data});
        }
        catch(err){
          history.push(`/contest/${this.props.match.params.problemID}`, {message: err.response.data});
        }
      }
    
    async componentDidMount(){
        try{
            // console.log(this.props);
            setTimeout(()=>{
                this.setState({message: ""});
            }, 5000);
            const response = await axios.get(`${url}/problem/${this.props.match.params.problemID}/edit`, {
                withCredentials: true
            });
            const tempObj = {};
            for (let key in this.state){
                tempObj[key] = response.data[key]; 
            }
            tempObj.solution = response.data.solution.content;
            tempObj.language = response.data.solution.language;
            tempObj.tags = [];
            this.setState({...tempObj});
            // console.log(response);
            }
        catch(err){
            const {history} = this.props;
            history.push("/login", {message: err.response.data});
        }
        
    }

  render(){
    return (
      <div className='problemPutt my-4'>
        {this.state.message?(<div className='alert alert-primary'>{this.state.message}</div>):""}
        <h2>Edit problem</h2>
        <form className='my-4 form row container-xxs' onSubmit={this.handleSubmit}>
            <div className='name my-1'>
                <label className='col-md-2' htmlFor='name'>Name</label>
                <input id="name" className='col-md-4' onChange={this.handleChange} value={this.state.name} name="name"></input>
            </div>
            <div className='code my-1'>
                <label htmlFor='code' className='col-md-2'>Code</label>
                <input id="code" onChange={this.handleChange} className='col-md-2' value={this.state.code} name="code"></input>
            </div>
            <div className='timeLimit my-1'>
                <label className='col-md-2' htmlFor='timeLimit'>Time limit</label>
                <input className='col-md-2' id="timeLimit" onChange={this.handleChange} value={this.state.timeLimit} name="timeLimit"></input>
            </div>
            <div className='spaceLimit my-1'>
                <label className='col-md-2' htmlFor='spaceLimit'>Space limit</label>
                <input className='col-md-2' id="spaceLimit" onChange={this.handleChange} value={this.state.spaceLimit} name="spaceLimit"></input>
            </div>
            <div className='scoreDecreaseRate my-1'>
                <label className='col-md-2' htmlFor='scoreDecreaseRate'>Score Decrease Rate</label>
                <input className='col-md-2' id="scoreDecreaseRate" onChange={this.handleChange} value={this.state.scoreDecreaseRate} name="scoreDecreaseRate"></input>
            </div>
            <div className='difficulty my-1'>
                <label className='col-md-2' htmlFor='difficulty'>Difficulty</label>
                <input className='col-md-2' id="difficulty" onChange={this.handleChange} value={this.state.difficulty} name="difficulty"></input>
            </div>
            <div className='scores my-1'>
                <label className='col-md-2' htmlFor='scores'>Maximum scores</label>
                <input id="scores" onChange={this.handleChange} value={this.state.scores} name="scores"></input>
            </div>
            <div  className='legend my-1'>
                <label className='col-md-8' htmlFor='legend'>Legend</label>
                <textarea className='col-md-8' id="legend" onChange={this.handleChange} value={this.state.legend} name="legend" rows={10} cols={100}></textarea>
            </div>
            <div className='inputFormat my-1'>
                <label className='col-md-8' htmlFor='inputFormat'>Input format</label>
                <textarea className='col-md-8' id="inputFormat" onChange={this.handleChange} value={this.state.inputFormat} name="inputFormat" rows={10} cols={100}></textarea>
            </div>
            <div className='outputFormat my-1'>
                <label className='col-md-8' htmlFor='outputFormat'>Output format</label>
                <textarea className='col-md-8'  id="outputFormat" onChange={this.handleChange} value={this.state.outputFormat} name="outputFormat" rows={10} cols={100}></textarea>
            </div>
            <div className='notes my-1'>
                <label className='col-md-8' htmlFor='notes'>Notes</label>
                <textarea className='col-md-8'  id="notes" onChange={this.handleChange} value={this.state.notes} name="notes" rows={10} cols={100}></textarea>
            </div>     
            <div className='language my-1'>
                <label className='col-md-2' htmlFor='language'>Solution language</label>
                <select className='col-md-3' id="language" onChange={this.handleChange} name="language">
                  <option selected value={53}>C++ (GCC 8.3.0)</option>
                  <option  value={50}>C (GCC 9.2.0)</option>
                  <option  value={91}>Java (JDK 17.0.6)</option>
                  <option  value={93}>JavaScript (Node.js 18.15.0)</option>
                  <option  value={78}>Kotlin (1.3.70)</option>
                  <option  value={71}>Python (3.8.1)</option>
                  <option  value={72}>Ruby (2.7.0)</option>
                  <option  value={73}>Rust (1.40.0)</option>
                </select>
            </div>
            <div className='solution my-1'>
                <label className='col-md-8' htmlFor='solution'>Solution</label>
                <textarea className='col-md-8' wrap="off" id="solution" onChange={this.handleChange} value={this.state.solution} name="solution" rows={10} cols={100}></textarea>
            </div>
            <div className='tags my-1'>
              <label className='col-md-12 my-3' for="tags">Add tags</label>
              {possibleTags.map(tag=>(
                <button className='btn btn-light mr-1' type="button" name={`${tag}`} onClick={this.addTag} id={`${tag}`}>{tag}</button>
                ))}
              <label className='col-md-12 my-3' for="tags">Added tags</label>
              {this.state.tags.map(tag=>(
                <button className='btn btn-light mr-1' type="button" id={`${tag}`}>{tag}</button>
                ))}
            </div>
            <button className='col-md-3 my-4 btn btn-outline-dark' type='submit'>Save</button>
        </form>
      </div>
    )
  }
}

export default withRouter(ProblemPut);
