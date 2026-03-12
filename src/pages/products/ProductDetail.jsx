import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../api';
import { ProductDetailMedia, ProductDetailInfo } from '../../components/products';

export default function ProductDetail() {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.product(slug).then(setProduct).catch(() => setProduct(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-[1200px] mx-auto px-5 py-16 text-center text-gray-600 dark:text-gray-400">
        Loading...
      </div>
    );
  }
  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-5 py-16 text-center text-gray-600 dark:text-gray-400">
        Product not found.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - Axatech Add-ons</title>
        <meta name="description" content={product.shortDescription || product.description} />
      </Helmet>

      <section className="py-20 md:py-24 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
            <ProductDetailMedia product={product} />
            <ProductDetailInfo product={product} />
          </div>
        </div>
      </section>
    </>
  );
}
