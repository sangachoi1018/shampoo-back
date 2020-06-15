import React, { Component } from 'react';
import '../styles/Item.css';

class Entry extends Component {

  render() {
    const { date, id, onRemove } = this.props;

    const onlyDate = date.split('T')[0]
    
    return (
      <div className="todo-item">
        <div className="remove" onClick={(e) => {
          e.stopPropagation(); // onToggle 이 실행되지 않도록 함
          onRemove(id)
        }
        }>&times;</div>

        <div>
          {onlyDate}
        </div>
      </div>
    );
  }
}

export default Entry;
