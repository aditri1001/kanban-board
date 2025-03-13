import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography } from '@mui/material';
import TaskForm from './TaskForm';

const statusColors = {
  todo: 'rgb(252, 224, 178)',
  inProgress: 'rgb(255, 200, 208)',
  peerReview: 'rgb(193, 229, 255)',
  done: 'rgb(193, 255, 198)',
};

const TaskCard = ({ task, index, highlight, setFormContent }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <Card
            {...provided.draggableProps}
            ref={provided.innerRef}
            onClick={() => {
              setFormContent(task);
              setIsFormOpen(true);
            }}
            sx={{
              marginBottom: '10px',
              backgroundColor: highlight ? '#fff9c4' : statusColors[task.status] || '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              transition: 'background-color 0.3s ease-in-out, transform 0.2s',
              padding: { xs: '8px', sm: '12px' },
              '&:hover': {
                boxShadow: { sm: '0 4px 8px rgba(107, 106, 106, 0.15)' },
              },
            }}
          >
            <CardContent 
              {...provided.dragHandleProps} 
              onMouseDown={(e) => e.stopPropagation()} 
              sx={{
                cursor: 'grab',
                userSelect: 'none',
              }}
            >
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 'bold', 
                  color: '#333', 
                  marginBottom: '4px',
                  fontSize: { xs: '14px', sm: '16px', md: '18px' },
                }}
              >
                {task.title}
              </Typography>
              <Typography 
                variant="body2" 
                color="text.secondary"
                sx={{
                  fontSize: { xs: '12px', sm: '14px' },
                }}
              >
                {task.description}
              </Typography>
            </CardContent>
          </Card>
        )}
      </Draggable>

      <TaskForm open={isFormOpen} handleClose={() => setIsFormOpen(false)} formContent={task}/>
    </>
  );
};

export default TaskCard;
