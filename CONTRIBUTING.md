# Contributing to Flight Tracker

Thank you for your interest in contributing to the Flight Tracker project! This document provides guidelines and instructions for contributing.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Git configured with your GitHub account
- npm, yarn, pnpm, or bun package manager

### Setup Development Environment

1. Fork the repository on GitHub
2. Clone your fork:
```bash
git clone https://github.com/your-username/flight-tracker.git
cd flight-tracker
```

3. Add upstream remote:
```bash
git remote add upstream https://github.com/prasad-kavuri/flight-tracker.git
```

4. Install dependencies:
```bash
npm install
# or yarn install / pnpm install / bun install
```

5. Create a new branch for your feature:
```bash
git checkout -b feature/your-feature-name
```

6. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Development Workflow

### Making Changes

1. Keep your changes focused on a single feature or bug fix
2. Write clear, descriptive commit messages
3. Update documentation if you change functionality
4. Test your changes thoroughly before submitting

### Code Style

- Follow the existing code style and conventions
- Use TypeScript for type safety
- Write meaningful variable and function names
- Add comments for complex logic

### Testing

Before submitting a pull request:
```bash
npm run lint
npm run build
```

## Submitting Changes

### Creating a Pull Request

1. Ensure your branch is up to date with main:
```bash
git fetch upstream
git rebase upstream/main
```

2. Push to your fork:
```bash
git push origin feature/your-feature-name
```

3. Open a Pull Request on GitHub with:
   - Clear title describing the changes
   - Detailed description of what and why
   - Reference any related issues (e.g., "Fixes #123")
   - Screenshots for UI changes if applicable

### PR Guidelines

- Keep PRs focused and reasonably sized
- One feature or bug fix per PR
- Update the README if needed
- Ensure all checks pass
- Respond to review feedback promptly

## Reporting Issues

### Reporting Bugs

When reporting a bug, please include:
- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details (OS, Node version, etc.)
- Screenshots if applicable

### Suggesting Features

Feature suggestions should include:
- Clear description of the feature
- Use case and motivation
- Potential implementation approach (optional)
- Any relevant examples or references

## Questions?

Feel free to:
- Open an issue for questions
- Reach out via GitHub discussions
- Check existing issues for similar questions

## Recognition

All contributors will be recognized in the project. Thank you for helping make Flight Tracker better!

---

**Happy Contributing! 🚀**
