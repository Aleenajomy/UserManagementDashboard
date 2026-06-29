# Enterprise User Management Dashboard

UserSphere is a highly responsive, feature-rich React application built on top of the Vite build pipeline. It delivers a premium, glassmorphism-themed administrative dashboard for performing CRUD (Create, Read, Update, Delete) operations on employee data, simulating interactions with a REST API database backend.

---

## 🚀 Project Overview

UserSphere is an enterprise-grade user directory dashboard designed for administrators to manage employee profiles. Key features include:
- Full CRUD operations (Add, Edit, and Delete users) connected to a simulated API.
- Instant search by name and email.
- Advanced filters by role, status, and department.
- Column-based ascending/descending sorting.
- Client-side pagination with configurable page sizes.
- Real-time KPI metrics showing active, pending, inactive, and total employees.
- Clean and premium dual-mode theme support (Dark and Light modes) with a professional Sky Blue & Mint palette.

---

## 📦 Installation Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or above recommended) and npm installed on your system.

### Setup Steps
1. Clone or navigate to the project directory:
   ```bash
   cd user-management-dashboard
   ```
2. Install all package dependencies:
   ```bash
   npm install
   ```

---

## ⚙️ Running the Project

You can run the dashboard locally using the following scripts defined in the project:

- **Launch Development Server:** Runs the local Vite HMR server at `http://localhost:5173`:
  ```bash
  npm run dev
  ```
- **Production Build:** Builds the optimized static assets for production:
  ```bash
  npm run build
  ```
- **Preview Production Build:** Launches a local server to preview the built production folder:
  ```bash
  npm run preview
  ```
- **Run Linting Checks:** Evaluates the JavaScript and React syntax correctness:
  ```bash
  npm run lint
  ```

---

## 📂 Folder Structure Map

Here is the modular layout of the application:

```text
user-management-dashboard/
├── public/                 # Static assets (favicons, etc.)
├── src/
│   ├── api/
│   │   └── userService.js  # Axios configuration and JSONPlaceholder API calls
│   ├── components/
│   │   ├── Header.jsx      # Top header brand layout and realtime KPI metrics grid
│   │   ├── SearchBar.jsx   # Live query search input
│   │   ├── FilterPopup.jsx # Multi-selector dropdown for Role, Status, and Department
│   │   ├── UserTable.jsx   # Data grid with sortable columns
│   │   ├── UserRow.jsx     # Individual table row mapping and edit/delete actions
│   │   ├── UserForm.jsx    # Modal form wrapper for adding and editing users
│   │   ├── Pagination.jsx  # Row limit selector and page navigator
│   │   └── ConfirmDelete.jsx # Action safety double-check delete modal
│   ├── hooks/
│   │   └── useUsers.js     # Custom React hook controlling API calls and state
│   ├── styles/
│   │   ├── variables.css   # Theme token definitions (Slate, Sky Blue & Mint colors)
│   │   └── components.css  # Component-specific styles and layouts
│   ├── utils/
│   │   ├── constants.js    # Hardcoded options, defaults, and department lists
│   │   ├── helpers.js      # Utility functions (splitting name, custom local ID seed)
│   │   └── validators.js   # Client-side regex input validators
│   ├── App.jsx             # Root layout controller and context coordinator
│   └── main.jsx            # DOM entry point
├── package.json            # Scripts & libraries declarations
└── README.md               # UserSphere deployment & technical details
```

---

## 🛠️ Libraries Used

The project makes use of the following key libraries:

- **React (`^19.2.7`):** Component-based virtual DOM library for building modular UIs.
- **Axios (`^1.18.1`):** Promise-based HTTP client used to interface with JSONPlaceholder.
- **Lucide React (`^1.21.0`):** Modern and clean vector-based icons.
- **Vite (`^8.1.0`):** Next-generation frontend build tooling and fast dev server.
- **Vitest (`^4.1.9`):** Fast unit testing framework.
- **ESLint (`^10.5.0`):** Linter for static code analysis.

---

## 🧠 Engineering Assumptions

To bridge the gap between the default mock schemas from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) and the complex dashboard features, we implemented the following logical mappings:

1. **Name Extraction:** The API schema returns employee names as a single full name string (e.g., `"Leanne Graham"`). We divide this string on the first space. The first segment becomes `firstName` and the rest becomes `lastName` to feed the first-name/last-name inputs.
2. **Department Allocation:** Since JSONPlaceholder has no departments, we allocate a department (e.g., `"Design"`, `"Engineering"`, `"Sales"`, etc.) deterministically on initial load by cycling through the `DEPARTMENTS` array based on the user's list index.
3. **Role & Status Seeding:** Roles (`Admin`, `Editor`, `Viewer`) and account statuses (`Active`, `Inactive`, `Pending`) are seeded on initial load from the API using simple index modulo cycling, ensuring a diverse and rich visual state on start.

---

## ⚡ Challenges Faced

### Mock API Read-Only Status
**Challenge:** JSONPlaceholder is a read-only mock API. Performing `POST`, `PUT`, or `DELETE` requests returns mock success codes (e.g., HTTP `201`), but does not actually persist the modifications in the remote database. Refreshing the dashboard would lose all user edits.
**Solution:**
We designed a dual-persistence synchronization strategy in the custom React hook `useUsers.js`:
- **First Load:** If `localStorage` is empty, the hook fetches the default users from JSONPlaceholder, maps them to our extended model, saves this array to `localStorage`, and updates the hook's state.
- **Subsequent Loads:** Loads state directly from `localStorage` to preserve user changes across refreshes.
- **CRUD Operations:**
  - **Create:** Fires a POST request to JSONPlaceholder, generates a local unique incremental ID, appends the new record to state, and persists the full array in `localStorage`.
  - **Update:** Fires a PUT request to JSONPlaceholder, maps the modifications to local state, and saves it in `localStorage`. If the user is locally created (has a custom ID), we catch the API error and update it locally.
  - **Delete:** Fires a DELETE request to JSONPlaceholder, filters the deleted ID out of state, and updates `localStorage`.
- **Reset Feature:** Added a Refresh/Reset button in the Header to wipe `localStorage` and trigger a fresh seed pull from JSONPlaceholder.

---

## 🔮 Future Architectural Improvements

If we had more development cycles, we would implement the following next-step improvements:
1. **Database Persistence:** Connect the React frontend to a real Node.js/Express/MongoDB database to support real-time persistence across multiple browsers and sessions.
2. **Advanced Sorting Mechanisms:** Support multi-column sorting (sorting by department and status simultaneously) and server-side sorting for paginated tables.
3. **Authentication & Authorization Systems:** Integrate OAuth 2.0 or JWT Auth to restrict Add, Edit, and Delete actions to authorized administrators, while providing read-only access to viewers.
4. **Rich Routing:** Integrate `react-router-dom` to support deep linking (e.g., `/users/1/edit`), paginated URLs (e.g., `/users?page=2`), and private admin dashboard route guards.
