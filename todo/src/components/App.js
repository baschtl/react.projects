import React, { useEffect, useRef, useState } from 'react';
import { nanoid } from "nanoid";

import usePrevious from '../hooks/usePrevious';

import Todo from './Todo';
import Form from './Form';
import FilterButton from './FilterButton';

const FILTER_MAP = {
  All: () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [filter, setFilter] = useState('All');

  const listHeadingRef = useRef(null);

  const prevTaskLength = usePrevious(tasks.length);

  // Task callbacks
  const addTask = (name) => {
    setTasks([...tasks, { id: `todo-${nanoid()}`, name: name, completed: false }]);
  };
  const toggleTaskCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }

      return task;
    });

    setTasks(updatedTasks);
  };
  const editTask = (id, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return {...task, name: newName}
      }

      return task;
    });

    setTasks(updatedTasks);
  };
  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);

    setTasks(remainingTasks);
  };

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map(task => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));
  const numIncompleted = taskList.filter(task => !task.completed).length;
  const listHeading = `${numIncompleted} ${numIncompleted === 1 ? 'task' : 'tasks'}`;

  return (
    <div className="todoapp stack-large">
      <h1>Todo</h1>
      <Form onSubmit={addTask} />

      <div className="filters btn-group stack-exception">
        {
          FILTER_NAMES.map(name => (
            <FilterButton
              key={name}
              name={name}
              isPressed={name === filter}
              onSetFilter={setFilter}
            />
          ))
        }
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
        {listHeading}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">

        {taskList}
      </ul>
    </div>
  );
}
