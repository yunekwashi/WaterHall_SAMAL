/* Native printing belongs to this document's browsing context. No API calls. */
(() => {
  const button = document.getElementById('receipt-window-print');
  const status = document.getElementById('receipt-window-status');
  const nativePrint = window.print.bind(window);
  function print() {
    if (button.disabled) return;
    window.focus(); nativePrint();
  }
  button.addEventListener('click', print);
  window.addEventListener('beforeprint', () => {
    document.documentElement.dataset.receiptPrintStarted = 'true';
    status.textContent = 'Browser print dialog opened. Choose your printer or Save as PDF.';
  });
  window.addEventListener('afterprint', () => {
    status.textContent = 'Print dialog closed. You can print again or close this window.';
  });
  window.WaterHallReceiptPrint = Object.freeze({print});
})();
