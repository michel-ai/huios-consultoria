import Link from "next/link"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="grid grid-4 mb-6">
          <div>
            <h3 style={{ color: "#15ff00", marginBottom: "20px", fontSize: "1.2rem" }}>Empresa</h3>
            <ul style={{ listStyle: "none" }}>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/sobre" style={{ color: "#ffffff", textDecoration: "none" }}>
                  Sobre Nós
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/servicos" style={{ color: "#ffffff", textDecoration: "none" }}>
                  Nossos Serviços
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/portfolio" style={{ color: "#ffffff", textDecoration: "none" }}>
                  Portfólio
                </Link>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <Link href="/contato" style={{ color: "#ffffff", textDecoration: "none" }}>
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: "#15ff00", marginBottom: "20px", fontSize: "1.2rem" }}>Serviços</h3>
            <ul style={{ listStyle: "none" }}>
              <li style={{ marginBottom: "10px", color: "#ffffff" }}>Mikrotik</li>
              <li style={{ marginBottom: "10px", color: "#ffffff" }}>Huawei</li>
              <li style={{ marginBottom: "10px", color: "#ffffff" }}>Datacom</li>
              <li style={{ marginBottom: "10px", color: "#ffffff" }}>Monitoramentos</li>
              <li style={{ marginBottom: "10px", color: "#ffffff" }}>Automações</li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: "#15ff00", marginBottom: "20px", fontSize: "1.2rem" }}>Contato</h3>
            <div style={{ color: "#ffffff" }}>
              <p style={{ marginBottom: "10px" }}>📍 Belém, PA</p>
              <p style={{ marginBottom: "10px" }}>📞 (91) 9860-66544</p>
              <p style={{ marginBottom: "10px" }}>✉️ huiosconsutoria@gmail.com</p>
            </div>
          </div>

          <div>
            <h3 style={{ color: "#15ff00", marginBottom: "20px", fontSize: "1.2rem" }}>Redes Sociais</h3>
            <div style={{ display: "flex", gap: "15px" }}>
              <a href="#" style={{ color: "#15ff00", fontSize: "1.5rem" }}>
                📘
              </a>
              <a href="#" style={{ color: "#15ff00", fontSize: "1.5rem" }}>
                📷
              </a>
              <a href="#" style={{ color: "#15ff00", fontSize: "1.5rem" }}>
                🐦
              </a>
              <a href="#" style={{ color: "#15ff00", fontSize: "1.5rem" }}>
                💼
              </a>
            </div>
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(21, 255, 0, 0.2)",
            paddingTop: "30px",
            textAlign: "center",
            color: "#ffffff",
          }}
        >
          <p>&copy; 2024 Huios Consultoria. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
