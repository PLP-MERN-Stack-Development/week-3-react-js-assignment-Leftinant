import React, { useState, useEffect } from "react";
import useLocalStorage from "../utils/useLocalStorage";
import Card from "./Card";
import { Button } from "@/components/ui/button";

const TaskManager = () => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [input, setInput] = useState("");
  const [filter, setFilter] = useState("All");

  const addTask = () => {
    if (input.trim()) {
      setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const filteredTasks = {
    All: tasks,
    Active: tasks.filter((t) => !t.completed),
    Completed: tasks.filter((t) => t.completed),
  }[filter];

  return (
    <div className='md:mx-20 max-w-full mx-4'>
      <h2 className='text-xl mb-2'>Task Manager</h2>
      <div className='flex mb-4'>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Add a task'
          className='border p-2 flex-grow mr-2'
        />
        <Button onClick={addTask}>Add</Button>
      </div>
      <div className='flex gap-2 mb-4'>
        {["All", "Active", "Completed"].map((f) => (
          <Button
            key={f}
            variant={filter === f ? "primary" : "secondary"}
            onClick={() => setFilter(f)}
          >
            {f}
          </Button>
        ))}
      </div>
      {filteredTasks.map((task) => (
        <Card key={task.id}>
          <div className='flex justify-between items-center'>
            <span
              className={task.completed ? "line-through text-gray-500" : ""}
            >
              {task.text}
            </span>
            <div className='flex gap-2'>
              <Button
                variant='secondary'
                onClick={() => toggleComplete(task.id)}
              >
                {task.completed ? "Undo" : "Complete"}
              </Button>
              <Button variant='danger' onClick={() => deleteTask(task.id)}>
                Delete
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TaskManager;
