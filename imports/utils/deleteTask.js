import { TasksCollection } from '../api/TasksCollection';

export const deleteTask = ({_id}) => TasksCollection.remove(_id);