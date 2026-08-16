import { Link } from 'react-router-dom'
import { posts } from '../content/posts/index.js'
import ScrollReveal from '../components/ScrollReveal.jsx'

function formatDate(dateStr) {
  return new Date(`${dateStr}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function WritingIndex() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date))

  return (
    <main className="writing-page">
      <section className="section">
        <div className="section-inner">
          <ScrollReveal className="section-heading">
            <p className="eyebrow">Writing</p>
            <h1>Technical notes</h1>
            <p className="section-lead">
              Notes on building real-time rendering systems — expanded as demo media becomes available.
            </p>
          </ScrollReveal>

          <div className="writing-list">
            {sorted.map((post) => (
              <ScrollReveal key={post.slug}>
                <article className="card writing-card">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <h2>
                    <Link to={`/writing/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p>{post.excerpt}</p>
                  <Link className="text-link" to={`/writing/${post.slug}`}>
                    Read article →
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
