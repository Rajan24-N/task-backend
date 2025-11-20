let tasks = [];
let idCounter = 1;

function getAllTasks() {
  return tasks;
}

function getTaskById(id) {
  return tasks.find((task) => task.id === id);
}

function createTask(data) {
  const newTask = {
    id: idCounter++,
    title: data.title,
    description: data.description || "",
    status: data.status || "pending",
    createdAt: new Date().toISOString(),
  };

  tasks.push(newTask);
  return newTask;
}

function updateTask(id, updates) {
  const task = getTaskById(id);
  if (!task) return null;

  if (updates.title !== undefined) task.title = updates.title;
  if (updates.description !== undefined) task.description = updates.description;
  if (updates.status !== undefined) task.status = updates.status;

  return task;
}

function deleteTask(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) return null;

  return tasks.splice(index, 1)[0];
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
