import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTodo extends Component {
  constructor(props) {
        super(props);

        //Because in the four implemented methods we’re dealing with the component’s state object
        // we need to make sure to bind those methods to this by adding the following lines of code
        // to the constructor:

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoResponsible = this.onChangeTodoResponsible.bind(this);
        this.onChangeTodoPriority = this.onChangeTodoPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        }
      }

  onChangeTodoDescription(e) {
    this.setState({
      todo_description: e.target.value
    });
  }

  onChangeTodoResponsible(e) {
    this.setState({
      todo_responsible: e.target.value
    });
  }

  onChangeTodoPriority(e) {
    this.setState({
      todo_priority: e.target.value
    });
  }

  // Inside this method we need to call e.preventDefault to ensure that the default HTML form submit
  // behaviour is prevented. Because the back-end of our application is not implemented yet we’re only
  // printing out what’s currently available in the local component’s state to the console.
  // Finally we’re making sure that the form is resetted by setting the resetting the state object.

  onSubmit(e) {
        e.preventDefault();

        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        console.log(`Todo Responsible: ${this.state.todo_responsible}`);
        console.log(`Todo Priority: ${this.state.todo_priority}`);

        const newTodo = {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        };

        axios.post('http://localhost:4000/todos/add', newTodo)
            .then(res => console.log(res.data));

        this.setState({
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
        })
    }

    render() {
          return (
              <div style={{marginTop: 10}}>
                  <h3>Create New Todo</h3>
                  <form onSubmit={this.onSubmit}>

                      <div className="form-group">
                          <label>Description: </label>
                          <input  type="text"
                                  className="form-control"
                                  value={this.state.todo_description}
                                  onChange={this.onChangeTodoDescription}
                                  />
                      </div>

                      <div className="form-group">
                          <label>Responsible: </label>
                          <input
                                  type="text"
                                  className="form-control"
                                  value={this.state.todo_responsible}
                                  onChange={this.onChangeTodoResponsible}
                                  />
                      </div>

                      <div className="form-group">
                          <div className="form-check form-check-inline">
                              <input  className="form-check-input"
                                      type="radio"
                                      name="priorityOptions"
                                      id="priorityLow"
                                      value="Low"
                                      checked={this.state.todo_priority==='Low'}
                                      onChange={this.onChangeTodoPriority}
                                      />
                              <label className="form-check-label">Low</label>
                          </div>
                          <div className="form-check form-check-inline">
                              <input  className="form-check-input"
                                      type="radio"
                                      name="priorityOptions"
                                      id="priorityMedium"
                                      value="Medium"
                                      checked={this.state.todo_priority==='Medium'}
                                      onChange={this.onChangeTodoPriority}
                                      />
                              <label className="form-check-label">Medium</label>
                          </div>
                          <div className="form-check form-check-inline">
                              <input  className="form-check-input"
                                      type="radio"
                                      name="priorityOptions"
                                      id="priorityHigh"
                                      value="High"
                                      checked={this.state.todo_priority==='High'}
                                      onChange={this.onChangeTodoPriority}
                                      />
                              <label className="form-check-label">High</label>
                          </div>
                      </div>

                      <div className="form-group">
                          <input type="submit" value="Create Todo" className="btn btn-primary" />
                      </div>
                  </form>
              </div>
          )
      }
}
