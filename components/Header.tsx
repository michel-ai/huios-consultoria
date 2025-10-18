"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"

export default function Header() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMobileMenuOpen])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/sobre", label: "Sobre" },
    { href: "/servicos", label: "O que fazemos" },
    { href: "/portfolio", label: "Portfólio" },
    { href: "/contato", label: "Contate-nos" },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleLinkClick = (href: string) => {
    setIsMobileMenuOpen(false)
    // Pequeno delay para permitir que o menu feche antes da navegação
    setTimeout(() => {
      window.location.href = href
    }, 100)
  }

  return (
    <>
      <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="navbar-content">
            <Link href="/" className="navbar-brand" onClick={closeMobileMenu}>
              <div className="logo-container">
                <div className="logo-text">
                  HUIOS
                </div>
              </div>
            </Link>

            <button
              className={`mobile-menu-toggle ${isMobileMenuOpen ? "active" : ""}`}
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </button>

            {/* Desktop Menu */}
            <ul className="navbar-nav desktop-nav">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={`nav-link ${pathname === item.href ? "active" : ""}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={closeMobileMenu} />
          <div className="mobile-menu">
            <div className="mobile-menu-header">
              <h3>Menu</h3>
              <button className="close-button" onClick={closeMobileMenu}>
                ✕
              </button>
            </div>
            <ul className="mobile-menu-nav">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`mobile-nav-link ${pathname === item.href ? "active" : ""}`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      <style jsx>{`
        .navbar {
          background: rgba(0, 0, 0, 0.95);
          backdrop-filter: blur(20px);
          padding: 15px 0;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          border-bottom: 1px solid rgba(21, 255, 0, 0.1);
        }

        .navbar.scrolled {
          background: rgba(0, 0, 0, 0.98);
          padding: 12px 0;
          border-bottom: 1px solid rgba(21, 255, 0, 0.2);
          box-shadow: 0 2px 20px rgba(0, 0, 0, 0.5);
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }

        .logo-container {
          height: 50px;
          display: flex;
          align-items: center;
          position: relative;
          padding: 5px;
        }

        .logo-img {
          height: 100%;
          width: auto;
          object-fit: contain;
          filter: brightness(1.1) contrast(1.1) drop-shadow(0 0 10px rgba(21, 255, 0, 0.3));
          transition: all 0.3s ease;
          border-radius: 8px;
        }

        .logo-img:hover {
          filter: brightness(1.3) contrast(1.2) drop-shadow(0 0 20px rgba(21, 255, 0, 0.6));
          transform: scale(1.05);
        }

        .mobile-menu-toggle {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 50px;
          height: 50px;
          background: rgba(21, 255, 0, 0.1);
          border: 2px solid rgba(21, 255, 0, 0.4);
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1002;
        }

        .mobile-menu-toggle:hover {
          background: rgba(21, 255, 0, 0.2);
          border-color: #15ff00;
          box-shadow: 0 0 15px rgba(21, 255, 0, 0.4);
        }

        .mobile-menu-toggle.active {
          background: rgba(21, 255, 0, 0.3);
          border-color: #15ff00;
        }

        .hamburger-line {
          width: 26px;
          height: 3px;
          background: #15ff00;
          margin: 3px 0;
          transition: all 0.3s ease;
          border-radius: 2px;
        }

        .mobile-menu-toggle.active .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(6px, 6px);
        }

        .mobile-menu-toggle.active .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .mobile-menu-toggle.active .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
        }

        /* Desktop Navigation */
        .desktop-nav {
          display: flex;
          list-style: none;
          gap: 30px;
          align-items: center;
          margin: 0;
          padding: 0;
        }

        .nav-link {
          color: #ffffff;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.3s ease;
          position: relative;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 1rem;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #15ff00;
          background: rgba(21, 255, 0, 0.1);
        }

        /* Mobile Menu Overlay */
        .mobile-menu-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          z-index: 1001;
          backdrop-filter: blur(5px);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          right: 0;
          width: 350px;
          height: 100vh;
          background: #000000;
          border-left: 3px solid #15ff00;
          z-index: 1002;
          overflow-y: auto;
          box-shadow: -10px 0 30px rgba(0, 0, 0, 0.8);
          animation: slideIn 0.3s ease-out;
        }

        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 30px;
          border-bottom: 2px solid rgba(21, 255, 0, 0.3);
          background: rgba(21, 255, 0, 0.05);
        }

        .mobile-menu-header h3 {
          color: #15ff00;
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
        }

        .close-button {
          background: none;
          border: none;
          color: #15ff00;
          font-size: 2rem;
          cursor: pointer;
          padding: 5px;
          line-height: 1;
          transition: all 0.3s ease;
        }

        .close-button:hover {
          color: #ffffff;
          transform: scale(1.1);
        }

        .mobile-menu-nav {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .mobile-menu-nav li {
          border-bottom: 1px solid rgba(21, 255, 0, 0.1);
        }

        .mobile-menu-nav li:last-child {
          border-bottom: none;
        }

        .mobile-nav-link {
          display: block;
          width: 100%;
          padding: 25px 30px;
          color: #ffffff;
          text-decoration: none;
          font-size: 1.2rem;
          font-weight: 600;
          text-align: left;
          transition: all 0.3s ease;
          position: relative;
          border: none;
          background: none;
          cursor: pointer;
        }

        .mobile-nav-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 5px;
          background: #15ff00;
          transform: scaleY(0);
          transition: transform 0.3s ease;
        }

        .mobile-nav-link:hover,
        .mobile-nav-link.active {
          background: rgba(21, 255, 0, 0.15);
          color: #15ff00;
          transform: translateX(15px);
        }

        .mobile-nav-link:hover::before,
        .mobile-nav-link.active::before {
          transform: scaleY(1);
        }

        .mobile-nav-link:active {
          background: rgba(21, 255, 0, 0.25);
          transform: translateX(10px);
        }

        @media (max-width: 768px) {
          .mobile-menu-toggle {
            display: flex !important;
          }
          
          .desktop-nav {
            display: none !important;
          }
        }
        
        @media (max-width: 480px) {
          .logo-container {
            height: 45px;
          }

          .mobile-menu-toggle {
            width: 45px;
            height: 45px;
          }

          .hamburger-line {
            width: 24px;
          }

          .mobile-menu {
            width: 300px;
          }

          .mobile-menu-header {
            padding: 20px 25px;
          }

          .mobile-nav-link {
            padding: 20px 25px;
            font-size: 1.1rem;
          }
        }

        @media (max-width: 360px) {
          .mobile-menu {
            width: 280px;
          }

          .mobile-menu-header {
            padding: 18px 20px;
          }

          .mobile-nav-link {
            padding: 18px 20px;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  )
}
