import React, { Component } from 'react';
import './App.css';
import classNames from 'classnames';
import TodoItems from './components/TodoItems';
import selecteAll from './img/all.svg';
import logo from './img/namtruong.jpg';
class App extends Component {
  constructor() {
    super();
    this.state = {
      newItem: '',
      currentFilter: 'All',
      count: 0,
      todoItems: [],
    };
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onAllDoneClicked = this.onAllDoneClicked.bind(this);
    this.onClearCompletedClick = this.onClearCompletedClick.bind(this);
  }

  onItemClicked(item) {
    return (e) => {
      const isComplete = item.isComplete;
      const { todoItems } = this.state;
      let { count } = this.state;
      const index = todoItems.indexOf(item);
      if (isComplete) count++;
      if (!isComplete) count--;
      this.setState({
        count: count,
        todoItems: [
          ...todoItems.slice(0, index),
          {
            ...item,
            isComplete: !isComplete,
          },
          ...todoItems.slice(index + 1),
        ],
      });
    };
  }

  onKeyUp(e) {
    let text = e.target.value;
    let { count } = this.state;
    if (e.keyCode === 13) {
      text = text.trim();
      if (!text) return;
      count++;
      this.setState({
        newItem: '',
        count: count,
        todoItems: [
          { title: text, isComplete: false },
          ...this.state.todoItems,
        ],
      });
    }
  }

  onChange(e) {
    let text = e.target.value;
    this.setState({ newItem: text });
  }

  onFilterClick(e) {
    let currentFilters = e.target.textContent;
    this.setState({ currentFilter: currentFilters });
  }

  onAllDoneClicked(e) {
    let { todoItems, count } = this.state;
    const len = todoItems.length;
    if (count !== 0) {
      todoItems = todoItems.map((i) => ({ ...i, isComplete: true }));
      this.setState({ count: 0, todoItems: todoItems });
    } else {
      todoItems = todoItems.map((i) => ({ ...i, isComplete: false }));
      this.setState({ count: len, todoItems: todoItems });
    }
  }

  onClearCompletedClick(e) {
    let { todoItems } = this.state;
    todoItems = todoItems.filter((i) => !i.isComplete);
    this.setState({
      todoItems: todoItems,
    });
  }

  onDestroyClick(item) {
    return (e) => {
      let { todoItems, count } = this.state;
      count--;
      const index = todoItems.indexOf(item);
      todoItems.splice(index, 1);
      this.setState({
        count: count,
        todoItems: todoItems,
      });
    };
  }

  render() {
    const { todoItems, newItem, currentFilter, count } = this.state;
    let all, active, completed, allDone, clearCompleted;
    switch (currentFilter) {
      case 'Active':
        all = false;
        active = true;
        completed = false;
        break;
      case 'Completed':
        all = false;
        active = false;
        completed = true;
        break;
      default:
        all = true;
        active = false;
        completed = false;
    }
    if (count === 0) allDone = true;
    if (count < todoItems.length) clearCompleted = true;
    if (todoItems.length) {
      let res;
      if (all) {
        res = todoItems;
      } else if (active) {
        res = todoItems.filter((item) => !item.isComplete);
      } else if (completed) {
        res = todoItems.filter((item) => item.isComplete);
      }
      return (
        <div className="App">
          <header className="header">
            <div className="hero">
              <img src={logo} alt="logo"></img>
              <h1>Todos</h1>
            </div>
            <img
              alt="checkAll"
              className={classNames({ allDone: allDone })}
              src={selecteAll}
              width={20}
              height={20}
              onClick={this.onAllDoneClicked}
            ></img>
            <input
              type="text"
              autoFocus={true}
              placeholder="What needs to be done?"
              onKeyUp={this.onKeyUp}
              value={newItem}
              onChange={this.onChange}
            ></input>
          </header>
          {res.map((item, index) => (
            <TodoItems
              key={index}
              item={item}
              onClick={this.onItemClicked(item)}
              onDestroyClick={this.onDestroyClick(item)}
            ></TodoItems>
          ))}
          <footer className="footer">
            <span className="todo-count">{count} items left</span>
            <ul className="filters">
              <li>
                <a
                  href="/#"
                  className={classNames({ selected: all })}
                  onClick={this.onFilterClick}
                >
                  All
                </a>
              </li>
              <li>
                <a
                  href="#/active"
                  className={classNames({ selected: active })}
                  onClick={this.onFilterClick}
                >
                  Active
                </a>
              </li>
              <li>
                <a
                  href="#/completed"
                  className={classNames({ selected: completed })}
                  onClick={this.onFilterClick}
                >
                  Completed
                </a>
              </li>
            </ul>
            <button
              className={classNames('clear-completed', {
                appear: clearCompleted,
              })}
              onClick={this.onClearCompletedClick}
            >
              Clear completed
            </button>
          </footer>
        </div>
      );
    } else {
      return (
        <div className="App">
          <header className="header">
            <div className="hero">
              <img src={logo} alt="logo"></img>
              <h1>Todos</h1>
            </div>
            <input
              type="text"
              autoFocus={true}
              placeholder="What needs to be done?"
              onKeyUp={this.onKeyUp}
              value={newItem}
              onChange={this.onChange}
            ></input>
          </header>
        </div>
      );
    }
  }
}

export default App;
