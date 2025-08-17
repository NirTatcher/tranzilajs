# Publishing Guide

This document outlines the **automated CI/CD process** for publishing the TranzilaJS library to npm. The publishing process is fully automated through GitHub Actions - no manual npm commands needed!

## Pre-Publishing Checklist

Before publishing, ensure all the following items are complete:

### ✅ Code Quality
- [ ] All tests pass (`npm test`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Build completes successfully (`npm run build`)
- [ ] No TypeScript errors or warnings
- [ ] All linting issues resolved

### ✅ Documentation
- [ ] README.md is comprehensive and up-to-date
- [ ] CHANGELOG.md reflects current version
- [ ] LICENSE file is present and correct
- [ ] API documentation is complete
- [ ] Usage examples are working

### ✅ Package Configuration
- [ ] `package.json` has correct version number
- [ ] All required fields are populated
- [ ] Dependencies are correctly specified
- [ ] Build scripts are working
- [ ] Files array includes necessary items

### ✅ Build Artifacts
- [ ] `dist/` directory contains all required files
- [ ] TypeScript declarations are generated
- [ ] Both CommonJS and ES Module bundles exist
- [ ] Source maps are generated (optional)

## Publishing Process (Automated via CI/CD)

### 🚀 **How It Works**

The publishing process is **fully automated** through GitHub Actions. Here's what happens:

1. **Local Development** → You develop and test locally
2. **Push to GitHub** → Code is pushed to main branch
3. **CI Validation** → Automated tests, builds, and validation
4. **Manual Release** → You trigger the release workflow
5. **Automated Publishing** → GitHub Actions handles everything else

### 📋 **Step 1: Local Development & Testing**

Before pushing code, ensure everything works locally:

```bash
# Run all tests
npm test

# Type checking
npm run type-check

# Build the package
npm run build

# Test package compatibility
npm run test:compatibility

# Test package locally
npm run test:package
```

### 📋 **Step 2: Push to GitHub**

```bash
git add .
git commit -m "feat: your feature description"
git push origin main
```

**What happens automatically:**
- ✅ **PR Validation**: Tests, builds, and compatibility checks
- ✅ **Quality Gates**: Type checking, testing, and validation
- ✅ **Build Verification**: Ensures package builds correctly

### 📋 **Step 3: Trigger Release (Manual)**

When ready to publish:

1. **Go to GitHub Actions** → "Release" workflow
2. **Click "Run workflow"** → Manual trigger
3. **Fill in details**:
   - **Version**: `1.0.1`, `1.1.0`, `2.0.0`
   - **Publish to npm**: `true` or `false`
   - **npm Tag**: `latest`, `beta`, `alpha`
   - **Create GitHub Release**: `true` or `false`
   - **Create Git Tag**: `true` or `false`

### 📋 **Step 4: Automated Publishing (GitHub Actions)**

The workflow automatically:

1. **Updates version** in `package.json`
2. **Runs validation** (tests, builds, compatibility)
3. **Creates Git tag** (if enabled)
4. **Publishes to npm** (if enabled)
5. **Creates GitHub release** (if enabled)
6. **Updates CHANGELOG.md** automatically

### 🔍 **What You Need to Do**

**Before Release:**
- [ ] All tests pass locally
- [ ] Code is reviewed and approved
- [ ] Documentation is updated
- [ ] CHANGELOG reflects changes

**During Release:**
- [ ] Trigger GitHub Actions release workflow
- [ ] Fill in version and options
- [ ] Monitor the workflow execution

**After Release:**
- [ ] Verify package on npm
- [ ] Check GitHub release notes
- [ ] Test the published package

### 🚫 **What You DON'T Need to Do**

- ❌ **Manual npm version** - Automated
- ❌ **Manual npm publish** - Automated  
- ❌ **Manual Git tagging** - Automated
- ❌ **Manual GitHub releases** - Automated
- ❌ **Manual CHANGELOG updates** - Automated

### 6. Verify Publication

- Check [npmjs.com](https://www.npmjs.com/package/tranzilajs)
- Verify all files are included
- Test installation in a new project

## Post-Publishing

### 1. Create Git Tag

```bash
# Create and push git tag
git tag v1.0.0
git push origin v1.0.0
```

### 2. Update Documentation

- Update CHANGELOG.md with release notes
- Update any version-specific documentation
- Update examples if needed

### 3. Announce Release

- Create GitHub release
- Update any external documentation
- Notify users of new features/fixes

## Rollback Plan

If issues are discovered after publishing:

### 1. Unpublish (within 72 hours)

```bash
npm unpublish tranzilajs@1.0.0
```

### 2. Fix Issues

- Address the problems in your code
- Push fixes to GitHub
- Ensure all tests pass

### 3. Re-release (Automated)

- Trigger the GitHub Actions release workflow again
- Use a new version number (e.g., `1.0.1`)
- The workflow will automatically republish

### 🚨 **Important Notes**

- **npm unpublish** only works within 72 hours
- **Version numbers** must be unique - can't reuse `1.0.0`
- **CI/CD workflow** handles all the publishing steps automatically
- **No manual npm commands** needed for republishing

## Package Size Optimization

Current package size: ~496KB

### What's Included
- **Runtime**: ~100KB (axios + crypto-js)
- **Types**: ~200KB (TypeScript declarations)
- **Bundles**: ~200KB (CommonJS + ES Modules)

### Optimization Options
- Tree-shaking for ES Modules
- Source maps (can be excluded for production)
- Type declarations (required for TypeScript users)

## Security Considerations

### Before Publishing
- [ ] No sensitive data in code
- [ ] No hardcoded API keys
- [ ] Dependencies are up-to-date
- [ ] No known vulnerabilities

### Package Security
- Package is signed with npm
- Dependencies are locked
- No executable code included

## Support and Maintenance

### Post-Release Support
- Monitor npm download statistics
- Respond to issues on GitHub
- Update dependencies as needed
- Plan next release cycle

### Long-term Maintenance
- Regular dependency updates
- Security patches
- Feature additions
- Breaking change planning

### Getting Help

- 📚 **Contributing Guide**: [CONTRIBUTING.md](CONTRIBUTING.md) - Development setup and guidelines
- 🐛 **Issues**: [GitHub Issues](https://github.com/NirTatcher/tranzilajs/issues) - Bug reports and feature requests
- 💬 **Discussions**: [GitHub Discussions](https://github.com/NirTatcher/tranzilajs/discussions) - Questions and community support

## Troubleshooting

### Common Issues

**Build Failures**
- Check TypeScript configuration
- Verify all imports are correct
- Ensure dependencies are installed

**Test Failures**
- Check mock implementations
- Verify test data matches types
- Ensure test environment is clean

**Publishing Errors**
- Verify npm login status
- Check package name availability
- Ensure version number is unique

**Package Installation Issues**
- Verify all files are included
- Check peer dependencies
- Test in clean environment

## 🚀 CI/CD Workflow Details

### GitHub Actions Workflows

#### PR Validation (`pr-validation.yml`)
- **Triggers**: Pull requests and pushes to main/develop
- **Node.js versions**: 18, 20, 22 (matrix strategy)
- **Steps**:
  1. Checkout code
  2. Setup Node.js
  3. Install dependencies (`npm ci`)
  4. Type checking (`npm run type-check`)
  5. Run tests (`npm test`)
  6. Build package (`npm run build`)
  7. Test compatibility (`npm run test:compatibility`)
  8. Test package locally (`npm pack`)
  9. Cleanup

#### Release (`release.yml`)
- **Trigger**: Manual workflow dispatch
- **Inputs**:
  - `version`: New version number
  - `publish_to_npm`: Boolean flag
  - `npm_tag`: npm distribution tag
  - `create_github_release`: Boolean flag
  - `create_git_tag`: Boolean flag
- **Steps**:
  1. Checkout code
  2. Setup Node.js
  3. Install dependencies
  4. Update version in package.json
  5. Run validation (tests, builds, compatibility)
  6. Create Git tag (if enabled)
  7. Publish to npm (if enabled)
  8. Create GitHub release (if enabled)
  9. Push changes back to repository

### Workflow Benefits

- ✅ **Automated Quality Gates**: Every PR is validated
- ✅ **Consistent Releases**: Same process every time
- ✅ **No Manual Errors**: Eliminates human mistakes
- ✅ **Audit Trail**: Full history of all releases
- ✅ **Rollback Support**: Easy to fix and re-release

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [TypeScript Declaration Files](https://www.typescriptlang.org/docs/handbook/declaration-files/publishing.html)
- [Rollup Documentation](https://rollupjs.org/guide/en/)
- [Jest Testing Framework](https://jestjs.io/docs/getting-started)
- [GitHub Actions](https://docs.github.com/en/actions) 