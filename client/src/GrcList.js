import React, { Component } from "react";

import Grc from "./Grc"

import "./ShoppingList.css"


export default class GrcList extends Component {
  render() {
    const { items, onToggle, onRemove, addBasket } = this.props;

    const itemList =
      items.length ?
        items.map(
          item => (
            <Grc
              item={item}
              key={item._id}
              onClick={onToggle(item._id)}
              addBasket={addBasket}
            />)
        ) : <p>No grocery Yet :(</p>;


    return (
      <div>
        {itemList}
      </div>
    )
  }

}