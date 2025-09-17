"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("todos")
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const categories = [
    { id: "todos", name: "Todos os Projetos", icon: "🎯" },
    { id: "saude", name: "Saúde", icon: "🏥" },
    { id: "logistica", name: "Logística", icon: "🚚" },
    { id: "industria", name: "Indústria", icon: "🏭" },
    { id: "varejo", name: "Varejo", icon: "🛍️" },
    { id: "financeiro", name: "Financeiro", icon: "🏦" },
    { id: "tecnologia", name: "Tecnologia", icon: "💾" },
  ]

  const featuredProjects = [
    {
      id: 1,
      title: "Modernização Hospitalar",
      category: "saude",
      client: "Hospital Regional de Belém",
      description:
        "Implementação completa de sistema de monitoramento 24/7 para infraestrutura crítica hospitalar, garantindo alta disponibilidade dos serviços médicos.",
      challenge: "Necessidade de monitoramento em tempo real de equipamentos críticos sem interrupção dos serviços.",
      solution: "Sistema de monitoramento integrado com alertas automáticos e dashboards personalizados.",
      technologies: ["Zabbix", "SNMP", "Grafana", "Python", "MySQL"],
      results: [
        "99.9% de uptime dos sistemas críticos",
        "Redução de 95% no tempo de resposta a incidentes",
        "Monitoramento de 500+ dispositivos em tempo real",
        "Economia de 40% nos custos de manutenção",
      ],
      metrics: {
        duration: "6 meses",
        team: "8 especialistas",
        investment: "R$ 250.000",
        roi: "300%",
      },
      image: "🏥",
      color: "#ff4757",
      featured: true,
    },
    {
      id: 2,
      title: "Rede Corporativa Inteligente",
      category: "logistica",
      client: "Grupo Logístico Amazônia",
      description:
        "Implementação de rede corporativa robusta com equipamentos Mikrotik para empresa de logística com 15 filiais distribuídas pela região Norte.",
      challenge: "Conectividade instável entre filiais e baixa performance da rede corporativa.",
      solution: "Rede SD-WAN com balanceamento de carga e redundância em todas as conexões.",
      technologies: ["Mikrotik", "SD-WAN", "MPLS", "VPN", "QoS"],
      results: [
        "Aumento de 400% na velocidade da rede",
        "Redução de 90% nos problemas de conectividade",
        "Conectividade redundante em 100% das filiais",
        "ROI de 250% em 18 meses",
      ],
      metrics: {
        duration: "4 meses",
        team: "6 especialistas",
        investment: "R$ 180.000",
        roi: "250%",
      },
      image: "🚚",
      color: "#3742fa",
      featured: true,
    },
    {
      id: 3,
      title: "Automação Industrial 4.0",
      category: "industria",
      client: "Indústria Alimentícia do Pará",
      description:
        "Implementação de solução IoT industrial completa com automação de processos e monitoramento em tempo real da linha de produção.",
      challenge: "Baixa eficiência produtiva e alto índice de paradas não programadas.",
      solution: "Sistema IoT integrado com sensores inteligentes e automação de processos críticos.",
      technologies: ["IoT", "Python", "MQTT", "Node-RED", "InfluxDB"],
      results: [
        "Aumento de 35% na eficiência produtiva",
        "Redução de 60% em paradas não programadas",
        "Economia de 30% nos custos operacionais",
        "Predição de falhas com 90% de precisão",
      ],
      metrics: {
        duration: "8 meses",
        team: "10 especialistas",
        investment: "R$ 320.000",
        roi: "280%",
      },
      image: "🏭",
      color: "#ff6b35",
      featured: true,
    },
  ]

  const otherProjects = [
    {
      id: 4,
      title: "Wi-Fi Corporativo",
      category: "varejo",
      client: "Shopping Center Belém",
      description: "Rede Wi-Fi de alta capacidade para 10.000+ usuários simultâneos com portal captivo personalizado",
      technologies: ["Ubiquiti", "RADIUS", "Captive Portal", "Load Balancing"],
      image: "🛍️",
      color: "#2ed573",
      metrics: { duration: "3 meses", investment: "R$ 85.000" },
    },
    {
      id: 5,
      title: "Segurança Bancária",
      category: "financeiro",
      client: "Banco Regional",
      description: "Solução completa de segurança para instituição financeira com compliance total",
      technologies: ["Fortinet", "SIEM", "WAF", "IPS", "DLP"],
      image: "🏦",
      color: "#ffa502",
      metrics: { duration: "5 meses", investment: "R$ 150.000" },
    },
    {
      id: 6,
      title: "Migração de Datacenter",
      category: "tecnologia",
      client: "Empresa de Software",
      description: "Migração completa com zero downtime e modernização da infraestrutura",
      technologies: ["VMware", "SAN", "Fibra Óptica", "Backup"],
      image: "💾",
      color: "#a55eea",
      metrics: { duration: "6 meses", investment: "R$ 200.000" },
    },
    {
      id: 7,
      title: "Telemedicina Avançada",
      category: "saude",
      client: "Clínica Médica Integrada",
      description: "Plataforma de telemedicina com integração total aos sistemas hospitalares",
      technologies: ["WebRTC", "HL7", "DICOM", "Cloud"],
      image: "🏥",
      color: "#ff4757",
      metrics: { duration: "4 meses", investment: "R$ 120.000" },
    },
    {
      id: 8,
      title: "Logística Inteligente",
      category: "logistica",
      client: "Transportadora Norte",
      description: "Sistema de rastreamento e otimização de rotas com IA",
      technologies: ["GPS", "Machine Learning", "API", "Mobile"],
      image: "🚚",
      color: "#3742fa",
      metrics: { duration: "5 meses", investment: "R$ 95.000" },
    },
    {
      id: 9,
      title: "Indústria 4.0",
      category: "industria",
      client: "Metalúrgica Amazônia",
      description: "Digitalização completa dos processos produtivos",
      technologies: ["SCADA", "PLC", "HMI", "Analytics"],
      image: "🏭",
      color: "#ff6b35",
      metrics: { duration: "7 meses", investment: "R$ 280.000" },
    },
  ]

  const testimonials = [
    {
      id: 1,
      name: "Dr. Carlos Mendes",
      role: "Diretor de TI",
      company: "Hospital Regional",
      avatar: "CM",
      rating: 5,
      text: "A Huios transformou completamente nossa infraestrutura hospitalar. O sistema de monitoramento implementado por eles já evitou várias situações críticas. Profissionalismo excepcional!",
      project: "Modernização Hospitalar",
      color: "#ff4757",
    },
    {
      id: 2,
      name: "Ana Paula Silva",
      role: "CTO",
      company: "Grupo Logístico Amazônia",
      avatar: "AS",
      rating: 5,
      text: "A nova rede corporativa aumentou nossa produtividade em 400%. A equipe da Huios é altamente qualificada e entregou o projeto no prazo estabelecido.",
      project: "Rede Corporativa Inteligente",
      color: "#3742fa",
    },
    {
      id: 3,
      name: "Roberto Santos",
      role: "Gerente de Produção",
      company: "Indústria Alimentícia",
      avatar: "RS",
      rating: 5,
      text: "A automação implementada revolucionou nossa produção. Conseguimos prever falhas antes que aconteçam e nossa eficiência aumentou significativamente.",
      project: "Automação Industrial 4.0",
      color: "#ff6b35",
    },
  ]

  const filteredProjects =
    activeFilter === "todos"
      ? [...featuredProjects, ...otherProjects]
      : [
          ...featuredProjects.filter((p) => p.category === activeFilter),
          ...otherProjects.filter((p) => p.category === activeFilter),
        ]

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="portfolio-hero">
        <div className="portfolio-hero-bg">
          <div className="portfolio-hero-overlay"></div>
        </div>
        <div className="container portfolio-hero-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="portfolio-hero-content"
          >
            <div className="portfolio-hero-badge">
              <span className="badge-icon">🎯</span>
              <span className="badge-text">Nosso Portfólio</span>
            </div>
            <h1 className="portfolio-hero-title">
              Casos de <span className="text-gradient">Sucesso</span>
            </h1>
            <p className="portfolio-hero-description">
              Conheça alguns dos projetos que transformaram a infraestrutura de nossos clientes e geraram resultados
              excepcionais
            </p>
            <div className="portfolio-hero-stats">
              <div className="hero-stat">
                <div className="stat-number">150+</div>
                <div className="stat-label">Projetos Entregues</div>
              </div>
              <div className="hero-stat">
                <div className="stat-number">98%</div>
                <div className="stat-label">Taxa de Sucesso</div>
              </div>
              <div className="hero-stat">
                <div className="stat-number">50+</div>
                <div className="stat-label">Clientes Ativos</div>
              </div>
              <div className="hero-stat">
                <div className="stat-number">R$ 5M+</div>
                <div className="stat-label">Valor Entregue</div>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="portfolio-hero-shapes">
          <div className="hero-shape hero-shape-1"></div>
          <div className="hero-shape hero-shape-2"></div>
          <div className="hero-shape hero-shape-3"></div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="portfolio-filter">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="filter-wrapper"
          >
            <h2 className="filter-title">Explore por Categoria</h2>
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category.id}
                  className={`filter-button ${activeFilter === category.id ? "active" : ""}`}
                  onClick={() => setActiveFilter(category.id)}
                >
                  <span className="filter-icon">{category.icon}</span>
                  <span className="filter-text">{category.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="featured-projects">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
           
            <h2 className="section-title">Nossos Principais Cases</h2>
            <p className="section-description">
              Conheça em detalhes nossos projetos mais impactantes e os resultados extraordinários alcançados
            </p>
          </motion.div>

          <div className="featured-projects-grid">
            {featuredProjects
              .filter((project) => activeFilter === "todos" || project.category === activeFilter)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="featured-project"
                  style={{ "--project-color": project.color } as React.CSSProperties}
                >
                  <div className="project-header">
                    <div className="project-category">
                      <span className="category-icon">{project.image}</span>
                      <span className="category-name">{categories.find((c) => c.id === project.category)?.name}</span>
                    </div>
                    <div className="project-featured-badge">Destaque</div>
                  </div>

                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <div className="project-client">Cliente: {project.client}</div>
                    <p className="project-description">{project.description}</p>

                    <div className="project-details">
                      <div className="project-challenge">
                        <h4>Desafio</h4>
                        <p>{project.challenge}</p>
                      </div>
                      <div className="project-solution">
                        <h4>Solução</h4>
                        <p>{project.solution}</p>
                      </div>
                    </div>

                    <div className="project-technologies">
                      <h4>Tecnologias</h4>
                      <div className="tech-tags">
                        {project.technologies.map((tech, techIndex) => (
                          <span key={techIndex} className="tech-tag">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="project-metrics">
                      <div className="metric">
                        <span className="metric-label">Duração</span>
                        <span className="metric-value">{project.metrics.duration}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Equipe</span>
                        <span className="metric-value">{project.metrics.team}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">Investimento</span>
                        <span className="metric-value">{project.metrics.investment}</span>
                      </div>
                      <div className="metric">
                        <span className="metric-label">ROI</span>
                        <span className="metric-value">{project.metrics.roi}</span>
                      </div>
                    </div>

                    <div className="project-results">
                      <h4>Resultados Alcançados</h4>
                      <div className="results-list">
                        {project.results.map((result, resultIndex) => (
                          <div key={resultIndex} className="result-item">
                            <span className="result-icon">✓</span>
                            <span className="result-text">{result}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="project-footer">
                    <Link href="/contato" className="btn-primary">
                      <span className="btn-icon">💬</span>
                      Projeto Similar
                    </Link>
                    <button
                      className="btn-secondary"
                      onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
                    >
                      <span className="btn-icon">📊</span>
                      {selectedProject === project.id ? "Menos Detalhes" : "Mais Detalhes"}
                    </button>
                  </div>

                  {selectedProject === project.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="project-expanded"
                    >
                      <div className="expanded-content">
                        <h4>Detalhes Técnicos</h4>
                        <p>
                          Este projeto envolveu uma análise detalhada dos requisitos do cliente, seguida por uma
                          implementação cuidadosa e testes rigorosos. Nossa equipe trabalhou em estreita colaboração com
                          o cliente para garantir que todos os objetivos fossem alcançados.
                        </p>

                        <div className="timeline">
                          <div className="timeline-item">
                            <div className="timeline-icon">📋</div>
                            <div className="timeline-content">
                              <h5>Planejamento</h5>
                              <p>Análise de requisitos e arquitetura da solução</p>
                            </div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-icon">⚙️</div>
                            <div className="timeline-content">
                              <h5>Implementação</h5>
                              <p>Desenvolvimento e configuração dos sistemas</p>
                            </div>
                          </div>
                          <div className="timeline-item">
                            <div className="timeline-icon">✅</div>
                            <div className="timeline-content">
                              <h5>Entrega</h5>
                              <p>Testes finais e treinamento da equipe</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Other Projects */}
      <section className="other-projects">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-subtitle">Outros Projetos</span>
            <h2 className="section-title">Mais Casos de Sucesso</h2>
            <p className="section-description">Explore nossa ampla experiência em diferentes segmentos e tecnologias</p>
          </motion.div>

          <div className="other-projects-grid">
            {otherProjects
              .filter((project) => activeFilter === "todos" || project.category === activeFilter)
              .map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="other-project"
                  style={{ "--project-color": project.color } as React.CSSProperties}
                >
                  <div className="other-project-header">
                    <div className="other-project-icon">{project.image}</div>
                    <div className="other-project-category">
                      {categories.find((c) => c.id === project.category)?.name}
                    </div>
                  </div>

                  <div className="other-project-content">
                    <h3 className="other-project-title">{project.title}</h3>
                    <div className="other-project-client">Cliente: {project.client}</div>
                    <p className="other-project-description">{project.description}</p>

                    <div className="other-project-technologies">
                      {project.technologies.map((tech, techIndex) => (
                        <span key={techIndex} className="other-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="other-project-metrics">
                      <div className="other-metric">
                        <span className="other-metric-label">Duração</span>
                        <span className="other-metric-value">{project.metrics.duration}</span>
                      </div>
                      <div className="other-metric">
                        <span className="other-metric-label">Investimento</span>
                        <span className="other-metric-value">{project.metrics.investment}</span>
                      </div>
                    </div>
                  </div>

                  <div className="other-project-footer">
                    <Link href="/contato" className="btn-primary btn-sm">
                      <span className="btn-icon">💬</span>
                      Saiba Mais
                    </Link>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-subtitle">Depoimentos</span>
            <h2 className="section-title">O que nossos clientes dizem</h2>
            <p className="section-description">Feedback real de clientes que transformaram seus negócios conosco</p>
          </motion.div>

          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="testimonial"
                style={{ "--testimonial-color": testimonial.color } as React.CSSProperties}
              >
                <div className="testimonial-header">
                  <div className="testimonial-avatar">{testimonial.avatar}</div>
                  <div className="testimonial-info">
                    <h4 className="testimonial-name">{testimonial.name}</h4>
                    <div className="testimonial-role">{testimonial.role}</div>
                    <div className="testimonial-company">{testimonial.company}</div>
                  </div>
                  <div className="testimonial-rating">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="star">
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>

                <div className="testimonial-content">
                  <div className="quote-icon">"</div>
                  <p className="testimonial-text">{testimonial.text}</p>
                </div>

                <div className="testimonial-footer">
                  <div className="testimonial-project">
                    <span className="project-label">Projeto:</span>
                    <span className="project-name">{testimonial.project}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="portfolio-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cta-content"
          >
            <h2 className="cta-title">Pronto para ser nosso próximo caso de sucesso?</h2>
            <p className="cta-description">
              Entre em contato conosco e vamos discutir como podemos transformar sua empresa
            </p>
            <div className="cta-actions">
              <Link href="/contato" className="btn-primary btn-large">
                <span className="btn-icon">🚀</span>
                Iniciar Projeto
              </Link>
              <Link href="/servicos" className="btn-secondary btn-large">
                <span className="btn-icon">📋</span>
                Ver Serviços
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="cta-shapes">
          <div className="cta-shape cta-shape-1"></div>
          <div className="cta-shape cta-shape-2"></div>
        </div>
      </section>

      <Footer />
    </>
  )
}
