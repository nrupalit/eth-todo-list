import React, { Component } from 'react';

class Main extends Component {
  render() {
    return (
      <div className="Main">
          <ul id="taskList" className="list-unstyled">
              <div className="taskTemplate" className="checkbox" style={{display: "none"}}>
                <label>
                  <input type="checkbox" />
                  <span className="content">Task content goes here...</span>
                </label>
              </div>
            </ul>
            <ul id="completedTaskList" className="list-unstyled">
            </ul>
      </div>
    );
  }
}

export default Main;