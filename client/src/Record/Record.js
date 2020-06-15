import React, { Component } from "react";
import axios from "axios"
import GrcState from "./GrcState"
import EntryList from "./EntryList"
import Form from "../Form"

import "../styles/ItemList.css"

const API_URL = "http://localhost:3000/grc/"

export default class Record extends Component {
  state = {
    input: '',
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value // input 의 다음 바뀔 값
    });
  }

  handleCreate = () => {
    const { input } = this.state;
    const { selectedItem, updateEntries } = this.props;
    const { entries, _id } = selectedItem;
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

    axios.put(`${API_URL}${_id}/entries`, { date: new Date(input), unit: 1, memo: "" })
      .then(res => {
        this.setState({
          input: '',
        });
        updateEntries(res.data);
        
      })

  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleCreate();
    }
  }

  handleRemove = (entryId) => {
    const { selectedItem, updateEntries } = this.props;
    const { entries, _id } = selectedItem;
    const newEntries = entries.filter(entry => entry._id !== entryId)
    
    const newSelectedItem = {...selectedItem, entries: newEntries}; 
    

    
    // TODO: axios delete : entry 제거
    axios.delete(`${API_URL}${_id}/entries/${entryId}`)
    .then(res => {
      updateEntries(newSelectedItem)
    })

  }

  render() {
    const { selectedItem } = this.props;
    const { input } = this.state;
    const {
      handleChange,
      handleCreate,
      handleKeyPress,
      handleRemove
    } = this;


    return (
      <div>
        <h1>기록장</h1>
        <GrcState selectedItem={selectedItem} />

        {selectedItem.entries ?
          <div>
            <Form
              value={input}
              onKeyPress={handleKeyPress}
              onChange={handleChange}
              onCreate={handleCreate}
            />

            <EntryList
              selectedItem={selectedItem}
              onRemove={handleRemove}
            />
          </div>
          : <div />
        }

      </div>
    )
  }


}