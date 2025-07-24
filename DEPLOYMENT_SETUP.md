# GitHub Actions Deployment Setup

This guide will help you set up automatic deployment of your React app to your server whenever you push to GitHub.

## Prerequisites

1. **GitHub Repository**: Your code must be in a GitHub repository
2. **Server Access**: SSH access to your server
3. **Web Server**: Nginx or Apache installed on your server
4. **Domain**: Your domain pointing to your server

## Step 1: Generate SSH Key for GitHub Actions

On your local machine, generate a new SSH key:

```bash
ssh-keygen -t rsa -b 4096 -C "github-actions@yourdomain.com" -f ~/.ssh/github_actions
```

This creates two files:
- `~/.ssh/github_actions` (private key)
- `~/.ssh/github_actions.pub` (public key)

## Step 2: Add Public Key to Server

Copy the public key to your server:

```bash
# Copy the public key content
cat ~/.ssh/github_actions.pub

# On your server, add it to authorized_keys
echo "YOUR_PUBLIC_KEY_CONTENT" >> ~/.ssh/authorized_keys
```

## Step 3: Configure GitHub Secrets

In your GitHub repository:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add these secrets:

| Secret Name | Value |
|-------------|-------|
| `SERVER_HOST` | Your server IP or domain (e.g., `123.456.789.012` or `yourdomain.com`) |
| `SERVER_USER` | Your server username (e.g., `root` or `ubuntu`) |
| `SERVER_SSH_KEY` | The entire content of your private key file (`~/.ssh/github_actions`) |
| `SERVER_PORT` | SSH port (usually `22`) |

## Step 4: Configure Server Directory

On your server, ensure your web directory exists:

```bash
# Create web directory if it doesn't exist
sudo mkdir -p /var/www/html

# Set proper ownership
sudo chown -R $USER:$USER /var/www/html
```

## Step 5: Configure Web Server

### For Nginx:

Create or edit your Nginx configuration:

```bash
sudo nano /etc/nginx/sites-available/yourdomain.com
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    root /var/www/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/yourdomain.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### For Apache:

Create or edit your Apache configuration:

```bash
sudo nano /etc/apache2/sites-available/yourdomain.com.conf
```

Add this configuration:

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    ServerAlias www.yourdomain.com
    DocumentRoot /var/www/html
    
    <Directory /var/www/html>
        AllowOverride All
        Require all granted
    </Directory>
    
    ErrorLog ${APACHE_LOG_DIR}/yourdomain.com_error.log
    CustomLog ${APACHE_LOG_DIR}/yourdomain.com_access.log combined
</VirtualHost>
```

Enable the site:

```bash
sudo a2ensite yourdomain.com.conf
sudo systemctl reload apache2
```

## Step 6: Test the Workflow

1. Make a small change to your code
2. Commit and push to GitHub:

```bash
git add .
git commit -m "Test deployment"
git push origin main
```

3. Go to your GitHub repository → **Actions** tab
4. You should see the workflow running

## Step 7: Verify Deployment

After the workflow completes:

1. Check your website: `https://yourdomain.com`
2. Check the Actions logs for any errors
3. Verify files are deployed: `ls -la /var/www/html/`

## Troubleshooting

### Common Issues:

1. **SSH Connection Failed**:
   - Verify your server host, username, and SSH key
   - Check if your server allows SSH connections
   - Ensure the public key is in `~/.ssh/authorized_keys`

2. **Permission Denied**:
   - Make sure your user has sudo privileges
   - Check web server directory permissions

3. **Build Failed**:
   - Check if all dependencies are in `package.json`
   - Verify Node.js version compatibility

4. **Website Not Loading**:
   - Check web server configuration
   - Verify domain DNS settings
   - Check web server logs: `sudo tail -f /var/log/nginx/error.log`

### Useful Commands:

```bash
# Check web server status
sudo systemctl status nginx

# Check web server logs
sudo tail -f /var/log/nginx/error.log

# Check file permissions
ls -la /var/www/html/

# Test SSH connection
ssh -i ~/.ssh/github_actions username@yourdomain.com
```

## Security Notes

1. **SSH Key**: Keep your private key secure and never commit it to your repository
2. **Firewall**: Ensure your server firewall allows SSH connections
3. **Updates**: Regularly update your server and dependencies
4. **Backups**: The workflow creates automatic backups, but consider additional backup strategies

## Customization

You can customize the workflow by:

1. **Changing deployment directory**: Update the paths in the workflow file
2. **Adding environment variables**: Use GitHub secrets for sensitive data
3. **Adding notifications**: Integrate with Slack, Discord, or email
4. **Adding tests**: Run tests before deployment
5. **Adding staging environment**: Deploy to staging first, then production

## Support

If you encounter issues:

1. Check the GitHub Actions logs for detailed error messages
2. Verify all prerequisites are met
3. Test SSH connection manually
4. Check server logs for web server issues 