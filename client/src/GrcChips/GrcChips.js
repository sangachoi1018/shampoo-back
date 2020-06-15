import React, { Component } from "react";
import axios from "axios"

import Form from "../Form"
import GrcList from "./GrcList";


import "../styles/ItemList.css"

const API_URL = "http://localhost:3000/grc/";

class GrcChips extends Component {

  state = {
    input: '',
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const { input } = this.state;
    const { handleCreateGrc, items } = this.props;

    if (!input) {
      alert("please enter something");
      return;
    }

    if (items.some(item => item.name === input)) {
      alert(`Item: ${input} already exists`);
      this.setState({
        input: ''
      })
      return;
    }

    handleCreateGrc(input)
    this.setState({
      input: ''
    })

  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { items } = this.props;
    const index = items.findIndex(item =>
      item._id.toString() === id.toString());
    const selected = items[index]; // 선택한 객체  
    this.props.handleSelector(selected);
  }


  render() {
    const { input } = this.state;
    const { removeFromBasket, addToBasket, basket, items, handleRemoveGrc } = this.props;

    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleToggle,
    } = this;

    return (
      <div>
        <h1>식료품 관리</h1>
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />

        <GrcList
          items={items}
          basket={basket}
          onToggle={handleToggle}
          onRemove={handleRemoveGrc}
          removeFromBasket={removeFromBasket}
          addToBasket={addToBasket}
        />

      </div>
    )
  }


}

export default GrcChips;