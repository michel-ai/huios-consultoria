// Contact page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")
  const submitButton = document.getElementById("submitButton")
  const buttonText = document.getElementById("buttonText")
  const successMessage = document.getElementById("successMessage")
  const errorMessage = document.getElementById("errorMessage")
  const errorText = document.getElementById("errorText")

  // Form submission handler
  if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault()

      // Validate form
      if (!window.validateForm(contactForm)) {
        showError("Por favor, preencha todos os campos obrigatórios corretamente.")
        return
      }

      // Show loading state
      const originalText = window.HuiosUtils.showLoading(submitButton, "Enviando...")

      try {
        // Get form data
        const formData = new FormData(contactForm)
        const data = Object.fromEntries(formData.entries())

        // Simulate API call (replace with actual endpoint)
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        })

        if (response.ok) {
          showSuccess()
          contactForm.reset()
        } else {
          const errorData = await response.json()
          showError(errorData.message || "Erro ao enviar mensagem. Tente novamente.")
        }
      } catch (error) {
        console.error("Error submitting form:", error)
        showError("Erro de conexão. Verifique sua internet e tente novamente.")
      } finally {
        // Hide loading state
        window.HuiosUtils.hideLoading(submitButton, originalText)
      }
    })
  }

  // Show success message
  function showSuccess() {
    hideError()
    window.showElement(successMessage)

    // Scroll to success message
    successMessage.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })

    // Show notification
    window.HuiosUtils.showNotification("Mensagem enviada com sucesso! Entraremos em contato em breve.", "success", 8000)
  }

  // Show error message
  function showError(message) {
    hideSuccess()
    errorText.textContent = message
    window.showElement(errorMessage)

    // Scroll to error message
    errorMessage.scrollIntoView({
      behavior: "smooth",
      block: "center",
    })

    // Show notification
    window.HuiosUtils.showNotification(message, "error", 5000)
  }

  // Hide success message
  function hideSuccess() {
    if (successMessage.style.display !== "none") {
      window.hideElement(successMessage)
    }
  }

  // Hide error message
  function hideError() {
    if (errorMessage.style.display !== "none") {
      window.hideElement(errorMessage)
    }
  }

  // Real-time form validation
  const formInputs = contactForm?.querySelectorAll("input, textarea, select")
  formInputs?.forEach((input) => {
    input.addEventListener("blur", () => {
      validateField(input)
    })

    input.addEventListener("input", () => {
      // Clear error styling on input
      if (input.style.borderColor === "rgb(255, 0, 0)") {
        input.style.borderColor = ""
      }
    })
  })

  // Validate individual field
  function validateField(field) {
    let isValid = true

    // Required field validation
    if (field.hasAttribute("required") && !field.value.trim()) {
      field.style.borderColor = "#ff0000"
      isValid = false
    }

    // Email validation
    if (field.type === "email" && field.value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(field.value)) {
        field.style.borderColor = "#ff0000"
        isValid = false
      }
    }

    // Phone validation (Brazilian format)
    if (field.type === "tel" && field.value) {
      const phoneRegex = /^$$\d{2}$$\s\d{4,5}-\d{4}$/
      if (!phoneRegex.test(field.value)) {
        field.style.borderColor = "#ff0000"
        isValid = false
      }
    }

    if (isValid) {
      field.style.borderColor = ""
    }

    return isValid
  }

  // Auto-resize textarea
  const textareas = document.querySelectorAll("textarea")
  textareas.forEach((textarea) => {
    textarea.addEventListener("input", function () {
      this.style.height = "auto"
      this.style.height = this.scrollHeight + "px"
    })
  })

  // Character counter for textarea
  const messageTextarea = document.querySelector('textarea[name="mensagem"]')
  if (messageTextarea) {
    const maxLength = 1000

    // Create character counter
    const counter = document.createElement("div")
    counter.className = "character-counter"
    counter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: rgba(255, 255, 255, 0.6);
            margin-top: 5px;
        `

    messageTextarea.parentNode.insertBefore(counter, messageTextarea.nextSibling)

    // Update counter
    function updateCounter() {
      const remaining = maxLength - messageTextarea.value.length
      counter.textContent = `${messageTextarea.value.length}/${maxLength} caracteres`

      if (remaining < 50) {
        counter.style.color = "#ff0000"
      } else if (remaining < 100) {
        counter.style.color = "#ffa502"
      } else {
        counter.style.color = "rgba(255, 255, 255, 0.6)"
      }
    }

    messageTextarea.addEventListener("input", updateCounter)
    updateCounter() // Initial update
  }

  // Service selection enhancement
  const serviceSelect = document.querySelector('select[name="servico"]')
  if (serviceSelect) {
    serviceSelect.addEventListener("change", function () {
      if (this.value) {
        this.style.color = "#15ff00"
      } else {
        this.style.color = "rgba(21, 255, 0, 0.6)"
      }
    })
  }

  // Add floating labels effect
  const formControls = document.querySelectorAll(".form-control")
  formControls.forEach((control) => {
    if (control.tagName !== "SELECT") {
      control.addEventListener("focus", function () {
        this.parentNode.classList.add("focused")
      })

      control.addEventListener("blur", function () {
        if (!this.value) {
          this.parentNode.classList.remove("focused")
        }
      })

      // Check if field has value on load
      if (control.value) {
        control.parentNode.classList.add("focused")
      }
    }
  })

  console.log("Contact page loaded successfully! 📧")
})

// Utility function for contact form
window.ContactUtils = {
  // Format phone number as user types
  formatPhoneInput: (input) => {
    let value = input.value.replace(/\D/g, "")

    if (value.length >= 11) {
      value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    } else if (value.length >= 7) {
      value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3")
    } else if (value.length >= 3) {
      value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2")
    }

    input.value = value
  },

  // Validate Brazilian phone number
  isValidPhone: (phone) => {
    const cleaned = phone.replace(/\D/g, "")
    return cleaned.length === 10 || cleaned.length === 11
  },

  // Get form data as object
  getFormData: (form) => {
    const formData = new FormData(form)
    const data = {}

    for (const [key, value] of formData.entries()) {
      data[key] = value.trim()
    }

    return data
  },

  // Clear form with animation
  clearForm: (form) => {
    const inputs = form.querySelectorAll("input, textarea, select")

    inputs.forEach((input, index) => {
      setTimeout(() => {
        input.value = ""
        input.style.borderColor = ""
        input.parentNode.classList.remove("focused")
      }, index * 50)
    })
  },
}
