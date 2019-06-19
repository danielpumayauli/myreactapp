import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Navigation from './components/Navigation';
import TodoForm from './components/TodoForm';
import { todos } from './todos.json';

class App extends Component {
  constructor() {
    super();
    this.state = {
      todos: todos
    };
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

handleAddTodo(todo) {
    /* Agregando estado actual de las tareas con la nueva tarea */
    this.setState({
      todos: [...this.state.todos, todo]
    })
}

removeTodo(index) {
  if(window.confirm('Are you sure you want to delete it?')) {
    this.setState({
      /* Recoge todos los elementos del estado, menos el que el usuario seleccionó */
      todos: this.state.todos.filter((e, i) => {
        return i !== index
      })
    });
  }
}

render() {
  const todos = this.state.todos.map((todo,i) => {
    return (
      <div className="col-md-4" key={i}>
        <div className="card mt-4">
          <div className="card-header">
            <h3>{todo.title}</h3>
            <span className="badge badge-pill badge-danger ml-2">
              {todo.priority}
            </span>
          </div>
          <div className="card-body">
            <p>{todo.description}</p>
            <p><mark>{todo.responsible}</mark></p>
          </div>
          <div className="card-footer">
            <button
              className="btn btn-danger"
              onClick={this.removeTodo.bind(this, i)}
            >
            Delete
            </button>
          </div>
        </div>
      </div>
    )
  });
  return (
    <div className="App">
      <Navigation title="Aplicación de tareas" length={this.state.todos.length}/>
      <div className="container">
        <div className="row mt-4">
          <div className="col-md-3">

            <TodoForm onAddTodo ={this.handleAddTodo}/>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div className="col-md-9">
            <div className="row">
              { todos }
            </div>
          </div>
        </div>
      </div>

    </div>
    );
  }
}

export default App;
