import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './components/Column';
import TaskForm from './components/TaskForm';
import { updateTaskStatus, setSearchTerm } from './redux/tasksSlice';
import { Container, TextField, Fab, Typography, InputAdornment, Paper, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';

const App = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formContent, setFormContent] = useState(null);
  const { tasks, columns, columnOrder, searchTerm } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    dispatch(updateTaskStatus({ taskId: draggableId, newStatus: destination.droppableId }));
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  return (
    <Container
      maxWidth="100%"
      sx={{
        padding: '24px',
        minHeight: '97.5vh',
        background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Paper
        elevation={5}
        sx={{
          padding: { xs: '16px', sm: '20px', md: '24px' },
          borderRadius: '16px',
          backgroundColor: '#ffffff',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '1250px',
        }}
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            fontWeight: 'bold',
            fontSize: { xs: '24px', sm: '32px', md: '44px' }, // Scalable font sizes
            background: 'linear-gradient(90deg, #1e3c72, #2a5298, #64b5f6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            paddingBottom: '10px',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}
        >
          Kanban Board
        </Typography>

        <TextField
          label="Search Tasks"
          fullWidth
          variant="outlined"
          margin="normal"
          onChange={handleSearch}
          value={searchTerm}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#1565c0', fontSize: '24px' }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '25px',
              backgroundColor: '#ffffff',
              padding: '5px 12px',
              transition: 'all 0.3s ease',
              '&:hover': {
                boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.15)',
              },
              '&.Mui-focused': {
                background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                border: '1px solid #1976d2',
                boxShadow: '0px 3px 12px rgba(0, 0, 0, 0.2)',
              },
            },
          }}
          sx={{
            marginBottom: '16px',
            borderRadius: '25px',
            backgroundColor: '#f9f9f9',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#ddd',
              },
              '&:hover fieldset': {
                borderColor: '#64b5f6',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
              },
            },
          }}
        />

        <DragDropContext onDragEnd={onDragEnd}>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'nowrap',
              overflowX: 'auto',
              gap: { xs: '8px', sm: '16px' }, // Responsive gaps
              justifyContent: { xs: 'flex-start', md: 'center' }, // Aligns better on small screens
              padding: '16px',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': { display: 'none' },
            }}
          >
            {columnOrder.map((columnId) => {
              const column = columns[columnId];
              const tasksInColumn = column.taskIds.map((taskId) => tasks[taskId]);

              return <Column key={column.id} column={column} tasks={tasksInColumn} searchTerm={searchTerm} setFormContent={setFormContent} />;
            })}
          </Box>
        </DragDropContext>
      </Paper>

      <Fab
        color="primary"
        aria-label="add"
        onClick={() => {
          setFormContent(null);
          setIsFormOpen(true);
        }}
        sx={{
          position: 'fixed',
          bottom: { xs: '15px', sm: '20px' },
          right: { xs: '15px', sm: '20px' },
          background: 'linear-gradient(135deg, #1976d2, #42a5f5)',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.2s ease-in-out',
          width: { xs: '50px', sm: '60px' },
          height: { xs: '50px', sm: '60px' },
          '&:hover': {
            background: 'linear-gradient(135deg, #1565c0, #1e88e5)',
            transform: 'scale(1.1)',
            boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.3)',
          },
          '&:active': {
            transform: 'scale(0.95)',
            boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        <AddIcon sx={{ fontSize: { xs: '24px', sm: '30px' } }} />
      </Fab>

      <TaskForm open={isFormOpen} handleClose={() => setIsFormOpen(false)} formContent={formContent} />
    </Container>
  );
};

export default App;
