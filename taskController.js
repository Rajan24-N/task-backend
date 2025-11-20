const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../models/Task");

function validate(data, isUpdate = false) {
  const { title, status } = data;
  const validStatuses = ["pending", "in-progress", "completed"];

  if (!isUpdate && (!title || title.trim() === "")) {
    return "Title must not be empty.";
  }

  if (isUpdate && title !== undefined && title.trim() === "") {
    return "Title must not be empty.";
  }

  if (status && !validStatuses.includes(status)) {
    return "Status must be one of: pending, in-progress, completed.";
  }

  return null;
}

// Controllers
exports.createTask = (req, res) => {
  const error = validate(req.body);
  if (error) return res.status(400).json({ error });

  const task = createTask(req.body);
  res.status(201).json(task);
};

exports.getTasks = (req, res) => {
  res.status(200).json(getAllTasks());
};

exports.getTask = (req, res) => {
  const task = getTaskById(parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });

  res.status(200).json(task);
};

exports.updateTask = (req, res) => {
  const taskId = parseInt(req.params.id);
  const error = validate(req.body, true);
  if (error) return res.status(400).json({ error });

  const updated = updateTask(taskId, req.body);
  if (!updated) return res.status(404).json({ error: "Task not found" });

  res.status(200).json(updated);
};

exports.deleteTask = (req, res) => {
  const removed = deleteTask(parseInt(req.params.id));
  if (!removed) return res.status(404).json({ error: "Task not found" });

  res.status(200).json({ message: "Task deleted", task: removed });
};
