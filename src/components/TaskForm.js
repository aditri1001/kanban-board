import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask, updateTask, deleteTask } from '../redux/tasksSlice';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

const TaskForm = ({ open, handleClose, formContent }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleAddTask = () => {
    if (!title.trim()) return; // Prevent empty tasks

    const newTask = {
      id: `task-${Date.now()}`,
      title,
      description,
      status: 'todo',
    };

    dispatch(addTask(newTask));
    setTitle('');
    setDescription('');
    handleClose();
  };

  const handleUpdateTask = () => {
    if (!title.trim()) return;
  
    const updatedTask = {
      id: formContent.id,
      title,
      description,
    };
  
    dispatch(updateTask(updatedTask));
    handleClose();
  };
  
  const handleDeleteTask = () => {
    dispatch(deleteTask(formContent.id));
    handleClose();
  };

  useEffect(() => {
    if (formContent) {
      setTitle(formContent.title || '');
      setDescription(formContent.description || '');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [formContent]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: '400px' },
          maxWidth: '500px',
          minWidth: '250px',
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: '12px',
          p: { xs: 2, sm: 3 },
          marginHorizontal: "10px"
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            textAlign: 'center',
            fontSize: { xs: '18px', sm: '20px' },
          }}
        >
          {formContent ? `${formContent?.title}` : 'Add a New Task'}
        </Typography>

        <TextField
          label="Task Title"
          fullWidth
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ borderRadius: '8px', fontSize: { xs: '14px', sm: '16px' } }}
        />

        <TextField
          label="Task Description"
          fullWidth
          variant="outlined"
          margin="normal"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          sx={{ borderRadius: '8px', fontSize: { xs: '14px', sm: '16px' } }}
        />
        
        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{ 
            mt: 2, 
            borderRadius: '8px', 
            fontWeight: 'bold',
            fontSize: { xs: '14px', sm: '16px' } 
          }} 
          onClick={formContent ? handleUpdateTask : handleAddTask}
        >
          {formContent ? 'Update Task' : 'Add Task'}
        </Button>

        {formContent && (
          <Button
            variant="contained"
            color="error"
            fullWidth
            sx={{ 
              mt: 2, 
              borderRadius: '8px', 
              fontWeight: 'bold',
              fontSize: { xs: '14px', sm: '16px' } 
            }}
            onClick={handleDeleteTask}
          >
            Delete Task
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default TaskForm;
