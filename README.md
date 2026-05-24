A responsive React.js application for managing users — view, search, filter, sort, create, edit, and delete user records using the [DummyJSON Users API](https://dummyjson.com/docs/users).

## Features

- **Users List** — Tabular display with avatar, name, email, phone, company, role, and action buttons
- **Search** — Search users by first name, last name, or email (debounced)
- **Filter** — Filter by role (Admin / Moderator / User) and gender (Male / Female)
- **Sort** — Sort by name (A–Z / Z–A) or age (Low–High / High–Low)
- **Pagination** — Client-side pagination showing 10 users per page
- **Create & Edit** — Modal form with field validation for adding and editing users
- **Delete** — Delete users with a confirmation dialog
- **User Details** — Dedicated page showing full user profile (basic, address, company, and additional info)
- **Dark Mode** — Toggle between light and dark themes with system preference detection
- **Toast Notifications** — Success/error feedback on CRUD operations
- **Skeleton Loader** — Loading placeholders for a smooth perceived performance
- **Sticky Header** — Persistent navigation header with back link
- **Responsive Design** — Fully responsive across desktop, tablet, and mobile

## Tech Stack

- **React 18** — UI library
- **React Router v6** — Client-side routing
- **Vite** — Build tool and dev server
- **JavaScript (ES6+)** — No TypeScript, no UI libraries
- **CSS** — Custom styling with CSS variables for theming
- **Fetch API** — HTTP requests via native `fetch`

> **Note:** No external UI component libraries (Material UI, Ant Design, Bootstrap, Chakra UI, etc.) are used. All components are built from scratch.

## Project Structure

```
src/
├── api/
│   └── userService.js          # API layer — all DummyJSON endpoints
├── components/
│   ├── ConfirmDialog/           # Delete confirmation modal
│   ├── Layout/                  # Header component
│   ├── Modal/                   # Reusable modal overlay
│   ├── Pagination/              # Page navigation controls
│   ├── Skeleton/                # Loading skeleton placeholders
│   ├── Toast/                   # Toast notification container
│   ├── UserFilters/             # Search, filter, sort toolbar
│   ├── UserForm/                # Create/Edit user modal form
│   └── UserTable/               # User data table
├── context/
│   ├── ThemeContext.jsx          # Dark/light mode context
│   └── ToastContext.jsx          # Toast notification context
├── hooks/
│   ├── useDebounce.js           # Debounce hook for search
│   └── useUsers.js              # User data management hook
├── pages/
│   ├── UserDetails/             # User profile detail page
│   └── UserList/                # Main user listing page
├── utils/
│   ├── constants.js             # Shared constants and config
│   ├── helpers.js               # Utility functions
│   └── validators.js            # Form validation logic
├── App.jsx                      # Root component with routing
├── index.css                    # Global styles and design tokens
└── main.jsx                     # Application entry point
```

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Production Build

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

## API Reference

This application uses the **DummyJSON Users API**:

| Endpoint                  | Method | Description              |
| ------------------------- | ------ | ------------------------ |
| `/users?limit=10&skip=0`  | GET    | Fetch paginated users    |
| `/users/search?q=John`    | GET    | Search users by query    |
| `/users/{id}`             | GET    | Fetch single user        |
| `/users/add`              | POST   | Create a new user        |
| `/users/{id}`             | PUT    | Update an existing user  |
| `/users/{id}`             | DELETE | Delete a user            |

> **Note:** DummyJSON simulates CRUD operations — created/updated/deleted records are not persisted on the server.

## Screenshots


