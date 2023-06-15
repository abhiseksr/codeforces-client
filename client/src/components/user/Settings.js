import React from 'react';
// import '../styles/Login.css';

class Settings extends React.Component{
  render(){
    return (
      <div className='settings mt-5'>
        <h2>Settings</h2>
        <form action="/settings" className='row my-4'>
          <div className='name col-md-12 my-1'>
            <label className='col-md-2' htmlFor="name">Name</label>
            <input className='col-md-2' type="text" name="name" id="name"></input>
          </div>
          <div className='birth col-md-12 my-1'>
            <label className='col-md-2' htmlFor="birth">Birth date</label>
            <input className='col-md-2' type="date" name="birth" id="birth"></input>
          </div>
          <div className='country col-md-12 my-1'>
            <label className='col-md-2' htmlFor="country">Country</label>
            <input className='col-md-2' type="text" name="country" id="country"></input>
          </div>
          <div className='city col-md-12 my-1'>
            <label className='col-md-2' htmlFor="city">City</label>
            <input className='col-md-2' type="text" name="city" id="city"></input>
          </div>
          <div className='organisation col-md-12 my-1'>
            <label className='col-md-2' htmlFor="organisation">Organisation</label>
            <input className='col-md-2' type="text" name="organisation" id="organisation"></input>
          </div>
          <button className='my-2 col-md-2 btn btn-outline-dark' type="submit">Save</button>
        </form>
      </div>
    )
  }
}

export default Settings;
