export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
export const isValidPhone = (phone) => /^[6-9]\d{9}$/.test(phone.replace(/\s/g, ''))