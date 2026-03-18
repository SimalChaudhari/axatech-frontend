import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../api';
import { ReactLayout } from '../../components/technologies/infoPages/frontend/react';
import { VueLayout } from '../../components/technologies/infoPages/frontend/vue';
import { HtmlLayout } from '../../components/technologies/infoPages/frontend/html';
import { AngularLayout } from '../../components/technologies/infoPages/frontend/angular';
import { FirebaseLayout } from '../../components/technologies/infoPages/database/firebase';
import { MongoDBLayout } from '../../components/technologies/infoPages/database/mongoDb';
import { MySQLLayout } from '../../components/technologies/infoPages/database/mySQL';
import { PostgreSQLLayout } from '../../components/technologies/infoPages/database/postGresQl';
import { ExpressJsLayout } from '../../components/technologies/infoPages/backend/ExpressJs';
import { GraphQLLayout } from '../../components/technologies/infoPages/backend/GraphQL';
import { NestJsLayout } from '../../components/technologies/infoPages/backend/NestJs';
import { NodeJsLayout } from '../../components/technologies/infoPages/backend/NodeJs';

const CUSTOM_LAYOUT_SLUGS = [
  'react',
  'vue',
  'vue-js',
  'html5',
  'html',
  'angular',
  'firebase',
  'mongodb',
  'mongo',
  'mysql',
  'postgresql',
  'postgres',
  'express',
  'expressjs',
  'graphql',
  'nestjs',
  'nest',
  'nodejs',
  'node-js',
  'node',
];

export default function TechnologyDetail() {
  const { slug } = useParams();
  const [technology, setTechnology] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    if (CUSTOM_LAYOUT_SLUGS.includes(slug)) {
      setLoading(false);
      return;
    }
    api.technology(slug).then(setTechnology).catch(() => setTechnology(null)).finally(() => setLoading(false));
  }, [slug]);

  if (slug === 'react') {
    return (
      <>
        <Helmet>
          <title>React | Technologies | Axatech</title>
          <meta name="description" content="React JS development services – scalable frontend solutions, React Native, state management, and performance optimization." />
        </Helmet>
        <ReactLayout />
      </>
    );
  }

  if (slug === 'vue' || slug === 'vue-js' || slug === 'vuejs') {
    return (
      <>
        <Helmet>
          <title>Vue.js | Technologies | Axatech</title>
          <meta name="description" content="Vue.js development services – modern frontend solutions, Vuex, Pinia, state management, and performance optimization." />
        </Helmet>
        <VueLayout />
      </>
    );
  }

  if (slug === 'html5' || slug === 'html') {
    return (
      <>
        <Helmet>
          <title>HTML5 | Technologies | Axatech</title>
          <meta name="description" content="HTML5 web development services – semantic markup, responsive design, SEO-friendly code, and modern web standards." />
        </Helmet>
        <HtmlLayout />
      </>
    );
  }

  if (slug === 'angular') {
    return (
      <>
        <Helmet>
          <title>Angular | Technologies | Axatech</title>
          <meta name="description" content="Angular development services – enterprise frontend solutions, TypeScript, PWAs, and performance optimization." />
        </Helmet>
        <AngularLayout />
      </>
    );
  }

  if (slug === 'firebase') {
    return (
      <>
        <Helmet>
          <title>Firebase | Technologies | Axatech</title>
          <meta name="description" content="Firebase development services – real-time database, authentication, Firestore, Cloud Functions, and serverless backend solutions." />
        </Helmet>
        <FirebaseLayout />
      </>
    );
  }

  if (slug === 'mongodb' || slug === 'mongo') {
    return (
      <>
        <Helmet>
          <title>MongoDB | Technologies | Axatech</title>
          <meta name="description" content="MongoDB development services – document database, query optimization, replication, sharding, and high-performance NoSQL solutions." />
        </Helmet>
        <MongoDBLayout />
      </>
    );
  }

  if (slug === 'mysql') {
    return (
      <>
        <Helmet>
          <title>MySQL | Technologies | Axatech</title>
          <meta name="description" content="MySQL development services – relational database design, optimization, replication, migration, and high-availability solutions." />
        </Helmet>
        <MySQLLayout />
      </>
    );
  }

  if (slug === 'postgresql' || slug === 'postgres') {
    return (
      <>
        <Helmet>
          <title>PostgreSQL | Technologies | Axatech</title>
          <meta name="description" content="PostgreSQL development services – relational database design, optimization, replication, migration, and high-performance solutions." />
        </Helmet>
        <PostgreSQLLayout />
      </>
    );
  }

  if (slug === 'express' || slug === 'expressjs') {
    return (
      <>
        <Helmet>
          <title>Express.js | Technologies | Axatech</title>
          <meta name="description" content="Express.js development services – Node.js backend, REST & GraphQL APIs, real-time apps, authentication, and microservices." />
        </Helmet>
        <ExpressJsLayout />
      </>
    );
  }

  if (slug === 'graphql') {
    return (
      <>
        <Helmet>
          <title>GraphQL | Technologies | Axatech</title>
          <meta name="description" content="GraphQL development services – API development, schema design, subscriptions, and efficient data query solutions." />
        </Helmet>
        <GraphQLLayout />
      </>
    );
  }

  if (slug === 'nestjs' || slug === 'nest') {
    return (
      <>
        <Helmet>
          <title>NestJS | Technologies | Axatech</title>
          <meta name="description" content="NestJS development services – TypeScript backend, REST & GraphQL APIs, microservices, and enterprise applications." />
        </Helmet>
        <NestJsLayout />
      </>
    );
  }

  if (slug === 'nodejs' || slug === 'node-js' || slug === 'node') {
    return (
      <>
        <Helmet>
          <title>Node.js | Technologies | Axatech</title>
          <meta name="description" content="Node.js development services – scalable backend systems, REST & GraphQL APIs, real-time apps, microservices, and cloud deployment." />
        </Helmet>
        <NodeJsLayout />
      </>
    );
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-20 text-center text-gray-600 dark:text-gray-400">
        Loading...
      </div>
    );
  }
  if (!technology) {
    return (
      <div className="max-w-4xl mx-auto px-5 py-20 text-center">
        <p className="text-gray-600 dark:text-gray-400 mb-6">Technology not found.</p>
        <Link to="/technologies" className="text-primary dark:text-secondary font-medium hover:underline">
          Back to Technologies
        </Link>
      </div>
    );
  }

  const { title, description, category, image } = technology;

  return (
    <>
      <Helmet>
        <title>{title} | Technologies | Axatech</title>
        <meta name="description" content={description?.slice(0, 160)} />
      </Helmet>

      <section className="py-16 md:py-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-5">
          <Link
            to="/technologies"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary dark:text-secondary hover:underline mb-8"
          >
            <span className="icon-[mdi--arrow-left] text-lg" aria-hidden />
            Back to Technologies
          </Link>
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            {image && (
              <div className="w-full sm:w-48 shrink-0 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-4">
                <img src={image} alt="" className="max-h-40 w-full object-contain" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              {category && (
                <span className="text-xs font-semibold uppercase tracking-wider text-primary dark:text-secondary">
                  {category}
                </span>
              )}
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1 mb-4">
                {title}
              </h1>
              <div className="prose prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 leading-relaxed">
                {description?.split('\n').map((p, i) => (
                  <p key={i} className="mb-4 last:mb-0">
                    {p}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
