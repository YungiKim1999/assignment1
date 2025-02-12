import React from "react";
import { Droppable } from "react-beautiful-dnd";
import BoardTask from "../global/Task/BoardTask";

function TaskBoardColumn(props) {
  const { column, tasks, subTasks, handleList } = props;

  const [opened, setOpened] = React.useState(false);

  const onButtonClick = () => {
    setOpened(!opened);
  };

  return (
    <div className="column-container">
      <h1 className="column-container__heading">
        {column.title}
        <div className="column__sorting">
          <button
            type="button"
            className="column__sorting__button"
            onClick={onButtonClick}
            value={column}
          >
            ☰
          </button>
          {opened && (
            <div className="column__dropdown">
              <button
                type="button"
                className="column__dropdown__list"
                onClick={handleList(column.title, "date", false)}
              >
                Newest First
              </button>
              <button
                type="button"
                className="column__dropdown__list"
                onClick={handleList(column.title, "date", true)}
              >
                Oldest First
              </button>
              <button
                type="button"
                className="column__dropdown__list"
                onClick={handleList(column.title, "content", false)}
              >
                Alphabetically
              </button>
            </div>
          )}
        </div>
      </h1>

      {/* Droppable identified by it's title. Dnd library requires the contents of the droppable to be wrapped in (provided) */}
      <Droppable droppableId={column.title}>
        {(provided) => (
          <div
            className="column"
            // References and props for the drag-and-drop library
            innerRef={provided.innerRef}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {/* Create the list of tasks using a mapping function */}
            {tasks.map((task, index) => {
              const subTaskList = Object.values(subTasks);
              const filteredSubTasks = [];

              // Get all the subtasks for this task
              for (let pos = 0; pos < subTaskList.length; pos += 1) {
                if (task.subTasks.includes(subTaskList[pos].id)) {
                  filteredSubTasks.push(subTaskList[pos]);
                }
              }

              return (
                <BoardTask
                  id={task.id}
                  name={task.content}
                  index={index}
                  expanded={task.expanded}
                  checked={task.checked}
                  boardTask={task}
                  subtasks={filteredSubTasks}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default TaskBoardColumn;
