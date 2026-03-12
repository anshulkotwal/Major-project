const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const validatePassword = (password) => {
  return password.length >= 6
}

const validateScore = (score) => {
  return score >= 0 && score <= 100
}

module.exports = {
  validateEmail,
  validatePassword,
  validateScore
}
