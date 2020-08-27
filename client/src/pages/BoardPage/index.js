import React, { useState, useEffect } from 'react'
import Column from '../../components/column';
import { useParams } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';
import { useHttp } from '../../hooks/httpHook';
//MUI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
//icons
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles({
  wrapper: {
    width: '100%',
    overflow: 'auto',
    height: 'calc(100vh - 100px)'
  },
  columnWrapper: {
    display: 'flex',
  },
  createCOlumnButton: {
    minWidth: '250px',
    border: '1px solid grey',
    borderRadius: '5px',
    margin: '8px',
  }
});

const BoardPage = (props) => {
  const classes = useStyles(props);
  const { id } = useParams();
  const { request, loading } = useHttp();

  const [initialData, setInitialData] = useState(
    {
      tasks: {
        // 'task-1': { id: 'task-1', content: 'Take out the garbage' },
        // 'task-2': { id: 'task-2', content: 'Watch my favorite show' },
        // 'task-3': { id: 'task-3', content: 'Charge my phone' },
        // 'task-4': { id: 'task-4', content: 'Cook dinner' },
      },
      columns: {
        // 'column-1': {
        //   id: 'column-1',
        //   title: 'To do',
        //   taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
        // },
        // 'column-2': {
        //   id: 'column-2',
        //   title: 'In progress',
        //   taskIds: [],
        // },
        // 'column-3': {
        //   id: 'column-3',
        //   title: 'Done',
        //   taskIds: [],
        // },
      },
      // Facilitate reordering of the columns
      // 'column-1', 'column-2', 'column-3'
      columnOrder: [],
    }
  );

  useEffect(() => {

    const getData = async () => {
      let data = await request(`/boards/${id}`, 'get');
      if (data) {
        let newData = {
          tasks: {},
          columns: {},
          columnOrder: [],
        }

        let columns = data.columns;
        if (columns.length) {
          columns.forEach((column) => {
            newData = {
              ...newData,
              [column.id]: {
                id: column.id,
                title: column.title,
                taskIds: column.taskIds
              }
            }
          })
        }

        let tasks = data.tasks;
        if (tasks.length) {
          tasks.forEach((task) => {
            newData = {
              ...newData,
              [task.id]: {
                id: task.id,
                content: task.content,
              }
            }
          })
        }

        setInitialData(newData);
      }
    }
    getData();
  }, [])

  const onDragStart = start => {
    const homeIndex = initialData.columnOrder.indexOf(start.source.droppableId);
    setInitialData({
      ...initialData,
      homeIndex
    })
  }

  const onDragEnd = (result) => {
    setInitialData({
      ...initialData,
      homeIndex: null
    })
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const start = initialData.columns[source.droppableId];
    const finish = initialData.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      };

      const newState = {
        ...initialData,
        columns: {
          ...initialData.columns,
          [newColumn.id]: newColumn,
        }
      }
      setInitialData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds
    }

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    }

    const newState = {
      ...initialData,
      columns: {
        ...initialData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish
      }
    }
    setInitialData(newState);
    return;
  }

  const addColumn = () => {
    let columnId = new Date().toJSON();
    let newColumn = {
      id: columnId,
      title: 'Новая колонка',
      taskIds: []
    };

    let newOrder = initialData.columnOrder;
    newOrder.push(columnId);

    setInitialData({
      ...initialData,
      columns: {
        ...initialData.columns,
        [columnId]: newColumn
      },
      columnOrder: newOrder
    })
  }

  return (
    // <AuthPage />
    <DragDropContext
      onDragEnd={onDragEnd}
      onDragStart={onDragStart}
    >
      <Grid className={classes.wrapper}>
        <Grid className={classes.columnWrapper}>
          {
            initialData.columnOrder.map((columnId, index) => {
              const column = initialData.columns[columnId];
              const tasks = column.taskIds.map(taskId => initialData.tasks[taskId]);
              const isDropDisabled = index < initialData.homeIndex;
              return <Column initialData={initialData} setInitialData={setInitialData} key={column.id} column={column} tasks={tasks} isDropDisabled={isDropDisabled} />;
            })
          }
          <Button onClick={addColumn} className={classes.createCOlumnButton}>
            <AddIcon fontSize="large" />
          </Button>
        </Grid> 
      </Grid>
    </DragDropContext>
  )
}

export default BoardPage
