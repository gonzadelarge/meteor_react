import React, { useEffect, useState } from 'react';
import { TasksCollection } from '/imports/api/TasksCollection';


export const TaskForm = ({ taskToEdit }) => {

    const [text, setText] = useState("");
    const [textEdit, setTextEdit] = useState("")
    const [state, setState ] = useState(null)

    useEffect(() => {
        if (taskToEdit) {
            setTextEdit(taskToEdit.text)
            setState(taskToEdit)
        }
    }, [taskToEdit])

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!text) return;

        state !== null ? editTask() : createTask();

        setText('');
        setTextEdit('');
        setState(null);
    }

    const createTask = () => {

        TasksCollection.insert({
            text: text.trim(),
            createdAt: new Date()
        })  
    }
    const editTask = () => {
        
        const { _id } = taskToEdit

        TasksCollection.update( {_id: _id }, {
            text: text.trim()
        })
    }


    return (
        <form className="task-form">
            <input
                type="text"
                placeholder="Type to add new tasks"
                value={text || textEdit}
                onChange={(e) => setText(e.target.value)}
            />

            <button onClick={handleSubmit} type="submit">{ state !== null ? 'Edit' : 'Add' }</button>
        </form>
    );
};