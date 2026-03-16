import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import api from '../../api';
import { ProjectsSection } from '../../components/projects';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.projects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Projects - Axatech</title>
        <meta
          name="description"
          content="Explore our portfolio projects and case studies."
        />
      </Helmet>

      <ProjectsSection projects={projects} loading={loading} />
    </>
  );
}
