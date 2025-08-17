#!/usr/bin/env node

/**
 * Test script to verify CommonJS and ES Module compatibility
 * This script tests the built package to ensure it works in different environments
 */

const fs = require('fs');
const path = require('path');

console.log('🧪 Testing package compatibility...\n');

// Check if dist directory exists
if (!fs.existsSync('dist')) {
  console.error('❌ dist directory not found. Run "npm run build" first.');
  process.exit(1);
}

// Test CommonJS compatibility
console.log('📦 Testing CommonJS compatibility...');
try {
  const cjsPath = path.join('dist', 'index.js');
  if (!fs.existsSync(cjsPath)) {
    throw new Error('CommonJS bundle not found');
  }
  
  // Try to require the bundle
  const pkg = require('../dist/index.js');
  
  // Check if main exports are available
  if (!pkg.Tranzila) {
    throw new Error('Tranzila class not exported');
  }
  
  if (!pkg.CardAcquirers || !pkg.CardTypes || !pkg.CurrencyCodesAlpha) {
    throw new Error('Constants not exported');
  }
  
  console.log('✅ CommonJS: All exports available');
  console.log(`   - Tranzila class: ${typeof pkg.Tranzila}`);
  console.log(`   - Constants: ${Object.keys(pkg).filter(k => k !== 'Tranzila').join(', ')}`);
  
} catch (error) {
  console.error('❌ CommonJS test failed:', error.message);
  process.exit(1);
}

// Test ES Module compatibility
console.log('\n📦 Testing ES Module compatibility...');
try {
  const esmPath = path.join('dist', 'index.mjs');
  if (!fs.existsSync(esmPath)) {
    throw new Error('ES Module bundle not found');
  }
  
  // Check file content for ES module syntax
  const esmContent = fs.readFileSync(esmPath, 'utf8');
  
  if (!esmContent.includes('export')) {
    throw new Error('ES Module syntax not found');
  }
  
  if (esmContent.includes('require(')) {
    throw new Error('CommonJS syntax found in ES Module bundle');
  }
  
  console.log('✅ ES Module: Bundle syntax looks correct');
  console.log(`   - File size: ${(esmContent.length / 1024).toFixed(1)}KB`);
  
} catch (error) {
  console.error('❌ ES Module test failed:', error.message);
  process.exit(1);
}

// Test TypeScript declarations
console.log('\n📦 Testing TypeScript declarations...');
try {
  const dtsPath = path.join('dist', 'index.d.ts');
  if (!fs.existsSync(dtsPath)) {
    throw new Error('TypeScript declarations not found');
  }
  
  const dtsContent = fs.readFileSync(dtsPath, 'utf8');
  
  if (!dtsContent.includes('export declare class Tranzila') && !dtsContent.includes('export { Tranzila }')) {
    throw new Error('Tranzila class declaration not found');
  }
  
  // Check if constants are exported (they're in constants.d.ts, not index.d.ts)
  if (!dtsContent.includes('export * from') || !dtsContent.includes('./constants')) {
    throw new Error('Constants module not exported');
  }
  
  console.log('✅ TypeScript: Declarations look correct');
  console.log(`   - File size: ${(dtsContent.length / 1024).toFixed(1)}KB`);
  
} catch (error) {
  console.error('❌ TypeScript declarations test failed:', error.message);
  process.exit(1);
}

// Check package size
console.log('\n📊 Package size analysis...');
try {
  const distStats = fs.statSync('dist');
  const totalSize = (distStats.size / 1024).toFixed(1);
  
  console.log(`✅ Total dist size: ${totalSize}KB`);
  
  // List all files with sizes
  const files = fs.readdirSync('dist');
  files.forEach(file => {
    const filePath = path.join('dist', file);
    const stats = fs.statSync(filePath);
    const size = (stats.size / 1024).toFixed(1);
    console.log(`   - ${file}: ${size}KB`);
  });
  
} catch (error) {
  console.error('❌ Package size analysis failed:', error.message);
}

console.log('\n🎉 All compatibility tests passed!');
console.log('✅ Package is ready for distribution'); 