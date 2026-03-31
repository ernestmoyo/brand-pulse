import { motion } from 'framer-motion';

interface Product {
  readonly name: string;
  readonly category: string;
  readonly format: string;
  readonly imageUrl: string | null;
  readonly brandColor: string;
  readonly placeholderIcon: string;
}

const PRODUCTS: readonly Product[] = [
  {
    name: 'Nescafe Classic',
    category: 'Coffee',
    format: 'Instant granules, 200g jar',
    imageUrl: 'https://www.nescafe.com/za/sites/default/files/2023-10/PLP-CategoryHeaders-NescafeClassic-336x150.jpg',
    brandColor: '#C8102E',
    placeholderIcon: '',
  },
  {
    name: 'Nescafe GOLD',
    category: 'Coffee',
    format: 'Premium instant, Retail jar',
    imageUrl: 'https://www.nescafe.com/za/sites/default/files/2024-05/PLP-Category-Gold_336x150.jpg',
    brandColor: '#D4A853',
    placeholderIcon: '',
  },
  {
    name: 'Nescafe Ricoffy',
    category: 'Coffee',
    format: 'Chicory blend, 750g tin',
    imageUrl: 'https://www.nescafe.com/za/sites/default/files/2023-10/NESCAFE-Ricoffy%20%281%29.png',
    brandColor: '#FFD700',
    placeholderIcon: '',
  },
  {
    name: 'Nescafe Cappuccino',
    category: 'Coffee',
    format: 'Sachet mix, 10-pack',
    imageUrl: 'https://www.nescafe.com/za/sites/default/files/2024-04/8801055063598_C1N1_1712640794473_0.png',
    brandColor: '#8B4513',
    placeholderIcon: '',
  },
  {
    name: 'Milo',
    category: 'Hot Beverage',
    format: 'Powder, 400g',
    imageUrl: null,
    brandColor: '#2D6A2E',
    placeholderIcon: '\u2615',
  },
  {
    name: 'KitKat',
    category: 'Confectionery',
    format: '4 Finger, 41.5g',
    imageUrl: null,
    brandColor: '#C8102E',
    placeholderIcon: '\uD83C\uDF6B',
  },
] as const;

function ProductCard({ product, index }: { readonly product: Product; readonly index: number }) {
  return (
    <motion.div
      className="rounded-xl border border-[rgba(0,212,255,0.1)] bg-[#141C2C] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
    >
      {product.imageUrl ? (
        <div className="w-full h-32 overflow-hidden bg-[#0E1420] flex items-center justify-center">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      ) : (
        <div
          className="w-full h-32 flex flex-col items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${product.brandColor}44, ${product.brandColor}22)`,
          }}
        >
          <span className="text-4xl mb-1">{product.placeholderIcon}</span>
          <span className="text-lg font-bold text-white/80">{product.name}</span>
        </div>
      )}

      <div className="p-3">
        <h4 className="text-sm font-semibold text-white truncate">{product.name}</h4>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded"
            style={{
              backgroundColor: `${product.brandColor}22`,
              color: product.brandColor,
              border: `1px solid ${product.brandColor}33`,
            }}
          >
            {product.category}
          </span>
        </div>
        <p className="text-[11px] text-pulse-meta mt-1.5 font-mono">{product.format}</p>
      </div>
    </motion.div>
  );
}

export default function ProductShowcase() {
  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
    >
      <h3 className="text-sm uppercase tracking-wider text-pulse-meta font-mono mb-1">
        Product Portfolio
      </h3>
      <p className="text-xs text-pulse-meta mb-4">Products We Track</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {PRODUCTS.map((product, i) => (
          <ProductCard key={product.name} product={product} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
