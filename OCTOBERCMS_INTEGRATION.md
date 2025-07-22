# OctoberCMS Integration Guide

## Overview
This guide explains how to integrate OctoberCMS with your React frontend for content management.

## Prerequisites
- OctoberCMS installed on `admin.ipadev.ng`
- Admin access at `ipadev.ng/admin`
- React frontend running locally

## Step 1: Install OctoberCMS API Plugin

1. Log into your OctoberCMS admin panel at `ipadev.ng/admin`
2. Navigate to **Settings > Updates**
3. Install the **API** plugin
4. Or install via composer:
   ```bash
   composer require rainlab/api-plugin
   ```

## Step 2: Install IPADEV API Plugin

1. Copy the `admin/plugins/ipadev/api/` folder to your OctoberCMS installation
2. The plugin should be located at: `your-octobercms-root/plugins/ipadev/api/`
3. Run the plugin installation:
   ```bash
   php artisan plugin:install ipadev.api
   ```

## Step 3: Configure API Endpoints

The plugin provides the following API endpoints:

- `GET /api/hero` - Hero section content
- `GET /api/about` - About section content  
- `GET /api/team` - Team members and executive director
- `GET /api/areas-of-focus` - Areas of focus content
- `GET /api/contact` - Contact information
- `POST /api/contact` - Contact form submission
- `POST /api/newsletter` - Newsletter subscription

## Step 4: Environment Configuration

Create a `.env` file in your React project root:

```env
REACT_APP_API_URL=https://ipadev.ng/api
```

## Step 5: Test API Integration

1. Start your React development server:
   ```bash
   npm start
   ```

2. Visit the Team page to test API integration
3. Check browser console for any API errors

## Step 6: Content Management

### Managing Team Content
1. Go to `ipadev.ng/admin`
2. Navigate to **IPADEV API > Team Management**
3. Update team member information, photos, and bios
4. Changes will automatically reflect on the frontend

### Managing Other Content
- Hero content: Update through the API controller
- About section: Modify mission, vision, and values
- Areas of focus: Update strategic objectives
- Contact information: Update addresses and social media links

## Step 7: Customization

### Adding New API Endpoints
1. Edit `admin/plugins/ipadev/api/controllers/Api.php`
2. Add new methods for your endpoints
3. Register them in `admin/plugins/ipadev/api/Plugin.php`

### Updating React Components
1. Add new API calls to `src/services/api.js`
2. Update components to use API data
3. Add loading states and error handling

## Troubleshooting

### API Not Responding
- Check if OctoberCMS is running
- Verify API plugin is installed
- Check server logs for errors

### CORS Issues
- Add CORS headers to OctoberCMS
- Configure allowed origins in API plugin

### Content Not Updating
- Clear React cache: `npm run build`
- Check API response in browser dev tools
- Verify environment variables are set correctly

## Benefits of This Integration

1. **Content Management**: Easy content updates through admin panel
2. **Separation of Concerns**: Content separate from code
3. **Scalability**: Easy to add new content types
4. **Performance**: API caching and optimization
5. **User-Friendly**: Non-technical users can update content

## Next Steps

1. Set up content editors and permissions
2. Implement content versioning
3. Add image upload functionality
4. Set up automated backups
5. Configure caching for better performance 