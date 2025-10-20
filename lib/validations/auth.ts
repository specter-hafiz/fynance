/**
 * Validates email format
 * @param email - Email address to validate
 * @returns Error message if invalid, null if valid
 */
export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email.trim()) {
    return "Email is required";
  }

  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }

  return null;
};

/**
 * Validates password strength
 * @param password - Password to validate
 * @returns Error message if invalid, null if valid
 */
export const validatePassword = (password: string): string | null => {
  if (!password) {
    return "Password is required";
  }

  if (password.length < 8) {
    return "Password must be at least 8 characters";
  }

  // Check for uppercase letter
  if (!/[A-Z]/.test(password)) {
    return "Password must contain at least one uppercase letter";
  }

  // Check for lowercase letter
  if (!/[a-z]/.test(password)) {
    return "Password must contain at least one lowercase letter";
  }

  // Check for number or special character
  if (!/[\d!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return "Password must contain at least one number or special character";
  }

  return null;
};

/**
 * Validates if two passwords match
 * @param password - Original password
 * @param confirmPassword - Confirmation password
 * @returns Error message if they don't match, null if they match
 */
export const validatePasswordMatch = (
  password: string,
  confirmPassword: string
): string | null => {
  if (!confirmPassword) {
    return "Please confirm your password";
  }

  if (password !== confirmPassword) {
    return "Passwords do not match";
  }

  return null;
};

/**
 * Validates name field (first name or last name)
 * @param name - Name to validate
 * @param fieldName - Display name for error message (e.g., "First name")
 * @returns Error message if invalid, null if valid
 */
export const validateName = (
  name: string,
  fieldName: string
): string | null => {
  if (!name.trim()) {
    return `${fieldName} is required`;
  }

  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }

  // Only allow letters, spaces, hyphens, and apostrophes
  if (!/^[a-zA-Z\s'-]+$/.test(name)) {
    return `${fieldName} can only contain letters, spaces, hyphens, and apostrophes`;
  }

  return null;
};
