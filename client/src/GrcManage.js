import React, { Component } from "react";

import Record from "./Record"
import GrcChips from "./GrcChips"

import "./ShoppingList.css"


class GrcManage extends Component {
  state = {
    selectedItem: {}
  }

  handleSelector = (newSelectedItem) => {
    this.setState({
      selectedItem: newSelectedItem
    })
  }

  render() {
    const { selectedItem } = this.state;
    const { removeFromBasket } = this.props;
    const { handleSelector } = this;

    return (
      <div>
        <GrcChips
          handleSelector={handleSelector}
          removeFromBasket={removeFromBasket} />

        <Record selectedItem={selectedItem} />
      </div>
    )
  }
}

export default GrcManage;
