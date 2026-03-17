import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Button, SectionHeader } from '../common';
import { ArrowRightIcon, ProjectsIcon } from '../icons';

export default function ProjectsSection({ projects = [], loading }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(
    () => [
      'All',
      ...Array.from(
        new Set(
          projects
            .map((p) => p.category)
            .filter((c) => c && typeof c === 'string')
        )
      ),
    ],
    [projects]
  );

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section className="py-20 md:py-24 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-5">
        <SectionHeader
          label="Projects"
          title="Our Featured Projects"
          subtitle="Discover our portfolio of innovative solutions across various industries."
          centered={false}
          subtitleClassName="mb-6"
          dataAos="fade-up"
        />

        {/* Category pills */}
        {!loading && projects.length > 0 && (
          <div
            className="mb-10 flex flex-wrap gap-2 justify-center"
            data-aos="fade-up"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-white shadow-sm shadow-primary/25 dark:bg-secondary'
                      : 'bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-200 border border-slate-200 dark:border-gray-700 hover:border-primary/40 dark:hover:border-secondary/40 hover:bg-slate-50 dark:hover:bg-gray-700/50'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16">
            <span className="inline-block h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-primary dark:border-gray-600 dark:border-t-secondary" />
          </div>
        ) : !filtered.length ? (
          <p className="py-16 text-center text-gray-500 dark:text-gray-400">
            No projects to show yet.
          </p>
        ) : (
          <>
            <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {filtered.map((p, i) => (
                <Link
                  to={`/projects/${p.slug}`}
                  key={p._id}
                  className="group block bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-sm dark:shadow-none transition-all duration-300 hover:border-primary/30 dark:hover:border-secondary/40 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-none hover:-translate-y-1 text-inherit no-underline"
                  data-aos="fade-up"
                  style={{ animationDelay: `${0.4 + i * 0.08}s` }}
                >
                  {p.image ? (
                    <div className="aspect-4/3 overflow-hidden bg-gray-100 dark:bg-gray-700">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="aspect-4/3 bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                      <ProjectsIcon className="text-4xl text-gray-400 dark:text-gray-500" />
                    </div>
                  )}
                  <div className="p-5 sm:p-6">
                    {p.category && (
                      <span className="text-xs font-semibold uppercase tracking-wide text-primary dark:text-secondary mb-1.5 block">
                        {p.category}
                      </span>
                    )}
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary dark:group-hover:text-secondary transition-colors duration-200">
                      {p.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">
                      {p.description?.slice(0, 100)}
                      {p.description?.length > 100 ? '…' : ''}
                    </p>
                    <span className="inline-flex items-center gap-1 font-semibold text-secondary dark:text-accent text-sm">
                      Learn more
                      <ArrowRightIcon className="text-base transition-transform duration-200 group-hover:translate-x-0.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* <div className="mt-10 text-center" data-aos="fade-up">
              <Button
                to="/projects"
                variant="secondary"
                fullWidth={false}
                className="inline-flex items-center justify-center gap-2"
              >
                <ProjectsIcon className="text-[20px] shrink-0" />
                All Projects
              </Button>
            </div> */}
          </>
        )}
      </div>
    </section>
  );
}
