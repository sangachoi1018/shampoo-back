import React, { Component } from "react";
import Entry from "./Entry"

export default class EntryList extends Component {


  shouldComponentUpdate(nextProps, nextState) {
    return this.props.dates !== nextProps.dates;
  }


  render() {
    const { entries, onToggle, onRemove } = this.props;
    console.log(entries);
    
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