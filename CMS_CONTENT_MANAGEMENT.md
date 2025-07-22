# CMS Content Management Setup

## Overview
This guide explains how to set up content management through OctoberCMS so you can edit website content without touching code.

## Files to Upload

Upload these files to your OctoberCMS server in the correct directory structure:

### Directory Structure:
```
plugins/ipadev/api/
├── Plugin.php
├── controllers/
│   ├── Api.php
│   └── TeamMembers.php
├── models/
│   ├── TeamMember.php
│   └── Content.php
├── updates/
│   ├── version.yaml
│   ├── create_team_table.php
│   └── create_content_table.php
├── controllers/teammembers/
│   ├── config_form.yaml
│   └── config_list.yaml
└── models/teammember/
    ├── fields.yaml
    └── columns.yaml
```

## Step 1: Upload Files

1. **Use your hosting file manager** to create the directory structure
2. **Upload all the files** to their respective locations
3. **Ensure proper file permissions** (644 for files, 755 for folders)

## Step 2: Run Database Migrations

1. **Go to your OctoberCMS admin**: `www.admin.ipadev.ng/admin/`
2. **Navigate to Settings > Updates**
3. **Click "Check for updates"** - this will run the migrations
4. **Or manually run**: Go to Settings > System > Database and run migrations

## Step 3: Access Content Management

After installation, you'll see a new menu item "IPADEV" in your admin panel:

1. **Go to IPADEV > Team Members**
2. **Add your team members**:
   - Click "Create Team Member"
   - Fill in the details (name, role, bio, etc.)
   - Upload photos
   - Mark one as "Executive Director"
   - Set sort order for display order

## Step 4: Add Initial Content

### Add Executive Director:
1. **Create a new team member**
2. **Check "Executive Director"** checkbox
3. **Fill in all details**:
   - Name: Dr. Margaret Fagboyo
   - Role: Executive Director
   - Bio: [Full bio text]
   - Vision: [Vision statement]
   - Message: [Message to visitors]
   - Upload photo

### Add Board Members:
1. **Create team members** for each board member
2. **Leave "Executive Director" unchecked**
3. **Fill in details**:
   - Name, Role, Photo
   - Set sort order (1, 2, 3, etc.)

## Step 5: Test the API

After adding content, test the API:
- Visit `www.admin.ipadev.ng/api/team`
- You should see the content you just added

## Step 6: Update React App

Your React app will automatically use the new content from the database.

## Content Management Features

### Team Members:
- ✅ Add/Edit/Delete team members
- ✅ Upload photos
- ✅ Set Executive Director
- ✅ Control display order
- ✅ Enable/Disable members

### Photos:
- ✅ Upload through admin panel
- ✅ Automatic resizing
- ✅ Fallback to placeholder if no photo

### Content Updates:
- ✅ Changes appear immediately on website
- ✅ No code changes needed
- ✅ User-friendly interface

## Troubleshooting

### If migrations don't run:
1. Check file permissions
2. Clear OctoberCMS cache
3. Check error logs

### If content doesn't appear:
1. Verify team members are marked as "Active"
2. Check API endpoint response
3. Clear React app cache

### If photos don't upload:
1. Check upload directory permissions
2. Verify file size limits
3. Check allowed file types

## Next Steps

1. **Add more content types** (Hero, About, Contact)
2. **Create content editors** for non-technical users
3. **Set up content approval workflow**
4. **Add content versioning**

## Benefits

- ✅ **No Code Changes**: Update content without touching code
- ✅ **User-Friendly**: Simple admin interface
- ✅ **Immediate Updates**: Changes appear instantly
- ✅ **Photo Management**: Easy photo uploads
- ✅ **Content Control**: Enable/disable content as needed 