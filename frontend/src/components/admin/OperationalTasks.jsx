import React, { useState } from 'react';

const OperationalTasks = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Process Bulk Order', dept: 'Sales', assigned: 'John', status: 'In Progress', priority: 'High', dueDate: '2024-04-05' },
    { id: 2, title: 'Stock Verification', dept: 'Inventory', assigned: 'Sarah', status: 'Pending', priority: 'Medium', dueDate: '2024-04-06' },
    { id: 3, title: 'Customer Follow-up', dept: 'Support', assigned: 'Mike', status: 'Pending', priority: 'Low', dueDate: '2024-04-07' },
    { id: 4, title: 'Appliance Delivery', dept: 'Operations', assigned: 'You', status: 'Completed', priority: 'High', dueDate: '2024-04-01' },
  ]);

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-black">⚙️ Task Management</h2>

      <div className="bg-white rounded-xl border border-orange-200 p-4 sm:p-6">
        <div className="overflow-x-auto -mx-4 sm:mx-0 sm:overflow-x-visible">
          <div className="inline-block min-w-full px-4 sm:px-0">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-orange-200">
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-orange-600">Task</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-orange-600 hidden sm:table-cell">Dept</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-left font-bold text-orange-600 hidden md:table-cell">Assigned</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-bold text-orange-600">Priority</th>
                  <th className="px-2 sm:px-4 py-2 sm:py-3 text-center font-bold text-orange-600">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="border-b border-orange-200 hover:bg-orange-100 transition-all">
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-900 font-semibold whitespace-nowrap">{task.title.split(' ').slice(0, 2).join(' ')}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-700 hidden sm:table-cell">{task.dept}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-gray-700 hidden md:table-cell">{task.assigned}</td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                      <span className={`px-2 py-0.5 sm:py-1 rounded text-xs font-semibold inline-block ${
                        task.priority === 'High' ? 'bg-red-100 text-red-800' :
                        task.priority === 'Medium' ? 'bg-orange-100 text-orange-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-2 sm:px-4 py-2 sm:py-3 text-center">
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-xs border-none cursor-pointer ${
                          task.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                          task.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}
                      >
                        <option>Pending</option>
                        <option>In Progress</option>
                        <option>Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
        <div className="bg-blue-100 rounded-xl border border-blue-300 p-3 sm:p-4">
          <h4 className="text-blue-800 font-bold text-xs sm:text-sm mb-1 sm:mb-2">📊 In Progress</h4>
          <p className="text-lg sm:text-2xl font-bold text-blue-600">{tasks.filter(t => t.status === 'In Progress').length}</p>
        </div>
        <div className="bg-yellow-100 rounded-xl border border-yellow-300 p-3 sm:p-4">
          <h4 className="text-yellow-800 font-bold text-xs sm:text-sm mb-1 sm:mb-2">⏳ Pending</h4>
          <p className="text-lg sm:text-2xl font-bold text-yellow-600">{tasks.filter(t => t.status === 'Pending').length}</p>
        </div>
        <div className="bg-green-100 rounded-xl border border-green-300 p-3 sm:p-4">
          <h4 className="text-green-800 font-bold text-xs sm:text-sm mb-1 sm:mb-2">✅ Completed</h4>
          <p className="text-lg sm:text-2xl font-bold text-green-600">{tasks.filter(t => t.status === 'Completed').length}</p>
        </div>
      </div>
    </div>
  );
};

export default OperationalTasks;
