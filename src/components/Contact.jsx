import { site } from '../content/site.js'
import ScrollReveal from './ScrollReveal.jsx'

function ContactLink({ href, label, disabled = false }) {
  if (disabled || !href) {
    return (
      <span className="contact-link contact-link-disabled" aria-disabled="true">
        {label}
        <small>Coming soon</small>
      </span>
    )
  }

  return (
    <a className="contact-link" href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
      {label}
    </a>
  )
}

export default function Contact() {
  return (
    <section className="section section-alt" id="contact">
      <div className="section-inner contact-layout">
        <ScrollReveal className="section-heading">
          <p className="eyebrow">Contact</p>
          <h2>Get in touch</h2>
          <p className="section-lead">
            Open to visual computing research internships and MSc-oriented collaborations.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="contact-grid">
            <ContactLink href={site.github} label={`GitHub @${site.githubHandle}`} />
            <ContactLink href={site.email ? `mailto:${site.email}` : null} label="Email" disabled={!site.email} />
            <ContactLink href={site.linkedin} label="LinkedIn" disabled={!site.linkedin} />
            <ContactLink href={site.resumeUrl} label="Resume (PDF)" disabled={!site.resumeUrl} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
