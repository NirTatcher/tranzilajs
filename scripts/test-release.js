#!/usr/bin/env node

/**
 * Test script to simulate the release process locally
 * This helps verify the release workflow before using GitHub Actions
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 Testing Release Process Locally...\n');

// Configuration
const TEST_VERSION = '1.0.1';
const ORIGINAL_PACKAGE = JSON.parse(fs.readFileSync('package.json', 'utf8'));

try {
  console.log('📝 Step 1: Backup original package.json');
  fs.writeFileSync('package.json.backup', JSON.stringify(ORIGINAL_PACKAGE, null, 2));
  console.log('✅ Backup created\n');

  console.log('📝 Step 2: Update version');
  const updatedPackage = { ...ORIGINAL_PACKAGE, version: TEST_VERSION };
  fs.writeFileSync('package.json', JSON.stringify(updatedPackage, null, 2));
  console.log(`✅ Version updated to ${TEST_VERSION}\n`);

  console.log('🔍 Step 3: Validate code quality');
  console.log('   - Type checking...');
  execSync('npm run type-check', { stdio: 'inherit' });
  console.log('   - Running tests...');
  execSync('npm test', { stdio: 'inherit' });
  console.log('   - Building package...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Validation passed\n');

  console.log('📦 Step 4: Test package creation');
  execSync('npm pack', { stdio: 'inherit' });
  const packageFile = `tranzilajs-${TEST_VERSION}.tgz`;
  if (fs.existsSync(packageFile)) {
    console.log(`✅ Package created: ${packageFile}`);
    console.log(`   - Size: ${(fs.statSync(packageFile).size / 1024).toFixed(1)}KB`);
  } else {
    throw new Error('Package file not found');
  }
  console.log('');

  console.log('🧪 Step 5: Test package compatibility');
  execSync('npm run test:compatibility', { stdio: 'inherit' });
  console.log('');

  console.log('📊 Step 6: Package contents analysis');
  execSync(`tar -tzf ${packageFile} | head -20`, { stdio: 'inherit' });
  console.log('');

  console.log('🎉 Step 7: Release simulation completed successfully!');
  console.log('');
  console.log('📋 What would happen in real release:');
  console.log('   ✅ Version updated in package.json');
  console.log('   ✅ Code validated and tested');
  console.log('   ✅ Package built and tested');
  console.log('   ✅ Git tag would be created');
  console.log('   ✅ GitHub release would be created');
  console.log('   ✅ npm package would be published');
  console.log('');
  console.log('🔒 This was a SAFE test - no actual publishing occurred');

} catch (error) {
  console.error('❌ Release test failed:', error.message);
  console.error('Stack:', error.stack);
  
  console.log('\n🔄 Restoring original package.json...');
  try {
    fs.copyFileSync('package.json.backup', 'package.json');
    console.log('✅ Original package.json restored');
  } catch (restoreError) {
    console.error('❌ Failed to restore package.json:', restoreError.message);
    console.error('⚠️  Please manually restore from package.json.backup');
  }
  
  process.exit(1);
} finally {
  // Cleanup
  console.log('\n🧹 Cleaning up...');
  try {
    if (fs.existsSync('package.json.backup')) {
      fs.unlinkSync('package.json.backup');
      console.log('✅ Backup file removed');
    }
    if (fs.existsSync(`tranzilajs-${TEST_VERSION}.tgz`)) {
      fs.unlinkSync(`tranzilajs-${TEST_VERSION}.tgz`);
      console.log('✅ Test package removed');
    }
  } catch (cleanupError) {
    console.error('⚠️  Cleanup warning:', cleanupError.message);
  }
  
  console.log('\n🎯 Ready to test the real release workflow on GitHub!');
} 