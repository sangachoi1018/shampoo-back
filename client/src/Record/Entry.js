import React, { Component } from 'react';
import '../styles/Item.css';

class Entry extends Component {

  render() {
    const { date, id, onRemove } = this.props;

    return (
      <div className="todo-item">
        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // onToggle 이 실행되지 않도록 함
          onRemove(id)
        }
        }>&times;</div>

        <div>{date}</div>
      </div>
    );
  }
}

export default Entry;
