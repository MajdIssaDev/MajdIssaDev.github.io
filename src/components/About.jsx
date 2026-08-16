import { site } from '../content/site.js'
import ScrollReveal from './ScrollReveal.jsx'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="section-inner about-layout">
        <ScrollReveal className="section-heading">
          <p className="eyebrow">About</p>
          <h2>Visual computing student</h2>
        </ScrollReveal>

        <ScrollReveal>
          <article className="card about-card">
            {site.bio.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </article>
        </ScrollReveal>
      </div>
    </section>
  )
}
