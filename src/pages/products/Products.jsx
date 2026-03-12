import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../../api';
import {
  ProductsHero,
  ProductsToolbar,
  ProductsGrid,
  ProductsPagination,
} from '../../components/products';

export default function Products() {
  const [data, setData] = useState({ products: [], total: 0, pages: 1 });
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.categories().then(setCategories).catch(console.error);
  }, []);

  useEffect(() => {
    setLoading(true);
    api.products({ page, limit: 12, category: category || undefined, search: search || undefined })
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [page, category, search]);

  const doSearch = (e) => {
    e?.preventDefault();
    setPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Tally Add-ons - Axatech</title>
        <meta name="description" content="Browse Tally add-ons and automation products. Filter by category, search, and request enquiry." />
      </Helmet>

      <ProductsHero />

      <section className="py-20 md:py-24 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
        <div className="max-w-[1200px] mx-auto px-5">
          <ProductsToolbar
            search={search}
            onSearchChange={setSearch}
            onSearchSubmit={doSearch}
            category={category}
            onCategoryChange={(v) => { setCategory(v); setPage(1); }}
            categories={categories}
          />
          <ProductsGrid products={data.products} loading={loading} />
          <ProductsPagination
            page={page}
            pages={data.pages}
            onPageChange={setPage}
          />
        </div>
      </section>
    </>
  );
}
