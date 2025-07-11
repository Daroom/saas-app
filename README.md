# SaaS App - Business Operations Management Platform

A full-stack web application built as a master tenant, serving as part of the process of transforming traditional software into a multi-tenant SaaS solution for B2B use cases. It includes essential modules like customer management, invoicing, and license tracking, with a strong focus on scalability and user experience.

## ✨ Features

### 🔐 Authentication & Security
- **Secure JWT-based authentication** with token verification
- **Protected routes** with role-based access control
- **Session management** with automatic token refresh
- **Password confirmation** with validation
- **Modern login/register UI** with loading states

### 👥 Customer Management
- **Complete CRUD operations** for customer data
- **Customer status tracking** (Active, Inactive, Suspended)
- **Company and contact information** management
- **Search and filtering** capabilities
- **Real-time data updates** with React Query

### 📄 Invoice Management
- **Invoice creation and tracking** with multiple statuses
- **Customer association** for invoice generation
- **Status management** (Draft, Sent, Paid, Overdue, Cancelled)
- **Date tracking** and management
- **Bulk operations** support

### 🔑 License Management
- **Software license tracking** with expiration dates
- **Company association** for license allocation
- **User limit management** per license
- **Status monitoring** (Active, Expired, Suspended, Cancelled)
- **Add/Delete operations** with confirmation

### 🎨 Modern UI/UX
- **Responsive design** that works on all devices
- **Dark/Light theme** support with CSS variables
- **Smooth animations** and transitions
- **Loading states** and error handling
- **Toast notifications** for user feedback
- **Glassmorphism design** elements

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **React Router** for navigation
- **React Query (TanStack Query)** for server state management
- **Zustand** for client state management
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React Hook Form** for form management

### Backend
- **Node.js** with Express
- **TypeScript** for type safety
- **Prisma** as ORM with MySQL database
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** enabled for cross-origin requests

### Database
- **MySQL** with Prisma schema
- **Relationships** between Users, Companies, Customers, Invoices, and Licenses
- **Enum types** for status management
- **Cascade deletes** for data integrity

### Development Tools
- **Turborepo** for monorepo management
- **ESLint** and **Prettier** for code quality
- **TypeScript** configurations
- **Shared UI components** library

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MySQL database
- Yarn or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd saas-app
   ```

2. **Install dependencies**
   ```bash
   yarn install
   ```

3. **Set up the database**
   ```bash
   # Generate Prisma client
   cd packages/database
   yarn prisma generate
   
   # Run migrations
   yarn prisma db push
   ```

4. **Start development servers**
   ```bash
   # Start both frontend and backend
   yarn dev
   
   # Or start individually
   yarn dev --filter=client  # Frontend only
   yarn dev --filter=api     # Backend only
   ```

5. **Open your browser**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

## 📁 Project Structure

```
saas-app/
├── apps/
│   ├── api/                 # Backend API server
│   │   ├── src/
│   │   │   ├── controllers/ # API route handlers
│   │   │   ├── services/    # Business logic
│   │   │   ├── routes/      # API routes
│   │   │   └── middlewares/ # Express middlewares
│   │   └── package.json
│   └── client/              # Frontend React app
│       ├── src/
│       │   ├── components/  # Reusable UI components
│       │   ├── pages/       # Page components
│       │   ├── hooks/       # Custom React hooks
│       │   ├── stores/      # Zustand stores
│       │   └── providers/   # React context providers
│       └── package.json
├── packages/
│   ├── database/            # Prisma schema and client
│   ├── ui/                  # Shared UI components
│   └── config/              # Shared configurations
└── package.json
```

## 🔧 Available Scripts

```bash
# Development
yarn dev                    # Start all apps in development
yarn dev --filter=client    # Start frontend only
yarn dev --filter=api       # Start backend only

# Building
yarn build                  # Build all apps
yarn build --filter=client  # Build frontend only
yarn build --filter=api     # Build backend only

# Database
yarn db:generate            # Generate Prisma client
yarn db:push               # Push schema to database
yarn db:studio             # Open Prisma Studio

# Linting
yarn lint                  # Lint all packages
yarn lint:fix              # Fix linting issues
```

## 🌟 Key Features in Detail

### Authentication Flow
- Secure login/register with email and password
- JWT token management with automatic refresh
- Protected routes with redirect handling
- Loading states and error handling
- Session persistence across browser sessions

### Dashboard Analytics
- Real-time customer count and statistics
- Revenue tracking and growth metrics
- Active user monitoring
- Visual charts and progress indicators

### Data Management
- Full CRUD operations for all entities
- Real-time search and filtering
- Pagination support for large datasets
- Bulk operations and batch processing
- Data validation and error handling

### User Experience
- Responsive design for mobile and desktop
- Smooth animations and transitions
- Intuitive navigation and breadcrumbs
- Contextual help and tooltips
- Accessibility features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Turborepo](https://turborepo.com/) for monorepo management
- UI components powered by [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Database management with [Prisma](https://www.prisma.io/)

---

**Transform your business operations today with our comprehensive SaaS platform! 🚀**
