<template>
  <div class="portfolio">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-name">
            <span class="name-line">Tyler</span>
            <span class="name-line">Louwerse</span>
          </h1>
          <p class="hero-title">Full Stack Developer</p>
          <p class="hero-description">{{ summary }}</p>
        </div>
        <div class="hero-contact">
          <a :href="`mailto:${contact.email}`" class="contact-link email">
            <span class="contact-icon">✉</span>
            {{ contact.email }}
          </a>
          <a :href="`tel:${contact.phone}`" class="contact-link phone">
            <span class="contact-icon">📞</span>
            {{ contact.phone }}
          </a>
          <div class="contact-link location">
            <span class="contact-icon">📍</span>
            {{ contact.location }}
          </div>
        </div>
      </div>
    </section>

    <!-- Tech Stack -->
    <section class="tech-section fade-in">
      <div class="tech-badges">
        <span v-for="(tech, index) in techStack" :key="index" class="tech-badge">
          {{ tech }}
        </span>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <p>© {{ new Date().getFullYear() }} Tyler Louwerse. Built with Vue.js & TypeScript.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

// Portfolio data
const contact = {
  location: 'Victoria BC, Canada',
  phone: '905-971-8107',
  email: 'tylouwerse@gmail.com',
}

const summary = `I am a full stack developer with a strong background in web application development and a focus on delivering practical, scalable solutions.

The majority of my experience is in Vue and Laravel where I've worked developing apps, integrating third-party APIs, and leading projects from ideation to execution.`

const techStack = ['Vue.js', 'Laravel', 'TypeScript', 'JavaScript', 'PHP', 'SQL', 'Git']

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
}

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  }, observerOptions)

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el))
})
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.portfolio {
  min-height: 100vh;
  background: #ffffff;
  color: #1a1a1a;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  line-height: 1.6;
  position: relative;
  overflow-x: hidden;
}

/* Hero Section */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem 1.5rem;
  background: #ffffff;
}

.hero-content {
  max-width: 900px;
  width: 100%;
  z-index: 1;
  position: relative;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-text {
  text-align: center;
  margin-bottom: 3rem;
}

.hero-name {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  margin: 0 0 1rem 0;
  line-height: 1.1;
  color: #000000;
  letter-spacing: -0.03em;
}

.name-line {
  display: block;
}

.hero-title {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: #666666;
  margin: 0 0 2rem 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.hero-description {
  font-size: clamp(1rem, 2vw, 1.15rem);
  color: #4a4a4a;
  line-height: 1.8;
  max-width: 700px;
  margin: 0 auto;
  white-space: pre-line;
}

.hero-contact {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 3rem;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 0;
  color: #000000;
  text-decoration: none;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 500;
}

.contact-link:hover {
  background: #000000;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 4px 4px 0px 0px #000000;
}

.contact-icon {
  font-size: 1.1rem;
}

/* Tech Stack */
.tech-section {
  padding: 4rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  background: #f8f8f8;
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.tech-badge {
  padding: 0.5rem 1.25rem;
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 0;
  font-size: 0.9rem;
  font-weight: 500;
  color: #000000;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tech-badge:hover {
  background: #000000;
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 4px 4px 0px 0px #000000;
}

/* Sections */
.section {
  padding: 5rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.section.visible {
  opacity: 1;
  transform: translateY(0);
}

.section-title {
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  margin: 0 0 3rem 0;
  display: flex;
  align-items: baseline;
  gap: 1rem;
  color: #000000;
}

.title-number {
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  color: #000000;
  font-weight: 800;
  opacity: 0.2;
  font-family: 'Courier New', monospace;
}

.title-text {
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: clamp(1.5rem, 4vw, 2rem);
}

/* Experience & Projects Grid */
.experience-grid,
.projects-grid,
.education-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.experience-card,
.project-card,
.education-card {
  background: #ffffff;
  border: 2px solid #000000;
  border-radius: 0;
  padding: 2.5rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  transform: translateY(20px);
  animation: slideInUp 0.6s ease-out forwards;
  animation-delay: var(--delay, 0s);
  position: relative;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.experience-card:hover,
.project-card:hover,
.education-card:hover {
  transform: translateY(-4px);
  box-shadow: 8px 8px 0px 0px #000000;
}

.card-header,
.project-header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
}

.job-title,
.project-name,
.education-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
  color: #000000;
}

.job-company,
.project-subtitle {
  font-size: 1.1rem;
  color: #666666;
  margin: 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.9rem;
}

.job-period,
.project-period,
.education-period {
  font-size: 0.85rem;
  color: #999999;
  margin-top: 0.5rem;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.tech-tag {
  padding: 0.35rem 0.85rem;
  background: #f8f8f8;
  border: 1px solid #000000;
  border-radius: 0;
  font-size: 0.75rem;
  color: #000000;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.responsibilities {
  margin: 0;
  padding-left: 0;
  list-style: none;
  color: #4a4a4a;
}

.responsibilities li {
  margin-bottom: 0.75rem;
  line-height: 1.7;
  position: relative;
  padding-left: 1.5rem;
}

.responsibilities li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: #000000;
  font-weight: bold;
}

.responsibilities li:last-child {
  margin-bottom: 0;
}

.project-description {
  margin: 0;
  color: #4a4a4a;
  line-height: 1.8;
  font-size: 1.05rem;
}

.education-institution {
  font-size: 1.1rem;
  color: #666666;
  margin: 0.5rem 0;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: 0.9rem;
}

.education-details {
  margin-top: 1rem;
  color: #666666;
  font-size: 0.95rem;
  line-height: 1.7;
}

/* Footer */
.footer {
  text-align: center;
  padding: 3rem 1.5rem;
  color: #999999;
  font-size: 0.9rem;
  border-top: 2px solid #000000;
  margin-top: 4rem;
  background: #f8f8f8;
}

/* Fade In Animation */
.fade-in {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.6s ease-out;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

/* Responsive */
@media (min-width: 768px) {
  .hero {
    padding: 4rem 2rem;
  }

  .section {
    padding: 6rem 2rem;
  }

  .card-header,
  .project-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }

  .experience-grid,
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .education-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .hero {
    padding: 6rem 3rem;
  }

  .section {
    padding: 8rem 3rem;
  }

  .experience-grid,
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
