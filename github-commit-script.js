#!/usr/bin/env node

/**
 * GitHub Commit Automation Script
 * Total: 164 Contributions with Custom Messages
 * Author: Auto-generated for Odoo-GCET Project
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  totalCommits: 164,
  commitsPerBatch: 10,
  delayBetweenCommits: 2000, // 2 seconds
  delayBetweenBatches: 10000, // 10 seconds
  projectPath: __dirname,
  branchName: 'main'
};

// Custom commit messages categorized by feature
const COMMIT_MESSAGES = {
  // Dashboard Features (20 commits)
  dashboard: [
    "feat: Add dashboard loading state with spinner",
    "feat: Implement dashboard stats cards layout",
    "feat: Add dashboard header with user info",
    "feat: Create dashboard quick actions section",
    "feat: Implement dashboard attendance status",
    "feat: Add dashboard employee list component",
    "feat: Create dashboard recent employees table",
    "feat: Add dashboard check-in functionality",
    "feat: Implement dashboard check-out feature",
    "feat: Add dashboard real-time clock display",
    "fix: Resolve dashboard employee type issues",
    "fix: Fix dashboard attendance display bugs",
    "refactor: Optimize dashboard component structure",
    "style: Improve dashboard responsive design",
    "test: Add dashboard unit tests",
    "docs: Update dashboard documentation",
    "chore: Refactor dashboard state management",
    "feat: Add dashboard export functionality",
    "feat: Implement dashboard search feature",
    "feat: Add dashboard notification system"
  ],

  // Employee Management (25 commits)
  employees: [
    "feat: Create employee management page",
    "feat: Add employee list with data table",
    "feat: Implement employee search functionality",
    "feat: Add employee department filter",
    "feat: Create employee stats cards",
    "feat: Add employee profile pictures",
    "feat: Implement employee CRUD operations",
    "feat: Add employee status badges",
    "feat: Create employee detail view",
    "feat: Add employee contact information",
    "feat: Implement employee pagination",
    "feat: Add employee export feature",
    "feat: Create employee bulk actions",
    "feat: Add employee validation rules",
    "feat: Implement employee search filters",
    "feat: Add employee sorting options",
    "fix: Resolve employee type errors",
    "fix: Fix employee table responsive issues",
    "refactor: Optimize employee component performance",
    "style: Enhance employee UI design",
    "test: Add employee management tests",
    "docs: Update employee API documentation",
    "chore: Refactor employee data handling",
    "feat: Add employee attendance tracking",
    "feat: Implement employee profile editing"
  ],

  // Leave Management (20 commits)
  leave: [
    "feat: Create leave management system",
    "feat: Add leave request form",
    "feat: Implement leave approval workflow",
    "feat: Add leave type categories",
    "feat: Create leave balance tracking",
    "feat: Add leave calendar view",
    "feat: Implement leave search filters",
    "feat: Add leave status indicators",
    "feat: Create leave history page",
    "feat: Add leave export functionality",
    "feat: Implement leave notifications",
    "feat: Add leave validation rules",
    "feat: Create leave analytics dashboard",
    "feat: Add leave conflict detection",
    "feat: Implement leave auto-approval",
    "feat: Add leave carry-over rules",
    "fix: Resolve leave calculation bugs",
    "fix: Fix leave date picker issues",
    "refactor: Optimize leave component structure",
    "style: Improve leave UI design",
    "test: Add leave system tests"
  ],

  // Payroll System (25 commits)
  payroll: [
    "feat: Create payroll management system",
    "feat: Add payroll calculation engine",
    "feat: Implement payslip generation",
    "feat: Add payroll tax calculations",
    "feat: Create payroll history tracking",
    "feat: Add payroll export features",
    "feat: Implement payroll approval workflow",
    "feat: Add payroll dashboard analytics",
    "feat: Create payroll report generator",
    "feat: Add payroll batch processing",
    "feat: Implement payroll deductions",
    "feat: Add payroll bonus calculations",
    "feat: Create payroll audit trail",
    "feat: Add payroll notification system",
    "feat: Implement payroll backup system",
    "feat: Add payroll currency support",
    "feat: Create payroll templates",
    "feat: Add payroll validation rules",
    "feat: Implement payroll scheduling",
    "feat: Add payroll integration APIs",
    "fix: Resolve payroll calculation errors",
    "fix: Fix payroll display issues",
    "refactor: Optimize payroll performance",
    "style: Enhance payroll UI design",
    "test: Add payroll system tests",
    "docs: Update payroll documentation",
    "chore: Refactor payroll data models"
  ],

  // Settings & Configuration (15 commits)
  settings: [
    "feat: Create settings management page",
    "feat: Add company profile settings",
    "feat: Implement user preferences",
    "feat: Add system configuration options",
    "feat: Create theme customization",
    "feat: Add notification settings",
    "feat: Implement security settings",
    "feat: Add backup configuration",
    "feat: Create API settings management",
    "feat: Add email configuration",
    "feat: Implement role-based permissions",
    "feat: Add audit log settings",
    "feat: Create data retention policies",
    "feat: Add system health monitoring",
    "feat: Implement settings validation"
  ],

  // UI Components (30 commits)
  components: [
    "feat: Create reusable data table component",
    "feat: Add smart input component",
    "feat: Implement status badge component",
    "feat: Create loading spinner component",
    "feat: Add enterprise card component",
    "feat: Implement pro button component",
    "feat: Create layout wrapper component",
    "feat: Add notification center component",
    "feat: Implement file upload component",
    "feat: Create sidebar navigation",
    "feat: Add top bar component",
    "feat: Implement modal component",
    "feat: Create dropdown component",
    "feat: Add pagination component",
    "feat: Implement search component",
    "feat: Create filter component",
    "feat: Add chart component",
    "feat: Implement calendar component",
    "feat: Create form components",
    "feat: Add validation components",
    "feat: Implement tooltip component",
    "feat: Create progress component",
    "feat: Add avatar component",
    "feat: Implement tabs component",
    "feat: Create accordion component",
    "feat: Add breadcrumb component",
    "feat: Implement alert component",
    "feat: Create skeleton loader",
    "feat: Add empty state component"
  ],

  // API & Backend (20 commits)
  api: [
    "feat: Create user authentication API",
    "feat: Add employee management API",
    "feat: Implement leave request API",
    "feat: Add payroll calculation API",
    "feat: Create reporting API",
    "feat: Add notification API",
    "feat: Implement file upload API",
    "feat: Add search API",
    "feat: Create export API",
    "feat: Add analytics API",
    "feat: Implement webhook API",
    "feat: Add integration API",
    "feat: Create backup API",
    "feat: Add audit log API",
    "feat: Implement settings API",
    "feat: Add health check API",
    "feat: Create cache API",
    "feat: Add rate limiting",
    "feat: Implement API documentation",
    "feat: Add API versioning"
  ],

  // Testing & Quality (9 commits)
  testing: [
    "test: Add unit test suite",
    "test: Create integration tests",
    "test: Add E2E test coverage",
    "test: Implement performance tests",
    "test: Add accessibility tests",
    "test: Create security tests",
    "test: Add API testing",
    "test: Implement visual regression tests",
    "test: Add load testing"
  ]
};

// Utility functions
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function executeCommand(command, description) {
  try {
    console.log(`🔄 ${description}`);
    const result = execSync(command, { 
      cwd: CONFIG.projectPath,
      stdio: 'inherit'
    });
    console.log(`✅ ${description} - Completed`);
    return result;
  } catch (error) {
    console.error(`❌ ${description} - Failed:`, error.message);
    throw error;
  }
}

function getRandomCommitMessage() {
  const allMessages = Object.values(COMMIT_MESSAGES).flat();
  return allMessages[Math.floor(Math.random() * allMessages.length)];
}

function makeSmallChange() {
  const changes = [
    () => {
      // Add a comment to a random file
      const files = ['README.md', 'package.json', '.gitignore'];
      const randomFile = files[Math.floor(Math.random() * files.length)];
      const comment = `// Auto-generated comment - ${new Date().toISOString()}\n`;
      fs.appendFileSync(path.join(CONFIG.projectPath, randomFile), comment);
    },
    () => {
      // Update a timestamp in a temp file
      const timestampFile = path.join(CONFIG.projectPath, '.timestamp');
      fs.writeFileSync(timestampFile, new Date().toISOString());
    },
    () => {
      // Add a space to README
      const readmePath = path.join(CONFIG.projectPath, 'README.md');
      if (fs.existsSync(readmePath)) {
        fs.appendFileSync(readmePath, ' ');
      }
    }
  ];
  
  const randomChange = changes[Math.floor(Math.random() * changes.length)];
  randomChange();
}

// Main execution function
async function main() {
  console.log('🚀 Starting GitHub Commit Automation Script');
  console.log(`📊 Total commits to create: ${CONFIG.totalCommits}`);
  console.log(`🔧 Commits per batch: ${CONFIG.commitsPerBatch}`);
  console.log(`⏱️ Delay between commits: ${CONFIG.delayBetweenCommits}ms`);
  console.log(`⏱️ Delay between batches: ${CONFIG.delayBetweenBatches}ms`);
  console.log('=' .repeat(60));

  try {
    // Check if we're in a git repository
    executeCommand('git status', 'Checking git repository');
    
    // Get current branch
    const currentBranch = execSync('git branch --show-current', { 
      cwd: CONFIG.projectPath,
      encoding: 'utf8'
    }).trim();
    
    console.log(`📍 Current branch: ${currentBranch}`);
    
    // Ensure we're on the correct branch
    if (currentBranch !== CONFIG.branchName) {
      executeCommand(`git checkout ${CONFIG.branchName}`, `Switching to ${CONFIG.branchName} branch`);
    }

    let commitCount = 0;
    let batchCount = 1;

    while (commitCount < CONFIG.totalCommits) {
      console.log(`\n📦 Batch ${batchCount} - Commits ${commitCount + 1} to ${Math.min(commitCount + CONFIG.commitsPerBatch, CONFIG.totalCommits)}`);
      
      // Process batch
      const batchEnd = Math.min(commitCount + CONFIG.commitsPerBatch, CONFIG.totalCommits);
      
      for (let i = commitCount; i < batchEnd; i++) {
        const currentCommit = i + 1;
        const progress = ((currentCommit / CONFIG.totalCommits) * 100).toFixed(1);
        
        console.log(`\n📝 Commit ${currentCommit}/${CONFIG.totalCommits} (${progress}%)`);
        
        // Make a small change
        makeSmallChange();
        
        // Add files to staging
        executeCommand('git add .', 'Adding files to staging');
        
        // Commit with custom message
        const commitMessage = getRandomCommitMessage();
        executeCommand(`git commit -m "${commitMessage}"`, `Commit ${currentCommit}: ${commitMessage}`);
        
        commitCount++;
        
        // Delay between commits (except for the last one)
        if (currentCommit < CONFIG.totalCommits) {
          await delay(CONFIG.delayBetweenCommits);
        }
      }
      
      console.log(`✅ Batch ${batchCount} completed - ${commitCount}/${CONFIG.totalCommits} commits done`);
      
      // Push after each batch
      console.log('📤 Pushing commits to remote...');
      executeCommand('git push origin ' + CONFIG.branchName, 'Pushing to remote repository');
      
      batchCount++;
      
      // Delay between batches (except for the last batch)
      if (commitCount < CONFIG.totalCommits) {
        console.log(`⏳ Waiting ${CONFIG.delayBetweenBatches/1000} seconds before next batch...`);
        await delay(CONFIG.delayBetweenBatches);
      }
    }

    console.log('\n' + '=' .repeat(60));
    console.log('🎉 GitHub Commit Automation Script Completed Successfully!');
    console.log(`📊 Total commits created: ${commitCount}`);
    console.log(`📦 Total batches processed: ${batchCount - 1}`);
    console.log('🚀 All commits have been pushed to GitHub!');
    
    // Show final git log
    console.log('\n📋 Recent commit history:');
    executeCommand('git log --oneline -10', 'Showing recent commits');

  } catch (error) {
    console.error('\n❌ Script failed:', error.message);
    process.exit(1);
  }
}

// Handle script termination
process.on('SIGINT', () => {
  console.log('\n⚠️ Script interrupted by user');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️ Script terminated');
  process.exit(0);
});

// Run the script
if (require.main === module) {
  main().catch(error => {
    console.error('💥 Fatal error:', error);
    process.exit(1);
  });
}

module.exports = { main, CONFIG, COMMIT_MESSAGES };
