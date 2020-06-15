import React, { Component } from "react";

import ShopItemList from "./ShopItemList";

import "../styles/ItemList.css"

class Basket extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.basket !== this.props.basket;
  }

  render() {
    const { basket, handleCheck, removeFromBasket } = this.props;
    return (
      <div>
        <h1>살 것</h1>

        <ShopItemList
          items={basket}
          onToggle={handleCheck}
          onRemove={removeFromBasket}
        />
      </div>
    )
  }

}

export default Basket;
