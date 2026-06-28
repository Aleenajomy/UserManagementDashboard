import React from "react";
import { Users, UserCheck, UserX, Clock, Sun, Moon, RefreshCw } from "lucide-react";

export default function Header({
  totalUsers = 0,
  activeUsers = 0,
  inactiveUsers = 0,
  pendingUsers = 0,
  theme = "dark",
  toggleTheme,
  onReset
}) {
  return (
    <header className="header-container">
      <div className="header-top">
        <div className="branding">
          <div className="branding-logo">
            <Users size={24} />
          </div>
          <div className="branding-title">
            <h1>UserSphere</h1>
            <p>Enterprise User Management Platform</p>
          </div>
        </div>

        <div className="header-actions">
          <button
            onClick={onReset}
            className="btn btn-secondary btn-icon"
            title="Reset to default mock data"
          >
            <RefreshCw size={18} />
          </button>
          
          <button
            onClick={toggleTheme}
            className="btn btn-secondary btn-icon"
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="glass-panel metric-card total">
          <div className="metric-icon-wrapper">
            <Users size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-value">{totalUsers}</span>
            <span className="metric-label">Total Employees</span>
          </div>
        </div>

        <div className="glass-panel metric-card active">
          <div className="metric-icon-wrapper">
            <UserCheck size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-value">{activeUsers}</span>
            <span className="metric-label">Active Roles</span>
          </div>
        </div>

        <div className="glass-panel metric-card pending">
          <div className="metric-icon-wrapper">
            <Clock size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-value">{pendingUsers}</span>
            <span className="metric-label">Pending Approval</span>
          </div>
        </div>

        <div className="glass-panel metric-card inactive">
          <div className="metric-icon-wrapper">
            <UserX size={22} />
          </div>
          <div className="metric-info">
            <span className="metric-value">{inactiveUsers}</span>
            <span className="metric-label">Inactive / Suspended</span>
          </div>
        </div>
      </div>
    </header>
  );
}
