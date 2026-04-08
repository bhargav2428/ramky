// Google Apps Script Code for storing inquiries in Google Sheets
// Deploy this as a web app and use the URL in the frontend

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Open the spreadsheet (replace with your spreadsheet ID)
    const spreadsheetId = 'YOUR_SPREADSHEET_ID_HERE';
    const sheet = SpreadsheetApp.openById(spreadsheetId).getActiveSheet();

    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Phone', 'Email', 'Message', 'Source']);
    }

    // Add the inquiry data
    sheet.appendRow([
      new Date().toLocaleString(),
      data.name,
      data.phone,
      data.email,
      data.message,
      'Website Contact Form'
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Inquiry stored successfully' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function
function testScript() {
  const testData = {
    name: 'Test User',
    phone: '+91 9876543210',
    email: 'test@example.com',
    message: 'Test inquiry message'
  };

  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };

  const result = doPost(e);
  Logger.log(result.getContent());
}