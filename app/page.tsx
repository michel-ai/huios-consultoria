import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero_area">
        <div className="hero-particles"></div>
        <div className="hero-background">
          <div className="hero-image-wrapper">
            <img src="/images/huios-hero.png" alt="Huios Background" className="hero-bg-img" />
            <div className="hero-image-overlay"></div>
          </div>
        </div>
        <div className="container hero-container">
          <div className="hero-content-grid">
            <div className="hero-text-section">
              <div className="hero-badge">
                <div className="badge-icon">💡</div>
                <span>Inovação em Tecnologia</span>
                <div className="badge-pulse"></div>
              </div>
              <h1 className="hero-main-title">
                Transforme sua{" "}
                <span className="highlight-text">
                  Infraestrutura
                  <div className="highlight-decoration"></div>
                </span>{" "}
                com a Huios
              </h1>
              <p className="hero-main-description">
                Soluções completas em redes, automação e consultoria tecnológica. Levamos sua empresa para o próximo
                nível com expertise comprovada e tecnologia de ponta.
              </p>
              <div className="hero-features">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>100% Confiável</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Totalmente Digital</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Seguro</span>
                </div>
              </div>
              <div className="hero-actions">
                <Link href="/contato" className="btn-primary btn-large">
                  <span className="btn-icon">🚀</span>
                  Iniciar Projeto
                  <div className="btn-glow"></div>
                </Link>
                <Link href="/portfolio" className="btn-secondary btn-large">
                  <span className="btn-icon">📊</span>
                  Ver Casos de Sucesso
                </Link>
              </div>
            </div>
            <div className="hero-visual-section">
              <div className="hero-logo-display">
                <img src="/images/huios-hero.png" alt="Huios Logo" className="hero-logo-img" />
                <div className="logo-orbit orbit-1"></div>
                <div className="logo-orbit orbit-2"></div>
                <div className="logo-orbit orbit-3"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding services-section">
        <div className="container">
          <div className="heading-container">
            <div className="section-badge">
              <span>⚡</span>
              <span>Nossos Serviços</span>
            </div>
            <h2>Soluções Tecnológicas Completas</h2>
            <p style={{ color: "#ffffff" }}>Expertise em todas as áreas da tecnologia empresarial</p>
          </div>

          <div className="services-grid">
            {[
              { title: "Mikrotik", icon: "🔧", description: "Configuração e otimização de redes" },
              { title: "Huawei", icon: "📡", description: "Soluções empresariais avançadas" },
              { title: "Datacom", icon: "💻", description: "Conectividade de alta performance" },
              { title: "Monitoramentos", icon: "📊", description: "Supervisão 24/7 da infraestrutura" },
              { title: "Automações", icon: "⚙️", description: "Processos inteligentes e eficientes" },
            ].map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-glow"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding about-section">
        <div className="container">
          <div className="about-wrapper">
            <div className="about-content-side">
              <div className="section-badge">
                <span>🎯</span>
                <span>Quem Somos</span>
              </div>
              <h2 className="about-main-title">
                Especialistas em{" "}
                <span className="highlight-text">
                  Consultoria de Redes
                  <div className="highlight-decoration"></div>
                </span>
              </h2>
              <p className="about-description">
                A Huios surgiu do desejo de oferecer tecnologia da mais alta qualidade à Região Metropolitana de Belém,
                expandindo nossa atuação para outras regiões com soluções inovadoras e personalizadas.
              </p>
              <div className="about-highlights">
                <div className="highlight-item">
                  <div className="highlight-number">5+</div>
                  <div className="highlight-label">Anos de Experiência</div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-number">100+</div>
                  <div className="highlight-label">Projetos Entregues</div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-number">50+</div>
                  <div className="highlight-label">Clientes Satisfeitos</div>
                </div>
              </div>
              <Link href="/sobre" className="btn-primary">
                <span className="btn-icon">📖</span>
                Conheça Nossa História
              </Link>
            </div>
            <div className="about-visual-side">
              <div className="about-image-container">
                <div className="image-frame">
                  <img src="/images/huios-about.png" alt="Huios Consultoria" className="about-main-image" />
                  <div className="image-glow"></div>
                </div>
                <div className="floating-elements">
                  <div className="floating-card card-1">
                    <div className="card-icon">🔧</div>
                    <div className="card-text">Mikrotik</div>
                  </div>
                  <div className="floating-card card-2">
                    <div className="card-icon">📡</div>
                    <div className="card-text">Huawei</div>
                  </div>
                  <div className="floating-card card-3">
                    <div className="card-icon">📊</div>
                    <div className="card-text">Monitoramento</div>
                  </div>
                  <div className="floating-card card-4">
                    <div className="card-icon">⚙️</div>
                    <div className="card-text">Automação</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding stats-section">
        <div className="container">
          <div className="stats-wrapper">
            <div className="stats-grid">
              {[
                { number: "100+", label: "Projetos Entregues", icon: "🎯" },
                { number: "50+", label: "Clientes Satisfeitos", icon: "😊" },
                { number: "5+", label: "Anos de Experiência", icon: "⭐" },
                { number: "24/7", label: "Suporte Técnico", icon: "🛠️" },
              ].map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-icon">{stat.icon}</div>
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                  <div className="stat-glow"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
