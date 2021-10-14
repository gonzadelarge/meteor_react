import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';


export const Task = ({ task, onCheckboxClick, onDeleteClick, onEditClick  }) => {
  return (
    <li className="Task__li">
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        readOnly
      />
      <span className="Task__title">{task.text}</span>
      <button className="Task__btn" onClick={ () => onEditClick(task) } ><FontAwesomeIcon icon={faEdit} /></button>
      <button className="Task__btn" onClick={ () => onDeleteClick(task) }><FontAwesomeIcon icon={faTrashAlt} /></button>
    </li>
  );
}