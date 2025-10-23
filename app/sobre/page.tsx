import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Link from "next/link"

export default function Sobre() {
  return (
    <>
      <Header />

      {/* Hero Section */}
      <section className="hero_area" style={{ minHeight: "60vh" }}>
        <div className="hero-particles"></div>
        <div className="hero-background">
          <div className="hero-image-wrapper">
            <img src="/images/huios-about.png" alt="Sobre Huios" className="hero-bg-img" />
            <div className="hero-image-overlay"></div>
          </div>
        </div>
        <div className="container hero-container">
          <div className="page-hero-content">
            <div className="hero-badge">
              <span>🏢</span>
              <span>Sobre Nós</span>
            </div>
            <h1 className="page-hero-title">
              Conheça a{" "}
              <span className="highlight-text">
                Huios Consultoria
                <div className="highlight-decoration"></div>
              </span>
            </h1>
            <p className="page-hero-subtitle">
              Especialistas em soluções tecnológicas para empresas que buscam inovação e excelência
            </p>
          </div>
        </div>
      </section>

      {/* Quem Somos */}
      <section className="section-padding">
        <div className="container">
          <div className="about-intro-grid">
            <div className="about-intro-content">
              <h2 className="section-title">Quem Somos</h2>
              <p className="intro-text">
                A <strong>Huios Consultoria</strong> é uma empresa especializada em soluções tecnológicas, fundada com o
                objetivo de transformar a infraestrutura de TI das empresas na região Norte do Brasil.
              </p>
              <p className="intro-text">
                Nossa equipe é formada por profissionais altamente qualificados e certificados nas principais
                tecnologias do mercado, garantindo que nossos clientes recebam sempre o melhor em consultoria e
                implementação de soluções.
              </p>
              <div className="company-stats">
                <div className="company-stat">
                  <div className="stat-number">2019</div>
                  <div className="stat-label">Ano de Fundação</div>
                </div>
                <div className="company-stat">
                  <div className="stat-number">5+</div>
                  <div className="stat-label">Anos de Experiência</div>
                </div>
                <div className="company-stat">
                  <div className="stat-number">100+</div>
                  <div className="stat-label">Projetos Entregues</div>
                </div>
              </div>
            </div>
            <div className="about-intro-image">
              <div className="intro-image-container">
                <img src="/images/huios-about.png" alt="Huios Consultoria" className="intro-image" />
                <div className="intro-image-overlay">
                  <div className="overlay-content">
                    <h3>Nossa Missão</h3>
                    <p>Transformar empresas através da tecnologia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="section-padding mvv-section">
        <div className="container">
          <div className="heading-container">
            <h2>Nossos Valores</h2>
            <p className="section-subtitle">Os princípios que guiam nossa empresa</p>
          </div>

          <div className="mvv-grid">
            <div className="mvv-card">
              <div className="mvv-header">
                <div className="mvv-icon">🎯</div>
                <h3>Missão</h3>
              </div>
              <p>
                Fornecer soluções tecnológicas inovadoras e de alta qualidade, ajudando empresas a alcançarem seus
                objetivos através da transformação digital.
              </p>
            </div>

            <div className="mvv-card">
              <div className="mvv-header">
                <div className="mvv-icon">👁️</div>
                <h3>Visão</h3>
              </div>
              <p>
                Ser reconhecida como a principal empresa de consultoria em tecnologia da região Norte, expandindo nossa
                atuação para todo o Brasil.
              </p>
            </div>

            <div className="mvv-card">
              <div className="mvv-header">
                <div className="mvv-icon">⭐</div>
                <h3>Valores</h3>
              </div>
              <ul className="values-list">
                <li>Inovação constante</li>
                <li>Excelência técnica</li>
                <li>Transparência total</li>
                <li>Compromisso com resultados</li>
                <li>Responsabilidade social</li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Por que escolher a Huios */}
      <section className="section-padding why-choose-section">
        <div className="container">
          <div className="heading-container">
            <h2>Por que escolher a Huios?</h2>
            <p className="section-subtitle">Nossos diferenciais no mercado</p>
          </div>

          <div className="why-choose-grid">
            <div className="why-choose-item">
              <div className="why-icon">🔍</div>
              <h3>Análise Detalhada</h3>
              <p>Realizamos uma análise completa da sua infraestrutura antes de propor qualquer solução.</p>
            </div>

            <div className="why-choose-item">
              <div className="why-icon">🛠️</div>
              <h3>Equipe Certificada</h3>
              <p>Profissionais com certificações nas principais tecnologias do mercado.</p>
            </div>

            <div className="why-choose-item">
              <div className="why-icon">⚡</div>
              <h3>Implementação Ágil</h3>
              <p>Processos otimizados para entregas rápidas sem comprometer a qualidade.</p>
            </div>

            <div className="why-choose-item">
              <div className="why-icon">🔒</div>
              <h3>Segurança Garantida</h3>
              <p>Implementamos as melhores práticas de segurança em todos os nossos projetos.</p>
            </div>

            <div className="why-choose-item">
              <div className="why-icon">📊</div>
              <h3>Resultados Mensuráveis</h3>
              <p>Acompanhamos métricas e KPIs para garantir o retorno do investimento.</p>
            </div>

            <div className="why-choose-item">
              <div className="why-icon">🔄</div>
              <h3>Suporte Contínuo</h3>
              <p>Oferecemos suporte técnico e monitoramento 24/7 para nossos clientes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Pronto para transformar sua empresa?</h2>
            <p>Entre em contato conosco e descubra como podemos ajudar sua empresa a alcançar o próximo nível</p>
            <div className="cta-buttons">
              <Link href="/contato" className="btn-primary">
                <span className="btn-icon">📞</span>
                Fale Conosco
              </Link>
              <Link href="/portfolio" className="btn-secondary">
                <span className="btn-icon">🎯</span>
                Ver Projetos
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
