import React, { Component } from "react";
import axios from "axios"

import Form from "./Form"


import "./ShoppingList.css"
import GrcList from "./GrcList";
const API_URL = "http://localhost:3000/grc/"


class GrcChips extends Component{

  state = {
    input: '',
    items: {}
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const { input, items } = this.state;

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

    // POST axios
    axios.post(API_URL, { name: input, entries: [], inBasket: false })
      .then(res => {

        const newItems = [...items, res.data]
        this.setState({
          input: '',
          items: newItems
        });
      })

  }

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {

    const { items } = this.state;
    const index = items.findIndex(item =>
      item._id.toString() == id.toString());
    const selected = items[index]; // 선택한 객체  
    console.log(selected.name);
    this.props.handleSelector(selected);

    this.setState({
      selectedItem
        : selected
    });
  }

  addBasket = (id) => {
    const { items } = this.state;
    const index = items.findIndex(item =>
      item._id.toString() == id.toString());
    const selected = items[index]; // 선택한 객체    
    const nextItems = [...items]; // 배열을 복사
    nextItems[index] = {
      ...selected,
      inBasket: !selected.inBasket
    };


    this.setState({
      items: nextItems
    });
  }

  handleRemove = (id) => {
    const { items } = this.state;
    axios.delete(`${API_URL}${id}`)
      .then(res => {
        const newItems = items.filter(
          item => item._id.toString() !== id.toString());
        this.setState({
          items: newItems
        });
      })
  }

  // componentDidMount() {
  //   axios.get(API_URL)
  //     .then(res => {
  //       const items = res.data;
  //       this.setState({ items });
  //     })
  // }

  render() {
    const { input, items } = this.state;

    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleRemove,
      handleToggle,
      addBasket
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
          onToggle={handleToggle}
          onRemove={handleRemove}
          addBasket={addBasket}
        />
        
      </div>
    )
  }


}

export default GrcChips;