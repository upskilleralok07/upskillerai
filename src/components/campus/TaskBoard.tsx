import { useState, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  MoreVertical,
  Eye,
  EyeOff,
  Calendar,
  Tag,
  CheckSquare,
  Square,
  GripVertical,
  Trash2,
  Edit,
} from "lucide-react";
import { cn } from "@/lib/utils";

type TaskStatus = "todo" | "in_progress" | "done" | "see_later";

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  category?: string;
  dueDate?: string;
  subtasks: Subtask[];
  hidden: boolean;
  createdAt: string;
}

interface TaskBoardProps {
  studentId: string;
  className?: string;
}

const STORAGE_KEY = "campus_personal_tasks";

const COLUMNS: { id: TaskStatus; title: string; color: string }[] = [
  { id: "todo", title: "To Do", color: "border-l-muted-foreground" },
  { id: "in_progress", title: "In Progress", color: "border-l-primary" },
  { id: "done", title: "Done", color: "border-l-success" },
  { id: "see_later", title: "See Later", color: "border-l-warning" },
];

const CATEGORIES = [
  { id: "work", label: "Work", color: "bg-primary text-primary-foreground" },
  { id: "study", label: "Study", color: "bg-info text-white" },
  { id: "project", label: "Project", color: "bg-success text-white" },
  { id: "personal", label: "Personal", color: "bg-streak text-white" },
];

export function TaskBoard({ studentId, className }: TaskBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_${studentId}`);
    return saved ? JSON.parse(saved) : [];
  });
  const [showHidden, setShowHidden] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "",
    dueDate: "",
  });

  const saveTasks = useCallback((updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    localStorage.setItem(`${STORAGE_KEY}_${studentId}`, JSON.stringify(updatedTasks));
  }, [studentId]);

  const addTask = () => {
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: crypto.randomUUID(),
      title: newTask.title,
      description: newTask.description,
      status: "todo",
      category: newTask.category || undefined,
      dueDate: newTask.dueDate || undefined,
      subtasks: [],
      hidden: false,
      createdAt: new Date().toISOString(),
    };

    saveTasks([...tasks, task]);
    setNewTask({ title: "", description: "", category: "", dueDate: "" });
    setIsDialogOpen(false);
  };

  const updateTaskStatus = (taskId: string, status: TaskStatus) => {
    saveTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status } : task
      )
    );
  };

  const toggleTaskHidden = (taskId: string) => {
    saveTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, hidden: !task.hidden } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    saveTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleSubtask = (taskId: string, subtaskId: string) => {
    saveTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: task.subtasks.map((st) =>
                st.id === subtaskId ? { ...st, completed: !st.completed } : st
              ),
            }
          : task
      )
    );
  };

  const addSubtask = (taskId: string, title: string) => {
    saveTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              subtasks: [
                ...task.subtasks,
                { id: crypto.randomUUID(), title, completed: false },
              ],
            }
          : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => showHidden || !task.hidden);

  const getColumnTasks = (status: TaskStatus) =>
    filteredTasks.filter((task) => task.status === status);

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Personal Tasks</h2>
          <p className="text-sm text-muted-foreground">
            Manage your personal study tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHidden(!showHidden)}
            className="text-muted-foreground"
          >
            {showHidden ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span className="ml-2">{showHidden ? "Hide" : "Show"} hidden</span>
          </Button>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Task
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Task</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <Input
                    placeholder="Task title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Textarea
                    placeholder="Description (supports markdown)"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <Input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) =>
                        setNewTask({ ...newTask, dueDate: e.target.value })
                      }
                    />
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex-1">
                        <Tag className="w-4 h-4 mr-2" />
                        {newTask.category || "Category"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {CATEGORIES.map((cat) => (
                        <DropdownMenuItem
                          key={cat.id}
                          onClick={() =>
                            setNewTask({ ...newTask, category: cat.id })
                          }
                        >
                          {cat.label}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Button onClick={addTask} className="w-full">
                  Create Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {COLUMNS.map((column) => (
          <div key={column.id} className="kanban-column">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">{column.title}</h3>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {getColumnTasks(column.id).length}
              </span>
            </div>

            <div className="space-y-3">
              {getColumnTasks(column.id).map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  column={column}
                  onStatusChange={updateTaskStatus}
                  onToggleHidden={toggleTaskHidden}
                  onDelete={deleteTask}
                  onToggleSubtask={toggleSubtask}
                  onAddSubtask={addSubtask}
                />
              ))}

              {getColumnTasks(column.id).length === 0 && (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No tasks
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface TaskCardProps {
  task: Task;
  column: { id: TaskStatus; color: string };
  onStatusChange: (id: string, status: TaskStatus) => void;
  onToggleHidden: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onAddSubtask: (taskId: string, title: string) => void;
}

function TaskCard({
  task,
  column,
  onStatusChange,
  onToggleHidden,
  onDelete,
  onToggleSubtask,
  onAddSubtask,
}: TaskCardProps) {
  const [newSubtask, setNewSubtask] = useState("");
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);

  const category = CATEGORIES.find((c) => c.id === task.category);
  const completedSubtasks = task.subtasks.filter((st) => st.completed).length;

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      onAddSubtask(task.id, newSubtask);
      setNewSubtask("");
      setShowSubtaskInput(false);
    }
  };

  return (
    <div
      className={cn(
        "kanban-card border-l-4",
        column.color,
        task.hidden && "opacity-50"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm truncate">{task.title}</h4>
          {task.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {COLUMNS.filter((c) => c.id !== task.status).map((col) => (
              <DropdownMenuItem
                key={col.id}
                onClick={() => onStatusChange(task.id, col.id)}
              >
                Move to {col.title}
              </DropdownMenuItem>
            ))}
            <DropdownMenuItem onClick={() => onToggleHidden(task.id)}>
              {task.hidden ? (
                <>
                  <Eye className="w-4 h-4 mr-2" /> Show
                </>
              ) : (
                <>
                  <EyeOff className="w-4 h-4 mr-2" /> Hide
                </>
              )}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(task.id)}
              className="text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        {category && (
          <Badge variant="secondary" className={cn("text-xs", category.color)}>
            {category.label}
          </Badge>
        )}
        {task.dueDate && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(task.dueDate).toLocaleDateString()}
          </span>
        )}
        {task.subtasks.length > 0 && (
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <CheckSquare className="w-3 h-3" />
            {completedSubtasks}/{task.subtasks.length}
          </span>
        )}
      </div>

      {/* Subtasks */}
      {task.subtasks.length > 0 && (
        <div className="mt-3 space-y-1">
          {task.subtasks.map((subtask) => (
            <button
              key={subtask.id}
              onClick={() => onToggleSubtask(task.id, subtask.id)}
              className="flex items-center gap-2 w-full text-left text-xs"
            >
              {subtask.completed ? (
                <CheckSquare className="w-3 h-3 text-success" />
              ) : (
                <Square className="w-3 h-3 text-muted-foreground" />
              )}
              <span
                className={cn(
                  subtask.completed && "line-through text-muted-foreground"
                )}
              >
                {subtask.title}
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Add subtask */}
      {showSubtaskInput ? (
        <div className="mt-3 flex gap-2">
          <Input
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            placeholder="Subtask..."
            className="h-7 text-xs"
            onKeyDown={(e) => e.key === "Enter" && handleAddSubtask()}
          />
          <Button size="sm" className="h-7 px-2" onClick={handleAddSubtask}>
            Add
          </Button>
        </div>
      ) : (
        <button
          onClick={() => setShowSubtaskInput(true)}
          className="mt-3 text-xs text-muted-foreground hover:text-foreground flex items-center gap-1"
        >
          <Plus className="w-3 h-3" /> Add subtask
        </button>
      )}
    </div>
  );
}
