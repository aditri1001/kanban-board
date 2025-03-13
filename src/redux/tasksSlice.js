import { createSlice } from '@reduxjs/toolkit';

// Function to load state from localStorage
const loadState = () => {
  try {
    const savedState = localStorage.getItem('tasksState');
    return savedState ? JSON.parse(savedState) : null;
  } catch (error) {
    console.error("Error loading state from localStorage", error);
    return null;
  }
};

const saveState = (state) => {
  try {
    localStorage.setItem('tasksState', JSON.stringify(state));
  } catch (error) {
    console.error("Error saving state to localStorage", error);
  }
};

const initialState = loadState() || {
  tasks: {
    'task-1': { id: 'task-1', title: 'Task Name', description: 'Description for Task', status: 'todo' },
    'task-2': { id: 'task-2', title: 'Task Name', description: 'Description for Task', status: 'inProgress' },
  },
  columns: {
    todo: { id: 'todo', title: 'To Do', taskIds: ['task-1'] },
    inProgress: { id: 'inProgress', title: 'In Progress', taskIds: ['task-2'] },
    peerReview: { id: 'peerReview', title: 'Peer Review', taskIds: [] },
    done: { id: 'done', title: 'Done', taskIds: [] },
  },
  columnOrder: ['todo', 'inProgress', 'peerReview', 'done'],
  searchTerm: '',
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTask = action.payload;
      state.tasks[newTask.id] = newTask;
      state.columns.todo.taskIds.push(newTask.id);
      saveState(state);
    },
    updateTaskStatus: (state, action) => {
      const { taskId, newStatus } = action.payload;
      const oldStatus = state.tasks[taskId].status;
      state.tasks[taskId].status = newStatus;

      state.columns[oldStatus].taskIds = state.columns[oldStatus].taskIds.filter(id => id !== taskId);
      state.columns[newStatus].taskIds.push(taskId);
      saveState(state);
    },
    updateTask: (state, action) => {
      const { id, title, description } = action.payload;
      if (state.tasks[id]) {
        state.tasks[id].title = title;
        state.tasks[id].description = description;
        saveState(state);
      }
    },    
    deleteTask: (state, action) => {
      const deletedTaskId = action.payload;
    
      const task = state.tasks[deletedTaskId];
      if (!task) return;
    
      const { status } = task;
    
      delete state.tasks[deletedTaskId];
    
      state.columns[status].taskIds = state.columns[status].taskIds.filter(
        (taskId) => taskId !== deletedTaskId
      );
    
      saveState(state);
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
      saveState(state);
    },
  },
});

export const { addTask, updateTaskStatus, setSearchTerm, deleteTask, updateTask} = tasksSlice.actions;

export default tasksSlice.reducer;
