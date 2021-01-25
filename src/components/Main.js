import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <div className="Main">
          <form onSubmit={(e) => {e.preventDefault()
          this.props.createTask(this.content.value)}}>
            <input id="newTask" type="text" ref={(input) => {this.content = input }} className="form-control" placeholder="Add task.." required />
            <input type="submit" />
          </form>
          <ul id="taskList" className="list-unstyled">
          { this.props.tasks.map((task, key) => {
            return(
              <div className="taskTemplate" className="checkbox" key={key}>
                <label>
                  <span className="content">{task.content}</span>
                </label>
              </div>
            )
          })}
        </ul>
            <ul id="completedTaskList" className="list-unstyled">
            </ul>
      </div>
    );
  }
}

export default Main;