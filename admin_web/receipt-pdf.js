/* Local PDF output from verified receipt fields; public logo GET, no financial writes. */
window.WaterHallReceiptPDF = (() => {
  let logoPromise;
  async function build(records, fields) {
    if (!window.jspdf?.jsPDF || !window.WaterHallReceiptFont) throw new Error('PDF tools unavailable');
    logoPromise ||= fetch('/admin/logo.png').then(response => {
      if (!response.ok) throw new Error('Receipt logo unavailable');
      return response.arrayBuffer();
    }).then(buffer => new Uint8Array(buffer)).catch(error => { logoPromise = null; throw error; });
    const logo = await logoPromise;
    const pdf = new jspdf.jsPDF({unit: 'pt', format: 'a4', putOnlyUsedFonts: true, compress: true});
    pdf.addFileToVFS('Roboto-Regular.ttf', WaterHallReceiptFont);
    pdf.addFont('Roboto-Regular.ttf', 'Receipt', 'normal');
    pdf.setFont('Receipt', 'normal');
    pdf.setProperties({title: 'WaterHall - Payment receipts', author: 'WaterHall', subject: 'Verified paid billing records'});
    const width = pdf.internal.pageSize.getWidth(), height = pdf.internal.pageSize.getHeight();
    const left = 40, right = width - 40, labelWidth = 170, lineHeight = 14;
    let y;
    function header(continued = false) {
      pdf.addImage(logo, 'PNG', right - 44, 36, 44, 44);
      pdf.setTextColor(18, 55, 82); pdf.setFontSize(11);
      pdf.text('BARANGAY TAGPOPONGAN WATER SYSTEM', left, 48);
      pdf.setFontSize(18); pdf.text('WaterHall - Payment receipt', left, 72);
      if (continued) { pdf.setFontSize(10); pdf.text('Continued', left, 90); }
      pdf.setDrawColor(160, 180, 194); pdf.line(left, 100, right, 100); y = 116;
    }
    records.forEach((row, index) => {
      if (index) pdf.addPage();
      header();
      for (const [label, value] of fields(row)) {
        pdf.setFontSize(10);
        const labels = pdf.splitTextToSize(label, labelWidth - 16);
        const values = pdf.splitTextToSize(String(value || 'Not recorded'), right - left - labelWidth - 16);
        let offset = 0;
        const count = Math.max(labels.length, values.length);
        while (offset < count) {
          let capacity = Math.floor((height - 45 - y - 16) / lineHeight);
          if (capacity < 1) { pdf.addPage(); header(true); capacity = Math.floor((height - 45 - y - 16) / lineHeight); }
          const length = Math.min(count - offset, capacity), rowHeight = length * lineHeight + 16;
          pdf.setFillColor(243, 247, 250); pdf.rect(left, y, labelWidth, rowHeight, 'F');
          pdf.setDrawColor(185, 199, 208); pdf.rect(left, y, right - left, rowHeight);
          pdf.line(left + labelWidth, y, left + labelWidth, y + rowHeight);
          pdf.setTextColor(25, 44, 58);
          const labelLines = labels.slice(offset, offset + length), valueLines = values.slice(offset, offset + length);
          if (labelLines.length) pdf.text(labelLines, left + 8, y + 18, {lineHeightFactor: 1.4});
          if (valueLines.length) pdf.text(valueLines, left + labelWidth + 8, y + 18, {lineHeightFactor: 1.4});
          offset += length; y += rowHeight;
        }
      }
    });
    return pdf.output('blob');
  }
  return Object.freeze({build});
})();
