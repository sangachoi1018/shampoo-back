import React, { Component } from "react";
import axios from "axios"

import Basket from "./Basket/Basket"
import Record from "./Record/Record"
import GrcChips from "./GrcChips/GrcChips"

import "./styles/ItemList.css"

// TODO: basket api url 입력하기
const API_URL = "http://localhost:3000/grc/";
const BASKET_API_URL = "http://localhost:3000/todos/";

class GrcManage extends Component {
  state = {
    selectedItem: {},
    basket: [],
    grcItems: [] // item in grc
  }

  addToBasket = (item) => {
    // item = grcItem (우유, 계란 같이 grc DB에 저장되어있는 객체)
    const itemName = item.name;
    console.log(`Add ${itemName}`);
    
    const itemId = item._id;
    const { basket } = this.state;
    let toShopItemId = null;


    // TODO: post axios, todo db에 저장
    axios.post(BASKET_API_URL, { text: itemName, checked: false, grcId: itemId })
      .then(res => {
        toShopItemId = res.data._id;
        console.log(toShopItemId);
        
      })
    
    // TODO: put axios, grc db에 변경, inBasket 바꾸기
    axios.post(`${API_URL}${itemId}`, { ...item, inBasket: true })
      .then(() => {
        const newBasket = [...basket, { text: itemName, _id: toShopItemId, checked: false, grcId: itemId }];
        console.log(`basket set: ${newBasket}`);
        
        this.setState({ // basket 상태 바꾸기
          basket: newBasket
        })

        console.log(`new basket`);
        console.log(this.state.basket);
        
      })      

  }

  // x 버튼 눌러서 장바구니에서 없애는 경우
  removeBasketItem = (item) => {

    const itemId = item._id
    const itemName = item.name
    console.log(`Remove ${itemName}`);

    const { basket } = this.state;
    let grcId = item.grcId;

    // // TODO: delete axios, todo db에서 삭제
    // axios.delete(`${BASKET_API_URL}${itemId}`)
    //   .then(() => {
    //     console.log(`${itemName} deleted`);
    //   })


    // // TODO: put axios, grc db에서 변경
    // // inBasket 상태 바꾸기
    // axios.put(`${API_URL}${grcId}`, { ...item, inBasket: false })
    //   .then(() => {
    //     // basket 상태 바꾸기
    //     const newBasket = [...basket, { ...item, inBasket: false }];
    //     this.setState({
    //       basket: newBasket
    //     });
    //   })

  }


  // 카트 아이콘 눌러서 장바구니에서 없애는 경우
  removeFromBasket = (item) => {
    console.log(`removeFromBasket : ${item.name}`);

    // const { basket } = this.state;
    // let grcId = "";

    // console.log(item);

    // // TODO: delete axios, todo db에서 삭제
    // axios.delete(`${BASKET_API_URL}${itemId}`)
    //   .then(() => {
    //     console.log(`${itemName} deleted`);
    //   })


    // // TODO: put axios, grc db에서 변경
    // // inBasket 상태 바꾸기
    // axios.post(`${API_URL}${itemId}`, { ...item, inBasket: false })
    //   .then(() => {
    //     // basket 상태 바꾸기
    //     let newBasket = [];
    //     for (let i = 0; i < basket.length; i++) {
    //       let toBuyItem = basket[i];
    //       if (toBuyItem.name !== itemName)
    //         newBasket.push(toBuyItem);
    //       else
    //         toBuyItemId = toBuyItem.id;
    //     }

    //     this.setState({
    //       basket: newBasket
    //     });
    //   })

    // console.log(toBuyItemId);


  }


  handleCheck = (id) => {
    const { basket } = this.state
    const index = basket.findIndex(item =>
      item._id.toString() === id.toString());

    const selected = basket[index]; // 선택한 객체    
    let nextBasket = [...basket]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextBasket[index] = {
      ...selected,
      checked: !selected.checked
    };

    // checked 되었다는 것 DB에 저장

    axios.post(`${BASKET_API_URL}${id}`,
      { text: selected.text, checked: !selected.checked, _id: selected._id })
      .then(res => {
        this.setState({
          basket: nextBasket
        })
      })

  }

  handleSelector = (newSelectedItem) => {
    this.setState({
      selectedItem: newSelectedItem
    })
  }

  componentDidMount() {
    axios.get(BASKET_API_URL)
      .then(res => {
        const basket = res.data;
        console.log(basket);
  
        this.setState({ basket });
      })

    axios.get(API_URL)
      .then(res => {
        const grcItems = res.data;
        console.log(items);
        this.setState({ items });
      })
  }

  render() {
    const { selectedItem, basket } = this.state;
    const { handleSelector, addToBasket, removeFromBasket, handleCheck, removeBasketItem } = this;

    return (
      <div>
        <Basket
          handleCheck={handleCheck}
          basket={basket}
          removeFromBasket={removeBasketItem}
          addToBasket={addToBasket}
        />
        <GrcChips
          handleSelector={handleSelector}
          basket={basket}
          removeFromBasket={removeFromBasket}
          addToBasket={addToBasket}
        />

        <Record selectedItem={selectedItem} />
      </div>
    )
  }
}

export default GrcManage;
