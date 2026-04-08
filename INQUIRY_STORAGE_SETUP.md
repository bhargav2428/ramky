# Inquiry Data Storage Setup Guide

## 🎯 **Store Inquiry Data in Google Sheets**

This guide will help you store all website inquiries in Google Sheets for easy access and management.

---

## 📋 **Step 1: Create a Google Sheet**

1. Go to [sheets.google.com](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Name it "Ramky Inquiries" or similar
4. Copy the **Spreadsheet ID** from the URL:
   ```
   https://docs.google.com/spreadsheets/d/SPREADSHEET_ID_HERE/edit
   ```

---

## 📝 **Step 2: Set Up Google Apps Script**

1. In your Google Sheet, go to **Extensions → Apps Script**
2. Delete any existing code
3. Copy and paste the code from `google-apps-script.js`
4. **Replace** `YOUR_SPREADSHEET_ID_HERE` with your actual spreadsheet ID
5. Click **Save** (floppy disk icon)
6. Click **Run** to test the script
7. Grant permissions when prompted

---

## 🌐 **Step 3: Deploy as Web App**

1. Click **Deploy → New deployment**
2. Select type: **Web app**
3. Description: "Ramky Inquiry Handler"
4. Execute as: **Me** (your email)
5. Who has access: **Anyone** (important!)
6. Click **Deploy**
7. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/SCRIPT_ID/exec
   ```

---

## ⚙️ **Step 4: Update Your Website Code**

1. Open `src/App.tsx`
2. Find this line:
   ```javascript
   const scriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. Replace with your Web App URL:
   ```javascript
   const scriptUrl = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```

---

## ✅ **Step 5: Test the Integration**

1. Run your website locally: `npm run dev`
2. Fill out the inquiry form
3. Submit it
4. Check your Google Sheet - the data should appear!

---

## 📊 **What Gets Stored**

Your Google Sheet will automatically create columns:
- **Timestamp**: When the inquiry was submitted
- **Name**: Customer's full name
- **Phone**: Phone number
- **Email**: Email address
- **Message**: Their inquiry message
- **Source**: "Website Contact Form"

---

## 🔧 **Troubleshooting**

### **CORS Error?**
- Make sure "Who has access" is set to "Anyone" in deployment settings

### **Data Not Appearing?**
- Check the Apps Script execution logs
- Verify the spreadsheet ID is correct
- Test the script manually first

### **Permission Issues?**
- Re-run the script and grant all requested permissions

---

## 📈 **Benefits**

✅ **Free** - No additional costs
✅ **Real-time** - Data appears instantly
✅ **Accessible** - View from anywhere
✅ **Shareable** - Share with your team
✅ **Exportable** - Download as Excel/CSV
✅ **Filterable** - Sort and filter inquiries

---

## 🚀 **Advanced Features (Optional)**

### **Email Notifications**
Add this to your Apps Script to get email alerts:

```javascript
// Add after storing data
MailApp.sendEmail(
  'your-email@example.com',
  'New Inquiry: ' + data.name,
  'New inquiry received from ' + data.name + ' (' + data.email + ')'
);
```

### **Multiple Sheets**
Create separate sheets for different time periods or lead sources.

---

## 📞 **Need Help?**

If you encounter any issues:
1. Check the browser console for errors
2. Verify all URLs and IDs are correct
3. Test the Google Apps Script independently
4. Ensure proper permissions are granted

Your inquiry data will now be automatically stored and accessible forever! 🎉