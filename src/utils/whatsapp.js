/* ============================================================
   WhatsApp Utility Functions
   Builds pre-filled WhatsApp message URLs for Fine Fit.
   ============================================================ */

// Fine Fit WhatsApp business number (international format, no + or spaces)
const WA_NUMBER = '27746461491';

// Build a single-product WhatsApp enquiry link
export function buildProductEnquiryUrl(product, selectedColour, selectedSize) {
  const colour = selectedColour || 'Not specified';
  const size = selectedSize || 'Not specified';
  const message =
    `Hi Fine Fit! I'd like to enquire about the *${product.name}*.\n\n` +
    `Colour: ${colour}\nSize: ${size}\n\n` +
    `Please send me pricing and availability. Thank you!`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// Build a quote-cart WhatsApp message (multiple items)
export function buildCartEnquiryUrl(cartItems, customerDetails) {
  const { name, phone, company, email, message } = customerDetails;

  const itemLines = cartItems.map(item => {
    const colour = item.selectedColour || 'Not specified';
    const size = item.selectedSize || 'Not specified';
    return `• ${item.product.name} | Colour: ${colour} | Size: ${size} | Qty: ${item.quantity}`;
  }).join('\n');

  const fullMessage =
    `*Fine Fit Quotation Request*\n\n` +
    `*Customer Details:*\n` +
    `Name: ${name}\n` +
    `Phone: ${phone}\n` +
    `Company: ${company || 'N/A'}\n` +
    `Email: ${email}\n\n` +
    `*Items Requested:*\n${itemLines}\n\n` +
    (message ? `*Additional Notes:*\n${message}` : '');

  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
}
