import React, { Component, useState, useEffect } from "react";
import axios from "axios"
import "./ShoppingList.css"
import ShopItemList from "./ShopItemList";
const API_URL = "http://localhost:3000/todos/"

class Todo extends Component {

  handleToggle = (id) => {
    const { basket } = this.props;
    const index = basket.findIndex(item =>
      item._id.toString() == id.toString());

    const selected = basket[index]; // 선택한 객체    
    const nextBasket = [...basket]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextBasket[index] = {
      ...selected,
      checked: !selected.checked
    };

    // checked 되었다는 것 DB에 저장


  }


  shouldComponentUpdate(nextProps) {
    return nextProps.basket !== this.props.basket;
  }

  render() {
    const { basket } = this.props;
    const { removeFromBasket } = this.props;
    const {
      handleToggle
    } = this;

    return (
      <div>
        <h1>살 것</h1>

        <ShopItemList
          items={basket}
          onToggle={handleToggle}
          onRemove={removeFromBasket}
        />
      </div>
    )
  }

}

export default Todo;
