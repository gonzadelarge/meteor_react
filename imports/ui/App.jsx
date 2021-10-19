import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from './TaskForm';
import { Task } from './Task';
import { deleteTask, toggleChecked } from '../utils/index'


export const App = () => {

  const [ editTask, setEditTask ] = useState(null);
  const [ hideCompleted, setHideCompleted ] = useState(false);

  const hideCompletedFilter = { isChecked: { $ne: true } };
 
  const filterTask = () => TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, { sort: { createdAt: -1 } }).fetch();
  const sortTask = () => TasksCollection.find({}, { sort: { createdAt: -1 } }).fetch();

  const tasks = useTracker( () => ( sortTask(), filterTask() ));

  const pendingTasksCount = useTracker( () =>
    TasksCollection.find(hideCompletedFilter).count()
  );

  const handleEdit = (target) => {
    setEditTask(target)
  }

  window.localStorage.setItem('Tareas', JSON.stringify(tasks))

  return (
    <div className="app">

      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>Simple crud with Meteor { pendingTasksCount ? pendingTasksCount : '' }</h1>
          </div>
        </div>
      </header>

      <div className="main">
        <TaskForm taskToEdit={editTask} />

        <div className="filter">
          <button onClick={() => setHideCompleted(!hideCompleted)}>
            {hideCompleted ? 'Show All' : 'Hide Completed'}
          </button>
        </div>

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