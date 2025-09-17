"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"
import { motion } from "framer-motion"

export default function Servicos() {
  const [activeTab, setActiveTab] = useState("implementacao")
  const [activeService, setActiveService] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const services = [
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
      image: "/images/huios-hero.png",
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
      image: "/images/huios-about.png",
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
      image: "/images/huios-hero.png",
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
      image: "/images/huios-about.png",
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
      image: "/images/huios-hero.png",
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
      image: "/images/huios-about.png",
    },
  ]

  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="services-hero">
        <div className="services-hero-bg">
          <div className="services-hero-overlay"></div>
        </div>
        <div className="container services-hero-container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="services-hero-content"
          >
            <div className="services-hero-badge">
              <span className="badge-icon">💼</span>
              <span className="badge-text">O Que Fazemos</span>
            </div>
            <h1 className="services-hero-title">
              Soluções Tecnológicas <span className="text-gradient">Inovadoras</span>
            </h1>
            <p className="services-hero-description">
              Transformamos sua infraestrutura com serviços especializados e tecnologia de última geração
            </p>
            <div className="services-hero-actions">
              <Link href="#servicos" className="btn-primary">
                <span className="btn-icon">🔍</span>
                Explorar Serviços
              </Link>
              <Link href="/contato" className="btn-secondary">
                <span className="btn-icon">💬</span>
                Fale Conosco
              </Link>
            </div>
          </motion.div>
        </div>
        <div className="services-hero-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </section>

      {/* Services Showcase Section */}
      <section id="servicos" className="services-showcase">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-subtitle">Nossos Serviços</span>
            <h2 className="section-title">Soluções Especializadas</h2>
            <p className="section-description">
              Oferecemos uma ampla gama de serviços tecnológicos para atender às necessidades específicas da sua empresa
            </p>
          </motion.div>

          <div className="services-tabs">
            <div className="services-tabs-nav">
              {services.map((service, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`service-tab ${activeService === index ? "active" : ""}`}
                  onClick={() => setActiveService(index)}
                  style={
                    {
                      "--service-color": service.color,
                      "--service-gradient": `linear-gradient(135deg, ${service.color}, ${service.color}88)`,
                    } as React.CSSProperties
                  }
                >
                  <span className="service-tab-icon">{service.icon}</span>
                  <span className="service-tab-title">{service.title}</span>
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="service-content-wrapper"
            >
              <div
                className="service-content"
                style={{ "--service-color": services[activeService].color } as React.CSSProperties}
              >
                <div className="service-content-header">
                  <div className="service-content-icon-wrapper">
                    <div className="service-content-icon">{services[activeService].icon}</div>
                  </div>
                  <div className="service-content-title-wrapper">
                    <h3 className="service-content-title">{services[activeService].title}</h3>
                    <p className="service-content-subtitle">{services[activeService].description}</p>
                  </div>
                </div>

                <div className="service-content-body">
                  <div className="service-content-description">
                    <p>{services[activeService].longDescription}</p>
                  </div>

                  <div className="service-content-features">
                    <h4 className="features-title">Recursos Principais</h4>
                    <ul className="features-list">
                      {services[activeService].features.map((feature, index) => (
                        <li key={index} className="feature-item">
                          <span className="feature-icon">✓</span>
                          <span className="feature-text">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="service-content-cases">
                    <h4 className="cases-title">Casos de Sucesso</h4>
                    <div className="cases-content">
                      <span className="cases-icon">💼</span>
                      <p className="cases-text">{services[activeService].cases}</p>
                    </div>
                  </div>
                </div>

                <div className="service-content-footer">
                  <Link href="/contato" className="btn-primary">
                    <span className="btn-icon">🚀</span>
                    Solicitar Orçamento
                  </Link>
                  <Link href="/portfolio" className="btn-secondary">
                    <span className="btn-icon">📊</span>
                    Ver Projetos
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="pricing-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-subtitle">Nossos Valores</span>
            <h2 className="section-title">Investimento Inteligente</h2>
            <p className="section-description">
              Escolha entre implementação única ou consultoria mensal para atender às necessidades da sua empresa
            </p>
          </motion.div>

          <div className="pricing-tabs-wrapper">
            <div className="pricing-tabs">
              <button
                className={`pricing-tab ${activeTab === "implementacao" ? "active" : ""}`}
                onClick={() => setActiveTab("implementacao")}
              >
                <span className="pricing-tab-icon">🚀</span>
                <span className="pricing-tab-text">Implementação</span>
              </button>
              <button
                className={`pricing-tab ${activeTab === "consultoria" ? "active" : ""}`}
                onClick={() => setActiveTab("consultoria")}
              >
                <span className="pricing-tab-icon">📋</span>
                <span className="pricing-tab-text">Consultoria Mensal</span>
              </button>
            </div>
          </div>

          <div className="pricing-cards">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="pricing-card"
                style={{ "--service-color": service.color } as React.CSSProperties}
              >
                <div className="pricing-card-header">
                  <div className="pricing-card-icon">{service.icon}</div>
                  <h3 className="pricing-card-title">{service.title}</h3>
                </div>

                <div className="pricing-card-body">
                  <div className="pricing-tiers">
                    <div className="pricing-tier">
                      <div className="tier-name">Básico</div>
                      <div className="tier-price">
                        {activeTab === "implementacao" ? service.implementacao.basico : service.consultoria.basico}
                      </div>
                      <div className="tier-description">{service.detalhes.basico}</div>
                    </div>

                    <div className="pricing-tier featured">
                      <div className="tier-badge">Popular</div>
                      <div className="tier-name">Intermediário</div>
                      <div className="tier-price">
                        {activeTab === "implementacao"
                          ? service.implementacao.intermediario
                          : service.consultoria.intermediario}
                      </div>
                      <div className="tier-description">{service.detalhes.intermediario}</div>
                    </div>

                    <div className="pricing-tier">
                      <div className="tier-name">Avançado</div>
                      <div className="tier-price">
                        {activeTab === "implementacao" ? service.implementacao.avancado : service.consultoria.avancado}
                      </div>
                      <div className="tier-description">{service.detalhes.avancado}</div>
                    </div>
                  </div>
                </div>

                <div className="pricing-card-footer">
                  <Link href="/contato" className="btn-primary btn-block">
                    <span className="btn-icon">💬</span>
                    Solicitar Proposta
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-subtitle">Como Trabalhamos</span>
            <h2 className="section-title">Nosso Processo</h2>
            <p className="section-description">
              Metodologia comprovada para entregar resultados excepcionais em todos os projetos
            </p>
          </motion.div>

          <div className="process-steps">
            {[
              {
                step: "01",
                title: "Análise",
                description: "Avaliamos sua infraestrutura atual e identificamos oportunidades de melhoria.",
                icon: "🔍",
                color: "#15ff00",
              },
              {
                step: "02",
                title: "Planejamento",
                description: "Desenvolvemos um plano estratégico personalizado para suas necessidades.",
                icon: "📋",
                color: "#00c8ff",
              },
              {
                step: "03",
                title: "Implementação",
                description: "Executamos as soluções com precisão e dentro do prazo estabelecido.",
                icon: "⚙️",
                color: "#ff5500",
              },
              {
                step: "04",
                title: "Suporte",
                description: "Oferecemos suporte contínuo para garantir o funcionamento otimizado.",
                icon: "🛠️",
                color: "#ffaa00",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="process-step"
                style={{ "--process-color": process.color } as React.CSSProperties}
              >
                <div className="process-step-number">{process.step}</div>
                <div className="process-step-content">
                  <div className="process-step-icon">{process.icon}</div>
                  <h3 className="process-step-title">{process.title}</h3>
                  <p className="process-step-description">{process.description}</p>
                </div>
                {index < 3 && <div className="process-step-arrow"></div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <span className="section-subtitle">Por Que Nos Escolher</span>
            <h2 className="section-title">Nossos Diferenciais</h2>
            <p className="section-description">
              Vantagens exclusivas que fazem da Huios a melhor escolha para sua empresa
            </p>
          </motion.div>

          <div className="benefits-grid">
            {[
              {
                icon: "💰",
                title: "Preços Competitivos",
                description: "Oferecemos os melhores preços do mercado sem comprometer a qualidade dos serviços.",
                color: "#15ff00",
              },
              {
                icon: "⚡",
                title: "Implementação Rápida",
                description: "Projetos executados com agilidade, respeitando prazos e mantendo alta qualidade.",
                color: "#00c8ff",
              },
              {
                icon: "🎯",
                title: "Soluções Personalizadas",
                description: "Cada projeto é único e desenvolvido especificamente para suas necessidades.",
                color: "#ff5500",
              },
              {
                icon: "🔒",
                title: "Segurança Garantida",
                description: "Implementamos as melhores práticas de segurança em todos os nossos projetos.",
                color: "#ffaa00",
              },
              {
                icon: "📞",
                title: "Suporte 24/7",
                description: "Equipe técnica disponível 24 horas por dia, 7 dias por semana para emergências.",
                color: "#ff00c8",
              },
              {
                icon: "📈",
                title: "ROI Comprovado",
                description: "Nossos clientes obtêm retorno sobre investimento em média de 6 a 12 meses.",
                color: "#aa00ff",
              },
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="benefit-card"
                style={{ "--benefit-color": benefit.color } as React.CSSProperties}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="cta-content"
          >
            <h2 className="cta-title">Pronto para transformar sua infraestrutura?</h2>
            <p className="cta-description">
              Entre em contato conosco e receba um orçamento personalizado para suas necessidades
            </p>
            <div className="cta-actions">
              <Link href="/contato" className="btn-primary btn-large">
                <span className="btn-icon">🚀</span>
                Solicitar Orçamento Gratuito
              </Link>
              <Link href="/portfolio" className="btn-secondary btn-large">
                <span className="btn-icon">📊</span>
                Ver Casos de Sucesso
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
