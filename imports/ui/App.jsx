import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from './TaskForm';
import { Task } from './Task';


const toggleChecked = ({ _id, isChecked }) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
};

const deleteTask = ({ _id }) => TasksCollection.remove(_id);

export const App = () => {

  const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch());
  const [state, setEditTask] = useState(null)

  const handleEdit = (target) => {
    setEditTask(target)
  }

  window.localStorage.setItem('Tareas', JSON.stringify(tasks))

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Simple crud with Meteor</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm taskToEdit={state} />

        <ul className="tasks">
          {tasks.map(task => (
            <Task
              key={task._id}
              task={task}
              onCheckboxClick={toggleChecked}
              onDeleteClick={deleteTask}
              onEditClick={handleEdit}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};