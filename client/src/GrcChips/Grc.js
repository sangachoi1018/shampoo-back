import React, { Component } from 'react';
import '../styles/Item.css';

class Grc extends Component {

  // state = {
  //   inBasket: this.props.item.inBasket
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.item != prevProps.item) {
  //     this.setState({
  //       inBasket: !this.props.item.inBasket
  //     })
  //   }
  // }

  // shouldComponentUpdate(nextProps) {
  //   return nextProps.basket != this.props.basket
  // }

  render() {
    const { item, onClick, onRemove, removeFromBasket, addToBasket, basket } = this.props;
    const { _id, name, inBasket } = item;
    console.log(`${name} in Basket: ${inBasket}`);



    return (
      <div
        onClick={() => onClick(_id)}
        className="todo-item"
      >

        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // onToggle 이 실행되지 않도록 함
          onRemove(_id)
        }
        }>&times;</div>

        <div className={`todo-text`}>
          {name}
        </div>

        <div onClick={() => inBasket ?
          removeFromBasket(item) : addToBasket(item)}
        >
          <span role="img" aria-label="shopping cart"
            className={inBasket ? "basket" : "not-in-basket"}
          >
            🛒
          </span>

        </div>


      </div>
    );
  }
}

export default Grc;
