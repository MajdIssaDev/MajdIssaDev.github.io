import { skillGroups } from '../content/skills.js'
import ScrollReveal from './ScrollReveal.jsx'

export default function SkillGrid() {
  return (
    <section className="section section-alt" id="skills">
      <div className="section-inner">
        <ScrollReveal className="section-heading">
          <p className="eyebrow">Skills</p>
          <h2>Graphics-first toolkit</h2>
          <p className="section-lead">
            Technical focus areas in real-time rendering, with additional experience in mobile and systems software.
          </p>
        </ScrollReveal>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <ScrollReveal key={group.title}>
              <article className="card skill-card">
                <h3>{group.title}</h3>
                <ul>
                  {group.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
