// Main JavaScript file for Huios Consultoria website

// Mobile Menu Functionality
document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuToggle = document.getElementById("mobileMenuToggle")
  const mobileMenu = document.getElementById("mobileMenu")
  const mobileMenuOverlay = document.getElementById("mobileMenuOverlay")
  const closeButton = document.getElementById("closeButton")
  const navbar = document.getElementById("navbar")

  // Toggle mobile menu
  function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle("active")
    mobileMenu.classList.toggle("active")
    mobileMenuOverlay.style.display = mobileMenu.classList.contains("active") ? "block" : "none"
    document.body.style.overflow = mobileMenu.classList.contains("active") ? "hidden" : ""
  }

  // Close mobile menu
  function closeMobileMenu() {
    mobileMenuToggle.classList.remove("active")
    mobileMenu.classList.remove("active")
    mobileMenuOverlay.style.display = "none"
    document.body.style.overflow = ""
  }

  // Event listeners
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener("click", toggleMobileMenu)
  }

  if (closeButton) {
    closeButton.addEventListener("click", closeMobileMenu)
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener("click", closeMobileMenu)
  }

  // Close menu when clicking on nav links
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu)
  })

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled")
      } else {
        navbar.classList.remove("scrolled")
      }
    }
  })

  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80 // Account for fixed navbar
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })

  // Add loading animation to buttons
  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary")
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      // Add a subtle loading effect
      this.style.transform = "scale(0.98)"
      setTimeout(() => {
        this.style.transform = ""
      }, 150)
    })
  })

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe elements for animation
  const animatedElements = document.querySelectorAll(
    ".service-card, .stat-card, .mvv-card, .team-member, .why-choose-item",
  )
  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })

  // Counter animation for stats
  function animateCounter(element, target, duration = 2000) {
    let start = 0
    const increment = target / (duration / 16)

    function updateCounter() {
      start += increment
      if (start < target) {
        element.textContent = Math.floor(start)
        requestAnimationFrame(updateCounter)
      } else {
        element.textContent = target
      }
    }

    updateCounter()
  }

  // Animate counters when they come into view
  const statNumbers = document.querySelectorAll(".stat-number, .highlight-number")
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = Number.parseInt(entry.target.textContent.replace(/\D/g, ""))
          if (target && !entry.target.classList.contains("animated")) {
            entry.target.classList.add("animated")
            animateCounter(entry.target, target)
          }
        }
      })
    },
    { threshold: 0.5 },
  )

  statNumbers.forEach((stat) => {
    statsObserver.observe(stat)
  })

  // Form validation helper
  window.validateForm = (form) => {
    const requiredFields = form.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.value.trim()) {
        field.style.borderColor = "#ff0000"
        isValid = false
      } else {
        field.style.borderColor = ""
      }
    })

    // Email validation
    const emailFields = form.querySelectorAll('input[type="email"]')
    emailFields.forEach((field) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (field.value && !emailRegex.test(field.value)) {
        field.style.borderColor = "#ff0000"
        isValid = false
      }
    })

    return isValid
  }

  // Show/hide elements with animation
  window.showElement = (element, display = "block") => {
    element.style.display = display
    element.style.opacity = "0"
    element.style.transform = "translateY(-10px)"

    setTimeout(() => {
      element.style.transition = "opacity 0.3s ease, transform 0.3s ease"
      element.style.opacity = "1"
      element.style.transform = "translateY(0)"
    }, 10)
  }

  window.hideElement = (element) => {
    element.style.transition = "opacity 0.3s ease, transform 0.3s ease"
    element.style.opacity = "0"
    element.style.transform = "translateY(-10px)"

    setTimeout(() => {
      element.style.display = "none"
    }, 300)
  }

  // Utility function to format currency
  window.formatCurrency = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value)

  // Utility function to format phone number
  function formatPhone(phone) {
    const cleaned = phone.replace(/\D/g, "")
    const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/)
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`
    }
    return phone
  }

  // Add phone formatting to phone inputs
  const phoneInputs = document.querySelectorAll('input[type="tel"]')
  phoneInputs.forEach((input) => {
    input.addEventListener("input", function () {
      this.value = formatPhone(this.value)
    })
  })

  console.log("Huios Consultoria - Website loaded successfully! 🚀")
})

// Utility functions for other pages
window.HuiosUtils = {
  // Show loading state
  showLoading: (button, text = "Carregando...") => {
    const originalText = button.innerHTML
    button.innerHTML = `<span style="margin-right: 10px">🔄</span>${text}`
    button.disabled = true
    button.style.opacity = "0.7"
    return originalText
  },

  // Hide loading state
  hideLoading: (button, originalText) => {
    button.innerHTML = originalText
    button.disabled = false
    button.style.opacity = "1"
  },

  // Show notification
  showNotification: (message, type = "success", duration = 5000) => {
    const notification = document.createElement("div")
    notification.className = `notification notification-${type}`
    notification.innerHTML = `
            <div style="display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 1.5rem;">${type === "success" ? "✅" : "❌"}</span>
                <span>${message}</span>
            </div>
        `

    notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === "success" ? "rgba(21, 255, 0, 0.1)" : "rgba(255, 0, 0, 0.1)"};
            border: 1px solid ${type === "success" ? "#15ff00" : "#ff0000"};
            color: ${type === "success" ? "#15ff00" : "#ff0000"};
            padding: 15px 20px;
            border-radius: 10px;
            z-index: 10000;
            backdrop-filter: blur(10px);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `

    document.body.appendChild(notification)

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)"
    }, 100)

    // Animate out and remove
    setTimeout(() => {
      notification.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification)
        }
      }, 300)
    }, duration)
  },

  // Debounce function
  debounce: (func, wait) => {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  },
}
