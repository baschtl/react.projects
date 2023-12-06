import React from 'react';
import { createRoot } from 'react-dom/client';
import { nanoid } from "nanoid";

import App from './components/App';

const tasks = [
  { id: `todo-${nanoid()}`, name: "Eat", completed: true },
  { id: `todo-${nanoid()}`, name: "Sleep", completed: false },
  { id: `todo-${nanoid()}`, name: "Repeat", completed: false },
];

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App tasks={tasks} />
  </React.StrictMode>
);
