import { Button } from '../common';

export default function ProductDetailMedia({ product }) {
  return (
    <div className="animate-fadeInUp" style={{ animationDelay: '0.1s' }}>
      {product.image && (
        <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
      {product.demoVideoLink && (
        <div className="mt-5">
          <Button
            as="a"
            href={product.demoVideoLink}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="rounded-xl border-2 border-primary text-primary dark:border-secondary dark:text-secondary hover:bg-primary/10 dark:hover:bg-secondary/10 hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 px-6 py-3.5"
          >
            Watch Demo Video
          </Button>
        </div>
      )}
    </div>
  );
}
