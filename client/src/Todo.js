import React, { Component, useState, useEffect } from "react";
import axios from "axios"
import "./ShoppingList.css"
const API_URL = "http://localhost:3000/todos/"

class Todo extends Component {
  state = {
    input: '',
    items: {},
    editingItem: {}
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const { input, items } = this.state;
    if(!input){
      alert("please enter something");
      return;
    }

    if(items.some(({ text }) => text === input)) {
      alert(`Task: ${input} already exists`);
      return;
    }

    // POST axios
    axios.post(API_URL, {text: input})
      .then(res => {
        const newItems = [...items, res.data]
        this.setState({
          input: '',
          items: newItems
        });
      })

  }

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleToggle = (id) => {
    const { items } = this.state;

    // 파라미터로 받은 id 를 가지고 몇번째 아이템인지 찾습니다.
    
    const index = items.findIndex(item => 
      item._id.toString() == id.toString());

    const selected = items[index]; // 선택한 객체    
    const nextItems = [...items]; // 배열을 복사

    // 기존의 값들을 복사하고, checked 값을 덮어쓰기
    nextItems[index] = {
      ...selected,
      checked: !selected.checked
    };

    this.setState({
      items: nextItems
    });
  }


  handleRemove = (id) => {  
    const { items } = this.state;
    axios.delete(`${API_URL}${id}`)
      .then(res => {
        const newItems = items.filter(
          item => item._id.toString() !== id.toString());
        this.setState({
          items: newItems
        });
      })
  }

  handleKeyPressEdit = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === 'Enter') {
      this.finishEditing();
    }
  }


  finishEditing = () => {
    const { editingItem, items } = this.state;
    const id = editingItem._id;
    axios.put(`${API_URL}${id}`)
      .then(res => {
        console.log(res.data);
        const restItems = items.filter(
          item => item._id.toString() !== id.toString());        
        const newItems = [restItems, res.data]
        console.log("new Items" + newItems);

        this.setState({
          items: newItems,
          editingItem: {}
        });
      })

  }


  componentDidMount() {
    axios.get(API_URL)
      .then(res => {
        const items = res.data;
        this.setState({ items });
      })
  }

  render() {
    const { input, items, editingItem } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleRemove,
      handleToggle,
      finishEditing,
      handleKeyPressEdit
    } = this;


    const itemList =
      items.length ?
        items.map(({text, checked, _id}) => (

          <li
            key={_id}
            onClick={() => handleToggle(_id)}
            className="todo-item"
          >

            <div className="remove" onClick={(e) => {
              e.stopPropagation(); // onToggle 이 실행되지 않도록 함
              handleRemove(_id)
            }
            }>&times;</div>

            <div className="update" onClick={(e) => {
              e.stopPropagation(); // onToggle 이 실행되지 않도록 함
              this.setState({editingItem: {text, checked, _id}});
              console.log(text);
            }
            }>edit</div>


            <div className={`todo-text ${checked && 'checked'}`}>
              {Object.keys(editingItem).length && text===editingItem.text ? 
                (<input
                type="text"
                value={input}
              
                  onChange={handleChange}
                placeholder={text}
                onKeyPress={handleKeyPressEdit}
                onBlur={finishEditing}
              />) : <div>{text}</div> }
            </div>
            {
              checked && (<div className="check-mark">✓</div>)
            }
          </li>
        )
        ) : <p>No Todos Yet :(</p>;

    return (
      <div>
        <h1>Shopping Lists</h1>
        <div>
          <input
            type="text"
            value={input}
            onChange={handleChange}
            placeholder="Enter item to buy"
            onKeyPress={handleKeyPress}
          />
          <button type="button" onClick={handleCreate}>
            Add
        </button>

          <div>
            {itemList}
          </div>
        </div>
      </div>
    )
  }


}

export default Todo;
