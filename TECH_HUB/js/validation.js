// ============================================
// TECH HUB - Form Validation
// ============================================

class FormValidator {
    constructor() {
        this.errors = {};
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^[0-9]{11}$/;
        return phoneRegex.test(phone.replace(/[-\s]/g, ''));
    }

    validatePassword(password) {
        return password.length >= 6;
    }

    validateRequired(value) {
        return value.trim() !== '';
    }

    showError(inputElement, message) {
        const formGroup = inputElement.closest('.form-group');
        if (!formGroup) return;

        // Remove existing error
        const existingError = formGroup.querySelector('.error-message');
        if (existingError) existingError.remove();

        // Add error class
        inputElement.classList.add('error');

        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        formGroup.appendChild(errorDiv);
    }

    clearError(inputElement) {
        const formGroup = inputElement.closest('.form-group');
        if (!formGroup) return;

        inputElement.classList.remove('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) errorMessage.remove();
    }

    validateForm(formElement) {
        let isValid = true;
        const inputs = formElement.querySelectorAll('input[required], textarea[required], select[required]');

        inputs.forEach(input => {
            this.clearError(input);

            if (!this.validateRequired(input.value)) {
                this.showError(input, 'This field is required');
                isValid = false;
                return;
            }

            if (input.type === 'email' && !this.validateEmail(input.value)) {
                this.showError(input, 'Please enter a valid email address');
                isValid = false;
            }

            if (input.type === 'tel' && !this.validatePhone(input.value)) {
                this.showError(input, 'Please enter a valid phone number (11 digits)');
                isValid = false;
            }

            if (input.type === 'password' && !this.validatePassword(input.value)) {
                this.showError(input, 'Password must be at least 6 characters');
                isValid = false;
            }
        });

        return isValid;
    }

    setupRealTimeValidation(formElement) {
        const inputs = formElement.querySelectorAll('input, textarea, select');

        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                if (input.hasAttribute('required')) {
                    this.clearError(input);

                    if (!this.validateRequired(input.value)) {
                        this.showError(input, 'This field is required');
                    } else if (input.type === 'email' && !this.validateEmail(input.value)) {
                        this.showError(input, 'Please enter a valid email address');
                    } else if (input.type === 'tel' && !this.validatePhone(input.value)) {
                        this.showError(input, 'Please enter a valid phone number');
                    } else if (input.type === 'password' && !this.validatePassword(input.value)) {
                        this.showError(input, 'Password must be at least 6 characters');
                    }
                }
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('error')) {
                    this.clearError(input);
                }
            });
        });
    }
}

// Initialize form validator
const formValidator = new FormValidator();

// Make globally accessible
window.formValidator = formValidator;
