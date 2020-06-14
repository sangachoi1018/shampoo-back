import React, { Component } from "react";
import Entry from "./Entry"

export default class EntryList extends Component {


  shouldComponentUpdate(nextProps) {
    return nextProps.selectedItem !== this.props.selectedItem
  }  


  render() {
    const { entries, onToggle, onRemove, selectedItem } = this.props;
    
    const entryList = entries.map(
      ({ date, memo, unit, _id }) => (

        
        <Entry
          id={_id}
          date={date}
          onToggle={onToggle}
          onRemove={onRemove}
          key={_id}
        />
      )
    );    


    return(
      <div>
        {entryList}
      </div>
    )
  }
}