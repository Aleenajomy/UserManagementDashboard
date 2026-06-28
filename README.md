# UserSphere — Enterprise User Management Dashboard

UserSphere is a highly responsive, feature-rich React application built on top of the Vite build pipeline. It delivers a premium, glassmorphism-themed administrative dashboard for performing CRUD (Create, Read, Update, Delete) operations on employee data, simulating interactions with a REST API database backend.

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 18 or above recommended) and npm installed.

### Installation
1. Navigate to the project directory:
   ```bash
   cd user-management-dashboard
   ```
2. Install all dependencies:
   ```bash
   npm install
   ```

### Running the Project
- **Development Server:** Start the local development server at `http://localhost:5173`:
  ```bash
  npm run dev
  ```
- **Production Build:** Build the optimized production bundle:
  ```bash
  npm run build
  ```
- **Preview Production:** Preview the built production assets locally:
  ```bash
  npm run preview
  ```

---

## 📂 Project Structure Map

Here is the modular layout of the application:

```text
user-management-dashboard/
├── public/                 # Static assets
├── src/
│   ├── api/
│   │   └── userService.js  # Axios configurations and endpoint handlers
│   ├── components/
│   │   ├── Header.jsx      # Dashboard logo and realtime metrics
│   │   ├── SearchBar.jsx   # Live query text matching search
│   │   ├── FilterPopup.jsx # Targeted dropdown selectors for Role, Status, Dept
│   │   ├── UserTable.jsx   # Responsive grid layout with sorting actions
│   │   ├── UserRow.jsx     # Table row mapping & action triggers
│   │   ├── UserForm.jsx    # Pop-up dialog form for Add & Edit
│   │   ├── Pagination.jsx  # Page boundaries & view limit selectors
│   │   └── ConfirmDelete.jsx # Double-check delete safety confirmation
│   ├── hooks/
│   │   └── useUsers.js     # Custom hook for data logic and LocalStorage sync
│   ├── styles/
│   │   ├── variables.css   # Color palette tokens & glassmorphism custom properties
│   │   └── components.css  # Custom layouts, cards, scrollbars, and buttons
│   ├── utils/
│   │   ├── constants.js    # Departments, options, and page defaults
│   │   ├── helpers.js      # Name splitters, ID generators, and randomizers
│   │   └── validators.js   # Front-end regular expression validation checks
│   ├── App.jsx             # Top-level state coordinator
│   └── main.jsx            # Application entry point
├── package.json            # Scripts & libraries declarations
└── README.md               # Setup & engineering documentation
```

---

## 🛠️ Libraries Used

| Library | Version | Purpose |
|---|---|---|
| **React** | `^19.2.7` | UI component construction |
| **Axios** | `^1.7.9` | Asynchronous communication with the REST API |
| **Lucide React** | `^0.469.0` | Elegant SVG iconography |
| **Vite** | `^8.1.0` | Hot-Module Replacement (HMR) build system |

---

## 🧠 Engineering Assumptions

To align the mock user schemas from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) with the dashboard's features, we made the following logical mappings:

1. **Name Extraction:** The API schema stores names as a single full name string (e.g., `"Leanne Graham"`). In `helpers.js`, we split this name on the first space. The first segment becomes `firstName` and the rest becomes `lastName`.
2. **Department Allocation:** Since JSONPlaceholder has no departments, we allocate a department (e.g., `"Engineering"`, `"Sales"`, `"IT"`) deterministically on initial load by cycling through `DEPARTMENTS` array based on the user index.
3. **Role & Status Seeding:** Roles (`Admin`, `Editor`, `Viewer`) and account statuses (`Active`, `Inactive`, `Pending`) are seeded on initial load from API using simple index modulo cycling, ensuring a diverse and rich visual state on start.

---

## ⚡ Challenges Faced & Solutions

### Read-Only API Limitations
**Challenge:** JSONPlaceholder is a read-only mock API. Performing `POST`, `PUT`, or `DELETE` requests will return mock success responses (e.g., HTTP `201` for POST with duplicate ID `11`), but will not persist the modifications in the remote database. Reloading the page would wipe out all user changes.
**Solution:**
We designed a synchronization strategy in the custom React hook `useUsers.js`:
- On mount, if local storage contains a saved session under `user_management_dashboard_users`, it loads that state immediately.
- If it's a first-time load, it fetches the default 10 users from JSONPlaceholder, maps them to our internal model (first/last names, departments, roles, statuses), saves this array to `localStorage`, and updates the hook's state.
- For CRUD actions:
  - **Create:** Fires a POST request to JSONPlaceholder, generates a local unique incremental ID, appends the new record to state, and persists the full array in `localStorage`.
  - **Update:** Fires a PUT request to JSONPlaceholder, maps the modifications to local state, and saves it in `localStorage`. If the user is locally created (has a custom ID), we catch the API error and update it locally.
  - **Delete:** Fires a DELETE request to JSONPlaceholder, filters the deleted ID out of state, and updates `localStorage`.
- **Reset Feature:** Added a Refresh/Reset button in the Header to wipe `localStorage` and trigger a fresh seed pull from JSONPlaceholder.

---

## 🔮 Future Architectural Improvements

If we had more development cycles, we would implement:
1. **Dynamic Backend Services:** Connect to a real Node.js/Express/MongoDB database to support real-time persistence across multiple browsers and sessions.
2. **State Management Middleware:** Use Redux Toolkit or Zustand for robust global state management, avoiding props-drilling for complex page structures.
3. **TypeScript Integration:** Convert files to `.ts` / `.tsx` to add strong typing interfaces, enhancing component integrity and compile-time checks.
4. **Rich Routing:** Integrate `react-router-dom` to support deep linking (e.g., `/users/1/edit`), paginated URLs (e.g., `/users?page=2`), and private admin dashboard route guards.
