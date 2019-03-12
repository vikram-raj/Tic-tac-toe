import React, { Component } from 'react';

import StateToDo from './../stateTodo/StateToDo';
import ToDo from './../todo/ToDo';

export default class List extends Component {
  state = { toDos: [] };

  submitToDo = text =>
    this.setState(() => ({
      toDos: [{ complete: false, text }, ...this.state.toDos],
    }));

  toggleCompletion = ({ text }) =>
    this.setState(({ toDos }) => ({
      toDos: toDos.map(
        toDo =>
          toDo.text === text ? { complete: !toDo.complete, text } : toDo,
      ),
    }));

  deleteToDo = ({ text }) =>
    this.setState(({ toDos }) => ({
      toDos: toDos.filter(toDo => toDo.text !== text),
    }));

  render() {
    const toDos = this.state.toDos.map(toDo =>
      <ToDo
        {...toDo}
        deleteToDo={this.deleteToDo.bind(this, toDo)}
        key={toDo.text}
        toggleCompletion={this.toggleCompletion.bind(this, toDo)}
      />,
    );

    return (
      <div className="list">
        <h1 className="list__header">todos</h1>
        <StateToDo submit={this.submitToDo} />
        {toDos}
      </div>
    );
  }
}