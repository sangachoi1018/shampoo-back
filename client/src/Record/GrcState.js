import React, { Component } from "react";

export default class GrcState extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.selectedItem !== this.props.selectedItem
  }


  render() {
    const { selectedItem } = this.props;
    const name = selectedItem.name;

    return (
      <div>
        {name ?
          (
            <div>
              <h3>{name}</h3>
              <h3> 구입한 날짜 </h3>
            </div>
          ):
          (<h3>물품을 선택하세요</h3>)

        }
      </div>

    )
  }


}