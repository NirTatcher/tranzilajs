# Contributing to TranzilaJS

Thank you for your interest in contributing to TranzilaJS! This document provides guidelines and information for contributors.

## 🚀 Quick Start

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch
4. **Make** your changes
5. **Test** everything works
6. **Submit** a pull request

## 📋 Prerequisites

- **Node.js**: 18.0.0 or higher
- **npm**: 8.0.0 or higher
- **Git**: Latest version recommended

## 🛠️ Development Setup

### 1. Clone and Install

```bash
# Clone your fork
git clone https://github.com/yourusername/tranzilajs.git
cd tranzilajs

# Install dependencies
npm install
```

### 2. Verify Setup

```bash
# Run tests to ensure everything works
npm test

# Check TypeScript compilation
npm run type-check

# Build the package
npm run build
```

## 🧪 Development Workflow

### Available Scripts

```bash
# Development
npm run build          # Build the package
npm run clean          # Clean build artifacts
npm run type-check     # TypeScript type checking

# Testing
npm test               # Run all tests
npm test -- --watch    # Run tests in watch mode

# Package Testing
npm run test:compatibility  # Test CommonJS/ESM compatibility
npm run test:package        # Test package locally
npm run package             # Create local package file
npm run validate            # Full validation (type-check + test + build)
npm run ci                  # Clean install + full validation
```

### Code Quality Standards

- **TypeScript**: All code must be written in TypeScript
- **Tests**: New features require tests
- **Documentation**: JSDoc comments for public APIs
- **Formatting**: Consistent code style (TypeScript compiler enforces this)

## 🧪 Testing Guidelines

### Writing Tests

1. **Test Structure**: Use Jest with TypeScript
2. **Mocking**: Mock external dependencies (API calls)
3. **Examples**: Tests should match usage examples in [`usage-examples/`](usage-examples/)

### Test File Naming

```
src/__tests__/
├── bit/
│   ├── bit-init.test.ts
│   └── bit-refund.test.ts
├── credit-card/
│   └── credit-card-refund.test.ts
├── iframe/
│   └── iframe-generate-link.test.ts
├── standing-orders/
│   ├── standing-orders-create.test.ts
│   ├── standing-orders-retrieve.test.ts
│   └── standing-orders-update.test.ts
└── transactions/
    └── transactions-search.test.ts
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test -- src/__tests__/bit/bit-init.test.ts

# Run tests for specific feature
npm test -- --testPathPattern=bit

# Run tests in watch mode
npm test -- --watch
```

## 📝 Pull Request Process

### 1. Create Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes

- Write your code
- Add tests
- Update documentation if needed
- Ensure all tests pass

### 3. Commit Changes

```bash
git add .
git commit -m "feat: add new feature description

- Detailed change 1
- Detailed change 2
- Fixes #123"
```

### 4. Push and Create PR

```bash
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

## 📋 Pull Request Checklist

Before submitting a PR, ensure:

- [ ] **Code Quality**
  - [ ] All tests pass (`npm test`)
  - [ ] Type checking passes (`npm run type-check`)
  - [ ] Build completes successfully (`npm run build`)
  - [ ] No TypeScript errors or warnings

- [ ] **Testing**
  - [ ] New functionality has tests
  - [ ] All existing tests still pass
  - [ ] Tests match usage examples exactly
  - [ ] Test mocks use same data as usage examples

- [ ] **Documentation**
  - [ ] JSDoc comments added for new APIs
  - [ ] README updated if needed
  - [ ] CHANGELOG updated for new features
  - [ ] Usage examples updated if needed
  - [ ] Callback examples updated if webhook handling changes

- [ ] **Code Style**
  - [ ] Consistent with existing code
  - [ ] No console.log statements
  - [ ] Proper error handling
  - [ ] Follows TypeScript best practices

- [ ] **Validation**
  - [ ] Full validation passes (`npm run validate`)
  - [ ] Package builds correctly
  - [ ] No breaking changes to public API

## 🏗️ Project Structure

```
tranzilajs/
├── src/
│   ├── __tests__/          # Test files
│   ├── constants.ts         # API constants
│   ├── index.ts            # Main exports
│   ├── tranzila.ts         # Core Tranzila class
│   └── types.ts            # TypeScript definitions
├── scripts/                 # Build and test scripts
├── .github/                 # CI/CD workflows and templates
├── usage-examples/          # Usage examples by feature
│   ├── bit/                 # Bit payment examples
│   ├── credit-card/         # Credit card examples
│   ├── iframe/              # IFrame integration examples
│   ├── standing-orders/     # Standing order examples
│   ├── transactions/        # Transaction search examples
│   └── callbacks/           # Webhook callback examples
└── dist/                    # Build output (generated)
```

## 🔧 Build System

### Rollup Configuration

- **Entry**: `src/index.ts`
- **Outputs**: CommonJS (`index.js`) and ES Modules (`index.mjs`)
- **Plugins**: TypeScript, CommonJS, Node resolution

### TypeScript Configuration

- **Target**: ES2022
- **Module**: ESNext
- **Declaration**: Enabled
- **Strict**: Enabled

## 🚀 CI/CD Pipeline

### Automated Checks

Every PR automatically runs:

1. **Type Checking**: TypeScript compilation (`npm run type-check`)
2. **Testing**: Jest test suite (`npm test`)
3. **Building**: Package compilation (`npm run build`)
4. **Package Verification**: Package creation and compatibility testing
5. **Multi-Node Testing**: Tests run on Node.js 18, 20, and 22 for compatibility
6. **Package Testing**: Local package creation and verification (`npm run test:package`)

### Release Process

Releases are automated via GitHub Actions:

1. **Manual Trigger**: Use the "Release" workflow
2. **Version Bump**: Automated version management
3. **Git Tagging**: Automatic Git tag creation
4. **npm Publishing**: Automated package publishing
5. **GitHub Release**: Automatic release notes

## 📚 Documentation Standards

### JSDoc Comments

```typescript
/**
 * Initialize a new Bit payment
 * 
 * @param payload - Payment initialization parameters
 * @returns Promise resolving to payment response
 *
 */
async init(payload: BitInitPayload): Promise<BitInitResponse>
```

### README Updates

- Keep examples up-to-date
- Document new features
- Update API reference
- Maintain installation instructions

### Usage Examples

- Update examples in [`usage-examples/`](usage-examples/) directory
- Ensure examples match test mocks
- Add new examples for new features

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Environment**: Node.js version, OS
2. **Steps**: Clear reproduction steps
3. **Expected**: What should happen
4. **Actual**: What actually happens
5. **Code**: Minimal example showing the issue

## 💡 Feature Requests

For feature requests:

1. **Describe** the feature clearly
2. **Explain** the use case
3. **Consider** implementation complexity
4. **Discuss** alternatives

## 🤝 Code of Conduct

- Be respectful and inclusive
- Focus on technical discussions
- Help others learn and grow
- Follow project conventions

## 📞 Getting Help

- **Issues**: Use GitHub Issues for bugs and features
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check README and JSDoc comments
- **Examples**: Review usage examples in [`usage-examples/`]()

## 🎯 Contribution Areas

We welcome contributions in:

- **Core Features**: New API methods
- **Testing**: Additional test coverage
- **Documentation**: Improved examples and guides
- **Performance**: Build optimizations
- **Type Safety**: Enhanced TypeScript definitions
- **Examples**: Additional usage examples

## 🔍 Testing Your Changes

### Development Cycle

After making code changes, follow this workflow:

```bash
# 1. Check TypeScript compilation
npm run type-check

# 2. Run tests to ensure nothing broke
npm test

# 3. If adding new features, run specific tests
npm test -- --testPathPattern=your-feature

# 4. Build to check for build errors
npm run build

# 5. Full validation before committing
npm run validate
```

### Before Submitting a PR

Run the complete validation:

```bash
npm run validate
```

This will:
1. Run TypeScript type checking
2. Execute all tests
3. Build the package
4. Verify everything works correctly

Thank you for contributing to TranzilaJS! 🚀 