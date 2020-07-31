import React, { Component } from 'react';
import classNames from 'classnames';
import './Todoitem.css';
import uncheck from '../img/circle.svg';
import checked from '../img/checked.svg';

class TodoItems extends Component {
  render() {
    const { item, onClick, onDestroyClick } = this.props;
    let url = uncheck;
    if (item.isComplete) url = checked;
    return (
      <div className="TodoItems">
        <img
          onClick={onClick}
          src={url}
          width={32}
          height={32}
          alt="check"
        ></img>
        <p
          className={classNames({
            'TodoItems--complete': item.isComplete,
          })}
        >
          {this.props.item.title}
        </p>
        <button className="destroy" onClick={onDestroyClick}>
          &times;
        </button>
      </div>
    );
  }
}

export default TodoItems;
