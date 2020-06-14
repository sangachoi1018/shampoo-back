import React, { Component } from "react";
import axios from "axios"
import "./ShoppingList.css"
import EntryList from "./EntryList"
import Form from "./Form"
const API_URL = "http://localhost:3000/grc/"

export default class Record extends Component {
  state = {
    input: '',
    itemId: this.props._id
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }


  handleCreate = () => {
    const { input } = this.state;
    const { name, entries, _id } = this.props;
    if (!input) {
      alert("뭔가 입력한 후 추가해주세요");
      return;
    }

    if (entries.some(entry => entry.date === input)) {
      alert(`${input}와 같은 날짜가 이미 존재합니다`);
      this.setState({
        input: ''
      });
      return;
    }

    console.log("handlecreate");
    console.log(`${name} ${entries}` );


    

    axios.put(`${API_URL}${_id}/entries`, { date: new Date(input), unit: 1, memo: "" })
      .then(res => {
        const newEntries = res.data
        console.log(newEntries);
        
        this.setState({
          input: '',
        });
      })
      
  }

  handleKeyPress = (e) => {
    // 눌려진 키가 Enter 면 handleCreate 호출
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleRemove = (id) => {
    // DELETE
    console.log("delete a date " + id);


  }



  render() {
    const { name, entries } = this.props;
    const { input } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleRemove,
      handleToggle
    } = this;

    if (name == undefined) {
      return (
        <div>
          <h1>기록장</h1>
          <h3>물품을 선택하세요</h3>
        </div>

      )
    }

    return (
      <div>
        <h1>기록장</h1>
        <h3>{name}</h3>
        <h3> 구입한 날짜 </h3>
        <Form
          value={input}
          onKeyPress={handleKeyPress}
          onChange={handleChange}
          onCreate={handleCreate}
        />

        <EntryList
          entries={entries}
          onToggle={handleToggle}
          onRemove={handleRemove}
        />

      </div>
    )
  }


}