/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer, useEffect } from "react";

const CounterContext = createContext();

const initialState = {
  isLoading: false,
  pending: [],
  completed: [],
};

// Load tasks from local storage
const loadStateFromLocalStorage = () => {
  const storedState = localStorage.getItem("tasks");
  return storedState ? JSON.parse(storedState) : initialState;
};

function reducer(state, action) {
  switch (action.type) {
    case "task/add":
      return {
        ...state,
        pending: [...state.pending, action.payload],
      };

    case "task/completed":
      return {
        ...state,
        pending: state.pending.filter((task) => task.task_id !== action.payload.task_id),
        completed: [...state.completed, action.payload],
      };

    case "task/uncompleted":
      return {
        ...state,
        completed: state.completed.filter((task) => task.task_id !== action.payload.task_id),
        pending: [...state.pending, action.payload],
      };

    case "task/delete":
      return {
        ...state,
        pending: state.pending.filter((task) => task.task_id !== action.payload.task_id),
        completed: state.completed.filter((task) => task.task_id !== action.payload.task_id),
      };

    default:
      return state;
  }
}

function TaskProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, loadStateFromLocalStorage());

  // Effect to store the tasks in local storage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(state));
  }, [state]);

  const { pending, completed } = state;
  const alltasksLength = pending.length + completed.length;

  return (
    <CounterContext.Provider value={{ pending, completed, dispatch, alltasksLength }}>
      {children}
    </CounterContext.Provider>
  );
}

function useTask() {
  const context = useContext(CounterContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
}

export { TaskProvider, useTask };
