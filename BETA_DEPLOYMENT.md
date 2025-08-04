# Beta Deployment System

This repository now supports parallel deployment of both the main production site and a beta testing environment.

## Overview

The beta deployment system allows you to:
- Deploy experimental features alongside the stable site
- Test changes in a production-like environment before going live
- Compare beta and stable versions side-by-side
- Automatically detect Astro vs Vite projects and build accordingly

## URL Structure

After deployment, the following URLs will be available:

- **Main Site**: `https://jamesbrink.github.io/watt-media-website/`
- **Beta Site**: `https://jamesbrink.github.io/watt-media-website/beta/`
- **Beta Info**: `https://jamesbrink.github.io/watt-media-website/beta-info.html`

## Workflows

### 1. Combined Deployment (`deploy-combined.yml`)

Deploys both main and beta sites together.

**Triggers:**
- Push to `main` branch (deploys main + main as beta)
- Manual dispatch with custom beta branch selection

**Manual Usage:**
```bash
# Go to Actions tab in GitHub
# Select "Deploy Combined (Main + Beta)"
# Click "Run workflow"
# Enter branch name for beta deployment (optional)
```

### 2. Beta-Only Deployment (`deploy-beta.yml`)

Deploys beta site alongside current main site.

**Triggers:**
- Push to branches matching:
  - `claude/issue-2-*`
  - `astro-*`
  - `beta-*`
- Pull requests to `main`
- Manual dispatch

**Manual Usage:**
```bash
# Go to Actions tab in GitHub
# Select "Deploy Beta Only"
# Click "Run workflow"
# Enter branch name to deploy as beta
```

## Project Type Detection

The system automatically detects and handles different project types:

### Astro Projects
- Detected by presence of `astro.config.mjs` or `astro.config.js`
- Built with base path: `--base="/watt-media-website/beta/"`
- Supports all Astro integrations and features

### Vite Projects (Current)
- Standard Vite build process
- Uses existing `npm run build` command
- Outputs to `dist/` directory

## Features

- **Automatic Detection**: Detects project type and builds appropriately
- **Parallel Deployment**: Main and beta sites coexist without conflicts
- **Info Pages**: Dedicated beta info page with deployment details
- **Branch Flexibility**: Deploy any branch as beta for testing
- **Rollback Safety**: Main site remains stable during beta testing

## Development Workflow

### Testing New Features

1. **Create feature branch:**
   ```bash
   git checkout -b astro-migration
   # or
   git checkout -b beta-new-feature
   ```

2. **Make changes and push:**
   ```bash
   git push origin astro-migration
   ```

3. **Automatic beta deployment** will trigger for branches matching the patterns

4. **Test at:** `https://jamesbrink.github.io/watt-media-website/beta/`

### Manual Beta Deployment

1. Go to **Actions** tab in GitHub
2. Select **"Deploy Beta Only"**
3. Click **"Run workflow"**
4. Enter branch name (e.g., `feature/new-design`)
5. Click **"Run workflow"** button

### Promoting Beta to Main

Once beta testing is complete:

1. **Merge to main:**
   ```bash
   git checkout main
   git merge astro-migration
   git push origin main
   ```

2. **Main deployment** will automatically trigger

## Troubleshooting

### Beta Site Not Loading

1. Check workflow status in Actions tab
2. Verify branch exists and has valid code
3. Check build logs for errors
4. Ensure `package.json` has correct build scripts

### Build Failures

1. **Missing dependencies:**
   ```bash
   npm ci  # Installs exact versions from package-lock.json
   ```

2. **Astro base path issues:**
   - Verify `astro.config.mjs` allows base path override
   - Check internal links use relative paths

3. **Vite build issues:**
   - Ensure `vite.config.js` is properly configured
   - Check for missing assets or broken imports

### Workflow Permissions

If workflows fail with permission errors:

1. Go to **Settings** > **Actions** > **General**
2. Under **Workflow permissions**, select **"Read and write permissions"**
3. Check **"Allow GitHub Actions to create and approve pull requests"**

### Pages Not Updating

1. Check **Settings** > **Pages**
2. Ensure source is set to **"GitHub Actions"**
3. Wait 5-10 minutes for CDN cache to update
4. Force refresh browser cache (Ctrl+F5 or Cmd+Shift+R)

## Advanced Configuration

### Custom Base Paths

For Astro projects, you can customize the base path in `astro.config.mjs`:

```javascript
export default defineConfig({
  base: process.env.NODE_ENV === 'production' && process.env.BETA_DEPLOY 
    ? '/watt-media-website/beta/' 
    : '/watt-media-website/',
  // ... other config
});
```

### Environment Variables

The workflows set these environment variables during build:

- `NODE_ENV=production`
- `BETA_DEPLOY=true` (for beta builds)
- `GITHUB_REPOSITORY`
- `GITHUB_REF_NAME`

### Custom Workflow Triggers

Add custom branch patterns to `.github/workflows/deploy-beta.yml`:

```yaml
on:
  push:
    branches: 
      - "claude/issue-2-*"
      - "astro-*"
      - "beta-*"
      - "feature/*"        # Add custom patterns
      - "experimental/*"   # Add more patterns
```

## Security Considerations

- Workflows run in isolated environments
- No sensitive data is exposed in beta deployments
- Branch protection rules still apply to `main`
- Beta deployments don't affect production stability

## Performance Impact

- **Storage**: Each deployment stores both main and beta builds
- **Bandwidth**: Minimal overhead (sites share common assets)
- **Build Time**: ~2x longer due to building both versions
- **CDN**: GitHub Pages CDN handles both paths efficiently

---

*This documentation was created for the Watt Media website beta deployment system.*