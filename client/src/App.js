import React, { Component, useState, useEffect } from "react";
import "./App.css";
import axios from "axios"

import { getBasket } from "./actions"

import Todo from "./Todo"
import GrcManage from "./GrcManage";
const basket_API_URL = "http://localhost:3000/todos/"

class App extends Component {
  // TODO: need state to pass to groceries
  state = {
    basket: {}
  }

  addToBasket = () => {
    axios.post(basket_API_URL, { text: selected.name })
      .then(res => {

      })

    // inBasket 상태 바꾸기

  }


  removeFromBasket = (id) => {
    const { basket } = this.state;
    axios.delete(`${basket_API_URL}${id}`)
      .then(res => {
        const newBasket = basket.filter(
          item => item._id.toString() !== id.toString());
        this.setState({
          basket: newBasket
        });
      })

    // inBasket 상태 바꾸기
    axios.put(`${basket_API_URL}${id}`, {})
      .then(res => {

      })
  }

  componentDidMount() {
    this.props.getBasket()
  }

  render() {
    const { basket } = this.state;
    const { removeFromBasket } = this;
    return (
      <div className="App">
        <Todo
          basket={basket}
          removeFromBasket={removeFromBasket} />
        <GrcManage
          basket={basket}
          removeFromBasket={removeFromBasket} />
      </div>
    );
  }
}

export default App;
