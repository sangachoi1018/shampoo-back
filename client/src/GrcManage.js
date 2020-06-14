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
    const { handleSelector } = this;

    return (
      <div>
        <GrcChips handleSelector={handleSelector}/>
        <Record name={selectedItem.name} entries={selectedItem.entries} _id={selectedItem._id} />
      </div>
    )
  }
}

export default GrcManage;
