import React, { Component } from "react";
import Dropdown from "./Dropdown";


class App extends Component{
  defaultTitle = "Colors";
  defaultValues = ["Red", "Black","Yellow", "Blue", "Grey", "Green"];
  state={
    searchable: true,
    multiselect: true
  }

  onChange=(e)=>{
    //console.log(e.target.value, e.target.checked);
    this.setState({
      [e.target.value]: e.target.checked
    })
  }

  render(){
    return(
      <div className="App">
        <div className="input">
          <input type="checkbox" value="searchable" onChange={this.onChange} checked={this.state.searchable}/>
          Searchable
          <input type="checkbox" value="multiselect" onChange={this.onChange} checked={this.state.multiselect}/>
          Multiselect
        </div>
        <Dropdown searchable={this.state.searchable} multiselect={this.state.multiselect} defaultTitle={this.defaultTitle} defaultValues={this.defaultValues}/>
      </div>
    )
  }
}

export default App;
