/* ============================================================
   FINE FIT PRODUCT DATA
   ============================================================
   HOW TO ADD/EDIT PRODUCTS:
   - Each product object follows the schema below
   - Images go in /public/images/{category}/{filename}
   - Use placeholder: "/images/placeholder.jpg" until real photos arrive
   - Colours must be from COLOUR_OPTIONS keys below
   - Sizes must be from SIZE_OPTIONS keys below
   ============================================================ */

// --- Available colour options across all products ---
export const COLOUR_OPTIONS = {
  black:       { label: 'Black',       hex: '#1A1A1A' },
  navy:        { label: 'Navy',        hex: '#0A1F3D' },
  grey:        { label: 'Grey',        hex: '#6B7280' },
  cedarGreen:  { label: 'Cedar Green', hex: '#2D4A2D' },
  chocBrown:   { label: 'Choc Brown',  hex: '#4A2C0A' },
  khaki:       { label: 'Khaki',       hex: '#8B7355' },
  greenCamo:   { label: 'Green Camo',  hex: '#4A5C2A' },
  greyCamo:    { label: 'Grey Camo',   hex: '#6B7A6B' },
};

// --- Available size options ---
export const SIZE_OPTIONS = ['S', 'M', 'L', 'XL', '2XL', '3XL'];

// --- Product categories ---
export const CATEGORIES = {
  security: {
    id: 'security',
    label: 'Security',
    subcategories: {
      combat:      'Combat Uniform',
      stepout:     'Step-Out Uniform',
      accessories: 'Security Accessories',
      footwear:    'Security Footwear',
    }
  },
  ppe: {
    id: 'ppe',
    label: 'PPE',
    subcategories: {
      workwear:    'Core Workwear',
      ppeAcc:      'PPE Accessories',
    }
  }
};

/* ============================================================
   PRODUCTS ARRAY
   ============================================================ */
export const PRODUCTS = [

  // ── SECURITY / COMBAT UNIFORM ──────────────────────────────

  {
    id: 'SEC-COM-001',
    category: 'security',
    subcategory: 'combat',
    name: 'Combat Security Shirt – Long Sleeve',
    description:
      'Durable long-sleeve combat shirt designed for professional security personnel. Features epaulette loops for rank slides, pen pockets, and a concealed chest pocket. Made from a poly-cotton blend for comfort during extended wear.',
    features: ['Epaulette loops', 'Chest pen pocket', 'Concealed pocket', 'Poly-cotton blend'],
    colours: ['black', 'navy', 'cedarGreen'],
    sizes: SIZE_OPTIONS,
    // Lifestyle image (item being worn) - replace with real photo
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    // Product thumbnail
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  {
    id: 'SEC-COM-002',
    category: 'security',
    subcategory: 'combat',
    name: 'Combat Security Trouser',
    description:
      'Heavy-duty combat trousers with multiple utility pockets. Reinforced knees and seat. Suitable for active security duties. Available with or without knee pad inserts.',
    features: ['Multiple utility pockets', 'Reinforced knees', 'Knee pad inserts optional', 'Elasticated waistband'],
    colours: ['black', 'navy', 'cedarGreen', 'khaki'],
    sizes: SIZE_OPTIONS,
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  {
    id: 'SEC-COM-003',
    category: 'security',
    subcategory: 'combat',
    name: 'Combat Jacket',
    description:
      'Professional combat jacket with multiple pockets and epaulette loops. Water-resistant outer shell. Suitable for outdoor security operations in all weather conditions.',
    features: ['Water-resistant shell', 'Multiple pockets', 'Zip-out lining', 'Epaulette loops'],
    colours: ['black', 'navy'],
    sizes: SIZE_OPTIONS,
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  {
    id: 'SEC-COM-004',
    category: 'security',
    subcategory: 'combat',
    name: 'BDU Cargo Trouser',
    description:
      'Battle Dress Uniform style cargo trouser. Large cargo pockets with button flaps. Drawstring ankle cuffs. Popular with armed response and tactical security teams.',
    features: ['BDU style cargo pockets', 'Drawstring ankle cuffs', 'Button-flap pockets', 'Heavy-duty fabric'],
    colours: ['black', 'greenCamo', 'greyCamo'],
    sizes: SIZE_OPTIONS,
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  // ── SECURITY / STEP-OUT UNIFORM ────────────────────────────

  {
    id: 'SEC-STP-001',
    category: 'security',
    subcategory: 'stepout',
    name: 'Step-Out Security Shirt – Long Sleeve',
    description:
      'Smart, formal security shirt for front-of-house and corporate security roles. Classic cut with epaulette loops and a chest pocket. Available in multiple colours to match company branding.',
    features: ['Epaulette loops', 'Chest pocket', 'Classic corporate cut', 'Poly-cotton blend'],
    colours: ['black', 'navy', 'grey', 'cedarGreen'],
    sizes: SIZE_OPTIONS,
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  {
    id: 'SEC-STP-002',
    category: 'security',
    subcategory: 'stepout',
    name: 'Step-Out Security Shirt – Short Sleeve',
    description:
      'Smart short-sleeve option for warm-weather deployment. Same professional finish as the long-sleeve variant. Ideal for indoor security, reception, and events.',
    features: ['Epaulette loops', 'Chest pocket', 'Smart tailored fit', 'Breathable fabric'],
    colours: ['black', 'navy', 'grey'],
    sizes: SIZE_OPTIONS,
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  {
    id: 'SEC-STP-003',
    category: 'security',
    subcategory: 'stepout',
    name: 'Security Trouser – Formal',
    description:
      'Formal security trouser designed to pair with the Step-Out shirt range. Clean lines, reinforced seat, and a comfortable fit for long shifts.',
    features: ['Formal clean cut', 'Reinforced seat', 'Elasticated waistband option', 'Poly-viscose blend'],
    colours: ['black', 'navy'],
    sizes: SIZE_OPTIONS,
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  {
    id: 'SEC-STP-004',
    category: 'security',
    subcategory: 'stepout',
    name: 'Security Clip-On Tie',
    description:
      'Professional clip-on security tie. Quick-release safety design for field safety. Matches navy and black shirt ranges.',
    features: ['Quick-release clip', 'Safety design', 'Woven polyester', 'Matches shirt range'],
    colours: ['black', 'navy'],
    sizes: [],  // One size - no size variant
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  // ── SECURITY / ACCESSORIES ─────────────────────────────────

  {
    id: 'SEC-ACC-001',
    category: 'security',
    subcategory: 'accessories',
    name: '"Security" Swat Cap',
    description:
      'Six-panel swat-style cap embroidered with "SECURITY" across the front. Adjustable strap for universal fit. Available with custom logo embroidery.',
    features: ['Pre-embroidered "SECURITY"', 'Custom logo option', 'Adjustable strap', 'Six-panel construction'],
    colours: ['black', 'navy'],
    sizes: [],  // One size
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  {
    id: 'SEC-ACC-002',
    category: 'security',
    subcategory: 'accessories',
    name: 'Rank Slides – Security',
    description:
      'Shoulder rank slides for security uniforms. Available in various ranks. Sewn or slip-on style.',
    features: ['Multiple rank options', 'Sewn or slip-on', 'Embroidered detail', 'Custom rank available'],
    colours: ['black', 'navy'],
    sizes: [],
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  {
    id: 'SEC-ACC-003',
    category: 'security',
    subcategory: 'accessories',
    name: 'Security Belt & Buckle',
    description:
      'Duty belt with heavy-duty metal buckle. Suitable for carrying radio holsters, baton rings, and cuff holders. Available in black and navy.',
    features: ['Heavy-duty metal buckle', 'Fits standard duty accessories', 'Reinforced stitching', '38mm width'],
    colours: ['black', 'navy'],
    sizes: [],
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  // ── SECURITY / FOOTWEAR ────────────────────────────────────

  {
    id: 'SEC-FTW-001',
    category: 'security',
    subcategory: 'footwear',
    name: 'Combat Boot – Low Cut',
    description:
      'Low-cut tactical combat boot for security personnel. Slip-resistant rubber sole. Genuine leather upper with quick-lace system.',
    features: ['Genuine leather upper', 'Slip-resistant sole', 'Quick-lace system', 'Steel toe cap option'],
    colours: ['black'],
    sizes: ['5','6','7','8','9','10','11','12'],
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  {
    id: 'SEC-FTW-002',
    category: 'security',
    subcategory: 'footwear',
    name: 'Combat Boot – High Cut',
    description:
      'High-cut tactical boot providing ankle support for active security work. Reinforced toe cap. Durable rubber sole with deep tread pattern.',
    features: ['Ankle support', 'Reinforced toe cap', 'Deep tread sole', 'Breathable lining'],
    colours: ['black'],
    sizes: ['5','6','7','8','9','10','11','12'],
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  // ── PPE / CORE WORKWEAR ────────────────────────────────────

  {
    id: 'PPE-WRK-001',
    category: 'ppe',
    subcategory: 'workwear',
    name: 'Workwear Overall – Classic Fit',
    description:
      'Full-length workwear overall for industrial and technical environments. Heavy-duty poly-cotton fabric. Multiple pockets including chest, side, and back. Zip front.',
    features: ['Heavy poly-cotton', 'Zip front', 'Multiple pockets', 'Reinforced stress points'],
    colours: ['navy', 'khaki', 'cedarGreen', 'grey'],
    sizes: SIZE_OPTIONS,
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  {
    id: 'PPE-WRK-002',
    category: 'ppe',
    subcategory: 'workwear',
    name: 'Hi-Visibility Vest',
    description:
      'SANS-compliant high-visibility safety vest with reflective tape strips. Class 2 rated. Essential for road workers, construction, and logistics personnel.',
    features: ['SANS compliant', 'Class 2 rated', 'Reflective tape', 'Lightweight mesh'],
    colours: [],  // Standard hi-vis yellow/orange only
    sizes: SIZE_OPTIONS,
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
    note: 'Available in Hi-Vis Yellow and Hi-Vis Orange only'
  },

  {
    id: 'PPE-WRK-003',
    category: 'ppe',
    subcategory: 'workwear',
    name: 'Reflective Bomber Jacket',
    description:
      'Fleece-lined hi-visibility bomber jacket for cold-weather site work. Reflective tape on chest and back. Wind-resistant outer shell. Ideal for night-shift workers.',
    features: ['Fleece-lined', 'Wind-resistant', 'Reflective tape strips', 'Zip pockets'],
    colours: [],
    sizes: SIZE_OPTIONS,
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
    note: 'Available in Hi-Vis Orange only'
  },

  // ── PPE / ACCESSORIES ──────────────────────────────────────

  {
    id: 'PPE-ACC-001',
    category: 'ppe',
    subcategory: 'ppeAcc',
    name: 'Safety Hard Hat',
    description:
      'Impact-resistant ABS hard hat meeting SANS 1397 standards. Adjustable suspension system for secure fit. Ideal for construction, mining, and industrial environments.',
    features: ['SANS 1397 compliant', 'Adjustable suspension', 'Ventilated design', 'Accessory slots'],
    colours: [],
    sizes: [],
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
    note: 'Available in Yellow, White, Red, Blue, Orange'
  },

  {
    id: 'PPE-ACC-002',
    category: 'ppe',
    subcategory: 'ppeAcc',
    name: 'Safety Glasses',
    description:
      'Polycarbonate lens safety glasses with UV protection and anti-scratch coating. Wrap-around frame for full eye protection. Meets EN166 standard.',
    features: ['UV protection', 'Anti-scratch coating', 'Wrap-around frame', 'EN166 compliant'],
    colours: [],
    sizes: [],
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
    note: 'Available in Clear and Smoke lens'
  },

  {
    id: 'PPE-ACC-003',
    category: 'ppe',
    subcategory: 'ppeAcc',
    name: 'Work Gloves – Leather Palm',
    description:
      'Heavy-duty work gloves with genuine leather palm reinforcement. Flexible back for freedom of movement. Suitable for construction, engineering, and handling.',
    features: ['Leather palm', 'Flexible back', 'Hook & loop cuff', 'Reinforced fingertips'],
    colours: [],
    sizes: ['S', 'M', 'L', 'XL'],
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },

  {
    id: 'PPE-ACC-004',
    category: 'ppe',
    subcategory: 'ppeAcc',
    name: 'Steel Toe Safety Boot',
    description:
      'ISO 20345 S3-rated safety boot with steel toe cap and midsole. Slip-resistant sole. Water-resistant upper. Suitable for construction, warehousing, and heavy industry.',
    features: ['ISO 20345 S3 rated', 'Steel toe cap', 'Steel midsole', 'Slip-resistant sole'],
    colours: ['black'],
    sizes: ['5','6','7','8','9','10','11','12'],
    lifestyleImage: '/images/placeholder-lifestyle.jpg',
    thumbImage: '/images/placeholder-thumb.jpg',
    priceOnRequest: true,
  },
];

/* ============================================================
   HELPER FUNCTIONS
   ============================================================ */

// Get all products for a given category id ('security' | 'ppe')
export const getByCategory = (categoryId) =>
  PRODUCTS.filter(p => p.category === categoryId);

// Get all products for a given subcategory id
export const getBySubcategory = (subcategoryId) =>
  PRODUCTS.filter(p => p.subcategory === subcategoryId);

// Search products by name or description
export const searchProducts = (query) => {
  const q = query.toLowerCase();
  return PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q) ||
    p.subcategory.toLowerCase().includes(q)
  );
};
