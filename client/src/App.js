import React, { Component, useState, useEffect } from "react";
import "./App.css";
import Todo from "./Todo"
import GrcManage from "./GrcManage";

class App extends Component {
  // TODO: need state to pass to groceries

  render(){
    return (
      <div className="App">
        <Todo/>
        <GrcManage/>
      </div>
    );
  }
}

export default App;
