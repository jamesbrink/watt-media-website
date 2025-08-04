# Beta Deployment Setup

This document explains how the beta deployment system works for the Watt Media website.

## Overview

The beta deployment system allows us to deploy experimental versions of the website (like the Astro migration) to a `/beta` path alongside the main production site.

## URL Structure

- **Main Site**: `https://jamesbrink.github.io/watt-media-website/`
- **Beta Site**: `https://jamesbrink.github.io/watt-media-website/beta/`
- **Beta Info**: `https://jamesbrink.github.io/watt-media-website/beta-info.html`

## Deployment Workflows

### 1. Combined Deployment (Recommended)

**File**: `.github/workflows/deploy-combined.yml`

**Triggers**:
- Push to `main` branch (deploys main + beta if available)
- Manual dispatch with options

**Features**:
- Builds main site from `main` branch
- Builds beta site from specified branch (default: `claude/issue-2-20250804-0900`)
- Combines both into single GitHub Pages deployment
- Automatically detects Astro vs Vite projects
- Creates beta info page for users

### 2. Beta-Only Deployment

**File**: `.github/workflows/deploy-beta.yml`

**Triggers**:
- Push to branches matching: `claude/issue-2-*`, `astro-*`, `beta-*`
- Manual dispatch with branch selection

**Features**:
- Builds only the beta version
- Uploads as artifact for manual deployment
- Useful for testing beta builds

## Technology Detection

The workflows automatically detect whether a branch contains:
- **Astro project**: Checks for `astro.config.mjs`
- **Vite project**: Uses existing `vite.config.js`

Both are configured with the correct base path for GitHub Pages.

## Manual Deployment

To manually deploy a beta version:

1. Go to Actions tab in GitHub
2. Select "Deploy Combined Site to GitHub Pages"
3. Click "Run workflow"
4. Specify the beta branch to deploy
5. The workflow will build and deploy both versions

## Branch Naming Convention

For automatic beta deployment, use these branch prefixes:
- `claude/issue-*` - Claude-generated feature branches
- `astro-*` - Astro migration branches
- `beta-*` - General beta testing branches

## Configuration Files

### Vite Configuration
The build process automatically adds the base path for GitHub Pages:
```bash
npm run build -- --base=/watt-media-website/beta/
```

### Astro Configuration
For Astro projects, the base path is configured similarly:
```bash
npm run build -- --base=/watt-media-website/beta/
```

## File Structure After Deployment

```
/watt-media-website/
├── index.html              (main site)
├── about.html              (main site)
├── services.html           (main site)
├── ...                     (other main site files)
├── beta-info.html          (beta information page)
└── beta/
    ├── index.html          (beta site)
    ├── about.html          (beta site)
    └── ...                 (other beta site files)
```

## Troubleshooting

### Beta Site Not Appearing
1. Check that the beta branch exists and has recent commits
2. Verify the workflow completed successfully
3. Ensure the build process didn't fail

### Asset Loading Issues
- Verify the base path is correctly configured
- Check that relative paths in CSS/JS are working
- Test the beta site locally with the same base path

### Workflow Permissions
The workflows require these permissions:
- `contents: read` - To checkout code
- `pages: write` - To deploy to GitHub Pages
- `id-token: write` - For GitHub Pages authentication

## Security Notes

- Beta deployments use the same security model as main deployments
- No sensitive information should be exposed in beta branches
- Beta sites are publicly accessible at the `/beta` path

## Future Improvements

- Add automatic cleanup of old beta deployments
- Implement beta-specific analytics tracking
- Add A/B testing capabilities between main and beta
- Create automated testing for beta deployments