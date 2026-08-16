import { Link, useParams } from 'react-router-dom'
import { getPostBySlug } from '../content/posts/index.js'
import ScrollReveal from '../components/ScrollReveal.jsx'

function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function WritingPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)

  if (!post) {
    return (
      <main className="section">
        <div className="section-inner">
          <h1>Post not found</h1>
          <Link to="/writing">Back to Writing</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="writing-page">
      <article className="section">
        <div className="section-inner post-layout">
          <ScrollReveal>
            <Link className="text-link back-link" to="/writing">
              ← Back to Writing
            </Link>
            <header className="post-header">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <h1>{post.title}</h1>
              <p className="post-excerpt">{post.excerpt}</p>
            </header>
          </ScrollReveal>

          <div className="post-body">
            {post.sections.map((section) => (
              <ScrollReveal key={section.heading} className="post-section">
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.code && (
                  <pre className="code-block">
                    <code>{section.code}</code>
                  </pre>
                )}
                {section.note && <p className="post-note">{section.note}</p>}
                {section.link && (
                  <p>
                    <a href={section.link.href} target="_blank" rel="noreferrer">
                      {section.link.label}
                    </a>
                  </p>
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
