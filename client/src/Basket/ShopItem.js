import React, { Component } from 'react';
import "../styles/Item.css"

class ShopItem extends Component {

  render() {
    const { item, onClick, onRemove } = this.props;
    const { text, checked, _id } = item;

    return (
      <div
        key={_id}
        onClick={() => onClick(_id)}
        className="todo-item"
      >

        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // onToggle 이 실행되지 않도록 함
          onRemove(item)
        }
        }>&times;</div>

        <div className={`todo-text ${checked && 'checked'}`}>
          {text}
        </div>

        {
          checked && (<div className="check-mark">✓</div>)
        }
      </div >
    );
  }
}

export default ShopItem;
