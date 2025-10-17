// Portfolio page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  let activeFilter = "todos"

  // Categories data
  const categories = [
    { id: "todos", name: "Todos os Projetos", icon: "🎯" },
    { id: "saude", name: "Saúde", icon: "🏥" },
    { id: "logistica", name: "Logística", icon: "🚚" },
    { id: "industria", name: "Indústria", icon: "🏭" },
    { id: "varejo", name: "Varejo", icon: "🛍️" },
    { id: "financeiro", name: "Financeiro", icon: "🏦" },
    { id: "tecnologia", name: "Tecnologia", icon: "💾" },
  ]

  // Featured projects data
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

  // Other projects data
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

  // Testimonials data
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

  // Initialize filter buttons
  function initFilterButtons() {
    const filterButtons = document.querySelectorAll(".filter-button")
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"))
        button.classList.add("active")
        activeFilter = button.dataset.filter
        updateProjectsDisplay()
      })
    })
  }

  // Update projects display based on filter
  function updateProjectsDisplay() {
    updateFeaturedProjects()
    updateOtherProjects()
  }

  // Update featured projects
  function updateFeaturedProjects() {
    const featuredProjectsContainer = document.getElementById("featuredProjects")
    if (!featuredProjectsContainer) return

    const filteredProjects =
      activeFilter === "todos"
        ? featuredProjects
        : featuredProjects.filter((project) => project.category === activeFilter)

    featuredProjectsContainer.innerHTML = filteredProjects
      .map(
        (project) => `
            <div class="featured-project" style="--project-color: ${project.color}">
                <div class="project-header">
                    <div class="project-category">
                        <span class="category-icon">${project.image}</span>
                        <span class="category-name">${categories.find((c) => c.id === project.category)?.name}</span>
                    </div>
                    <div class="project-featured-badge">Destaque</div>
                </div>

                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <div class="project-client">Cliente: ${project.client}</div>
                    <p class="project-description">${project.description}</p>

                    <div class="project-details">
                        <div class="project-challenge">
                            <h4>Desafio</h4>
                            <p>${project.challenge}</p>
                        </div>
                        <div class="project-solution">
                            <h4>Solução</h4>
                            <p>${project.solution}</p>
                        </div>
                    </div>

                    <div class="project-technologies">
                        <h4>Tecnologias</h4>
                        <div class="tech-tags">
                            ${project.technologies.map((tech) => `<span class="tech-tag">${tech}</span>`).join("")}
                        </div>
                    </div>

                    <div class="project-metrics">
                        <div class="metric">
                            <span class="metric-label">Duração</span>
                            <span class="metric-value">${project.metrics.duration}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Equipe</span>
                            <span class="metric-value">${project.metrics.team}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Investimento</span>
                            <span class="metric-value">${project.metrics.investment}</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">ROI</span>
                            <span class="metric-value">${project.metrics.roi}</span>
                        </div>
                    </div>

                    <div class="project-results">
                        <h4>Resultados Alcançados</h4>
                        <div class="results-list">
                            ${project.results
                              .map(
                                (result) => `
                                <div class="result-item">
                                    <span class="result-icon">✓</span>
                                    <span class="result-text">${result}</span>
                                </div>
                            `,
                              )
                              .join("")}
                        </div>
                    </div>
                </div>

                <div class="project-footer">
                    <a href="contato.html" class="btn-primary">
                        <span class="btn-icon">💬</span>
                        Projeto Similar
                    </a>
                    <button class="btn-secondary" onclick="toggleProjectDetails(${project.id})">
                        <span class="btn-icon">📊</span>
                        <span id="toggleText${project.id}">Mais Detalhes</span>
                    </button>
                </div>

                <div class="project-expanded" id="expanded${project.id}" style="display: none;">
                    <div class="expanded-content">
                        <h4>Detalhes Técnicos</h4>
                        <p>
                            Este projeto envolveu uma análise detalhada dos requisitos do cliente, seguida por uma
                            implementação cuidadosa e testes rigorosos. Nossa equipe trabalhou em estreita colaboração com
                            o cliente para garantir que todos os objetivos fossem alcançados.
                        </p>

                        <div class="timeline">
                            <div class="timeline-item">
                                <div class="timeline-icon">📋</div>
                                <div class="timeline-content">
                                    <h5>Planejamento</h5>
                                    <p>Análise de requisitos e arquitetura da solução</p>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-icon">⚙️</div>
                                <div class="timeline-content">
                                    <h5>Implementação</h5>
                                    <p>Desenvolvimento e configuração dos sistemas</p>
                                </div>
                            </div>
                            <div class="timeline-item">
                                <div class="timeline-icon">✅</div>
                                <div class="timeline-content">
                                    <h5>Entrega</h5>
                                    <p>Testes finais e treinamento da equipe</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }

  // Update other projects
  function updateOtherProjects() {
    const otherProjectsContainer = document.getElementById("otherProjects")
    if (!otherProjectsContainer) return

    const filteredProjects =
      activeFilter === "todos" ? otherProjects : otherProjects.filter((project) => project.category === activeFilter)

    otherProjectsContainer.innerHTML = filteredProjects
      .map(
        (project) => `
            <div class="other-project" style="--project-color: ${project.color}">
                <div class="other-project-header">
                    <div class="other-project-icon">${project.image}</div>
                    <div class="other-project-category">
                        ${categories.find((c) => c.id === project.category)?.name}
                    </div>
                </div>

                <div class="other-project-content">
                    <h3 class="other-project-title">${project.title}</h3>
                    <div class="other-project-client">Cliente: ${project.client}</div>
                    <p class="other-project-description">${project.description}</p>

                    <div class="other-project-technologies">
                        ${project.technologies.map((tech) => `<span class="other-tech-tag">${tech}</span>`).join("")}
                    </div>

                    <div class="other-project-metrics">
                        <div class="other-metric">
                            <span class="other-metric-label">Duração</span>
                            <span class="other-metric-value">${project.metrics.duration}</span>
                        </div>
                        <div class="other-metric">
                            <span class="other-metric-label">Investimento</span>
                            <span class="other-metric-value">${project.metrics.investment}</span>
                        </div>
                    </div>
                </div>

                <div class="other-project-footer">
                    <a href="contato.html" class="btn-primary btn-sm">
                        <span class="btn-icon">💬</span>
                        Saiba Mais
                    </a>
                </div>
            </div>
        `,
      )
      .join("")
  }

  // Update testimonials
  function updateTestimonials() {
    const testimonialsContainer = document.getElementById("testimonialsGrid")
    if (!testimonialsContainer) return

    testimonialsContainer.innerHTML = testimonials
      .map(
        (testimonial) => `
            <div class="testimonial" style="--testimonial-color: ${testimonial.color}">
                <div class="testimonial-header">
                    <div class="testimonial-avatar">${testimonial.avatar}</div>
                    <div class="testimonial-info">
                        <h4 class="testimonial-name">${testimonial.name}</h4>
                        <div class="testimonial-role">${testimonial.role}</div>
                        <div class="testimonial-company">${testimonial.company}</div>
                    </div>
                    <div class="testimonial-rating">
                        ${Array(testimonial.rating).fill("⭐").join("")}
                    </div>
                </div>

                <div class="testimonial-content">
                    <div class="quote-icon">"</div>
                    <p class="testimonial-text">${testimonial.text}</p>
                </div>

                <div class="testimonial-footer">
                    <div class="testimonial-project">
                        <span class="project-label">Projeto:</span>
                        <span class="project-name">${testimonial.project}</span>
                    </div>
                </div>
            </div>
        `,
      )
      .join("")
  }

  // Toggle project details
  window.toggleProjectDetails = (projectId) => {
    const expanded = document.getElementById(`expanded${projectId}`)
    const toggleText = document.getElementById(`toggleText${projectId}`)

    if (expanded.style.display === "none") {
      expanded.style.display = "block"
      toggleText.textContent = "Menos Detalhes"
    } else {
      expanded.style.display = "none"
      toggleText.textContent = "Mais Detalhes"
    }
  }

  // Initialize all functionality
  initFilterButtons()
  updateProjectsDisplay()
  updateTestimonials()

  console.log("Portfolio page loaded successfully! 🎯")
})
