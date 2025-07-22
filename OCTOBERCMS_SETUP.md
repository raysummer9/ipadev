# OctoberCMS Setup Guide

## Current Issue
You're seeing the React frontend when visiting `/admin` because OctoberCMS isn't properly installed in the admin directory.

## Solution: Install OctoberCMS in Admin Directory

### Step 1: Download OctoberCMS
```bash
# Navigate to your admin directory
cd admin

# Download OctoberCMS installer
wget https://octobercms.com/download
# OR download manually from https://octobercms.com/download

# Extract the files
unzip octobercms.zip
```

### Step 2: Move Files to Admin Directory
```bash
# Move all OctoberCMS files to admin directory
mv octobercms/* .
rm -rf octobercms/
```

### Step 3: Set Permissions
```bash
# Set proper permissions
chmod -R 755 .
chmod -R 777 storage/
chmod -R 777 themes/
chmod -R 777 plugins/
```

### Step 4: Configure Database
1. Create a database for OctoberCMS
2. Copy `config/database.php.example` to `config/database.php`
3. Update database credentials in `config/database.php`

### Step 5: Run Installation
```bash
# Run the installation command
php artisan october:install
```

### Step 6: Install IPADEV API Plugin
```bash
# Copy your custom plugin
cp -r ../plugins/ipadev plugins/

# Install the plugin
php artisan plugin:install ipadev.api
```

## Alternative: Use Subdomain Approach

If the above doesn't work, use the subdomain approach:

### Step 1: Point admin.ipadev.ng to OctoberCMS
1. Create a separate directory for OctoberCMS (e.g., `/var/www/octobercms/`)
2. Install OctoberCMS there
3. Configure your web server to point `admin.ipadev.ng` to this directory

### Step 2: Update DNS
- Add A record: `admin.ipadev.ng` → your server IP

### Step 3: Configure Web Server (Apache)
```apache
<VirtualHost *:80>
    ServerName admin.ipadev.ng
    DocumentRoot /var/www/octobercms
    
    <Directory /var/www/octobercms>
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

## Testing the Setup

### After Installation:
1. Visit `ipadev.ng/admin` - should show OctoberCMS login
2. Visit `ipadev.ng` - should show your React frontend
3. Visit `ipadev.ng/api/team` - should return JSON data

### Expected Results:
- `/admin` → OctoberCMS admin panel
- `/` → React frontend
- `/api/*` → API endpoints

## Troubleshooting

### If /admin still shows React:
1. Clear browser cache
2. Check if `.htaccess` files are uploaded
3. Verify web server configuration
4. Check file permissions

### If OctoberCMS doesn't load:
1. Check PHP version (requires 7.4+)
2. Verify database connection
3. Check error logs
4. Ensure all required PHP extensions are installed

### Required PHP Extensions:
- PHP >= 7.4
- OpenSSL PHP Extension
- PDO PHP Extension
- Mbstring PHP Extension
- Tokenizer PHP Extension
- XML PHP Extension
- Ctype PHP Extension
- JSON PHP Extension
- BCMath PHP Extension

## Next Steps After Installation

1. **Create Admin User**:
   ```bash
   php artisan october:user
   ```

2. **Access Admin Panel**:
   - Go to `ipadev.ng/admin`
   - Login with your credentials

3. **Install API Plugin**:
   - Go to Settings > Updates
   - Install the API plugin

4. **Test API Endpoints**:
   - Visit `ipadev.ng/api/team`
   - Should return JSON data

5. **Update React Environment**:
   ```env
   REACT_APP_API_URL=https://ipadev.ng/api
   ``` 