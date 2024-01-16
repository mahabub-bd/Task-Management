import { useState } from "react";
import AddTaskModal from "./AddTaskModal";
import SearchTask from "./SearchTask";
import TaskAction from "./TaskAction";
import TaskList from "./TaskList";

export default function TaskBoard() {
  const defaultTask = {
    id: crypto.randomUUID(),
    title: "Learn React Native",
    description:
      "I want to Learn React such thanI can treat it like my slave and make it do whatever I want to do.",
    tags: ["Web", "React", "Angular"],
    priority: "High",
    isFavorite: true,
  };

  const [tasks, setTasks] = useState([defaultTask]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState(null);

  function handleAddTask(newTask, isAdd) {
    if (isAdd) {
      setTasks([...tasks, newTask]);
    } else {
      const updatedTasks = tasks.map(
        (task) => (task.id === newTask.id ? newTask : task) // Use map to create a new array with the updated task
      );

      setTasks(updatedTasks);
    }
    setShowAddModal(false);
  }

  function handleEditTask(editTask) {
    setTaskToUpdate(editTask);
    setShowAddModal(true);
    console.log(editTask);
  }
  return (
    <section className="mb-20" id="tasks">
      {showAddModal && (
        <AddTaskModal onSave={handleAddTask} taskToUpdate={taskToUpdate} />
      )}
      <div className="container">
        <SearchTask />
        <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">
          <TaskAction onAddClick={() => setShowAddModal(true)} />
          <TaskList tasks={tasks} onEdit={handleEditTask} />
        </div>
      </div>
    </section>
  );
}
