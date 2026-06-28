import React, { useState, useMemo, useEffect } from "react";
import { Plus, UserPlus, Info, X } from "lucide-react";
import useUsers from "./hooks/useUsers";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import FilterPopup from "./components/FilterPopup";
import UserTable from "./components/UserTable";
import Pagination from "./components/Pagination";
import UserForm from "./components/UserForm";
import ConfirmDelete from "./components/ConfirmDelete";

export default function App() {
  // Hook for user operations & local storage sync
  const {
    users,
    loading,
    error,
    addUser,
    editUser,
    removeUser,
    resetUsers,
    setError
  } = useUsers();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  // Sorting State
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  // Modal Dialogs States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);

  // Toast System State
  const [toasts, setToasts] = useState([]);

  // Theme Sync State
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("user_dashboard_theme") || "dark";
  });

  // Apply theme class to HTML element
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("user_dashboard_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Toast Dispatcher Helper
  const showToast = (message, type = "success") => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Reset page index on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedRole, selectedStatus, selectedDepartment, sortField, sortOrder, pageSize]);

  // Handle Sort Toggle
  const handleSortChange = (field) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Clear filters
  const handleClearFilters = () => {
    setSelectedRole(null);
    setSelectedStatus(null);
    setSelectedDepartment(null);
    showToast("Filters cleared successfully", "info");
  };

  // Trigger Add User Modal
  const handleAddClick = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  // Trigger Edit User Modal
  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  // Trigger Delete Modal
  const handleDeleteClick = (user) => {
    setDeletingUser(user);
    setIsDeleteOpen(true);
  };

  // Form submit handler (handles both create and update)
  const handleFormSubmit = async (formData) => {
    setIsFormOpen(false);
    try {
      if (editingUser) {
        await editUser(editingUser.id, formData);
        showToast(`Employee "${formData.firstName} ${formData.lastName}" details updated.`);
      } else {
        await addUser(formData);
        showToast(`Employee "${formData.firstName} ${formData.lastName}" successfully registered.`);
      }
    } catch (err) {
      showToast("Operation failed. Please try again.", "danger");
    } finally {
      setEditingUser(null);
    }
  };

  // Delete confirm handler
  const handleDeleteConfirm = async () => {
    setIsDeleteOpen(false);
    if (!deletingUser) return;

    try {
      await removeUser(deletingUser.id);
      showToast(`Employee "${deletingUser.firstName} ${deletingUser.lastName}" deleted successfully.`, "danger");
    } catch (err) {
      showToast("Delete operation failed. Check connection.", "danger");
    } finally {
      setDeletingUser(null);
    }
  };

  // Reset all to API default
  const handleResetData = async () => {
    if (window.confirm("Are you sure you want to reset all local changes and pull default API data?")) {
      try {
        await resetUsers();
        showToast("Dashboard reset to initial API seed data.", "info");
      } catch (err) {
        showToast("Failed to reset dashboard data.", "danger");
      }
    }
  };

  // Metrics Calculations (Memoized)
  const metrics = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === "Active").length,
      inactive: users.filter((u) => u.status === "Inactive").length,
      pending: users.filter((u) => u.status === "Pending").length
    };
  }, [users]);

  // Filtering Logic (Memoized)
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      // Search Box Match
      const matchesSearch =
        searchQuery === "" ||
        user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());

      // Dropdown Select Match
      const matchesRole = !selectedRole || user.role === selectedRole;
      const matchesStatus = !selectedStatus || user.status === selectedStatus;
      const matchesDept = !selectedDepartment || user.department === selectedDepartment;

      return matchesSearch && matchesRole && matchesStatus && matchesDept;
    });
  }, [users, searchQuery, selectedRole, selectedStatus, selectedDepartment]);

  // Sorting Logic (Memoized)
  const sortedUsers = useMemo(() => {
    return [...filteredUsers].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      // Handle String Sorting
      if (typeof valA === "string") {
        const textA = valA.trim().toLowerCase();
        const textB = valB.trim().toLowerCase();
        return sortOrder === "asc"
          ? textA.localeCompare(textB)
          : textB.localeCompare(textA);
      }

      // Handle Numeric Sorting (id)
      return sortOrder === "asc" ? Number(valA) - Number(valB) : Number(valB) - Number(valA);
    });
  }, [filteredUsers, sortField, sortOrder]);

  // Pagination Slice Logic (Memoized)
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedUsers.slice(start, start + pageSize);
  }, [sortedUsers, currentPage, pageSize]);

  return (
    <div className="app-container">
      {/* Toast Alert popups */}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <span>{t.message}</span>
          </div>
        ))}
      </div>

      {/* Header with KPI metrics */}
      <Header
        totalUsers={metrics.total}
        activeUsers={metrics.active}
        inactiveUsers={metrics.inactive}
        pendingUsers={metrics.pending}
        theme={theme}
        toggleTheme={toggleTheme}
        onReset={handleResetData}
      />

      {/* Search and Filters panel */}
      <div className="controls-container">
        <div className="controls-left">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          <FilterPopup
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            selectedDepartment={selectedDepartment}
            setSelectedDepartment={setSelectedDepartment}
            onClearFilters={handleClearFilters}
          />
        </div>

        <button type="button" className="btn btn-primary" onClick={handleAddClick}>
          <UserPlus size={18} />
          Add Employee
        </button>
      </div>

      {/* Main Error boundary box */}
      {error && (
        <div className="glass-panel" style={{
          borderColor: "var(--danger-border)",
          backgroundColor: "var(--danger-bg)",
          padding: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "var(--danger)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Info size={20} />
            <span>{error}</span>
          </div>
          <button
            type="button"
            className="modal-close"
            style={{ color: "var(--danger)" }}
            onClick={() => setError(null)}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Loading Indicator */}
      {loading ? (
        <div className="glass-panel table-card">
          <div className="spinner-wrapper">
            <div className="spinner"></div>
            <p>Loading database directory...</p>
          </div>
        </div>
      ) : (
        /* Data grid components */
        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          <UserTable
            users={paginatedUsers}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            sortField={sortField}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />
          <Pagination
            currentPage={currentPage}
            totalItems={sortedUsers.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
          />
        </div>
      )}

      {/* User Form Add & Edit Modals */}
      <UserForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleFormSubmit}
        user={editingUser}
      />

      {/* Deletion verification safety dialog */}
      <ConfirmDelete
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          setDeletingUser(null);
        }}
        onConfirm={handleDeleteConfirm}
        userName={deletingUser ? `${deletingUser.firstName} ${deletingUser.lastName}` : ""}
      />
    </div>
  );
}
