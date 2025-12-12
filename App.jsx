import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Home, Users, CheckCircle, XCircle, AlertCircle, LogOut, Plus, Settings, BarChart3, FileText, User, Building2, Search, Edit, Trash2, Save, X, UserPlus, UserMinus, ChevronLeft, ChevronRight, Eye, RefreshCw, Download, Filter, Bell, TrendingUp, Activity } from 'lucide-react';

// Current Date
const TODAY = new Date();
const CURRENT_MONTH = TODAY.getMonth();
const CURRENT_YEAR = TODAY.getFullYear();

// Initial Team Data
const getInitialEmployees = () => {
  const stored = localStorage.getItem('sleepycat_employees');
  if (stored) return JSON.parse(stored);
  
  return [
    // Admin
    { id: 1, name: 'Divya', email: 'divya@sleepycat.in', role: 'admin', department: 'All', leadId: null, leaves: { planned: 20, sick: 10, used: { planned: 0, sick: 0 } }, joiningDate: '2024-01-01' },
    
    // Inbound Lead
    { id: 2, name: 'Jatin', email: 'jatin@sleepycat.in', role: 'lead', department: 'Inbound', leadId: null, leaves: { planned: 15, sick: 8, used: { planned: 2, sick: 1 } }, joiningDate: '2024-01-15' },
    
    // Inbound Agents
    { id: 3, name: 'Bhuvan', email: 'bhuvan@sleepycat.in', role: 'agent', department: 'Inbound', leadId: 2, leaves: { planned: 12, sick: 6, used: { planned: 3, sick: 1 } }, joiningDate: '2024-02-01' },
    { id: 4, name: 'Vaishnavi', email: 'vaishnavi@sleepycat.in', role: 'agent', department: 'Inbound', leadId: 2, leaves: { planned: 12, sick: 6, used: { planned: 2, sick: 0 } }, joiningDate: '2024-02-01' },
    { id: 5, name: 'Suresh', email: 'suresh@sleepycat.in', role: 'agent', department: 'Inbound', leadId: 2, leaves: { planned: 12, sick: 6, used: { planned: 1, sick: 2 } }, joiningDate: '2024-03-01' },
    { id: 6, name: 'Aliza', email: 'aliza@sleepycat.in', role: 'agent', department: 'Inbound', leadId: 2, leaves: { planned: 12, sick: 6, used: { planned: 4, sick: 1 } }, joiningDate: '2024-03-15' },
    { id: 7, name: 'Muskan Verma', email: 'muskan.verma@sleepycat.in', role: 'agent', department: 'Inbound', leadId: 2, leaves: { planned: 12, sick: 6, used: { planned: 2, sick: 0 } }, joiningDate: '2024-04-01' },
    
    // Outbound & Sales Lead
    { id: 8, name: 'Muskan Kalra', email: 'muskan.kalra@sleepycat.in', role: 'lead', department: 'Outbound', leadId: null, leaves: { planned: 15, sick: 8, used: { planned: 3, sick: 1 } }, additionalDepartment: 'Sales', joiningDate: '2024-01-15' },
    
    // Outbound Agents
    { id: 9, name: 'Priyanshi', email: 'priyanshi@sleepycat.in', role: 'agent', department: 'Outbound', leadId: 8, leaves: { planned: 12, sick: 6, used: { planned: 1, sick: 1 } }, joiningDate: '2024-02-15' },
    { id: 10, name: 'Qurat', email: 'qurat@sleepycat.in', role: 'agent', department: 'Outbound', leadId: 8, leaves: { planned: 12, sick: 6, used: { planned: 3, sick: 0 } }, joiningDate: '2024-02-15' },
    
    // Sales Agents
    { id: 11, name: 'Muskan Burman', email: 'muskan.burman@sleepycat.in', role: 'agent', department: 'Sales', leadId: 8, leaves: { planned: 12, sick: 6, used: { planned: 2, sick: 1 } }, joiningDate: '2024-03-01' },
    { id: 12, name: 'Sunil', email: 'sunil@sleepycat.in', role: 'agent', department: 'Sales', leadId: 8, leaves: { planned: 12, sick: 6, used: { planned: 0, sick: 0 } }, joiningDate: '2024-03-01' },
    { id: 13, name: 'Rakesh', email: 'rakesh@sleepycat.in', role: 'agent', department: 'Sales', leadId: 8, leaves: { planned: 12, sick: 6, used: { planned: 5, sick: 2 } }, joiningDate: '2024-04-01' },
    { id: 14, name: 'Rohan', email: 'rohan@sleepycat.in', role: 'agent', department: 'Sales', leadId: 8, leaves: { planned: 12, sick: 6, used: { planned: 1, sick: 0 } }, joiningDate: '2024-04-15' },
    { id: 15, name: 'Fatima Afzal', email: 'fatima.afzal@sleepycat.in', role: 'agent', department: 'Sales', leadId: 8, leaves: { planned: 12, sick: 6, used: { planned: 3, sick: 1 } }, joiningDate: '2024-05-01' },
  ];
};

const getInitialLeaveRequests = () => {
  const stored = localStorage.getItem('sleepycat_leaves');
  if (stored) return JSON.parse(stored);
  return [];
};

const getInitialWFHRequests = () => {
  const stored = localStorage.getItem('sleepycat_wfh');
  if (stored) return JSON.parse(stored);
  return [];
};

const getInitialMonthlyRoster = () => {
  const stored = localStorage.getItem('sleepycat_roster');
  if (stored) return JSON.parse(stored);
  return {};
};

// Utility Functions
const formatDate = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
};

const formatDateShort = (dateStr) => {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
};

const getDateString = (date) => {
  return date.toISOString().split('T')[0];
};

const getDaysInMonth = (year, month) => {
  return new Date(year, month + 1, 0).getDate();
};

const getMonthName = (month) => {
  return new Date(2024, month, 1).toLocaleDateString('en-IN', { month: 'long' });
};

const getDayName = (date) => {
  return new Date(date).toLocaleDateString('en-IN', { weekday: 'short' });
};

const getFullDayName = (date) => {
  return new Date(date).toLocaleDateString('en-IN', { weekday: 'long' });
};

const getDateDiff = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  return Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
};

const isWeekend = (dateStr) => {
  const day = new Date(dateStr).getDay();
  return day === 0; // Sunday only as default week off
};

const isSameDate = (date1, date2) => {
  return getDateString(new Date(date1)) === getDateString(new Date(date2));
};

const isDateInRange = (date, startDate, endDate) => {
  const d = new Date(date);
  const start = new Date(startDate);
  const end = new Date(endDate);
  return d >= start && d <= end;
};

// Components
const StatusBadge = ({ status }) => {
  const styles = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-xl shadow-sm border border-gray-100 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, variant = 'primary', size = 'md', onClick, disabled, className = '', type = 'button' }) => {
  const variants = {
    primary: 'bg-indigo-600 hover:bg-indigo-700 text-white',
    secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-700',
    success: 'bg-green-600 hover:bg-green-700 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'hover:bg-gray-100 text-gray-600',
    warning: 'bg-yellow-500 hover:bg-yellow-600 text-white',
  };
  const sizes = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
};

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  };
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className={`bg-white rounded-xl shadow-xl ${sizes[size]} w-full max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-4 border-b sticky top-0 bg-white z-10">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg">
            <X size={20} />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

// Login Component
const LoginScreen = ({ onLogin, employees }) => {
  const [selectedUser, setSelectedUser] = useState('');
  
  const todayStr = TODAY.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <span className="text-white font-bold text-2xl">SC</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SleepyCat CE</h1>
          <p className="text-gray-500 mt-1">Roster Management System</p>
          <p className="text-sm text-indigo-600 mt-2 font-medium">{todayStr}</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Select Your Name</label>
            <select 
              value={selectedUser} 
              onChange={(e) => setSelectedUser(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
            >
              <option value="">Choose your name...</option>
              <optgroup label="👑 Admin">
                {employees.filter(e => e.role === 'admin').map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </optgroup>
              <optgroup label="👔 Team Leads">
                {employees.filter(e => e.role === 'lead').map(e => (
                  <option key={e.id} value={e.id}>{e.name} - {e.department}{e.additionalDepartment ? ` & ${e.additionalDepartment}` : ''}</option>
                ))}
              </optgroup>
              <optgroup label="📞 Inbound Team">
                {employees.filter(e => e.role === 'agent' && e.department === 'Inbound').map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </optgroup>
              <optgroup label="📤 Outbound Team">
                {employees.filter(e => e.role === 'agent' && e.department === 'Outbound').map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </optgroup>
              <optgroup label="💰 Sales Team">
                {employees.filter(e => e.role === 'agent' && e.department === 'Sales').map(e => (
                  <option key={e.id} value={e.id}>{e.name}</option>
                ))}
              </optgroup>
            </select>
          </div>
          
          <Button 
            onClick={() => onLogin(employees.find(e => e.id === parseInt(selectedUser)))}
            disabled={!selectedUser}
            className="w-full"
            size="lg"
          >
            Login to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ user, activeTab, setActiveTab, onLogout, pendingCount }) => {
  const agentTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'apply-leave', label: 'Apply Leave', icon: Calendar },
    { id: 'my-leaves', label: 'My Leaves', icon: FileText },
    { id: 'wfh-request', label: 'WFH Request', icon: Home },
    { id: 'my-roster', label: 'My Roster', icon: Clock },
  ];
  
  const leadTabs = [
    { id: 'dashboard', label: 'Live Dashboard', icon: Activity },
    { id: 'approvals', label: 'Approvals', icon: CheckCircle, badge: pendingCount },
    { id: 'team', label: 'My Team', icon: Users },
    { id: 'monthly-roster', label: 'Monthly Roster', icon: Calendar },
    { id: 'apply-leave', label: 'Apply Leave', icon: Calendar },
    { id: 'my-leaves', label: 'My Leaves', icon: FileText },
  ];
  
  const adminTabs = [
    { id: 'dashboard', label: 'Live Dashboard', icon: Activity },
    { id: 'manage-employees', label: 'Manage Team', icon: UserPlus },
    { id: 'all-employees', label: 'All Employees', icon: Users },
    { id: 'all-requests', label: 'All Requests', icon: FileText },
    { id: 'monthly-roster', label: 'Monthly Roster', icon: Calendar },
    { id: 'reports', label: 'Reports', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];
  
  const tabs = user.role === 'admin' ? adminTabs : user.role === 'lead' ? leadTabs : agentTabs;
  
  return (
    <div className="w-64 bg-gray-900 min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">SC</span>
          </div>
          <div>
            <p className="text-white font-semibold text-sm">SleepyCat CE</p>
            <p className="text-gray-500 text-xs">Roster System</p>
          </div>
        </div>
        <div className="flex items-center gap-3 p-2 bg-gray-800 rounded-lg">
          <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">{user.name.charAt(0)}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium text-sm truncate">{user.name}</p>
            <p className="text-gray-400 text-xs capitalize">{user.role} • {user.department}</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
              activeTab === tab.id 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <tab.icon size={18} />
              <span className="text-sm">{tab.label}</span>
            </div>
            {tab.badge > 0 && (
              <span className="px-2 py-0.5 bg-red-500 text-white text-xs rounded-full animate-pulse">{tab.badge}</span>
            )}
          </button>
        ))}
      </nav>
      
      <div className="p-3 border-t border-gray-800">
        <div className="text-xs text-gray-500 mb-2 px-3">
          {TODAY.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' })}
        </div>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

// Live Dashboard Component (for Admin and Lead)
const LiveDashboard = ({ user, employees, leaveRequests, wfhRequests, monthlyRoster }) => {
  const todayStr = getDateString(TODAY);
  const currentMonth = `${CURRENT_YEAR}-${String(CURRENT_MONTH + 1).padStart(2, '0')}`;
  
  // Get team based on role
  const getTeamMembers = () => {
    if (user.role === 'admin') {
      return employees.filter(e => e.role !== 'admin');
    }
    return employees.filter(e => e.leadId === user.id);
  };
  
  const teamMembers = getTeamMembers();
  const departments = user.role === 'admin' ? ['Inbound', 'Outbound', 'Sales'] : 
    user.additionalDepartment ? [user.department, user.additionalDepartment] : [user.department];
  
  // Today's Status
  const onLeaveToday = leaveRequests.filter(l => 
    l.status === 'approved' && 
    isDateInRange(todayStr, l.startDate, l.endDate) &&
    teamMembers.some(m => m.id === l.employeeId)
  );
  
  const wfhToday = wfhRequests.filter(w => 
    w.status === 'approved' && 
    w.date === todayStr &&
    teamMembers.some(m => m.id === w.employeeId)
  );
  
  // Week offs today from roster
  const getWeekOffToday = () => {
    const weekOffs = [];
    departments.forEach(dept => {
      const rosterKey = `${currentMonth}-${dept}`;
      const deptRoster = monthlyRoster[rosterKey];
      if (deptRoster) {
        Object.entries(deptRoster).forEach(([empId, schedule]) => {
          if (schedule[todayStr] === 'WO') {
            const emp = employees.find(e => e.id === parseInt(empId));
            if (emp && teamMembers.some(m => m.id === emp.id)) {
              weekOffs.push(emp);
            }
          }
        });
      }
    });
    return weekOffs;
  };
  
  const weekOffToday = getWeekOffToday();
  
  const workingToday = teamMembers.filter(m => 
    !onLeaveToday.some(l => l.employeeId === m.id) &&
    !wfhToday.some(w => w.employeeId === m.id) &&
    !weekOffToday.some(wo => wo.id === m.id)
  );
  
  const pendingLeaves = leaveRequests.filter(l => 
    l.status === 'pending' && 
    teamMembers.some(m => m.id === l.employeeId)
  );
  
  const pendingWFH = wfhRequests.filter(w => 
    w.status === 'pending' && 
    teamMembers.some(m => m.id === w.employeeId)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Live Dashboard</h1>
          <p className="text-gray-500">{TODAY.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Live
          </span>
        </div>
      </div>
      
      {/* Today's Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Working Today</p>
              <p className="text-3xl font-bold text-green-600">{workingToday.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="text-green-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">WFH Today</p>
              <p className="text-3xl font-bold text-blue-600">{wfhToday.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Home className="text-blue-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-l-4 border-l-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">On Leave</p>
              <p className="text-3xl font-bold text-orange-600">{onLeaveToday.length}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Calendar className="text-orange-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-4 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Week Off</p>
              <p className="text-3xl font-bold text-purple-600">{weekOffToday.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Clock className="text-purple-600" size={24} />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Today's Team Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Working Today */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              Working in Office ({workingToday.length})
            </h3>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {departments.map(dept => {
              const deptWorking = workingToday.filter(m => m.department === dept);
              if (deptWorking.length === 0) return null;
              return (
                <div key={dept} className="mb-3">
                  <p className="text-xs font-medium text-gray-400 mb-1">{dept}</p>
                  <div className="flex flex-wrap gap-2">
                    {deptWorking.map(emp => (
                      <span key={emp.id} className="px-2 py-1 bg-green-50 text-green-700 rounded text-sm">
                        {emp.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
            {workingToday.length === 0 && (
              <p className="text-gray-400 text-sm">No one in office today</p>
            )}
          </div>
        </Card>
        
        {/* WFH Today */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              Working From Home ({wfhToday.length})
            </h3>
          </div>
          <div className="space-y-2">
            {wfhToday.map(w => {
              const emp = employees.find(e => e.id === w.employeeId);
              return (
                <div key={w.id} className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <span className="text-sm font-medium">{emp?.name}</span>
                  <span className="text-xs text-gray-500">{emp?.department}</span>
                </div>
              );
            })}
            {wfhToday.length === 0 && (
              <p className="text-gray-400 text-sm">No one working from home today</p>
            )}
          </div>
        </Card>
        
        {/* On Leave */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
              On Leave Today ({onLeaveToday.length})
            </h3>
          </div>
          <div className="space-y-2">
            {onLeaveToday.map(l => {
              const emp = employees.find(e => e.id === l.employeeId);
              return (
                <div key={l.id} className="flex items-center justify-between p-2 bg-orange-50 rounded">
                  <div>
                    <span className="text-sm font-medium">{emp?.name}</span>
                    <span className="ml-2 text-xs text-orange-600 capitalize">({l.type})</span>
                  </div>
                  <span className="text-xs text-gray-500">{emp?.department}</span>
                </div>
              );
            })}
            {onLeaveToday.length === 0 && (
              <p className="text-gray-400 text-sm">No one on leave today</p>
            )}
          </div>
        </Card>
        
        {/* Week Off */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              Week Off Today ({weekOffToday.length})
            </h3>
          </div>
          <div className="space-y-2">
            {weekOffToday.map(emp => (
              <div key={emp.id} className="flex items-center justify-between p-2 bg-purple-50 rounded">
                <span className="text-sm font-medium">{emp.name}</span>
                <span className="text-xs text-gray-500">{emp.department}</span>
              </div>
            ))}
            {weekOffToday.length === 0 && (
              <p className="text-gray-400 text-sm">No week offs today</p>
            )}
          </div>
        </Card>
      </div>
      
      {/* Pending Approvals */}
      {(pendingLeaves.length > 0 || pendingWFH.length > 0) && (
        <Card className="p-4 border-l-4 border-l-yellow-500">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <AlertCircle className="text-yellow-500" size={20} />
            Pending Approvals ({pendingLeaves.length + pendingWFH.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingLeaves.slice(0, 3).map(l => {
              const emp = employees.find(e => e.id === l.employeeId);
              return (
                <div key={l.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{emp?.name}</p>
                    <p className="text-xs text-gray-500">{formatDateShort(l.startDate)} - {formatDateShort(l.endDate)} • {l.type}</p>
                  </div>
                  <StatusBadge status="pending" />
                </div>
              );
            })}
            {pendingWFH.slice(0, 3).map(w => {
              const emp = employees.find(e => e.id === w.employeeId);
              return (
                <div key={w.id} className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{emp?.name}</p>
                    <p className="text-xs text-gray-500">WFH • {formatDateShort(w.date)}</p>
                  </div>
                  <StatusBadge status="pending" />
                </div>
              );
            })}
          </div>
        </Card>
      )}
    </div>
  );
};

// Agent Dashboard
const AgentDashboard = ({ user, leaveRequests, wfhRequests, monthlyRoster, employees }) => {
  const todayStr = getDateString(TODAY);
  const currentMonth = `${CURRENT_YEAR}-${String(CURRENT_MONTH + 1).padStart(2, '0')}`;
  
  const myLeaves = leaveRequests.filter(l => l.employeeId === user.id);
  const myWFH = wfhRequests.filter(w => w.employeeId === user.id);
  
  const plannedBalance = user.leaves.planned - user.leaves.used.planned;
  const sickBalance = user.leaves.sick - user.leaves.used.sick;
  
  // Get my roster for this month
  const rosterKey = `${currentMonth}-${user.department}`;
  const mySchedule = monthlyRoster[rosterKey]?.[user.id] || {};
  
  // Today's status
  const todayStatus = mySchedule[todayStr] || 'Working';
  const isOnLeaveToday = myLeaves.some(l => l.status === 'approved' && isDateInRange(todayStr, l.startDate, l.endDate));
  const isWFHToday = myWFH.some(w => w.status === 'approved' && w.date === todayStr);
  
  const lead = employees.find(e => e.id === user.leadId);
  
  // Week offs this month
  const weekOffsThisMonth = Object.entries(mySchedule).filter(([date, status]) => status === 'WO').length;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome, {user.name}! 👋</h1>
          <p className="text-gray-500">{TODAY.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <div className={`px-4 py-2 rounded-lg font-medium ${
          isOnLeaveToday ? 'bg-orange-100 text-orange-700' :
          isWFHToday ? 'bg-blue-100 text-blue-700' :
          todayStatus === 'WO' ? 'bg-purple-100 text-purple-700' :
          'bg-green-100 text-green-700'
        }`}>
          Today: {isOnLeaveToday ? 'On Leave' : isWFHToday ? 'WFH' : todayStatus === 'WO' ? 'Week Off' : 'Working'}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Planned Leave</p>
              <p className="text-2xl font-bold text-indigo-600">{plannedBalance}</p>
              <p className="text-xs text-gray-400">of {user.leaves.planned} days</p>
            </div>
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
              <Calendar className="text-indigo-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Sick Leave</p>
              <p className="text-2xl font-bold text-orange-600">{sickBalance}</p>
              <p className="text-xs text-gray-400">of {user.leaves.sick} days</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertCircle className="text-orange-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Week Offs</p>
              <p className="text-2xl font-bold text-purple-600">{weekOffsThisMonth}</p>
              <p className="text-xs text-gray-400">this month</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Clock className="text-purple-600" size={24} />
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending Requests</p>
              <p className="text-2xl font-bold text-yellow-600">
                {myLeaves.filter(l => l.status === 'pending').length + myWFH.filter(w => w.status === 'pending').length}
              </p>
              <p className="text-xs text-gray-400">awaiting approval</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <Bell className="text-yellow-600" size={24} />
            </div>
          </div>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">My Upcoming Week Offs</h3>
          <div className="space-y-2">
            {Object.entries(mySchedule)
              .filter(([date, status]) => status === 'WO' && new Date(date) >= TODAY)
              .sort(([a], [b]) => new Date(a) - new Date(b))
              .slice(0, 5)
              .map(([date]) => (
                <div key={date} className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">{formatDate(date)}</span>
                  <span className="text-sm text-purple-600">{getFullDayName(date)}</span>
                </div>
              ))
            }
            {Object.entries(mySchedule).filter(([date, status]) => status === 'WO' && new Date(date) >= TODAY).length === 0 && (
              <p className="text-gray-400 text-sm py-4 text-center">No upcoming week offs</p>
            )}
          </div>
        </Card>
        
        <Card className="p-4">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Info</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <User size={18} className="text-gray-400" />
                <span className="text-sm">Reporting To</span>
              </div>
              <span className="text-sm font-medium">{lead?.name || 'N/A'}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Building2 size={18} className="text-gray-400" />
                <span className="text-sm">Department</span>
              </div>
              <span className="text-sm font-medium">{user.department}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-gray-400" />
                <span className="text-sm">Current Month</span>
              </div>
              <span className="text-sm font-medium">{getMonthName(CURRENT_MONTH)} {CURRENT_YEAR}</span>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Recent Requests */}
      <Card className="p-4">
        <h3 className="font-semibold text-gray-900 mb-4">Recent Requests</h3>
        <div className="space-y-2">
          {[...myLeaves, ...myWFH.map(w => ({...w, type: 'wfh', startDate: w.date, endDate: w.date}))]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 5)
            .map((req, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm capitalize">{req.type === 'wfh' ? 'Work From Home' : `${req.type} Leave`}</p>
                  <p className="text-xs text-gray-500">{formatDateShort(req.startDate)}{req.startDate !== req.endDate ? ` - ${formatDateShort(req.endDate)}` : ''}</p>
                </div>
                <StatusBadge status={req.status} />
              </div>
            ))
          }
          {myLeaves.length === 0 && myWFH.length === 0 && (
            <p className="text-gray-400 text-sm py-4 text-center">No requests yet</p>
          )}
        </div>
      </Card>
    </div>
  );
};

// Apply Leave Component
const ApplyLeave = ({ user, onSubmit }) => {
  const [form, setForm] = useState({
    type: 'planned',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [submitted, setSubmitted] = useState(false);
  
  const plannedBalance = user.leaves.planned - user.leaves.used.planned;
  const sickBalance = user.leaves.sick - user.leaves.used.sick;
  const balance = form.type === 'planned' ? plannedBalance : sickBalance;
  
  const days = form.startDate && form.endDate ? getDateDiff(form.startDate, form.endDate) : 0;
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      employeeId: user.id,
      status: 'pending',
      createdAt: getDateString(TODAY),
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ type: 'planned', startDate: '', endDate: '', reason: '' });
    }, 2000);
  };
  
  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Apply for Leave</h1>
      
      <Card className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-indigo-50 rounded-lg">
            <p className="text-sm text-indigo-600">Planned Leave Balance</p>
            <p className="text-2xl font-bold text-indigo-700">{plannedBalance} days</p>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <p className="text-sm text-orange-600">Sick Leave Balance</p>
            <p className="text-2xl font-bold text-orange-700">{sickBalance} days</p>
          </div>
        </div>
        
        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Leave Request Submitted!</h3>
            <p className="text-gray-500">Your request has been sent to your lead for approval.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Leave Type</label>
              <select 
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="planned">Planned Leave</option>
                <option value="sick">Sick Leave</option>
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input 
                  type="date"
                  value={form.startDate}
                  onChange={(e) => setForm({ ...form, startDate: e.target.value, endDate: form.endDate || e.target.value })}
                  min={getDateString(TODAY)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input 
                  type="date"
                  value={form.endDate}
                  onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  min={form.startDate || getDateString(TODAY)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>
            
            {days > 0 && (
              <div className={`p-3 rounded-lg ${days > balance ? 'bg-red-50 text-red-700' : 'bg-blue-50 text-blue-700'}`}>
                <p className="text-sm">
                  Requesting <strong>{days} day{days > 1 ? 's' : ''}</strong> of leave. 
                  {days > balance && ' ⚠️ Exceeds available balance!'}
                </p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
              <textarea 
                value={form.reason}
                onChange={(e) => setForm({ ...form, reason: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                placeholder="Please provide a reason for your leave..."
                required
              />
            </div>
            
            <Button type="submit" disabled={days > balance || days === 0} className="w-full">
              Submit Leave Request
            </Button>
          </form>
        )}
      </Card>
    </div>
  );
};

// My Leaves Component
const MyLeaves = ({ user, leaveRequests }) => {
  const myLeaves = leaveRequests.filter(l => l.employeeId === user.id);
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Leave History</h1>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">From</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">To</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myLeaves.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(leave => (
                <tr key={leave.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-sm capitalize font-medium">{leave.type}</td>
                  <td className="px-4 py-3 text-sm">{formatDate(leave.startDate)}</td>
                  <td className="px-4 py-3 text-sm">{formatDate(leave.endDate)}</td>
                  <td className="px-4 py-3 text-sm">{getDateDiff(leave.startDate, leave.endDate)}</td>
                  <td className="px-4 py-3 text-sm max-w-xs truncate">{leave.reason}</td>
                  <td className="px-4 py-3"><StatusBadge status={leave.status} /></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{formatDate(leave.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {myLeaves.length === 0 && (
            <p className="text-center py-8 text-gray-500">No leave requests found</p>
          )}
        </div>
      </Card>
    </div>
  );
};

// WFH Request Component
const WFHRequest = ({ user, wfhRequests, onSubmit }) => {
  const [form, setForm] = useState({ date: '', reason: '' });
  const [submitted, setSubmitted] = useState(false);
  
  const myWFH = wfhRequests.filter(w => w.employeeId === user.id);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      employeeId: user.id,
      status: 'pending',
      createdAt: getDateString(TODAY),
    });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ date: '', reason: '' });
    }, 2000);
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Request Work From Home</h1>
        
        <Card className="p-6">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-green-600" size={32} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">WFH Request Submitted!</h3>
              <p className="text-gray-500">Your request has been sent to your lead for approval.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input 
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  min={getDateString(TODAY)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                <textarea 
                  value={form.reason}
                  onChange={(e) => setForm({ ...form, reason: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Why do you need to work from home?"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Home size={18} />
                Submit WFH Request
              </Button>
            </form>
          )}
        </Card>
      </div>
      
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">My WFH History</h2>
        <Card>
          <div className="divide-y max-h-96 overflow-y-auto">
            {myWFH.sort((a, b) => new Date(b.date) - new Date(a.date)).map(wfh => (
              <div key={wfh.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{formatDate(wfh.date)}</p>
                  <p className="text-sm text-gray-500">{wfh.reason}</p>
                </div>
                <StatusBadge status={wfh.status} />
              </div>
            ))}
            {myWFH.length === 0 && (
              <p className="text-center py-8 text-gray-500">No WFH requests found</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

// My Roster Component (for agents)
const MyRoster = ({ user, monthlyRoster, employees, leaveRequests, wfhRequests }) => {
  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  
  const monthKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}`;
  const rosterKey = `${monthKey}-${user.department}`;
  const mySchedule = monthlyRoster[rosterKey]?.[user.id] || {};
  
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDay = new Date(selectedYear, selectedMonth, 1).getDay();
  
  const myLeaves = leaveRequests.filter(l => l.employeeId === user.id && l.status === 'approved');
  const myWFH = wfhRequests.filter(w => w.employeeId === user.id && w.status === 'approved');
  
  const getDayStatus = (date) => {
    const dateStr = getDateString(date);
    if (myLeaves.some(l => isDateInRange(dateStr, l.startDate, l.endDate))) {
      const leave = myLeaves.find(l => isDateInRange(dateStr, l.startDate, l.endDate));
      return { status: 'leave', type: leave.type };
    }
    if (myWFH.some(w => w.date === dateStr)) {
      return { status: 'wfh' };
    }
    if (mySchedule[dateStr] === 'WO') {
      return { status: 'weekoff' };
    }
    return { status: 'working' };
  };
  
  const changeMonth = (delta) => {
    let newMonth = selectedMonth + delta;
    let newYear = selectedYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Roster</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => changeMonth(-1)}>
            <ChevronLeft size={20} />
          </Button>
          <span className="font-semibold min-w-[150px] text-center">
            {getMonthName(selectedMonth)} {selectedYear}
          </span>
          <Button variant="ghost" size="sm" onClick={() => changeMonth(1)}>
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
      
      <Card className="p-4">
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-green-100 border border-green-300 rounded"></span>
            <span>Working</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></span>
            <span>Week Off</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-orange-100 border border-orange-300 rounded"></span>
            <span>Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></span>
            <span>WFH</span>
          </div>
        </div>
        
        {/* Calendar */}
        <div className="grid grid-cols-7 gap-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="p-2 text-center text-xs font-medium text-gray-500 bg-gray-50">
              {day}
            </div>
          ))}
          
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="p-2"></div>
          ))}
          
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const date = new Date(selectedYear, selectedMonth, i + 1);
            const dateStr = getDateString(date);
            const { status, type } = getDayStatus(date);
            const isToday = isSameDate(date, TODAY);
            
            const bgColors = {
              working: 'bg-green-50 hover:bg-green-100',
              weekoff: 'bg-purple-100 hover:bg-purple-200',
              leave: 'bg-orange-100 hover:bg-orange-200',
              wfh: 'bg-blue-100 hover:bg-blue-200',
            };
            
            return (
              <div 
                key={i}
                className={`p-2 text-center rounded-lg transition-colors ${bgColors[status]} ${isToday ? 'ring-2 ring-indigo-500' : ''}`}
              >
                <span className={`text-sm ${isToday ? 'font-bold' : ''}`}>{i + 1}</span>
                <div className="text-xs mt-1">
                  {status === 'weekoff' && <span className="text-purple-600">WO</span>}
                  {status === 'leave' && <span className="text-orange-600 capitalize">{type?.charAt(0)}</span>}
                  {status === 'wfh' && <span className="text-blue-600">WFH</span>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

// Monthly Roster Management (for Lead/Admin)
const MonthlyRosterManagement = ({ user, employees, monthlyRoster, onUpdateRoster, leaveRequests, wfhRequests }) => {
  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  const [selectedDept, setSelectedDept] = useState(user.role === 'admin' ? 'Inbound' : user.department);
  const [editMode, setEditMode] = useState(false);
  const [localRoster, setLocalRoster] = useState({});
  
  const departments = user.role === 'admin' ? ['Inbound', 'Outbound', 'Sales'] :
    user.additionalDepartment ? [user.department, user.additionalDepartment] : [user.department];
  
  const monthKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}`;
  const rosterKey = `${monthKey}-${selectedDept}`;
  
  const teamMembers = user.role === 'admin' 
    ? employees.filter(e => e.department === selectedDept && e.role === 'agent')
    : employees.filter(e => e.leadId === user.id && e.department === selectedDept);
  
  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  
  useEffect(() => {
    setLocalRoster(monthlyRoster[rosterKey] || {});
  }, [rosterKey, monthlyRoster]);
  
  const changeMonth = (delta) => {
    let newMonth = selectedMonth + delta;
    let newYear = selectedYear;
    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
    setEditMode(false);
  };
  
  const toggleDayStatus = (empId, dateStr) => {
    if (!editMode) return;
    
    const currentStatus = localRoster[empId]?.[dateStr] || '';
    const newStatus = currentStatus === 'WO' ? '' : 'WO';
    
    setLocalRoster(prev => ({
      ...prev,
      [empId]: {
        ...(prev[empId] || {}),
        [dateStr]: newStatus
      }
    }));
  };
  
  const handleSave = () => {
    onUpdateRoster(rosterKey, localRoster);
    setEditMode(false);
  };
  
  const getEmployeeDayStatus = (empId, dateStr) => {
    const leave = leaveRequests.find(l => 
      l.employeeId === empId && 
      l.status === 'approved' && 
      isDateInRange(dateStr, l.startDate, l.endDate)
    );
    if (leave) return { status: 'leave', type: leave.type };
    
    const wfh = wfhRequests.find(w => 
      w.employeeId === empId && 
      w.status === 'approved' && 
      w.date === dateStr
    );
    if (wfh) return { status: 'wfh' };
    
    if (localRoster[empId]?.[dateStr] === 'WO') return { status: 'weekoff' };
    
    return { status: 'working' };
  };
  
  const countWeekOffs = (empId) => {
    return Object.values(localRoster[empId] || {}).filter(v => v === 'WO').length;
  };
  
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monthly Roster</h1>
          <p className="text-gray-500">Manage week offs for {getMonthName(selectedMonth)} {selectedYear}</p>
        </div>
        <div className="flex items-center gap-2">
          {editMode ? (
            <>
              <Button variant="secondary" onClick={() => { setEditMode(false); setLocalRoster(monthlyRoster[rosterKey] || {}); }}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                <Save size={16} /> Save Roster
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditMode(true)}>
              <Edit size={16} /> Edit Roster
            </Button>
          )}
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        {departments.length > 1 && (
          <div className="flex gap-2">
            {departments.map(dept => (
              <Button 
                key={dept}
                variant={selectedDept === dept ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => { setSelectedDept(dept); setEditMode(false); }}
              >
                {dept}
              </Button>
            ))}
          </div>
        )}
        
        <div className="flex items-center gap-2 ml-auto">
          <Button variant="ghost" size="sm" onClick={() => changeMonth(-1)}>
            <ChevronLeft size={20} />
          </Button>
          <span className="font-semibold min-w-[150px] text-center">
            {getMonthName(selectedMonth)} {selectedYear}
          </span>
          <Button variant="ghost" size="sm" onClick={() => changeMonth(1)}>
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
      
      <Card className="p-4 overflow-x-auto">
        {/* Legend */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-purple-500 rounded"></span>
            <span>Week Off (WO)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-orange-400 rounded"></span>
            <span>Leave</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 bg-blue-400 rounded"></span>
            <span>WFH</span>
          </div>
          {editMode && (
            <span className="text-indigo-600 font-medium">Click on cells to toggle Week Off</span>
          )}
        </div>
        
        <div className="min-w-max">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase sticky left-0 bg-gray-50 z-10 min-w-[150px]">
                  Employee
                </th>
                <th className="px-2 py-2 text-center text-xs font-medium text-gray-500 uppercase min-w-[40px]">
                  WOs
                </th>
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const date = new Date(selectedYear, selectedMonth, i + 1);
                  const isToday = isSameDate(date, TODAY);
                  const isSunday = date.getDay() === 0;
                  return (
                    <th 
                      key={i} 
                      className={`px-1 py-2 text-center text-xs font-medium min-w-[36px] ${
                        isToday ? 'bg-indigo-100 text-indigo-700' : 
                        isSunday ? 'bg-red-50 text-red-600' : 'text-gray-500'
                      }`}
                    >
                      <div>{i + 1}</div>
                      <div className="text-[10px]">{getDayName(date)}</div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {teamMembers.map(emp => (
                <tr key={emp.id} className="border-t hover:bg-gray-50">
                  <td className="px-3 py-2 text-sm font-medium sticky left-0 bg-white z-10">
                    {emp.name}
                  </td>
                  <td className="px-2 py-2 text-center text-sm font-bold text-purple-600">
                    {countWeekOffs(emp.id)}
                  </td>
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const date = new Date(selectedYear, selectedMonth, i + 1);
                    const dateStr = getDateString(date);
                    const { status, type } = getEmployeeDayStatus(emp.id, dateStr);
                    const isToday = isSameDate(date, TODAY);
                    
                    let bgColor = '';
                    let content = '';
                    
                    if (status === 'weekoff') {
                      bgColor = 'bg-purple-500 text-white';
                      content = 'WO';
                    } else if (status === 'leave') {
                      bgColor = 'bg-orange-400 text-white';
                      content = type === 'sick' ? 'SL' : 'PL';
                    } else if (status === 'wfh') {
                      bgColor = 'bg-blue-400 text-white';
                      content = 'WFH';
                    }
                    
                    return (
                      <td 
                        key={i}
                        onClick={() => status !== 'leave' && status !== 'wfh' && toggleDayStatus(emp.id, dateStr)}
                        className={`px-1 py-2 text-center text-xs ${bgColor} ${
                          isToday ? 'ring-2 ring-indigo-500 ring-inset' : ''
                        } ${editMode && status !== 'leave' && status !== 'wfh' ? 'cursor-pointer hover:bg-purple-200' : ''}`}
                      >
                        {content}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          
          {teamMembers.length === 0 && (
            <p className="text-center py-8 text-gray-500">No team members in this department</p>
          )}
        </div>
      </Card>
    </div>
  );
};

// Approvals Component
const Approvals = ({ user, employees, leaveRequests, wfhRequests, onLeaveAction, onWFHAction }) => {
  const [activeTab, setActiveTab] = useState('leaves');
  const [rejectModal, setRejectModal] = useState({ open: false, type: null, id: null });
  const [rejectReason, setRejectReason] = useState('');
  
  const teamMembers = employees.filter(e => e.leadId === user.id);
  const pendingLeaves = leaveRequests.filter(l => teamMembers.some(m => m.id === l.employeeId) && l.status === 'pending');
  const pendingWFH = wfhRequests.filter(w => teamMembers.some(m => m.id === w.employeeId) && w.status === 'pending');
  
  const handleReject = () => {
    if (rejectModal.type === 'leave') {
      onLeaveAction(rejectModal.id, 'rejected', rejectReason);
    } else {
      onWFHAction(rejectModal.id, 'rejected', rejectReason);
    }
    setRejectModal({ open: false, type: null, id: null });
    setRejectReason('');
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pending Approvals</h1>
      
      <div className="flex gap-2 mb-6">
        <Button 
          variant={activeTab === 'leaves' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('leaves')}
        >
          Leave Requests ({pendingLeaves.length})
        </Button>
        <Button 
          variant={activeTab === 'wfh' ? 'primary' : 'secondary'}
          onClick={() => setActiveTab('wfh')}
        >
          WFH Requests ({pendingWFH.length})
        </Button>
      </div>
      
      {activeTab === 'leaves' ? (
        <Card>
          <div className="divide-y">
            {pendingLeaves.map(leave => {
              const emp = employees.find(e => e.id === leave.employeeId);
              const days = getDateDiff(leave.startDate, leave.endDate);
              return (
                <div key={leave.id} className="p-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-semibold">{emp?.name}</span>
                        <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{emp?.department}</span>
                        <span className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs capitalize">{leave.type} Leave</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">
                        📅 {formatDate(leave.startDate)} → {formatDate(leave.endDate)} ({days} day{days > 1 ? 's' : ''})
                      </p>
                      <p className="text-sm text-gray-500">💬 {leave.reason}</p>
                      <p className="text-xs text-gray-400 mt-2">
                        Balance: PL {emp?.leaves.planned - emp?.leaves.used.planned} | SL {emp?.leaves.sick - emp?.leaves.used.sick}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="success" size="sm" onClick={() => onLeaveAction(leave.id, 'approved')}>
                        <CheckCircle size={16} /> Approve
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => setRejectModal({ open: true, type: 'leave', id: leave.id })}>
                        <XCircle size={16} /> Reject
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            {pendingLeaves.length === 0 && (
              <p className="text-center py-8 text-gray-500">No pending leave requests 🎉</p>
            )}
          </div>
        </Card>
      ) : (
        <Card>
          <div className="divide-y">
            {pendingWFH.map(wfh => {
              const emp = employees.find(e => e.id === wfh.employeeId);
              return (
                <div key={wfh.id} className="p-4">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-semibold">{emp?.name}</span>
                        <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">{emp?.department}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">📅 {formatDate(wfh.date)}</p>
                      <p className="text-sm text-gray-500">💬 {wfh.reason}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="success" size="sm" onClick={() => onWFHAction(wfh.id, 'approved')}>
                        <CheckCircle size={16} /> Approve
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => setRejectModal({ open: true, type: 'wfh', id: wfh.id })}>
                        <XCircle size={16} /> Reject
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
            {pendingWFH.length === 0 && (
              <p className="text-center py-8 text-gray-500">No pending WFH requests 🎉</p>
            )}
          </div>
        </Card>
      )}
      
      <Modal isOpen={rejectModal.open} onClose={() => setRejectModal({ open: false, type: null, id: null })} title="Rejection Reason">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Please provide a reason for rejection</label>
            <textarea 
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter rejection reason..."
            />
          </div>
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setRejectModal({ open: false, type: null, id: null })}>Cancel</Button>
            <Button variant="danger" onClick={handleReject} disabled={!rejectReason.trim()}>Confirm Rejection</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Team Component (for Lead)
const Team = ({ user, employees }) => {
  const managedDepts = user.additionalDepartment ? [user.department, user.additionalDepartment] : [user.department];
  const teamMembers = employees.filter(e => e.leadId === user.id);
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Team ({teamMembers.length} members)</h1>
      
      {managedDepts.map(dept => {
        const deptMembers = teamMembers.filter(m => m.department === dept);
        return (
          <div key={dept} className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <Building2 size={20} />
              {dept} ({deptMembers.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {deptMembers.map(member => (
                <Card key={member.id} className="p-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{member.name.charAt(0)}</span>
                    </div>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.email}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="p-2 bg-indigo-50 rounded text-center">
                      <p className="text-indigo-600 font-bold">{member.leaves.planned - member.leaves.used.planned}</p>
                      <p className="text-xs text-gray-500">Planned</p>
                    </div>
                    <div className="p-2 bg-orange-50 rounded text-center">
                      <p className="text-orange-600 font-bold">{member.leaves.sick - member.leaves.used.sick}</p>
                      <p className="text-xs text-gray-500">Sick</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Manage Employees (Admin)
const ManageEmployees = ({ employees, onAddEmployee, onRemoveEmployee }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    role: 'agent',
    department: 'Inbound',
  });
  
  const leads = employees.filter(e => e.role === 'lead');
  
  const handleAdd = () => {
    const lead = employees.find(e => e.role === 'lead' && (e.department === newEmployee.department || e.additionalDepartment === newEmployee.department));
    onAddEmployee({
      ...newEmployee,
      leadId: newEmployee.role === 'agent' ? lead?.id : null,
      leaves: newEmployee.role === 'lead' 
        ? { planned: 15, sick: 8, used: { planned: 0, sick: 0 } }
        : { planned: 12, sick: 6, used: { planned: 0, sick: 0 } },
      joiningDate: getDateString(TODAY),
    });
    setShowAddModal(false);
    setNewEmployee({ name: '', email: '', role: 'agent', department: 'Inbound' });
  };
  
  const handleRemove = () => {
    if (selectedEmployee) {
      onRemoveEmployee(selectedEmployee.id);
      setShowRemoveModal(false);
      setSelectedEmployee(null);
    }
  };
  
  const agents = employees.filter(e => e.role === 'agent');
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Team</h1>
          <p className="text-gray-500">Add or remove team members</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <UserPlus size={18} /> Add Employee
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Inbound', 'Outbound', 'Sales'].map(dept => {
          const deptAgents = agents.filter(a => a.department === dept);
          const lead = leads.find(l => l.department === dept || l.additionalDepartment === dept);
          return (
            <Card key={dept} className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{dept}</h3>
                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{deptAgents.length} agents</span>
              </div>
              <div className="mb-3 p-2 bg-purple-50 rounded-lg">
                <p className="text-xs text-purple-600">Team Lead</p>
                <p className="font-medium text-sm">{lead?.name || 'Not Assigned'}</p>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {deptAgents.map(agent => (
                  <div key={agent.id} className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 group">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 text-xs font-medium">{agent.name.charAt(0)}</span>
                      </div>
                      <span className="text-sm">{agent.name}</span>
                    </div>
                    <button 
                      onClick={() => { setSelectedEmployee(agent); setShowRemoveModal(true); }}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
      
      {/* Add Employee Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add New Employee">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
            <input 
              type="text"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter full name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input 
              type="email"
              value={newEmployee.email}
              onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="name@sleepycat.in"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select 
                value={newEmployee.role}
                onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="agent">Agent</option>
                <option value="lead">Lead</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select 
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Inbound">Inbound</option>
                <option value="Outbound">Outbound</option>
                <option value="Sales">Sales</option>
              </select>
            </div>
          </div>
          
          <div className="flex gap-2 justify-end pt-4">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button onClick={handleAdd} disabled={!newEmployee.name || !newEmployee.email}>
              <UserPlus size={16} /> Add Employee
            </Button>
          </div>
        </div>
      </Modal>
      
      {/* Remove Employee Modal */}
      <Modal isOpen={showRemoveModal} onClose={() => setShowRemoveModal(false)} title="Remove Employee">
        <div className="space-y-4">
          <div className="p-4 bg-red-50 rounded-lg">
            <p className="text-red-700">
              Are you sure you want to remove <strong>{selectedEmployee?.name}</strong> from the system?
            </p>
            <p className="text-sm text-red-600 mt-2">This action cannot be undone.</p>
          </div>
          
          <div className="flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setShowRemoveModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleRemove}>
              <UserMinus size={16} /> Remove Employee
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// All Employees (Admin)
const AllEmployees = ({ employees }) => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  const filtered = employees.filter(e => {
    const matchesFilter = filter === 'all' || e.department === filter || e.role === filter;
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.email.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Employees ({employees.length})</h1>
      
      <Card className="p-4 mb-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name or email..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            <option value="all">All</option>
            <optgroup label="Department">
              <option value="Inbound">Inbound</option>
              <option value="Outbound">Outbound</option>
              <option value="Sales">Sales</option>
            </optgroup>
            <optgroup label="Role">
              <option value="agent">Agents</option>
              <option value="lead">Leads</option>
              <option value="admin">Admin</option>
            </optgroup>
          </select>
        </div>
      </Card>
      
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">PL</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">SL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(emp => (
                <tr key={emp.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium text-sm">{emp.name.charAt(0)}</span>
                      </div>
                      <span className="font-medium text-sm">{emp.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{emp.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium capitalize ${
                      emp.role === 'admin' ? 'bg-purple-100 text-purple-700' :
                      emp.role === 'lead' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">{emp.department}{emp.additionalDepartment ? ` & ${emp.additionalDepartment}` : ''}</td>
                  <td className="px-4 py-3 text-sm font-medium text-indigo-600">{emp.leaves.planned - emp.leaves.used.planned}/{emp.leaves.planned}</td>
                  <td className="px-4 py-3 text-sm font-medium text-orange-600">{emp.leaves.sick - emp.leaves.used.sick}/{emp.leaves.sick}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

// All Requests (Admin)
const AllRequests = ({ employees, leaveRequests, wfhRequests }) => {
  const [activeTab, setActiveTab] = useState('leaves');
  const [filter, setFilter] = useState('all');
  
  const filteredLeaves = leaveRequests.filter(l => filter === 'all' || l.status === filter);
  const filteredWFH = wfhRequests.filter(w => filter === 'all' || w.status === filter);
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">All Requests</h1>
      
      <div className="flex flex-wrap gap-4 mb-4">
        <div className="flex gap-2">
          <Button 
            variant={activeTab === 'leaves' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab('leaves')}
          >
            Leave Requests ({leaveRequests.length})
          </Button>
          <Button 
            variant={activeTab === 'wfh' ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab('wfh')}
          >
            WFH Requests ({wfhRequests.length})
          </Button>
        </div>
        <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      
      <Card>
        {activeTab === 'leaves' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dept</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dates</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Days</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredLeaves.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(leave => {
                  const emp = employees.find(e => e.id === leave.employeeId);
                  return (
                    <tr key={leave.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{emp?.name || 'Unknown'}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{emp?.department}</td>
                      <td className="px-4 py-3 text-sm capitalize">{leave.type}</td>
                      <td className="px-4 py-3 text-sm">{formatDateShort(leave.startDate)} - {formatDateShort(leave.endDate)}</td>
                      <td className="px-4 py-3 text-sm">{getDateDiff(leave.startDate, leave.endDate)}</td>
                      <td className="px-4 py-3"><StatusBadge status={leave.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredLeaves.length === 0 && (
              <p className="text-center py-8 text-gray-500">No leave requests found</p>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dept</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredWFH.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map(wfh => {
                  const emp = employees.find(e => e.id === wfh.employeeId);
                  return (
                    <tr key={wfh.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-sm font-medium">{emp?.name || 'Unknown'}</td>
                      <td className="px-4 py-3 text-sm text-gray-500">{emp?.department}</td>
                      <td className="px-4 py-3 text-sm">{formatDate(wfh.date)}</td>
                      <td className="px-4 py-3 text-sm max-w-xs truncate">{wfh.reason}</td>
                      <td className="px-4 py-3"><StatusBadge status={wfh.status} /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {filteredWFH.length === 0 && (
              <p className="text-center py-8 text-gray-500">No WFH requests found</p>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

// Reports (Admin)
const Reports = ({ employees, leaveRequests, wfhRequests, monthlyRoster }) => {
  const [selectedMonth, setSelectedMonth] = useState(CURRENT_MONTH);
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);
  
  const monthKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}`;
  
  const departments = ['Inbound', 'Outbound', 'Sales'];
  
  const getMonthlyStats = (dept) => {
    const deptEmps = employees.filter(e => e.department === dept && e.role === 'agent');
    const rosterKey = `${monthKey}-${dept}`;
    const roster = monthlyRoster[rosterKey] || {};
    
    let totalWeekOffs = 0;
    deptEmps.forEach(emp => {
      totalWeekOffs += Object.values(roster[emp.id] || {}).filter(v => v === 'WO').length;
    });
    
    const monthStart = `${monthKey}-01`;
    const monthEnd = `${monthKey}-${getDaysInMonth(selectedYear, selectedMonth)}`;
    
    const leaves = leaveRequests.filter(l => {
      const emp = employees.find(e => e.id === l.employeeId);
      return emp?.department === dept && l.status === 'approved' &&
        (l.startDate <= monthEnd && l.endDate >= monthStart);
    });
    
    const wfhs = wfhRequests.filter(w => {
      const emp = employees.find(e => e.id === w.employeeId);
      return emp?.department === dept && w.status === 'approved' &&
        w.date >= monthStart && w.date <= monthEnd;
    });
    
    return {
      teamSize: deptEmps.length,
      weekOffs: totalWeekOffs,
      leaves: leaves.length,
      wfhs: wfhs.length,
    };
  };
  
  const changeMonth = (delta) => {
    let newMonth = selectedMonth + delta;
    let newYear = selectedYear;
    if (newMonth > 11) { newMonth = 0; newYear++; }
    else if (newMonth < 0) { newMonth = 11; newYear--; }
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Monthly Reports</h1>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => changeMonth(-1)}>
            <ChevronLeft size={20} />
          </Button>
          <span className="font-semibold min-w-[150px] text-center">
            {getMonthName(selectedMonth)} {selectedYear}
          </span>
          <Button variant="ghost" size="sm" onClick={() => changeMonth(1)}>
            <ChevronRight size={20} />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {departments.map(dept => {
          const stats = getMonthlyStats(dept);
          return (
            <Card key={dept} className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">{dept}</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm text-gray-600">Team Size</span>
                  <span className="font-bold text-indigo-600">{stats.teamSize}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-purple-50 rounded">
                  <span className="text-sm text-gray-600">Week Offs</span>
                  <span className="font-bold text-purple-600">{stats.weekOffs}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                  <span className="text-sm text-gray-600">Leaves Taken</span>
                  <span className="font-bold text-orange-600">{stats.leaves}</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                  <span className="text-sm text-gray-600">WFH Days</span>
                  <span className="font-bold text-blue-600">{stats.wfhs}</span>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

// Settings (Admin)
const SettingsPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Settings</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Leave Policy</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Planned Leave (Agents)</span>
              <span className="font-medium">12 days/year</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Sick Leave (Agents)</span>
              <span className="font-medium">6 days/year</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Planned Leave (Leads)</span>
              <span className="font-medium">15 days/year</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Sick Leave (Leads)</span>
              <span className="font-medium">8 days/year</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">System Info</h3>
          <div className="space-y-3">
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Version</span>
              <span className="font-medium">1.0.0</span>
            </div>
            <div className="flex justify-between p-3 bg-gray-50 rounded">
              <span>Data Storage</span>
              <span className="font-medium">Local Browser</span>
            </div>
            <div className="flex justify-between p-3 bg-blue-50 rounded">
              <span>Last Updated</span>
              <span className="font-medium">{formatDate(getDateString(TODAY))}</span>
            </div>
          </div>
          <Button 
            variant="danger" 
            className="w-full mt-4"
            onClick={() => {
              if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
                localStorage.clear();
                window.location.reload();
              }
            }}
          >
            <RefreshCw size={16} /> Reset All Data
          </Button>
        </Card>
      </div>
    </div>
  );
};

// Main App
export default function RosterDashboard() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [employees, setEmployees] = useState(getInitialEmployees);
  const [leaveRequests, setLeaveRequests] = useState(getInitialLeaveRequests);
  const [wfhRequests, setWFHRequests] = useState(getInitialWFHRequests);
  const [monthlyRoster, setMonthlyRoster] = useState(getInitialMonthlyRoster);
  
  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('sleepycat_employees', JSON.stringify(employees));
  }, [employees]);
  
  useEffect(() => {
    localStorage.setItem('sleepycat_leaves', JSON.stringify(leaveRequests));
  }, [leaveRequests]);
  
  useEffect(() => {
    localStorage.setItem('sleepycat_wfh', JSON.stringify(wfhRequests));
  }, [wfhRequests]);
  
  useEffect(() => {
    localStorage.setItem('sleepycat_roster', JSON.stringify(monthlyRoster));
  }, [monthlyRoster]);
  
  const handleLogin = (selectedUser) => {
    setUser(selectedUser);
    setActiveTab('dashboard');
  };
  
  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };
  
  const handleLeaveSubmit = (leave) => {
    setLeaveRequests(prev => [...prev, { ...leave, id: Date.now() }]);
  };
  
  const handleWFHSubmit = (wfh) => {
    setWFHRequests(prev => [...prev, { ...wfh, id: Date.now() }]);
  };
  
  const handleLeaveAction = (id, status, reason = '') => {
    setLeaveRequests(prev => prev.map(l => 
      l.id === id ? { ...l, status, approvedBy: user.id, rejectionReason: reason } : l
    ));
    
    // Update leave balance if approved
    if (status === 'approved') {
      const leave = leaveRequests.find(l => l.id === id);
      if (leave) {
        const days = getDateDiff(leave.startDate, leave.endDate);
        setEmployees(prev => prev.map(e => {
          if (e.id === leave.employeeId) {
            return {
              ...e,
              leaves: {
                ...e.leaves,
                used: {
                  ...e.leaves.used,
                  [leave.type]: e.leaves.used[leave.type] + days
                }
              }
            };
          }
          return e;
        }));
      }
    }
  };
  
  const handleWFHAction = (id, status, reason = '') => {
    setWFHRequests(prev => prev.map(w => 
      w.id === id ? { ...w, status, approvedBy: user.id, rejectionReason: reason } : w
    ));
  };
  
  const handleUpdateRoster = (rosterKey, schedules) => {
    setMonthlyRoster(prev => ({
      ...prev,
      [rosterKey]: schedules
    }));
  };
  
  const handleAddEmployee = (newEmp) => {
    const maxId = Math.max(...employees.map(e => e.id), 0);
    setEmployees(prev => [...prev, { ...newEmp, id: maxId + 1 }]);
  };
  
  const handleRemoveEmployee = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };
  
  const getPendingCount = () => {
    if (!user || user.role === 'agent') return 0;
    const teamMembers = user.role === 'admin' 
      ? employees.filter(e => e.role !== 'admin')
      : employees.filter(e => e.leadId === user.id);
    const pending = leaveRequests.filter(l => teamMembers.some(m => m.id === l.employeeId) && l.status === 'pending').length +
      wfhRequests.filter(w => teamMembers.some(m => m.id === w.employeeId) && w.status === 'pending').length;
    return pending;
  };
  
  if (!user) {
    return <LoginScreen onLogin={handleLogin} employees={employees} />;
  }
  
  const renderContent = () => {
    if (user.role === 'agent') {
      switch (activeTab) {
        case 'dashboard': return <AgentDashboard user={user} leaveRequests={leaveRequests} wfhRequests={wfhRequests} monthlyRoster={monthlyRoster} employees={employees} />;
        case 'apply-leave': return <ApplyLeave user={user} onSubmit={handleLeaveSubmit} />;
        case 'my-leaves': return <MyLeaves user={user} leaveRequests={leaveRequests} />;
        case 'wfh-request': return <WFHRequest user={user} wfhRequests={wfhRequests} onSubmit={handleWFHSubmit} />;
        case 'my-roster': return <MyRoster user={user} monthlyRoster={monthlyRoster} employees={employees} leaveRequests={leaveRequests} wfhRequests={wfhRequests} />;
        default: return <AgentDashboard user={user} leaveRequests={leaveRequests} wfhRequests={wfhRequests} monthlyRoster={monthlyRoster} employees={employees} />;
      }
    }
    
    if (user.role === 'lead') {
      switch (activeTab) {
        case 'dashboard': return <LiveDashboard user={user} employees={employees} leaveRequests={leaveRequests} wfhRequests={wfhRequests} monthlyRoster={monthlyRoster} />;
        case 'approvals': return <Approvals user={user} employees={employees} leaveRequests={leaveRequests} wfhRequests={wfhRequests} onLeaveAction={handleLeaveAction} onWFHAction={handleWFHAction} />;
        case 'team': return <Team user={user} employees={employees} />;
        case 'monthly-roster': return <MonthlyRosterManagement user={user} employees={employees} monthlyRoster={monthlyRoster} onUpdateRoster={handleUpdateRoster} leaveRequests={leaveRequests} wfhRequests={wfhRequests} />;
        case 'apply-leave': return <ApplyLeave user={user} onSubmit={handleLeaveSubmit} />;
        case 'my-leaves': return <MyLeaves user={user} leaveRequests={leaveRequests} />;
        default: return <LiveDashboard user={user} employees={employees} leaveRequests={leaveRequests} wfhRequests={wfhRequests} monthlyRoster={monthlyRoster} />;
      }
    }
    
    if (user.role === 'admin') {
      switch (activeTab) {
        case 'dashboard': return <LiveDashboard user={user} employees={employees} leaveRequests={leaveRequests} wfhRequests={wfhRequests} monthlyRoster={monthlyRoster} />;
        case 'manage-employees': return <ManageEmployees employees={employees} onAddEmployee={handleAddEmployee} onRemoveEmployee={handleRemoveEmployee} />;
        case 'all-employees': return <AllEmployees employees={employees} />;
        case 'all-requests': return <AllRequests employees={employees} leaveRequests={leaveRequests} wfhRequests={wfhRequests} />;
        case 'monthly-roster': return <MonthlyRosterManagement user={user} employees={employees} monthlyRoster={monthlyRoster} onUpdateRoster={handleUpdateRoster} leaveRequests={leaveRequests} wfhRequests={wfhRequests} />;
        case 'reports': return <Reports employees={employees} leaveRequests={leaveRequests} wfhRequests={wfhRequests} monthlyRoster={monthlyRoster} />;
        case 'settings': return <SettingsPage />;
        default: return <LiveDashboard user={user} employees={employees} leaveRequests={leaveRequests} wfhRequests={wfhRequests} monthlyRoster={monthlyRoster} />;
      }
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar user={user} activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} pendingCount={getPendingCount()} />
      <div className="flex-1 p-6 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
}
