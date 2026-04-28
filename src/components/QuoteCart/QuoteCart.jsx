/* ============================================================
   QuoteCart Component
   Side drawer that shows all items added for quotation.
   Customer fills in contact details and submits via WhatsApp
   and EmailJS simultaneously.
   ============================================================ */
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { buildCartEnquiryUrl } from '../../utils/whatsapp';
import styles from './QuoteCart.module.css';

// EmailJS credentials - set these in your .env file
// See .env.example for setup instructions
const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || '';
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || '';

const EMPTY_FORM = { name: '', phone: '', company: '', email: '', message: '' };

export default function QuoteCart({ isOpen, onClose, cartItems, onRemove, onUpdateQty, onClearCart }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    setError('');
  };

  const validate = () => {
    if (!form.name.trim())  return 'Please enter your name.';
    if (!form.phone.trim()) return 'Please enter your phone number.';
    if (!form.email.trim() || !form.email.includes('@')) return 'Please enter a valid email address.';
    if (cartItems.length === 0) return 'Your quote cart is empty.';
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) { setError(err); return; }

    setSubmitting(true);

    // Build WhatsApp URL (primary channel)
    const waUrl = buildCartEnquiryUrl(cartItems, form);

    // Build email body for EmailJS
    const itemLines = cartItems.map(item =>
      `${item.product.name} | Colour: ${item.selectedColour || 'N/A'} | Size: ${item.selectedSize || 'N/A'} | Qty: ${item.quantity}`
    ).join('\n');

    try {
      // Send email via EmailJS if credentials are configured
      if (EMAILJS_SERVICE && EMAILJS_TEMPLATE && EMAILJS_KEY) {
        await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
          customer_name:    form.name,
          customer_phone:   form.phone,
          customer_company: form.company || 'N/A',
          customer_email:   form.email,
          message:          form.message || 'No additional notes.',
          items:            itemLines,
          to_email:         'info@finefit.co.za',
        }, EMAILJS_KEY);
      }
    } catch (e) {
      console.warn('EmailJS send failed:', e);
      // Still proceed to WhatsApp even if email fails
    }

    // Open WhatsApp with pre-filled message
    window.open(waUrl, '_blank', 'noopener,noreferrer');

    setSubmitting(false);
    setSubmitted(true);
    onClearCart();
    setForm(EMPTY_FORM);
  };

  if (submitted) {
    return (
      <div className={styles.backdrop} onClick={onClose}>
        <div className={styles.drawer} onClick={e => e.stopPropagation()}>
          <div className={styles.successState}>
            <div className={styles.successIcon}>✔</div>
            <h3>Enquiry Sent!</h3>
            <p>Your quote request has been sent to Fine Fit via WhatsApp. We'll get back to you shortly.</p>
            <button className={styles.btnClose} onClick={() => { setSubmitted(false); onClose(); }}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.drawer} onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className={styles.drawerHeader}>
          <h2 className={styles.drawerTitle}>Quote Cart <span>({cartItems.length} item{cartItems.length !== 1 ? 's' : ''})</span></h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        <div className={styles.drawerBody}>

          {/* Empty cart state */}
          {cartItems.length === 0 ? (
            <div className={styles.emptyCart}>
              <p>Your quote cart is empty.</p>
              <p className={styles.emptySub}>Browse products and click "Add to Quote Cart" to get started.</p>
            </div>
          ) : (
            <>
              {/* Cart items */}
              <div className={styles.itemsList}>
                {cartItems.map(item => (
                  <CartItem key={item.variantKey} item={item} onRemove={onRemove} onUpdateQty={onUpdateQty} />
                ))}
              </div>

              {/* Contact form */}
              <div className={styles.formSection}>
                <h3 className={styles.formTitle}>Your Details</h3>
                <p className={styles.formSub}>We'll send your quote to these contact details.</p>

                <div className={styles.formGrid}>
                  <FormField label="Full Name *" name="name" value={form.name} onChange={handleChange} placeholder="John Dlamini" />
                  <FormField label="Phone / WhatsApp *" name="phone" value={form.phone} onChange={handleChange} placeholder="+27 74 000 0000" type="tel" />
                  <FormField label="Email Address *" name="email" value={form.email} onChange={handleChange} placeholder="john@company.co.za" type="email" />
                  <FormField label="Company Name" name="company" value={form.company} onChange={handleChange} placeholder="Your company (optional)" />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Additional Notes</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Delivery requirements, custom branding, bulk discount query…"
                    rows={3}
                  />
                </div>

                {error && <p className={styles.errorMsg}>{error}</p>}

                <button
                  className={styles.btnSubmit}
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? 'Sending…' : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      Send Quote Request via WhatsApp
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Cart Item Row ── */
function CartItem({ item, onRemove, onUpdateQty }) {
  return (
    <div className={styles.cartItem}>
      <img src={item.product.thumbImage} alt={item.product.name} className={styles.cartItemImg}
        onError={e => { e.target.src = '/images/placeholder-thumb.jpg'; }} />
      <div className={styles.cartItemInfo}>
        <p className={styles.cartItemName}>{item.product.name}</p>
        <p className={styles.cartItemVariant}>
          {item.selectedColour && <span>Colour: {item.selectedColour}</span>}
          {item.selectedSize && <span>&nbsp;| Size: {item.selectedSize}</span>}
        </p>
        <div className={styles.cartItemActions}>
          <div className={styles.qtyRow}>
            <button onClick={() => onUpdateQty(item.variantKey, item.quantity - 1)}>−</button>
            <span>{item.quantity}</span>
            <button onClick={() => onUpdateQty(item.variantKey, item.quantity + 1)}>+</button>
          </div>
          <button className={styles.removeBtn} onClick={() => onRemove(item.variantKey)}>Remove</button>
        </div>
      </div>
    </div>
  );
}

/* ── Form Field ── */
function FormField({ label, name, value, onChange, placeholder, type = 'text' }) {
  return (
    <div className={styles.formGroup}>
      <label className={styles.label}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.input}
      />
    </div>
  );
}
