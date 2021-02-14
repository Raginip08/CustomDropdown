import React, { Component, Fragment } from "react";
import PropTypes from 'prop-types'

class Dropdown extends Component {
  defaultTitle = this.props.defaultTitle;
  defaultValues = [...this.props.defaultValues];
  state = {
    components: [],
    filteredComponents: [],
    selectedComponents: [],
    open: false,
    title: this.defaultTitle
  };

  onDropdownClickHandler = (e) => {
    if(!this.state.open){
    
      const values = this.defaultValues.map((item) =>
        typeof item === "object" ? item.title : item
      );
      this.setState({
        components: values,
        filteredComponents: values,
        open: !this.state.open
      });
  
}
  };

  onSearchHandler = (e) => {
    //console.log(this.state);
    e.stopPropagation();
    const updatedList = this.state.components.filter((item) => {
      return item.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
    });
    this.setState({ filteredComponents: updatedList });
  };

  onSelectHandler = (e) => {
      if(this.props.multiselect){
        if (e.target.checked) {
            const selectedList = [
              ...this.state.selectedComponents,
              e.target.value
            ];
            this.setState({
              selectedComponents: selectedList
            });
          } else {
            const idx = this.state.selectedComponents.indexOf(
              e.target.value
            );
            if (idx >= 0) {
              const selectedList = [...this.state.selectedComponents];
              selectedList.splice(idx, 1);
              this.setState({
                selectedComponents: selectedList
              });
            }
          }
      }
      else{         
            this.setState({
                open:false,
                selectedComponents: e.target.checked? [e.target.value]: [],
                title: e.target.checked?this.defaultTitle + " - " + e.target.value:this.defaultTitle
            })

      }
    
    
  };

  onClearHandler = (e) => {
    this.setState({
      title: this.defaultTitle,
      selectedComponents: [],
      open: false
    });
    //console.log(this.state);
  };

  onSubmitHandler = (e) => {
    this.setState({
      title:
        this.state.selectedComponents.length > 0
          ? this.defaultTitle + " - " + this.state.selectedComponents.toString()
          : this.defaultTitle,
      open: false
    });
  };

  onSelectAllHandler=(e)=>{
     
          this.setState({
              selectedComponents: e.target.checked?[...this.state.filteredComponents]: []
          })
     
  }

  render() {
    return (
      <Fragment>
        <div>
          <div onClick={this.onDropdownClickHandler} className="dropdown">
            {this.state.open && this.props.searchable? ( 
              <input
                type="text"
                onChange={this.onSearchHandler}
                placeholder="Search"
              />
            ) : 
            (<div className="dropdown-default"><span>{this.state.title}</span> <i className="fa fa-caret-down right"></i></div>)
            }
          </div>
          {this.state.open ? (
            <div className="open">
              <ul>
                {this.state.filteredComponents.length>1 && this.props.multiselect && <li key={"selectAll"}>
                <input
                      id={"selectAll"}
                        type="checkbox"
                        onChange={this.onSelectAllHandler}
                        checked={
                          this.state.selectedComponents.length === this.state.components.length
                        }
                      />{"  "}
                       <label htmlFor={"selectAll"}><span></span></label>
                    </li>}
                {this.state.filteredComponents.map((color, index) => {
                  return (
                    <li key={index} className={this.state.selectedComponents.indexOf(color) !== -1? "selected": "notSelected"}>
                      <input
                      id={`box${index}`}
                        type="checkbox"
                        onChange={this.onSelectHandler}
                        value={color}
                        checked={
                          this.state.selectedComponents.indexOf(color) !== -1
                        }
                      />{"  "}
                       <label htmlFor={`box${index}`}><span>{color}</span></label>
                    </li>
                  );
                })}
              </ul>
              {this.props.multiselect && <div className="buttons">
                <span className="mx-15 btn-dark" onClick={this.onClearHandler}>Clear</span>
                <span className="mx-15 btn-blue" onClick={this.onSubmitHandler}>Submit</span>
              </div>}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </Fragment>
    );
  }
}

Dropdown.propTypes={
    defaultTitle: PropTypes.string,
    defaultValues: PropTypes.array,
    searchable: PropTypes.bool,
    multiselect: PropTypes.bool
}

export default Dropdown;
