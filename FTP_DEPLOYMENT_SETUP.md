# FTP Deployment Setup with GitHub Actions

This guide will help you set up automatic deployment of your React app to your server via FTP whenever you push to GitHub.

## Prerequisites

1. **GitHub Repository**: Your code must be in a GitHub repository
2. **FTP Access**: FTP credentials for your hosting provider
3. **Web Hosting**: A web hosting service that supports FTP
4. **Domain**: Your domain pointing to your hosting

## Step 1: Get Your FTP Credentials

From your hosting provider, you'll need:

- **FTP Server**: Your FTP server address (e.g., `ftp.yourdomain.com` or `yourdomain.com`)
- **FTP Username**: Your FTP username
- **FTP Password**: Your FTP password
- **FTP Port**: Usually 21 (standard) or 22 (SFTP)
- **Server Directory**: The directory where your website files should go (e.g., `/public_html/` or `/htdocs/`)

## Step 2: Configure GitHub Secrets

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `FTP_SERVER` | Your FTP server address (e.g., `ftp.yourdomain.com`) |
| `FTP_USERNAME` | Your FTP username |
| `FTP_PASSWORD` | Your FTP password |
| `FTP_PORT` | FTP port (usually `21` for FTP, `22` for SFTP) |
| `FTP_SERVER_DIR` | Directory on server (e.g., `/public_html/` or `/htdocs/`) |
| `WEBSITE_URL` | Your website URL (e.g., `https://yourdomain.com`) |

## Step 3: Choose Your Workflow

### Option 1: Basic FTP Deployment (`deploy-ftp.yml`)
- Simple and straightforward
- Builds and deploys in one job
- Good for basic deployments

### Option 2: Advanced FTP Deployment (`deploy-ftp-advanced.yml`) ⭐ **Recommended**
- Separates build and deploy into two jobs
- Better error handling
- Manual trigger option
- More detailed logging

## Step 4: Test Your FTP Connection

Before setting up the workflow, test your FTP connection:

### Using FileZilla (Free FTP Client):
1. Download and install FileZilla
2. Enter your FTP details:
   - Host: Your FTP server
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: Your FTP port
3. Click "Quickconnect"
4. Verify you can see your web directory

### Using Command Line:
```bash
# Test FTP connection
ftp yourdomain.com
# Enter username and password when prompted
# Use 'ls' to list files
# Use 'quit' to exit
```

## Step 5: Configure Your Hosting

### For cPanel Hosting:
1. Log into your cPanel
2. Go to **File Manager**
3. Navigate to `public_html` (or your web directory)
4. Ensure the directory is writable

### For Other Hosting Providers:
1. Check your hosting provider's documentation
2. Ensure FTP access is enabled
3. Verify the correct web directory path

## Step 6: Test the Workflow

1. Make a small change to your code
2. Commit and push to GitHub:

```bash
git add .
git commit -m "Test FTP deployment"
git push origin main
```

3. Go to your GitHub repository → **Actions** tab
4. You should see the workflow running

## Step 7: Verify Deployment

After the workflow completes:

1. Check your website: `https://yourdomain.com`
2. Check the Actions logs for any errors
3. Verify files are uploaded via FTP client

## Troubleshooting

### Common Issues:

1. **FTP Connection Failed**:
   - Verify your FTP server, username, and password
   - Check if your hosting provider allows FTP connections
   - Ensure the correct port is being used

2. **Permission Denied**:
   - Check if your FTP user has write permissions
   - Verify the server directory path is correct
   - Contact your hosting provider if needed

3. **Build Failed**:
   - Check if all dependencies are in `package.json`
   - Verify Node.js version compatibility
   - Check the build logs for specific errors

4. **Website Not Loading**:
   - Verify files were uploaded to the correct directory
   - Check if your hosting provider requires an `index.html` file
   - Verify domain DNS settings

### Useful Commands:

```bash
# Test FTP connection manually
ftp yourdomain.com

# Check if files exist on server
ls -la /public_html/

# Check web server logs (if accessible)
tail -f /var/log/apache2/error.log
```

## Security Notes

1. **FTP Password**: Keep your FTP password secure and never commit it to your repository
2. **SFTP vs FTP**: Consider using SFTP (port 22) instead of FTP (port 21) for better security
3. **Firewall**: Ensure your hosting provider allows FTP connections
4. **Updates**: Regularly update your dependencies and hosting software

## Hosting Provider Specific Notes

### Popular Hosting Providers:

**cPanel Hosting:**
- FTP Server: Usually `yourdomain.com` or `ftp.yourdomain.com`
- Server Directory: `/public_html/`
- Port: 21 (FTP) or 22 (SFTP)

**Netlify:**
- Use Netlify's built-in deployment instead of FTP
- Connect your GitHub repository directly

**Vercel:**
- Use Vercel's built-in deployment instead of FTP
- Connect your GitHub repository directly

**Shared Hosting:**
- FTP Server: Usually provided by your hosting company
- Server Directory: Usually `/public_html/` or `/htdocs/`
- Check your hosting provider's documentation

## Customization

You can customize the workflow by:

1. **Changing deployment directory**: Update `FTP_SERVER_DIR` secret
2. **Adding environment variables**: Use GitHub secrets for sensitive data
3. **Adding notifications**: Integrate with Slack, Discord, or email
4. **Adding tests**: Run tests before deployment
5. **Adding staging environment**: Deploy to staging first, then production

## Support

If you encounter issues:

1. Check the GitHub Actions logs for detailed error messages
2. Verify all prerequisites are met
3. Test FTP connection manually
4. Contact your hosting provider for FTP-related issues
5. Check your hosting provider's documentation

## Migration from SSH to FTP

If you were previously using SSH deployment:

1. **Disable SSH workflow**: Rename or delete the SSH workflow files
2. **Update secrets**: Remove SSH secrets and add FTP secrets
3. **Test thoroughly**: Ensure FTP deployment works before removing SSH access
4. **Update documentation**: Update any deployment documentation

## Performance Tips

1. **Use SFTP**: More secure than regular FTP
2. **Optimize build**: Ensure your build process is efficient
3. **Exclude unnecessary files**: The workflow excludes development files
4. **Use CDN**: Consider using a CDN for static assets
5. **Enable caching**: Configure your hosting provider's caching options 