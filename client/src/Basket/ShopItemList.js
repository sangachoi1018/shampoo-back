import React, { Component } from "react";

import ShopItem from "./ShopItem"

import "../styles/ItemList.css"


export default class ShopItemList extends Component {
  render() {
    const { items, onToggle, onRemove } = this.props;
    const itemList =
      items.length ?
        items.map(
          item => (
            <ShopItem
              item={item}
              key={item._id}
              onClick={onToggle}
              onRemove={onRemove}
            />)
        ) : <p>아직 아무것도 없어요 :(</p>;


    return (
      <div>
        {itemList}
      </div>
    )
  }

}