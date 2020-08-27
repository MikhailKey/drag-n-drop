import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd';
//MUI
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
const useStyles = makeStyles({
  taskContainer: {
    borderRadius: '2px',
    padding: '8px',
    marginBottom: '8px',
    transition: 'background-color 0.2s ease',
    display: 'flex',
  },
  handle: {
    width: '20px',
    height: '20px',
    border0Radius: '4px',
    marginRight: '8px',
    borderRadius: '5px',
  },
  editTaskField: {
    position: 'relative',
  },
  confirmButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: 'translateY(110%)',
    zIndex: 500,
  }
});
const Task = (props) => {
  const { task, initialData, setInitialData } = props;
  const [openEdit, setOpenEdit] = useState(false);
  const [value, setValue] = useState(task.content);
  const classes = useStyles(props);

  const confirmEditTask = () => {
    let tasks = initialData.tasks;
    for (let key in tasks) {
      if (tasks[key].id === task.id) {
        tasks[key].content = value
      }
    }

    setInitialData({
      ...initialData,
      tasks
    })

    setOpenEdit(false);
  }

  return (
    <>
      {
        !openEdit ? (
          <Draggable draggableId={task.id} index={props.index}>
            {(provided, snapshot) => (
              <Card onClick={() => setOpenEdit(true)} variant="outlined" className={classes.taskContainer}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                innerRef={provided.innerRef}
              >
                {task.content}
              </Card>
            )}
          </Draggable>
        ) : (
            <ClickAwayListener onClickAway={() => setOpenEdit(false)}>
              <form onSubmit={confirmEditTask} className={classes.editTaskField}>
                <TextField autoFocus={true} value={value} onChange={(e) => setValue(e.target.value)} fullWidth label="Изменить задачу" variant="outlined" />
                <Button type="submit" color="secondary" variant="contained" className={classes.confirmButton}>
                  Сохранить
                </Button>
              </form>
            </ClickAwayListener>
          )
      }
    </>
  );
}

export default Task
