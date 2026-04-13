import React, { useState } from "react";

interface Task {
  taskName: string;
  description: string;
  time: string;
  status: string;
  priority: string;
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [newTask, setNewTask] = useState<Task>({
    taskName: "",
    description: "",
    time: "",
    status: "",
    priority: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewTask((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTask = () => {
    setTasks([...tasks, newTask]);

    setNewTask({
      taskName: "",
      description: "",
      time: "",
      status: "",
      priority: ""
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <h1 className="text-3xl mb-6 font-bold text-purple-400">
        Task Manager
      </h1>
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-700">

          <thead className="bg-gray-800">
            <tr>
              <th className="p-3 border">Task Name</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Time</th>
              <th className="p-3 border">Status</th>
              <th className="p-3 border">Priority</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task, index) => (
              <tr key={index} className="text-center border-t border-gray-700">
                <td className="p-2">{task.taskName}</td>
                <td className="p-2">{task.description}</td>
                <td className="p-2">{task.time}</td>
                <td className="p-2">{task.status}</td>
                <td className="p-2">{task.priority}</td>
              </tr>
            ))}
            <tr className="border-t border-gray-700">
              <td className="border-1">
                <input
                  name="taskName"
                  value={newTask.taskName}
                  onChange={handleChange}
                  className="w-full bg-gray-800 p-2 outline-none"
                  placeholder="Task Name"
                />
              </td>

              <td className="border-1">
                <input
                  name="description"
                  value={newTask.description}
                  onChange={handleChange}
                  className="w-full bg-gray-800 p-2 outline-none"
                  placeholder="Description"
                />
              </td>

              <td className="border-1">
                <input
                  type="datetime-local"
                  name="time"
                  value={newTask.time}
                  onChange={handleChange}
                  className="w-full bg-gray-800 p-2 outline-none"
                  placeholder="Time"
                />
              </td>

              <td className="border-1">
                <input
                  name="status"
                  value={newTask.status}
                  onChange={handleChange}
                  className="w-full bg-gray-800 p-2 outline-none"
                  placeholder="Status"
                />
              </td>

              <td className="border-1">
                <input
                  name="priority"
                  value={newTask.priority}
                  onChange={handleChange}
                  className="w-full bg-gray-800 p-2 outline-none"
                  placeholder="Priority"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="mt-4">
        <button
          onClick={handleAddTask}
          className="bg-purple-500 hover:bg-purple-600 px-6 py-2 rounded-lg"
        >
          + Add Task
        </button>
      </div>
    </div>
  );
};

export default Tasks;