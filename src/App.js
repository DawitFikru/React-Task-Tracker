import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import { useEffect, useState } from "react";

function App() {
  const [showAddTask, setshowAddTask] = useState(true);

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const gettasks = async () => {
      const tasksfromserver = await fetchtasks();
      setTasks(tasksfromserver);
    };
    gettasks();
  }, []);
  // fetch task
  const fetchtasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();
    return data;
  };

  //add task

  const addTask = async (task) => {
    const res = await fetch("http://localhost/5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);

    // const id = Math.floor(Math.random() * 1000) + 1;
    //const newTask = { id, ...task };
    //setTasks([...tasks, newTask]);
  };

  // deleteTask
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });

    setTasks(tasks.filter((task) => task.id !== id));
  };
  //toggle reminder

  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              reminder: !task.reminder,
            }
          : task
      )
    );
  };
  return (
    <div className="container">
      {showAddTask && <AddTask onAdd={addTask} />}
      <Header
        title=" Task Tracker "
        showAdd={showAddTask}
        onAdd={() => setshowAddTask(!showAddTask)}
      />
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        <h3>No Task to Show</h3>
      )}
    </div>
  );
}

export default App;
