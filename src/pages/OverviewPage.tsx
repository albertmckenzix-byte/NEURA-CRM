import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Users,
  Plus,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Filter,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  X,
} from 'lucide-react';
import Customer360Drawer from '../components/crm/Customer360Drawer';
import { getOrCreateProfile, type Customer360Profile } from '../data/customer360Data';

interface ProjectRow {
  id: string;
  name: string;
  subName: string;
  status: 'In Progress' | 'Completed' | 'At Risk' | 'In Review';
  progress: number;
  priority: 'High' | 'Medium' | 'Low' | 'Urgent';
  deadline: string;
}

interface KanbanTask {
  id: string;
  title: string;
  description: string;
  priority: 'High' | 'Medium' | 'Low' | 'Urgent';
  comments: number;
  deadline: string;
}

export default function OverviewPage() {
  const [timeScope, setTimeScope] = useState<'Daily' | 'Weekly' | 'Monthly'>('Daily');
  const [selectedDate, setSelectedDate] = useState<number>(26);
  const [currentMonth, setCurrentMonth] = useState('February 2026');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);

  // Customer 360 Slide-over Drawer State
  const [selected360Profile, setSelected360Profile] = useState<Customer360Profile | null>(null);
  const [is360DrawerOpen, setIs360DrawerOpen] = useState(false);

  const handleOpen360 = (
    id: string,
    name: string,
    company: string,
    type: 'contact' | 'deal' = 'deal',
    extra?: Partial<Customer360Profile>
  ) => {
    const profile = getOrCreateProfile(id, name, company, type, extra);
    setSelected360Profile(profile);
    setIs360DrawerOpen(true);
  };

  // Projects table data (matches Image 1)
  const [projects, setProjects] = useState<ProjectRow[]>([
    {
      id: 'p1',
      name: 'Website Redesign',
      subName: 'Project Name',
      status: 'In Progress',
      progress: 68,
      priority: 'High',
      deadline: 'Apr 22',
    },
    {
      id: 'p2',
      name: 'Mobile App V2',
      subName: 'Sarah Lee',
      status: 'Completed',
      progress: 100,
      priority: 'Medium',
      deadline: 'Mar 30',
    },
    {
      id: 'p3',
      name: 'CRM Platform',
      subName: 'John Carter',
      status: 'At Risk',
      progress: 42,
      priority: 'High',
      deadline: 'Apr 14',
    },
    {
      id: 'p4',
      name: 'Marketing Campaign',
      subName: 'Marketing Campaign',
      status: 'In Review',
      progress: 86,
      priority: 'Medium',
      deadline: 'Apr 10',
    },
  ]);

  // Task Board columns (matches Image 1)
  const [tasks, setTasks] = useState<{
    backlog: KanbanTask[];
    todo: KanbanTask[];
    inProgress: KanbanTask[];
  }>({
    backlog: [
      {
        id: 't1',
        title: 'Research competitor analysis',
        description: 'Analyze top 5 competitors in the market',
        priority: 'Medium',
        comments: 2,
        deadline: 'Mar 15',
      },
    ],
    todo: [
      {
        id: 't2',
        title: 'Design homepage mockup',
        description: 'Create high-fidelity mockup for new homepage',
        priority: 'High',
        comments: 3,
        deadline: 'Mar 18',
      },
    ],
    inProgress: [
      {
        id: 't3',
        title: 'Implement user authentication',
        description: 'Build login and signup functionality',
        priority: 'Urgent',
        comments: 4,
        deadline: 'Mar 20',
      },
    ],
  });

  // New Project Form State
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectAssignee, setNewProjectAssignee] = useState('');
  const [newProjectPriority, setNewProjectPriority] = useState<'High' | 'Medium' | 'Low'>('Medium');
  const [newProjectDeadline, setNewProjectDeadline] = useState('May 15');

  // New Task Form State
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDesc, setNewTaskDesc] = useState('');
  const [newTaskCol, setNewTaskCol] = useState<'backlog' | 'todo' | 'inProgress'>('backlog');

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectName.trim()) return;
    const newProj: ProjectRow = {
      id: `p-${Date.now()}`,
      name: newProjectName,
      subName: newProjectAssignee || 'Unassigned',
      status: 'In Progress',
      progress: 10,
      priority: newProjectPriority,
      deadline: newProjectDeadline,
    };
    setProjects([newProj, ...projects]);
    setNewProjectName('');
    setNewProjectAssignee('');
    setShowCreateModal(false);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    const item: KanbanTask = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      description: newTaskDesc || 'Task details and progress',
      priority: 'Medium',
      comments: 0,
      deadline: 'Apr 01',
    };
    setTasks((prev) => ({
      ...prev,
      [newTaskCol]: [...prev[newTaskCol], item],
    }));
    setNewTaskTitle('');
    setNewTaskDesc('');
    setShowTaskModal(false);
  };

  // Helper for Status Pill Colors
  const getStatusBadge = (status: ProjectRow['status']) => {
    switch (status) {
      case 'In Progress':
        return 'bg-[#e0f2fe] text-[#0369a1]';
      case 'Completed':
        return 'bg-[#dcfce7] text-[#15803d]';
      case 'At Risk':
        return 'bg-[#fee2e2] text-[#e11d48]';
      case 'In Review':
        return 'bg-[#fef9c3] text-[#a16207]';
      default:
        return 'bg-neutral-100 text-neutral-700';
    }
  };

  // Helper for Priority Pill Colors
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'bg-[#fee2e2] text-[#b91c1c]';
      case 'High':
        return 'bg-[#fee2e2] text-[#e11d48]';
      case 'Medium':
        return 'bg-[#fef3c7] text-[#b45309]';
      case 'Low':
        return 'bg-neutral-100 text-neutral-600';
      default:
        return 'bg-neutral-100 text-neutral-600';
    }
  };

  // Days in February 2026 (28 days)
  const calendarDays = Array.from({ length: 28 }, (_, i) => i + 1);

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* 1. GREETING & WORKSPACE CONTROLS BAR (Image 1 top greeting) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
        <div>
          <h1 className="text-2xl md:text-[26px] font-bold text-neutral-900 tracking-tight flex items-center gap-2">
            Welcome back, Albert <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs text-neutral-500 mt-0.5 font-normal">
            Here's a quick overview of your workspace today.
          </p>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Today Dropdown Pill */}
          <div className="relative">
            <button
              type="button"
              className="bg-white/80 hover:bg-white border border-neutral-200/60 shadow-sm rounded-full px-3.5 py-1.5 text-xs font-medium text-neutral-700 flex items-center gap-1.5 transition"
            >
              <CalendarIcon size={13} className="text-neutral-500" />
              <span>Today</span>
              <ChevronDown size={13} className="text-neutral-400" />
            </button>
          </div>

          {/* Segmented Switcher (Daily / Weekly / Monthly) */}
          <div className="bg-neutral-200/60 p-1 rounded-full flex items-center gap-0.5 border border-black/[0.03]">
            {(['Daily', 'Weekly', 'Monthly'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setTimeScope(tab)}
                className={`px-3 py-1 text-xs rounded-full transition-all duration-150 ${
                  timeScope === tab
                    ? 'bg-white text-neutral-900 font-semibold shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Black Primary Action Button */}
          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition hover:scale-[1.01]"
          >
            <Plus size={14} />
            <span>Create Project</span>
          </button>
        </div>
      </div>

      {/* 2. QUICK METRIC NUMBERS ROW (Image 1 metrics) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Total Projects */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/40 border border-white/60">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-neutral-700 shadow-sm shrink-0">
            <FolderKanban size={17} />
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 leading-tight">28</div>
            <div className="text-xs text-neutral-500 font-normal">Total Projects</div>
          </div>
        </div>

        {/* Active Tasks */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/40 border border-white/60">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-neutral-700 shadow-sm shrink-0">
            <CheckCircle2 size={17} />
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 leading-tight">1,324</div>
            <div className="text-xs text-neutral-500 font-normal">Active Tasks</div>
          </div>
        </div>

        {/* Overdue Tasks */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/40 border border-white/60">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-neutral-700 shadow-sm shrink-0">
            <Clock size={17} />
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 leading-tight">23</div>
            <div className="text-xs text-neutral-500 font-normal">Overdue Tasks</div>
          </div>
        </div>

        {/* Team Members */}
        <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/40 border border-white/60">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-neutral-700 shadow-sm shrink-0">
            <Users size={17} />
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 leading-tight">46</div>
            <div className="text-xs text-neutral-500 font-normal">Team Members</div>
          </div>
        </div>
      </div>

      {/* 3. MAIN DASHBOARD CONTENT GRID (Left Column ~63%, Right Column ~37%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* ================= LEFT COLUMN (lg:col-span-8) ================= */}
        <div className="lg:col-span-8 space-y-5">
          {/* CARD 1: PROJECTS OVERVIEW TABLE */}
          <div className="bg-white rounded-[26px] p-6 shadow-sm border border-neutral-100">
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-neutral-100">
              <div>
                <h2 className="text-base font-bold text-neutral-900">Projects</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Your active projects overview
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-3.5 py-1.5 text-xs font-medium flex items-center gap-1.5 transition"
              >
                <Plus size={13} />
                <span>New Project</span>
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[11px] text-neutral-400 font-medium">
                    <th className="py-3 font-medium">Project Name</th>
                    <th className="py-3 font-medium">Status</th>
                    <th className="py-3 font-medium min-w-[130px]">Progress</th>
                    <th className="py-3 font-medium text-center">Priority</th>
                    <th className="py-3 font-medium">Deadline</th>
                    <th className="py-3 font-medium text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100/80 text-xs">
                  {projects.map((proj) => (
                    <tr
                      key={proj.id}
                      onClick={() =>
                        handleOpen360(proj.id, proj.name, proj.subName, 'deal', {
                          status: proj.status,
                          dealValue: proj.id === 'p1' ? '$48,000' : proj.id === 'p2' ? '$34,500' : proj.id === 'p3' ? '$59,000' : '$62,000',
                          stage: proj.status,
                        })
                      }
                      className="hover:bg-neutral-50/70 transition-colors group cursor-pointer"
                    >
                      {/* Name */}
                      <td className="py-3.5 pr-2">
                        <div className="font-semibold text-neutral-900 leading-tight group-hover:text-blue-600 transition-colors">
                          {proj.name}
                        </div>
                        <div className="text-[11px] text-neutral-400 mt-0.5">
                          {proj.subName}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 pr-2">
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-tight ${getStatusBadge(
                            proj.status
                          )}`}
                        >
                          {proj.status}
                        </span>
                      </td>

                      {/* Progress Bar */}
                      <td className="py-3.5 pr-4">
                        <div className="flex items-center gap-2.5">
                          <div className="flex-1 h-2 bg-neutral-200/70 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-neutral-900 rounded-full transition-all duration-500"
                              style={{ width: `${proj.progress}%` }}
                            />
                          </div>
                          <span className="text-neutral-500 text-[11px] font-medium w-8 text-right">
                            {proj.progress}%
                          </span>
                        </div>
                      </td>

                      {/* Priority */}
                      <td className="py-3.5 pr-2 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${getPriorityBadge(
                            proj.priority
                          )}`}
                        >
                          {proj.priority}
                        </span>
                      </td>

                      {/* Deadline */}
                      <td className="py-3.5 pr-2 text-neutral-600 font-medium">
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon size={12} className="text-neutral-400" />
                          <span>{proj.deadline}</span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 text-right">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpen360(proj.id, proj.name, proj.subName, 'deal', {
                              status: proj.status,
                              dealValue: proj.id === 'p1' ? '$48,000' : proj.id === 'p2' ? '$34,500' : proj.id === 'p3' ? '$59,000' : '$62,000',
                              stage: proj.status,
                            });
                          }}
                          className="text-neutral-400 group-hover:text-neutral-900 font-semibold text-xs flex items-center justify-end gap-1 ml-auto transition hover:bg-neutral-100 px-2.5 py-1 rounded-full"
                        >
                          <span>360 View</span>
                          <span className="text-[14px]">›</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* CARD 2: TASK BOARD (Kanban Preview) */}
          <div className="bg-white rounded-[26px] p-6 shadow-sm border border-neutral-100">
            {/* Header */}
            <div className="flex items-center justify-between pb-5 border-b border-neutral-100">
              <div>
                <h2 className="text-base font-bold text-neutral-900">Task Board</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Manage tasks across different stages
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTaskModal(true)}
                className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-3.5 py-1.5 text-xs font-medium flex items-center gap-1.5 transition"
              >
                <Plus size={13} />
                <span>Add Task</span>
              </button>
            </div>

            {/* 3 Stage Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              {/* BACKLOG COLUMN */}
              <div className="bg-[#f9f8f6] rounded-2xl p-3 border border-neutral-100">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 pb-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <span>Backlog</span>
                    <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-600 text-[10px] flex items-center justify-center font-bold">
                      {tasks.backlog.length}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNewTaskCol('backlog');
                      setShowTaskModal(true);
                    }}
                    className="p-1 hover:bg-neutral-200 rounded-full text-neutral-500"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <div className="space-y-2.5 mt-1">
                  {tasks.backlog.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-xl p-3 shadow-sm border border-neutral-100/90 hover:shadow transition"
                    >
                      <h4 className="text-xs font-semibold text-neutral-900 leading-snug">
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                        {task.description}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${getPriorityBadge(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                          <span className="flex items-center gap-1">
                            <MessageSquare size={10} />
                            {task.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarIcon size={10} />
                            {task.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TO DO COLUMN */}
              <div className="bg-[#f9f8f6] rounded-2xl p-3 border border-neutral-100">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 pb-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <span>To Do</span>
                    <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-600 text-[10px] flex items-center justify-center font-bold">
                      {tasks.todo.length}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNewTaskCol('todo');
                      setShowTaskModal(true);
                    }}
                    className="p-1 hover:bg-neutral-200 rounded-full text-neutral-500"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <div className="space-y-2.5 mt-1">
                  {tasks.todo.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-xl p-3 shadow-sm border border-neutral-100/90 hover:shadow transition"
                    >
                      <h4 className="text-xs font-semibold text-neutral-900 leading-snug">
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                        {task.description}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${getPriorityBadge(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                          <span className="flex items-center gap-1">
                            <MessageSquare size={10} />
                            {task.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarIcon size={10} />
                            {task.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* IN PROGRESS COLUMN */}
              <div className="bg-[#f9f8f6] rounded-2xl p-3 border border-neutral-100">
                <div className="flex items-center justify-between text-xs font-semibold text-neutral-700 pb-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <span>In Progress</span>
                    <span className="w-4 h-4 rounded-full bg-neutral-200 text-neutral-600 text-[10px] flex items-center justify-center font-bold">
                      {tasks.inProgress.length}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setNewTaskCol('inProgress');
                      setShowTaskModal(true);
                    }}
                    className="p-1 hover:bg-neutral-200 rounded-full text-neutral-500"
                  >
                    <Plus size={13} />
                  </button>
                </div>

                <div className="space-y-2.5 mt-1">
                  {tasks.inProgress.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-xl p-3 shadow-sm border border-neutral-100/90 hover:shadow transition"
                    >
                      <h4 className="text-xs font-semibold text-neutral-900 leading-snug">
                        {task.title}
                      </h4>
                      <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                        {task.description}
                      </p>
                      <div className="mt-2.5 flex items-center justify-between">
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${getPriorityBadge(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>
                        <div className="flex items-center gap-2 text-[10px] text-neutral-400">
                          <span className="flex items-center gap-1">
                            <MessageSquare size={10} />
                            {task.comments}
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarIcon size={10} />
                            {task.deadline}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= RIGHT COLUMN (lg:col-span-4) ================= */}
        <div className="lg:col-span-4 space-y-5">
          {/* CARD 3: CALENDAR (Image 1 top right) */}
          <div className="bg-white rounded-[26px] p-6 shadow-sm border border-neutral-100">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <h2 className="text-base font-bold text-neutral-900">Calendar</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  View tasks and project deadlines
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowTaskModal(true)}
                className="bg-neutral-950 hover:bg-neutral-800 text-white rounded-full px-3.5 py-1.5 text-xs font-medium flex items-center gap-1 transition"
              >
                <Plus size={13} />
                <span>Add Event</span>
              </button>
            </div>

            {/* Month Header */}
            <div className="flex items-center justify-between mt-4 px-1">
              <span className="text-sm font-semibold text-neutral-900">
                {currentMonth}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Previous Month"
                  onClick={() => setCurrentMonth('January 2026')}
                  className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500 transition"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  aria-label="Next Month"
                  onClick={() => setCurrentMonth('March 2026')}
                  className="p-1 rounded-full hover:bg-neutral-100 text-neutral-500 transition"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Weekday Names */}
            <div className="grid grid-cols-7 text-center text-[11px] text-neutral-400 font-medium mt-3 mb-1">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            {/* Date Grid */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {calendarDays.map((day) => {
                const isSelected = selectedDate === day;
                const formattedDay = day < 10 ? `0${day}` : `${day}`;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDate(day)}
                    className={`h-8 rounded-xl flex items-center justify-center font-medium transition-all ${
                      isSelected
                        ? 'bg-neutral-900 text-white font-bold shadow-md scale-105'
                        : 'text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {formattedDay}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CARD 4: PROJECTS SPOTLIGHT (Marketing Campaign - Image 1 bottom right) */}
          <div className="bg-white rounded-[26px] p-6 shadow-sm border border-neutral-100">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <div>
                <h2 className="text-base font-bold text-neutral-900">Projects</h2>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Manage and track all your projects
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-neutral-200/80 text-xs text-neutral-600 hover:bg-neutral-50 transition"
              >
                <Filter size={12} />
                <span>Filter</span>
              </button>
            </div>

            {/* Inner Project Spotlight Block */}
            <div className="mt-4 pt-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">
                    Marketing Campaign
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5">
                    Q2 marketing campaign planning and execution
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
                  In Review
                </span>
              </div>

              {/* Progress */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-neutral-400">Progress</span>
                  <span className="font-bold text-neutral-900">86%</span>
                </div>
                <div className="h-2 w-full bg-neutral-200/80 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neutral-900 rounded-full"
                    style={{ width: '86%' }}
                  />
                </div>
              </div>

              {/* 3 Metric Counts */}
              <div className="grid grid-cols-3 gap-2 mt-5 text-center bg-neutral-50/70 p-3 rounded-2xl border border-neutral-100">
                <div>
                  <div className="text-lg font-bold text-neutral-900">28</div>
                  <div className="text-[11px] text-neutral-400">Total</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-neutral-900">24</div>
                  <div className="text-[11px] text-neutral-400">Completed</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-neutral-900">03</div>
                  <div className="text-[11px] text-neutral-400">Blocked</div>
                </div>
              </div>

              {/* Footer row with Date, Priority & Avatars */}
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-neutral-100">
                <div className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1 text-neutral-600 font-medium">
                    <CalendarIcon size={13} className="text-neutral-400" />
                    <span>Mar 30</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-amber-100 text-amber-800">
                    Medium
                  </span>
                </div>

                {/* Overlapping Avatar Stack (matches Image 1) */}
                <div className="flex items-center -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80"
                    alt="Team 1"
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
                    alt="Team 2"
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80"
                    alt="Team 3"
                    className="w-6 h-6 rounded-full border-2 border-white object-cover"
                  />
                </div>
              </div>

              {/* CTA Link Button (Opens Customer 360 View) */}
              <button
                type="button"
                onClick={() =>
                  handleOpen360('spotlight-marketing', 'Marketing Campaign', 'Marketing Campaign', 'deal', {
                    status: 'In Review',
                    dealValue: '$62,000',
                    stage: 'In Review (86%)',
                  })
                }
                className="w-full mt-4 py-2.5 px-4 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold text-xs flex items-center justify-center gap-1.5 transition"
              >
                <span>View Details & Timeline</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE PROJECT MODAL */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-neutral-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h3 className="text-base font-bold text-neutral-900">Create New Project</h3>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddProject} className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Project Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mobile Design System"
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Assignee / Lead
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={newProjectAssignee}
                    onChange={(e) => setNewProjectAssignee(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={newProjectPriority}
                      onChange={(e) => setNewProjectPriority(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    >
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Deadline
                    </label>
                    <input
                      type="text"
                      value={newProjectDeadline}
                      onChange={(e) => setNewProjectDeadline(e.target.value)}
                      placeholder="e.g. May 15"
                      className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-full text-xs font-medium text-neutral-600 hover:bg-neutral-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800"
                  >
                    Create Project
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ADD TASK MODAL */}
      <AnimatePresence>
        {showTaskModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-neutral-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                <h3 className="text-base font-bold text-neutral-900">Add New Task</h3>
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="p-1 rounded-full hover:bg-neutral-100 text-neutral-400"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddTask} className="space-y-4 mt-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Task Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Conduct user interviews"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Brief description of task deliverables..."
                    value={newTaskDesc}
                    onChange={(e) => setNewTaskDesc(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Stage Column
                  </label>
                  <select
                    value={newTaskCol}
                    onChange={(e) => setNewTaskCol(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 text-xs focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  >
                    <option value="backlog">Backlog</option>
                    <option value="todo">To Do</option>
                    <option value="inProgress">In Progress</option>
                  </select>
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setShowTaskModal(false)}
                    className="px-4 py-2 rounded-full text-xs font-medium text-neutral-600 hover:bg-neutral-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full text-xs font-semibold bg-neutral-950 text-white hover:bg-neutral-800"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CUSTOMER 360 DETAIL VIEW DRAWER */}
      <Customer360Drawer
        isOpen={is360DrawerOpen}
        onClose={() => setIs360DrawerOpen(false)}
        profile={selected360Profile}
      />
    </div>
  );
}