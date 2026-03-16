import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../api';
import { ProjectDetailSection } from '../../components/projects';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setError('');
    api.project(slug)
      .then(setProject)
      .catch((err) => setError(err.message || 'Failed to load project'))
      .finally(() => setLoading(false));
  }, [slug]);

  const title = project?.title || 'Project';
  const description =
    project?.description ||
    'Detailed information about this project.';

  return (
    <>
      <Helmet>
        <title>{title} - Projects - Axatech</title>
        <meta name="description" content={description.slice(0, 155)} />
      </Helmet>

      <ProjectDetailSection project={project} loading={loading} error={error} />
    </>
  );
}
