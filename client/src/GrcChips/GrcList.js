import React, { Component } from "react";

import Grc from "./Grc"

import "../styles/ItemList.css"


export default class GrcList extends Component {

  componentWillReceiveProps({ basket }) {
    this.setState({ ...this.state, basket })
  }


  render() {
    const { items, onToggle, onRemove, removeFromBasket, addToBasket, basket } = this.props;

    const itemList =
      items.length ?
        items.map(
          item => (
            <Grc
              item={item}
              key={item._id}
              onClick={onToggle}
              onRemove={onRemove}
              removeFromBasket={removeFromBasket}
              addToBasket={addToBasket}
              basket={basket}
            />)
        ) : <p>아직 아무것도 없어요 :(</p>;


    return (
      <div>
        {itemList}
      </div>
    )
  }

}