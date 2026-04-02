import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { adminUi, statusBadge } from './adminStyles';

const ServiceRequests = () => {
  const initialTickets = [
    { id: 'TKT-2401', customerName: 'Rahul Sharma', product: 'Washing Machine', issue: 'Motor not starting', priority: 'High', status: 'Pending', date: '01 Apr 2026', assignedTo: 'Unassigned' },
    { id: 'TKT-2402', customerName: 'Priya Verma', product: 'Induction Cooktop', issue: 'Display malfunction', priority: 'Medium', status: 'In Progress', date: '31 Mar 2026', assignedTo: 'Tech Team A' },
    { id: 'TKT-2403', customerName: 'Amit Patel', product: 'Refrigerator', issue: 'Cooling not working', priority: 'High', status: 'In Progress', date: '30 Mar 2026', assignedTo: 'Tech Team B' },
    { id: 'TKT-2404', customerName: 'Neha Singh', product: 'Mixer Grinder', issue: 'Blades grinding noise', priority: 'Low', status: 'Completed', date: '29 Mar 2026', assignedTo: 'Tech Team A' },
    { id: 'TKT-2405', customerName: 'Vikram Kumar', product: 'Water Purifier', issue: 'Leakage from tap', priority: 'Medium', status: 'Pending', date: '28 Mar 2026', assignedTo: 'Unassigned' },
    { id: 'TKT-2406', customerName: 'Anjali Desai', product: 'Microwave Oven', issue: 'Heating not working', priority: 'High', status: 'Completed', date: '27 Mar 2026', assignedTo: 'Tech Team C' },
  ];

  const [tickets, setTickets] = useState(initialTickets);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const statuses = ['All', 'Pending', 'In Progress', 'Completed'];

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch = ticket.customerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleMarkInProgress = (id) => {
    const ticket = tickets.find((item) => item.id === id);
    setTickets(tickets.map((item) => (item.id === id ? { ...item, status: 'In Progress' } : item)));
    toast(`Ticket ${id} marked In Progress for ${ticket?.customerName}`, { icon: '...' });
  };

  const handleMarkCompleted = (id) => {
    const ticket = tickets.find((item) => item.id === id);
    setTickets(tickets.map((item) => (item.id === id ? { ...item, status: 'Completed' } : item)));
    toast.success(`Ticket ${id} completed for ${ticket?.customerName}`);
  };

  const handleReopen = (id) => {
    setTickets(tickets.map((item) => (item.id === id ? { ...item, status: 'Pending' } : item)));
    toast(`Ticket ${id} reopened`, { icon: '...' });
  };

  const stats = [
    { title: 'Total Tickets', value: tickets.length },
    { title: 'Pending', value: tickets.filter((ticket) => ticket.status === 'Pending').length },
    { title: 'In Progress', value: tickets.filter((ticket) => ticket.status === 'In Progress').length },
    { title: 'Completed', value: tickets.filter((ticket) => ticket.status === 'Completed').length },
  ];

  return (
    <div className={adminUi.page}>
      <div>
        <h1 className={adminUi.pageTitle}>Service Requests</h1>
        <p className={adminUi.pageDescription}>Manage customer service tickets and support requests.</p>
      </div>

      <div className={adminUi.statsGrid}>
        {stats.map((stat) => (
          <div key={stat.title} className={adminUi.card}>
            <p className={adminUi.cardTitle}>{stat.title}</p>
            <p className={adminUi.cardValue}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          type="text"
          placeholder="Search by customer name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={adminUi.input}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className={adminUi.select}
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status === 'All' ? 'All Status' : status}
            </option>
          ))}
        </select>
      </div>

      <div className={adminUi.panel}>
        <div className={adminUi.panelHeader}>
          <h2 className={adminUi.panelTitle}>Service Tickets ({filteredTickets.length})</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={adminUi.tableHeader}>
              <tr>
                <th className={adminUi.th}>Ticket ID</th>
                <th className={adminUi.th}>Customer</th>
                <th className={adminUi.th}>Product</th>
                <th className={adminUi.th}>Issue</th>
                <th className={adminUi.th}>Priority</th>
                <th className={adminUi.th}>Status</th>
                <th className={adminUi.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length > 0 ? (
                filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className={adminUi.tableRow}>
                    <td className={`${adminUi.td} font-medium text-gray-900`}>{ticket.id}</td>
                    <td className={adminUi.td}>{ticket.customerName}</td>
                    <td className={adminUi.td}>{ticket.product}</td>
                    <td className={adminUi.td}>{ticket.issue}</td>
                    <td className={adminUi.td}>
                      <span className={statusBadge(ticket.priority)}>{ticket.priority}</span>
                    </td>
                    <td className={adminUi.td}>
                      <span className={statusBadge(ticket.status)}>{ticket.status}</span>
                    </td>
                    <td className={adminUi.td}>
                      <div className="flex items-center gap-4">
                        {ticket.status === 'Pending' && (
                          <button onClick={() => handleMarkInProgress(ticket.id)} className={adminUi.textButton}>
                            Start
                          </button>
                        )}
                        {ticket.status !== 'Completed' && (
                          <button onClick={() => handleMarkCompleted(ticket.id)} className={adminUi.textButton}>
                            Complete
                          </button>
                        )}
                        {ticket.status === 'Completed' && (
                          <button onClick={() => handleReopen(ticket.id)} className={adminUi.textButton}>
                            Reopen
                          </button>
                        )}
                        <button onClick={() => alert(`View details for ${ticket.id}`)} className={adminUi.textButton}>
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-sm text-gray-400">
                    No service requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className={adminUi.card}>
          <h3 className="mb-4 text-sm font-semibold text-gray-900">Status Guide</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className={statusBadge('Pending')}>Pending</span>
              <span className="text-sm text-gray-500">Awaiting technician assignment</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={statusBadge('In Progress')}>In Progress</span>
              <span className="text-sm text-gray-500">Technician is working on it</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={statusBadge('Completed')}>Completed</span>
              <span className="text-sm text-gray-500">Service resolved and closed</span>
            </div>
          </div>
        </div>

        <div className={adminUi.card}>
          <h3 className="mb-4 text-sm font-semibold text-gray-900">Priority Guide</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className={statusBadge('High')}>High</span>
              <span className="text-sm text-gray-500">Critical issues</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={statusBadge('Medium')}>Medium</span>
              <span className="text-sm text-gray-500">Standard issues</span>
            </div>
            <div className="flex items-center gap-3">
              <span className={statusBadge('Low')}>Low</span>
              <span className="text-sm text-gray-500">Non-urgent issues</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className={adminUi.card}>
          <p className={adminUi.cardTitle}>Avg Wait Time (Pending)</p>
          <p className={adminUi.cardValue}>2.4 hrs</p>
        </div>
        <div className={adminUi.card}>
          <p className={adminUi.cardTitle}>Avg Resolution Time</p>
          <p className={adminUi.cardValue}>24.8 hrs</p>
        </div>
        <div className={adminUi.card}>
          <p className={adminUi.cardTitle}>Resolution Rate</p>
          <p className={adminUi.cardValue}>83.3%</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequests;
