import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../api';
import { ServiceDetailContent } from '../../components/services';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    api.service(slug).then(setService).catch(() => setService(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-16 text-center text-gray-600 dark:text-gray-400">
        Loading...
      </div>
    );
  }
  if (!service) {
    return (
      <div className="container py-16 text-center text-gray-600 dark:text-gray-400">
        Service not found.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{service.title} - Axatech</title>
        <meta name="description" content={service.shortDescription || service.description} />
      </Helmet>

      <ServiceDetailContent service={service} />
    </>
  );
}
