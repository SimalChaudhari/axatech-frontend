import { Button } from '../common';

export default function ProductCard({ product, index = 0 }) {
  const descriptionSnippet = product.shortDescription ||
    (product.description?.slice(0, 100) + (product.description?.length > 100 ? '…' : ''));

  return (
    <div
      className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden flex flex-col shadow-sm dark:shadow-none transition-all duration-300 hover:border-primary/30 dark:hover:border-secondary/40 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-none hover:-translate-y-1 animate-fadeInUpSlow"
      style={{ animationDelay: `${0.3 + index * 0.06}s` }}
    >
      {product.image && (
        <div className="h-48 bg-gray-100 dark:bg-gray-700 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6 sm:p-7 flex-1 flex flex-col">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h3>
        <p className="flex-1 text-sm text-gray-500 dark:text-gray-400 mb-5 line-clamp-3 leading-relaxed">
          {descriptionSnippet}
        </p>
        <div className="flex gap-3">
          <Button
            to={`/products/${product.slug}`}
            variant="outline"
            fullWidth={false}
            className="flex-1 text-center rounded-xl border-2 border-gray-200 dark:border-gray-600 hover:border-primary/30 dark:hover:border-secondary/40 hover:-translate-y-0.5 transition-all duration-200"
          >
            Details
          </Button>
          <Button
            to="/contact"
            state={{ enquiryType: 'product', product: product._id, productName: product.name }}
            variant="primary"
            fullWidth={false}
            className="flex-1 text-center rounded-xl hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
}
