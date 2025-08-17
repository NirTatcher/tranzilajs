# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html) principles for version numbering.

## [1.0.0] - 2024-08-14 (Initial Release)

### Added
- **Core Library Structure**
  - Main `Tranzila` class with comprehensive API client
  - Automatic authentication with HMAC-SHA256 signing
  - Axios interceptors for dynamic header generation
  - Support for both CommonJS and ES Modules

- **Bit Payment Operations**
  - `Tranzila.Bit.init()` - Initialize Bit payments
  - `Tranzila.Bit.refund()` - Process Bit payment refunds
  - Full type definitions for Bit payment payloads and responses

- **IFrame Integration**
  - `Tranzila.IFrame.generateLink()` - Generate payment links
  - Support for embedded payment forms
  - Customizable success/failure URLs

- **Credit Card Operations**
  - `Tranzila.CreditCard.refund()` - Process credit card refunds
  - Support for various card types and acquirers
  - Comprehensive error handling

- **Standing Orders Management**
  - `Tranzila.StandingOrders.create()` - Create recurring payments
  - `Tranzila.StandingOrders.retrieve()` - Retrieve standing orders
  - `Tranzila.StandingOrders.update()` - Update standing order status
  - Support for various charge frequencies and payment plans

- **Transaction Management**
  - `Tranzila.Transactions.search()` - Search and filter transactions
  - Advanced querying with dynamic fields
  - Comprehensive transaction data types

- **Type System**
  - Complete TypeScript definitions for all API operations
  - Literal types for constants and enums
  - Union types for flexible field values
  - Generic types for API responses
  - Comprehensive JSDoc documentation

- **Constants and Enums**
  - Currency codes (ILS, USD, EUR)
  - Card types and acquirers
  - Payment frequencies and statuses
  - Response codes and languages
  - All constants are type-safe with `as const` assertions

- **Testing Infrastructure**
  - Jest test framework with TypeScript support
  - Comprehensive test suite covering all major functions
  - Mocked API responses for reliable testing
  - Test examples that match actual usage patterns

- **Build System**
  - Rollup bundling for multiple module formats
  - TypeScript compilation with declaration generation
  - ES5 compatibility for broad browser support
  - Source maps for debugging

- **Documentation**
  - Comprehensive README with usage examples
  - API reference for all methods and types
  - Usage examples in separate directory
  - JSDoc comments throughout the codebase

### Technical Features
- **Authentication**: Automatic header generation with timestamps, nonces, and HMAC signatures
- **Error Handling**: Comprehensive error handling with typed responses
- **Modular Design**: Clean separation of concerns with getter-based API organization
- **Type Safety**: Full TypeScript support with strict type checking
- **Performance**: Optimized bundling and tree-shaking support

### Breaking Changes
- None (initial release)

### Dependencies
- **Runtime**: axios, crypto-js
- **Development**: TypeScript, Jest, Rollup, and related plugins

## Development History

### Pre-1.0.0 Development
- **Project Setup**: Initial TypeScript library structure
- **Type Definitions**: Comprehensive type system development
- **API Client**: Core Tranzila class implementation
- **Testing**: Test suite development and validation
- **Documentation**: README, examples, and API documentation
- **Build System**: Rollup and TypeScript configuration
- **Quality Assurance**: Linting, testing, and type checking

### Recent Updates (Pre-Release)
- **Refactoring**: Renamed `tranzila2.ts` to `tranzila.ts` for consistency
- **CI/CD Pipeline**: Implemented automated GitHub Actions workflows
- **Documentation**: Comprehensive contributing guide and updated publishing process
- **Testing**: Enhanced compatibility testing and package validation
- **Quality Gates**: Automated PR validation and release management

---

## Versioning

This project follows [Semantic Versioning](https://semver.org/) principles:
- **MAJOR** version for incompatible API changes
- **MINOR** version for added functionality in a backwards compatible manner
- **PATCH** version for backwards compatible bug fixes

## Release Process

Releases are managed through GitHub Actions:
1. **Manual Trigger**: Use the "Release" workflow in GitHub Actions
2. **Version Management**: Manually specify version in workflow inputs
3. **Automated Steps**: 
   - Code validation and testing
   - Package building and verification
   - Git tagging and GitHub release creation
   - npm package publishing (optional)

**Note**: This project does not use automated semantic-release. All releases are manually triggered and versioned.

## Contributing to Changelog

When contributing changes that will be included in a release:

1. **Add entries** under the appropriate version section
2. **Use consistent formatting**:
   - `### Added` - New features
   - `### Changed` - Changes in existing functionality
   - `### Deprecated` - Soon-to-be removed features
   - `### Removed` - Removed features
   - `### Fixed` - Bug fixes
   - `### Security` - Vulnerability fixes
3. **Be descriptive** - Explain what changed and why
4. **Reference issues** - Link to GitHub issues when relevant

## Support

For questions and support:
- Check the [README](README.md) for usage examples
- Review the [usage examples](usage-examples/) directory
- Open an issue on GitHub for bugs or feature requests 