/* eslint-disable no-unused-vars */
/**
 * ====================================================================
 * LUCY DENTAL CLINIC - GOOGLE APPS SCRIPT FOR APPOINTMENTS & LIVE SYNC
 * ====================================================================
 * 
 * Capabilities:
 * 1. APPEND new appointments (POST / GET) with dynamic column matching.
 * 2. READ appointments (GET ?action=read) with CORS-immune JSONP support.
 * 3. UPDATE status (POST / GET ?action=updateStatus&referenceId=...&status=...)
 * 
 * HOW TO UPDATE IN GOOGLE APPS SCRIPT:
 * 1. Open your Google Sheet > Extensions > Apps Script.
 * 2. Select all and paste this entire code.
 * 3. Click "Deploy" > "Manage deployments".
 * 4. Click the Pencil (Edit) icon next to your Active deployment.
 * 5. Under "Version", select "New version" (IMPORTANT!).
 * 6. Under "Who has access", select "Anyone" (IMPORTANT!).
 * 7. Click "Deploy".
 */

function doGet(e) {
  var callback = e && e.parameter ? e.parameter.callback : null;
  
  if (e && e.parameter) {
    var act = e.parameter.action;
    if (act === 'read' || act === 'getAppointments') {
      return handleReadAppointments(callback);
    }
    if (act === 'readInquiries' || act === 'getInquiries') {
      return handleReadInquiries(callback);
    }
    if (act === 'updateStatus') {
      return handleUpdateStatus(
        e.parameter.referenceId,
        e.parameter.status,
        e.parameter.rowNumber,
        callback
      );
    }
    if (act === 'updateInquiryStatus') {
      return handleUpdateInquiryStatus(
        e.parameter.inquiryId,
        e.parameter.status,
        e.parameter.rowNumber,
        callback
      );
    }
    if (act === 'submitInquiry' || e.parameter.type === 'inquiry' || (e.parameter.referenceId && String(e.parameter.referenceId).indexOf('INQ-') === 0)) {
      return handleInquiryRequest(e, callback);
    }
  }
  return handleRequest(e, callback);
}

function doPost(e) {
  var data = {};
  if (e && e.postData && e.postData.contents) {
    try {
      data = JSON.parse(e.postData.contents);
    } catch (err) {
      data = e.parameter || {};
    }
  } else if (e && e.parameter) {
    data = e.parameter;
  }

  if (data.action === 'updateStatus') {
    return handleUpdateStatus(
      data.referenceId,
      data.status,
      data.rowNumber,
      null
    );
  }

  if (data.action === 'updateInquiryStatus') {
    return handleUpdateInquiryStatus(
      data.inquiryId,
      data.status,
      data.rowNumber,
      null
    );
  }

  if (
    data.action === 'submitInquiry' ||
    data.type === 'inquiry' ||
    data.inquiryId ||
    (data.referenceId && String(data.referenceId).indexOf('INQ-') === 0) ||
    (data.service && String(data.service).indexOf('Inquiry:') === 0)
  ) {
    return handleInquiryRequest(e, null);
  }

  return handleRequest(e, null);
}

/**
 * READ ALL APPOINTMENTS DIRECTLY FROM GOOGLE SHEET
 * Supports JSONP callback to bypass browser CORS restrictions 100%
 */
function handleReadAppointments(callback) {
  try {
    const sheet = getOrCreateAppointmentsSheet();
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();

    var result;
    if (lastRow < 2) {
      result = { success: true, count: 0, appointments: [] };
    } else {
      const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
      const dataRows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

      // Map headers dynamically by keyword
      const headerMap = {};
      headers.forEach(function(h, idx) {
        const clean = String(h).toLowerCase().trim();
        if (clean.includes("time") || clean.includes("submission")) {
          headerMap.timestamp = idx;
        } else if (clean.includes("date") || clean.includes("preferred")) {
          headerMap.date = idx;
        } else if (clean.includes("reference") || clean.includes("ref id") || clean === "ref" || clean.startsWith("ref ") || clean.includes("id")) {
          headerMap.refId = idx;
        } else if (clean.includes("patient") && (clean.includes("name") || !clean.includes("note"))) {
          headerMap.name = idx;
        } else if (clean.includes("phone") || clean.includes("tel") || clean.includes("mobile")) {
          headerMap.phone = idx;
        } else if (clean.includes("service") || clean.includes("treatment")) {
          headerMap.service = idx;
        } else if (clean.includes("doctor")) {
          headerMap.doctor = idx;
        } else if (clean.includes("status")) {
          headerMap.status = idx;
        } else if (clean.includes("shift") || clean.includes("time of day")) {
          headerMap.shift = idx;
        } else if (clean.includes("note") || clean.includes("message")) {
          headerMap.notes = idx;
        }
      });

      const appointments = dataRows.map(function(row, rIdx) {
        var rawDate = headerMap.date !== undefined ? row[headerMap.date] : "";
        var dateStr = rawDate instanceof Date ? Utilities.formatDate(rawDate, "Africa/Addis_Ababa", "yyyy-MM-dd") : String(rawDate || "");
        
        var rawTimestamp = headerMap.timestamp !== undefined ? row[headerMap.timestamp] : "";
        var timeStr = rawTimestamp instanceof Date ? Utilities.formatDate(rawTimestamp, "Africa/Addis_Ababa", "yyyy-MM-dd HH:mm:ss") : String(rawTimestamp || "");

        return {
          rowNumber: rIdx + 2,
          referenceId: headerMap.refId !== undefined ? String(row[headerMap.refId] || "") : "LUCY-" + (rIdx + 1),
          patientName: headerMap.name !== undefined ? String(row[headerMap.name] || "") : "Patient",
          patientPhone: headerMap.phone !== undefined ? String(row[headerMap.phone] || "") : "",
          service: headerMap.service !== undefined ? String(row[headerMap.service] || "") : "General Consultation",
          doctor: headerMap.doctor !== undefined ? String(row[headerMap.doctor] || "") : "Any Available Doctor",
          date: dateStr,
          shift: headerMap.shift !== undefined ? String(row[headerMap.shift] || "") : "Morning",
          notes: headerMap.notes !== undefined ? String(row[headerMap.notes] || "") : "",
          status: headerMap.status !== undefined ? String(row[headerMap.status] || "Pending Review") : "Pending Review",
          savedAt: timeStr || new Date().toISOString()
        };
      }).reverse(); // Most recent on top

      // Exclude general inquiries from appointments view
      var filteredAppointments = appointments.filter(function(a) {
        return !(a.referenceId && String(a.referenceId).indexOf('INQ-') === 0) &&
               !(a.service && String(a.service).indexOf('Inquiry:') === 0);
      });

      result = { success: true, count: filteredAppointments.length, appointments: filteredAppointments };
    }

    if (callback) {
      return ContentService.createTextOutput(callback + "(" + JSON.stringify(result) + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    var errObj = { success: false, error: err.toString() };
    if (callback) {
      return ContentService.createTextOutput(callback + "(" + JSON.stringify(errObj) + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(JSON.stringify(errObj))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * UPDATE STATUS OF A SPECIFIC APPOINTMENT BY REFERENCE ID OR ROW NUMBER
 */
function handleUpdateStatus(refId, newStatus, rowNumber, callback) {
  try {
    if (!refId && !rowNumber) {
      var err1 = { success: false, message: "Missing referenceId or rowNumber" };
      if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(err1) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
      return ContentService.createTextOutput(JSON.stringify(err1)).setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = getOrCreateAppointmentsSheet();
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();

    if (lastRow < 2) {
      var err2 = { success: false, message: "Sheet has no data rows" };
      if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(err2) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
      return ContentService.createTextOutput(JSON.stringify(err2)).setMimeType(ContentService.MimeType.JSON);
    }

    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var refCol = -1;
    var statusCol = -1;

    headers.forEach(function(h, idx) {
      const clean = String(h).toLowerCase().trim();
      if (clean.includes("date") || clean.includes("preferred")) {
        // Skip - this is the date column, not the reference ID column!
      } else if (clean.includes("reference") || clean === "ref" || clean.startsWith("ref ") || clean.includes("ref id")) {
        refCol = idx + 1;
      }
      if (clean.includes("status")) {
        statusCol = idx + 1;
      }
    });

    if (statusCol === -1) {
      var err3 = { success: false, message: "Status column not found in headers" };
      if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(err3) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
      return ContentService.createTextOutput(JSON.stringify(err3)).setMimeType(ContentService.MimeType.JSON);
    }

    var matchedRow = -1;

    if (refCol !== -1 && refId) {
      const refValues = sheet.getRange(2, refCol, lastRow - 1, 1).getValues();
      for (var i = 0; i < refValues.length; i++) {
        if (String(refValues[i][0]).trim().toUpperCase() === String(refId).trim().toUpperCase()) {
          matchedRow = i + 2;
          break;
        }
      }
    }

    // Secondary fallback: Match directly by rowNumber if provided
    var parsedRowNum = Number(rowNumber);
    if (matchedRow === -1 && !isNaN(parsedRowNum) && parsedRowNum >= 2 && parsedRowNum <= lastRow) {
      matchedRow = parsedRowNum;
    }

    if (matchedRow > 0) {
      sheet.getRange(matchedRow, statusCol).setValue(newStatus);
      var ok = { success: true, updatedRow: matchedRow, referenceId: refId, status: newStatus };
      if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(ok) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
      return ContentService.createTextOutput(JSON.stringify(ok)).setMimeType(ContentService.MimeType.JSON);
    } else {
      var notFound = { success: false, message: "Record not found for ref: " + refId + " or row: " + rowNumber };
      if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(notFound) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
      return ContentService.createTextOutput(JSON.stringify(notFound)).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    var errCatch = { success: false, error: err.toString() };
    if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(errCatch) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
    return ContentService.createTextOutput(JSON.stringify(errCatch)).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * INSERT NEW APPOINTMENT SUBMISSION
 */
function handleRequest(e, callback) {
  try {
    var data = {};

    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Route inquiries directly to the "Inquiries" sheet tab
    if (
      (data.type && data.type === "inquiry") ||
      data.inquiryId ||
      (data.referenceId && String(data.referenceId).indexOf("INQ-") === 0) ||
      (data.service && String(data.service).indexOf("Inquiry:") === 0)
    ) {
      return handleInquiryRequest(e, callback);
    }

    const sheet = getOrCreateAppointmentsSheet();
    const timestamp = data.submittedAt || Utilities.formatDate(new Date(), "Africa/Addis_Ababa", "yyyy-MM-dd HH:mm:ss");
    const refId = data.referenceId || "LUCY-" + Math.floor(1000 + Math.random() * 9000);
    const patientName = data.patientName || "Anonymous";
    const phone = data.patientPhone || "N/A";
    const service = data.service || "General Consultation";
    const date = data.date || "N/A";
    const shift = data.shift || "morning";
    const notes = data.notes || "None";
    const status = "Pending Review";

    const lastCol = Math.max(sheet.getLastColumn(), 9);
    const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    const rowData = new Array(headers.length).fill("");
    var refColIdx = -1;

    headers.forEach(function(h, idx) {
      const header = String(h).toLowerCase().trim();
      
      if (header.includes("time") || header.includes("timestamp")) {
        rowData[idx] = timestamp;
      } else if (header.includes("date") || header.includes("preferred")) {
        rowData[idx] = date;
      } else if (header.includes("reference") || header.includes("ref id") || header === "ref" || header.startsWith("ref ") || header.includes("id")) {
        rowData[idx] = refId;
        refColIdx = idx + 1;
      } else if (header.includes("patient") && (header.includes("name") || !header.includes("note"))) {
        rowData[idx] = patientName;
      } else if (header.includes("phone") || header.includes("tel")) {
        rowData[idx] = phone;
      } else if (header.includes("service") || header.includes("treatment")) {
        rowData[idx] = service;
      } else if (header.includes("status")) {
        rowData[idx] = status;
      } else if (header.includes("shift")) {
        rowData[idx] = shift;
      } else if (header.includes("note") || header.includes("message")) {
        rowData[idx] = notes;
      }
    });

    // Deduplication check: do not append if this referenceId is already present in the sheet
    const curLastRow = sheet.getLastRow();
    if (refColIdx !== -1 && curLastRow >= 2 && refId) {
      const existingRefs = sheet.getRange(2, refColIdx, curLastRow - 1, 1).getValues();
      for (var r = 0; r < existingRefs.length; r++) {
        if (String(existingRefs[r][0]).trim().toUpperCase() === String(refId).trim().toUpperCase()) {
          var dupRes = { status: "success", referenceId: refId, duplicate: true, rowNumber: r + 2 };
          if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(dupRes) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
          return ContentService.createTextOutput(JSON.stringify(dupRes)).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    const isAllBlank = rowData.every(function(val) { return val === ""; });
    const finalRow = isAllBlank 
      ? [timestamp, refId, patientName, phone, service, status, date, shift, notes]
      : rowData;

    sheet.appendRow(finalRow);

    var res = { status: "success", referenceId: refId };
    if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(res) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
    return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    var errRes = { status: "error", message: error.toString() };
    if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(errRes) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
    return ContentService.createTextOutput(JSON.stringify(errRes)).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateAppointmentsSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Appointments");

  if (!sheet) {
    const firstSheet = ss.getSheets()[0];
    if (firstSheet && firstSheet.getLastRow() === 0) {
      sheet = firstSheet;
      sheet.setName("Appointments");
    } else {
      sheet = ss.insertSheet("Appointments");
    }

    const headers = [
      "Submission Time",
      "Reference ID",
      "Patient Name",
      "Phone Number",
      "Service Requested",
      "Reception Status",
      "Preferred Date",
      "Shift",
      "Patient Notes"
    ];
    sheet.appendRow(headers);

    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0d9488");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setFontSize(11);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  } else {
    // Self-healing: if Column F (col 6) header was left blank in existing sheet, restore "Reception Status"
    try {
      var col6Val = sheet.getRange(1, 6).getValue();
      if (!col6Val || String(col6Val).trim() === "") {
        sheet.getRange(1, 6).setValue("Reception Status");
        sheet.getRange(1, 6).setBackground("#0d9488").setFontColor("#ffffff").setFontWeight("bold");
      }
    } catch (headErr) {
      // ignore
    }
  }

  return sheet;
}

/**
 * ====================================================================
 * INQUIRIES & QUESTIONS SHEET MANAGEMENT
 * ====================================================================
 */

function getOrCreateInquiriesSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName("Inquiries");

  if (!sheet) {
    sheet = ss.insertSheet("Inquiries");

    const headers = [
      "Submission Time",
      "Inquiry ID",
      "Sender Name",
      "Phone Number",
      "Email Address",
      "Subject / Topic",
      "Message & Question",
      "Reception Status"
    ];
    sheet.appendRow(headers);

    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0284c7"); // Ocean Blue header
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setFontSize(11);
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }

  return sheet;
}

/**
 * INSERT NEW INQUIRY / QUESTION INTO "INQUIRIES" SHEET TAB
 */
function handleInquiryRequest(e, callback) {
  try {
    const sheet = getOrCreateInquiriesSheet();
    var data = {};

    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    const timestamp = data.submittedAt || Utilities.formatDate(new Date(), "Africa/Addis_Ababa", "yyyy-MM-dd HH:mm:ss");
    const inqId = data.inquiryId || data.referenceId || "INQ-" + Math.floor(1000 + Math.random() * 9000);
    const name = data.name || data.patientName || "Anonymous";
    const phone = data.phone || data.patientPhone || "N/A";
    const email = data.email || "N/A";
    var subject = data.subject || data.service || "General Question";
    if (subject.indexOf("Inquiry: ") === 0) subject = subject.replace("Inquiry: ", "");
    var message = data.message || data.notes || "None";
    if (message.indexOf("Message: ") !== -1) {
      var parts = message.split("Message: ");
      if (parts[1]) message = parts[1];
    }
    const status = "Unread";

    // Deduplication check: do not append if this inqId already exists in column B
    const lastRow = sheet.getLastRow();
    if (lastRow >= 2 && inqId) {
      const existingIds = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (var r = 0; r < existingIds.length; r++) {
        if (String(existingIds[r][0]).trim().toUpperCase() === String(inqId).trim().toUpperCase()) {
          var dupRes = { status: "success", inquiryId: inqId, duplicate: true, rowNumber: r + 2 };
          if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(dupRes) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
          return ContentService.createTextOutput(JSON.stringify(dupRes)).setMimeType(ContentService.MimeType.JSON);
        }
      }
    }

    const finalRow = [timestamp, inqId, name, phone, email, subject, message, status];
    sheet.appendRow(finalRow);

    var res = { status: "success", inquiryId: inqId, sheet: "Inquiries" };
    if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(res) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
    return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    var errRes = { status: "error", message: error.toString() };
    if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(errRes) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
    return ContentService.createTextOutput(JSON.stringify(errRes)).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * READ ALL INQUIRIES DIRECTLY FROM "INQUIRIES" SHEET TAB
 */
function handleReadInquiries(callback) {
  try {
    const sheet = getOrCreateInquiriesSheet();
    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();

    var result;
    if (lastRow < 2) {
      result = { success: true, count: 0, inquiries: [] };
    } else {
      const dataRows = sheet.getRange(2, 1, lastRow - 1, lastCol).getValues();
      const inquiries = dataRows.map(function(row, idx) {
        var rawTimestamp = row[0];
        var timeStr = rawTimestamp instanceof Date ? Utilities.formatDate(rawTimestamp, "Africa/Addis_Ababa", "yyyy-MM-dd HH:mm:ss") : String(rawTimestamp || "");

        return {
          rowNumber: idx + 2,
          submittedAt: timeStr,
          inquiryId: String(row[1] || ""),
          name: String(row[2] || ""),
          phone: String(row[3] || ""),
          email: String(row[4] || ""),
          subject: String(row[5] || ""),
          message: String(row[6] || ""),
          status: String(row[7] || "Unread")
        };
      }).reverse();

      result = { success: true, count: inquiries.length, inquiries: inquiries };
    }

    if (callback) {
      return ContentService.createTextOutput(callback + "(" + JSON.stringify(result) + ")")
        .setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    var errObj = { success: false, error: err.toString() };
    if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(errObj) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
    return ContentService.createTextOutput(JSON.stringify(errObj)).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * UPDATE STATUS OF AN INQUIRY (Unread / Contacted / Resolved)
 */
function handleUpdateInquiryStatus(inquiryId, newStatus, rowNumber, callback) {
  try {
    const sheet = getOrCreateInquiriesSheet();
    const lastRow = sheet.getLastRow();

    if (lastRow < 2) {
      var err = { success: false, message: "No inquiries to update" };
      if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(err) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
      return ContentService.createTextOutput(JSON.stringify(err)).setMimeType(ContentService.MimeType.JSON);
    }

    var matchedRow = -1;
    if (inquiryId) {
      const ids = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
      for (var i = 0; i < ids.length; i++) {
        if (String(ids[i][0]).trim().toUpperCase() === String(inquiryId).trim().toUpperCase()) {
          matchedRow = i + 2;
          break;
        }
      }
    }

    var rowNum = Number(rowNumber);
    if (matchedRow === -1 && !isNaN(rowNum) && rowNum >= 2 && rowNum <= lastRow) {
      matchedRow = rowNum;
    }

    if (matchedRow > 0) {
      sheet.getRange(matchedRow, 8).setValue(newStatus);
      var ok = { success: true, updatedRow: matchedRow, inquiryId: inquiryId, status: newStatus };
      if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(ok) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
      return ContentService.createTextOutput(JSON.stringify(ok)).setMimeType(ContentService.MimeType.JSON);
    } else {
      var notFound = { success: false, message: "Inquiry ID not found: " + inquiryId };
      if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(notFound) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
      return ContentService.createTextOutput(JSON.stringify(notFound)).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (err) {
    var catchObj = { success: false, error: err.toString() };
    if (callback) return ContentService.createTextOutput(callback + "(" + JSON.stringify(catchObj) + ")").setMimeType(ContentService.MimeType.JAVASCRIPT);
    return ContentService.createTextOutput(JSON.stringify(catchObj)).setMimeType(ContentService.MimeType.JSON);
  }
}
