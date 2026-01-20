# Portfolio Website Project
## Made by IacceptCookie (aka Raphaël DURAND)

This project is a modern web portfolio application designed to display my work, share content, and support other projects as a public showcase.

## Stack

### Backend
- **PHP 8.2**
- **Symfony 7.2** - Web framework
- **API Platform 3.3** - RESTful API
- **PostgreSQL 17** - Database
- **Doctrine ORM** - Database abstraction
- **Lexik JWT Authentication** - JWT + 2FA authentication

### Frontend
- **React 18.3** - UI library
- **Webpack Encore 2.2** - Asset bundling with code splitting
- **Wouter** - Lightweight routing
- **Jest + React Testing Library** - Testing framework

### DevOps
- **Docker** - Containerization
- **Nginx** - Web server
- **Docker Compose** - Multi-container orchestration

## Features

### Security
- JWT authentication with 2FA (email code)
- CSRF protection (stateless)
- Rate limiting on authentication
- Role-based access control (ROLE_READER, ROLE_EDITOR)

### Performance Optimizations
- **Code splitting**: Main bundle reduced from 2.2MB to 153KB (-93%)
- **Lazy loading**: Routes loaded on-demand
- **React.memo**: Optimized component re-renders
- **19+ dynamic chunks**: Efficient resource loading

### Testing
- **58 automated tests** with Jest
- **Full coverage** of hooks, providers, and utilities
- Test commands: `npm test`, `npm run test:watch`, `npm run test:coverage`

## Installation

### 1. Clone the repository
```bash
git clone https://github.com/IacceptCookie/portfolio.git
cd portfolio
```

### 2. Install dependencies

Backend dependencies:
```bash
composer install
```

Frontend dependencies:
```bash
npm install
```

### 3. Build and launch containers
```bash
make init
```

### 4. Setup database

Create database schema and load fixtures:
```bash
composer docker-db
```

Generate JWT keys for authentication (only once):
```bash
composer jwt-generate-keys
```

### 5. Compile frontend

Production build (optimized with code splitting):
```bash
npm run build
```

Development mode with watch:
```bash
npm run watch
```

## Development

### Available Scripts

#### Frontend
```bash
npm run dev           # Development build
npm run watch         # Development build with watch mode
npm run build         # Production build (optimized)
npm test              # Run all tests
npm run test:watch    # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

#### Backend
```bash
composer start                # Start Symfony local server
composer test                 # Run all backend tests (CS Fixer, PHPStan, YAML lint)
composer test:csfixer         # Run PHP CS Fixer (dry run)
composer fix:csfixer          # Fix code style issues
composer test:phpstan         # Run PHPStan static analysis
composer db                   # Recreate database with fixtures
composer docker-db            # Recreate database in Docker container
composer jwt-generate-keys    # Generate JWT keypair
```

### Running Tests

Frontend tests use Jest + React Testing Library:
```bash
npm test                # Run all tests
npm run test:watch      # Watch mode for development
npm run test:coverage   # Generate coverage report
```

Coverage report is generated in `coverage/` directory.

## Testing

### Frontend Tests (Jest)
- **58 tests** covering hooks, providers, and utilities
- Located in `assets/react/**/__tests__/`
- Run with `npm test`

**Local Mail Testing**: [Mailtrap](https://mailtrap.io/)