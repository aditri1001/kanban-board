import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import { Paper, Typography, Box } from '@mui/material';

const Column = ({ column, tasks, searchTerm, setFormContent }) => {
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Paper
      elevation={3}
      sx={{
        padding: '16px',
        margin: '8px',
        width: { xs: '100%', sm: '320px', md: '280px' },
        minHeight: '300px',
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontWeight: 'bold',
          color: '#2c3e50', // A deep, professional-looking color
          marginBottom: '12px',
          fontSize: { xs: '16px', sm: '18px', md: '20px' },
          letterSpacing: '0.5px',
          borderBottom: '1px solid rgb(0, 0, 0)', // A subtle bottom border for separation
          display: 'inline-block',
          paddingBottom: '4px',
        }}
      >
        {column.title}
      </Typography>



      <Droppable droppableId={column.id}>
        {(provided) => (
          <Box
            {...provided.droppableProps}
            ref={provided.innerRef}
            sx={{
              minHeight: '150px',
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              overflowY: 'auto',
              maxHeight: { xs: '300px', sm: '400px', md: '500px' },
              '&::-webkit-scrollbar': { width: '6px' },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#bbb',
                borderRadius: '6px',
              },
            }}
          >
            {filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                highlight={searchTerm && task.title.toLowerCase().includes(searchTerm.toLowerCase())}
                setFormContent={setFormContent}
              />
            ))}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Paper>
  );
};

export default Column;
