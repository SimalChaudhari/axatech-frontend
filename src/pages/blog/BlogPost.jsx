import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import api from '../../api';
import { BlogPostContent } from '../../components/blog';

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.blog(slug).then(setPost).catch(() => setPost(null)).finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-16 text-center text-gray-600 dark:text-gray-400">
        Loading...
      </div>
    );
  }
  if (!post) {
    return (
      <div className="container py-16 text-center text-gray-600 dark:text-gray-400">
        Post not found.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.metaTitle || post.title} - Axatech</title>
        <meta name="description" content={post.metaDescription || post.excerpt || post.content?.slice(0, 160)} />
      </Helmet>

      <BlogPostContent post={post} />
    </>
  );
}
