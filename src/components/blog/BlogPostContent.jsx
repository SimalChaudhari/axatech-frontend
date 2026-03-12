export default function BlogPostContent({ post }) {
  return (
    <article className="py-20 md:py-24 bg-white dark:bg-gray-900 border-y border-gray-100 dark:border-gray-800">
      <div className="max-w-3xl mx-auto px-5">
        <p className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-secondary dark:text-accent mb-4 animate-[home-fadeInUp_0.5s_ease-out_0.2s_both]">
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
          Blog
          <span className="w-8 h-px bg-secondary/60 dark:bg-accent/60" aria-hidden />
        </p>
        {post.image && (
          <div className="mb-6 rounded-2xl overflow-hidden animate-[home-fadeInUp_0.5s_ease-out_0.28s_both]">
            <img src={post.image} alt="" className="w-full max-h-[400px] object-cover" />
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight mb-2 animate-[home-fadeInUp_0.5s_ease-out_0.35s_both]">
          {post.title}
        </h1>
        {(post.author || post.publishedAt) && (
          <p className="text-text-muted dark:text-gray-400 text-sm mb-6 animate-[home-fadeInUp_0.5s_ease-out_0.4s_both]">
            {post.author && <span>{post.author}</span>}
            {post.publishedAt && <time className="ml-4">{new Date(post.publishedAt).toLocaleDateString()}</time>}
          </p>
        )}
        <div
          className="leading-relaxed text-text-muted dark:text-gray-400 [&_a]:text-primary dark:[&_a]:text-secondary [&_a]:underline [&_p]:mb-4 last:[&_p]:mb-0 animate-[home-fadeInUp_0.5s_ease-out_0.45s_both]"
          dangerouslySetInnerHTML={{ __html: post.content?.replace(/\n/g, '<br/>') }}
        />
      </div>
    </article>
  );
}
