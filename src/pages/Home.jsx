import { Link } from 'react-router-dom'
import { featuredProject, otherProjects } from '../content/projects.js'
import Hero from '../components/Hero.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import SkillGrid from '../components/SkillGrid.jsx'
import About from '../components/About.jsx'
import Contact from '../components/Contact.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'

export default function Home() {
  return (
    <main>
      <Hero />

      <section className="section section-alt" id="projects">
        <div className="section-inner">
          <ScrollReveal className="section-heading">
            <p className="eyebrow">Projects</p>
            <h2>Real-time graphics work</h2>
            <p className="section-lead">
              Interactive systems spanning low-level GPU pipelines and 3D gameplay prototypes.
            </p>
          </ScrollReveal>

          {featuredProject && <ProjectCard project={featuredProject} featured />}

          <div className="projects-stack">
            {otherProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <ScrollReveal className="writing-teaser">
            <p>
              Technical write-ups on ray marching and NPR stylization are on the{' '}
              <Link to="/writing">Writing</Link> page.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <SkillGrid />
      <About />
      <Contact />
    </main>
  )
}
