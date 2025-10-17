// Services page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Services data
  const servicesData = [
    {
      title: "Mikrotik",
      icon: "🔧",
      color: "#15ff00",
      description: "Configuração e otimização de equipamentos Mikrotik para máxima performance de rede.",
      longDescription:
        "Somos especialistas em soluções Mikrotik, oferecendo desde configurações básicas até implementações complexas de redes corporativas. Nossa equipe certificada garante o máximo desempenho, segurança e estabilidade para sua infraestrutura.",
      features: [
        "Configuração de roteadores",
        "Balanceamento de carga",
        "VPN e túneis seguros",
        "Monitoramento de tráfego",
        "Otimização de performance",
      ],
      implementacao: {
        basico: "R$ 2.500",
        intermediario: "R$ 4.500",
        avancado: "R$ 8.000",
      },
      consultoria: {
        basico: "R$ 800/mês",
        intermediario: "R$ 1.200/mês",
        avancado: "R$ 2.000/mês",
      },
      detalhes: {
        basico: "Configuração básica de até 3 equipamentos",
        intermediario: "Configuração completa de até 8 equipamentos + VPN",
        avancado: "Infraestrutura completa + balanceamento + redundância",
      },
      cases:
        "Implementamos soluções Mikrotik para mais de 50 empresas, incluindo provedores de internet e redes corporativas.",
    },
    {
      title: "Huawei",
      icon: "📡",
      color: "#00c8ff",
      description: "Implementação e manutenção de soluções Huawei para infraestrutura corporativa.",
      longDescription:
        "Como parceiros Huawei, oferecemos soluções completas para empresas de todos os portes. Nossos especialistas são certificados para implementar e gerenciar toda a linha de produtos Huawei, garantindo o melhor custo-benefício e desempenho.",
      features: [
        "Switches empresariais",
        "Soluções wireless",
        "Equipamentos de datacenter",
        "Sistemas de segurança",
        "Suporte técnico especializado",
      ],
      implementacao: {
        basico: "R$ 3.500",
        intermediario: "R$ 6.500",
        avancado: "R$ 12.000",
      },
      consultoria: {
        basico: "R$ 1.000/mês",
        intermediario: "R$ 1.500/mês",
        avancado: "R$ 2.500/mês",
      },
      detalhes: {
        basico: "Configuração de switches básicos e wireless",
        intermediario: "Infraestrutura completa com segurança",
        avancado: "Datacenter completo + alta disponibilidade",
      },
      cases:
        "Implementamos soluções Huawei em hospitais, universidades e grandes empresas, com projetos de até 500 pontos de rede.",
    },
    {
      title: "Datacom",
      icon: "💻",
      color: "#ff5500",
      description: "Soluções completas Datacom para conectividade e comunicação empresarial.",
      longDescription:
        "Somos especialistas em equipamentos Datacom, oferecendo soluções robustas e confiáveis para empresas que buscam alta performance e estabilidade. Nossa equipe possui todas as certificações necessárias para implementar e gerenciar redes Datacom.",
      features: [
        "Roteadores de alta performance",
        "Switches gerenciáveis",
        "Soluções de conectividade",
        "Equipamentos carrier grade",
        "Consultoria técnica",
      ],
      implementacao: {
        basico: "R$ 3.000",
        intermediario: "R$ 5.500",
        avancado: "R$ 10.000",
      },
      consultoria: {
        basico: "R$ 900/mês",
        intermediario: "R$ 1.400/mês",
        avancado: "R$ 2.200/mês",
      },
      detalhes: {
        basico: "Roteadores e switches básicos",
        intermediario: "Infraestrutura carrier grade",
        avancado: "Solução completa de conectividade empresarial",
      },
      cases:
        "Implementamos soluções Datacom para provedores de internet e empresas de telecomunicações em toda a região Norte.",
    },
    {
      title: "Monitoramentos",
      icon: "📊",
      color: "#ff00c8",
      description: "Sistemas avançados de monitoramento para garantir a disponibilidade da sua infraestrutura.",
      longDescription:
        "Nossos sistemas de monitoramento garantem que sua infraestrutura esteja sempre funcionando perfeitamente. Utilizamos ferramentas avançadas para detectar problemas antes que eles afetem seu negócio, com alertas em tempo real e relatórios detalhados.",
      features: [
        "Monitoramento 24/7",
        "Alertas em tempo real",
        "Dashboards personalizados",
        "Relatórios detalhados",
        "Análise de performance",
      ],
      implementacao: {
        basico: "R$ 2.000",
        intermediario: "R$ 4.000",
        avancado: "R$ 7.500",
      },
      consultoria: {
        basico: "R$ 600/mês",
        intermediario: "R$ 1.000/mês",
        avancado: "R$ 1.800/mês",
      },
      detalhes: {
        basico: "Monitoramento básico de até 50 dispositivos",
        intermediario: "Monitoramento completo + alertas + relatórios",
        avancado: "NOC completo + análise preditiva + SLA 99.9%",
      },
      cases:
        "Nossos sistemas de monitoramento já evitaram mais de 500 incidentes críticos em nossos clientes nos últimos 12 meses.",
    },
    {
      title: "Automações",
      icon: "⚙️",
      color: "#ffaa00",
      description: "Automação de processos e sistemas para aumentar a eficiência operacional.",
      longDescription:
        "Automatizamos processos repetitivos e complexos para aumentar a eficiência e reduzir erros humanos. Nossas soluções de automação são personalizadas para cada cliente, garantindo o máximo de produtividade e economia de recursos.",
      features: [
        "Scripts personalizados",
        "Automação de backups",
        "Provisionamento automático",
        "Integração de sistemas",
        "Workflows inteligentes",
      ],
      implementacao: {
        basico: "R$ 1.800",
        intermediario: "R$ 3.500",
        avancado: "R$ 6.500",
      },
      consultoria: {
        basico: "R$ 500/mês",
        intermediario: "R$ 900/mês",
        avancado: "R$ 1.500/mês",
      },
      detalhes: {
        basico: "Automação básica de processos simples",
        intermediario: "Automação completa + integração de sistemas",
        avancado: "Workflows inteligentes + IA + machine learning",
      },
      cases: "Nossas automações reduziram em média 70% o tempo gasto em tarefas operacionais em nossos clientes.",
    },
    {
      title: "Consultoria",
      icon: "🎯",
      color: "#aa00ff",
      description: "Consultoria especializada para otimização e modernização da sua infraestrutura.",
      longDescription:
        "Nossa consultoria técnica ajuda empresas a tomarem as melhores decisões em tecnologia. Analisamos sua infraestrutura atual, identificamos pontos de melhoria e desenvolvemos um plano estratégico para maximizar seus investimentos em TI.",
      features: [
        "Análise de infraestrutura",
        "Planejamento estratégico",
        "Migração de sistemas",
        "Treinamento de equipes",
        "Documentação técnica",
      ],
      implementacao: {
        basico: "R$ 2.200",
        intermediario: "R$ 4.200",
        avancado: "R$ 8.500",
      },
      consultoria: {
        basico: "R$ 700/mês",
        intermediario: "R$ 1.300/mês",
        avancado: "R$ 2.200/mês",
      },
      detalhes: {
        basico: "Análise básica + relatório de recomendações",
        intermediario: "Consultoria completa + planejamento estratégico",
        avancado: "Consultoria premium + acompanhamento contínuo",
      },
      cases:
        "Nossas consultorias já economizaram milhões de reais em investimentos desnecessários para nossos clientes.",
    },
  ]

  let activeService = 0
  let activeTab = "implementacao"

  // Initialize services tabs
  function initServicesTabs() {
    const serviceContent = document.getElementById("serviceContent")
    if (serviceContent) {
      updateServiceContent()
    }

    // Service tab click handlers
    const serviceTabs = document.querySelectorAll(".service-tab")
    serviceTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        serviceTabs.forEach((t) => t.classList.remove("active"))
        // Add active class to clicked tab
        tab.classList.add("active")
        // Update active service
        activeService = index
        updateServiceContent()
      })
    })
  }

  // Update service content
  function updateServiceContent() {
    const serviceContent = document.getElementById("serviceContent")
    if (!serviceContent) return

    const service = servicesData[activeService]

    serviceContent.innerHTML = `
            <div class="service-content-header">
                <div class="service-content-icon-wrapper">
                    <div class="service-content-icon" style="background: ${service.color}">${service.icon}</div>
                </div>
                <div class="service-content-title-wrapper">
                    <h3 class="service-content-title" style="color: ${service.color}">${service.title}</h3>
                    <p class="service-content-subtitle">${service.description}</p>
                </div>
            </div>

            <div class="service-content-body">
                <div class="service-content-description">
                    <p>${service.longDescription}</p>
                </div>

                <div class="service-content-features">
                    <h4 class="features-title" style="color: ${service.color}">Recursos Principais</h4>
                    <ul class="features-list">
                        ${service.features
                          .map(
                            (feature) => `
                            <li class="feature-item">
                                <span class="feature-icon" style="color: ${service.color}">✓</span>
                                <span class="feature-text">${feature}</span>
                            </li>
                        `,
                          )
                          .join("")}
                    </ul>
                </div>

                <div class="service-content-cases">
                    <h4 class="cases-title" style="color: ${service.color}">Casos de Sucesso</h4>
                    <div class="cases-content">
                        <span class="cases-icon" style="color: ${service.color}">💼</span>
                        <p class="cases-text">${service.cases}</p>
                    </div>
                </div>
            </div>

            <div class="service-content-footer">
                <a href="contato.html" class="btn-primary">
                    <span class="btn-icon">🚀</span>
                    Solicitar Orçamento
                </a>
                <a href="portfolio.html" class="btn-secondary">
                    <span class="btn-icon">📊</span>
                    Ver Projetos
                </a>
            </div>
        `

    // Update service content wrapper color
    const wrapper = serviceContent.closest(".service-content-wrapper")
    if (wrapper) {
      wrapper.style.setProperty("--service-color", service.color)
    }
  }

  // Initialize pricing tabs
  function initPricingTabs() {
    const pricingTabs = document.querySelectorAll(".pricing-tab")
    pricingTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        // Remove active class from all tabs
        pricingTabs.forEach((t) => t.classList.remove("active"))
        // Add active class to clicked tab
        tab.classList.add("active")
        // Update active tab
        activeTab = tab.dataset.tab
        updatePricingCards()
      })
    })

    updatePricingCards()
  }

  // Update pricing cards
  function updatePricingCards() {
    const pricingCards = document.getElementById("pricingCards")
    if (!pricingCards) return

    pricingCards.innerHTML = servicesData
      .map(
        (service) => `
            <div class="pricing-card" style="--service-color: ${service.color}">
                <div class="pricing-card-header">
                    <div class="pricing-card-icon" style="color: ${service.color}">${service.icon}</div>
                    <h3 class="pricing-card-title" style="color: ${service.color}">${service.title}</h3>
                </div>

                <div class="pricing-card-body">
                    <div class="pricing-tiers">
                        <div class="pricing-tier">
                            <div class="tier-name">Básico</div>
                            <div class="tier-price" style="color: ${service.color}">
                                ${activeTab === "implementacao" ? service.implementacao.basico : service.consultoria.basico}
                            </div>
                            <div class="tier-description">${service.detalhes.basico}</div>
                        </div>

                        <div class="pricing-tier featured">
                            <div class="tier-badge" style="background: ${service.color}">Popular</div>
                            <div class="tier-name">Intermediário</div>
                            <div class="tier-price" style="color: ${service.color}">
                                ${activeTab === "implementacao" ? service.implementacao.intermediario : service.consultoria.intermediario}
                            </div>
                            <div class="tier-description">${service.detalhes.intermediario}</div>
                        </div>

                        <div class="pricing-tier">
                            <div class="tier-name">Avançado</div>
                            <div class="tier-price" style="color: ${service.color}">
                                ${activeTab === "implementacao" ? service.implementacao.avancado : service.consultoria.avancado}
                            </div>
                            <div class="tier-description">${service.detalhes.avancado}</div>
                        </div>
                    </div>
                </div>

                <div class="pricing-card-footer">
                    <a href="contato.html" class="btn-primary btn-block">
                        <span class="btn-icon">💬</span>
                        Solicitar Proposta
                    </a>
                </div>
            </div>
        `,
      )
      .join("")
  }

  // Initialize all functionality
  initServicesTabs()
  initPricingTabs()

  console.log("Services page loaded successfully! 🔧")
})
