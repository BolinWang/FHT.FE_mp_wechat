/* 手机号 */
const validateMobile = mobile => {
  const reg = /^1[23456789]\d{9}$/
  return reg.test(mobile)
}

/* 合法URL */
const validateURL = url => {
  const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return urlregex.test(url)
}

/* 小写字母 */
const validateLowerCase = str => {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/* 大写字母 */
const validateUpperCase = str => {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/* 大小写字母 */
const validatAlphabets = str => {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

module.exports = {
  validateMobile,
  validateURL,
  validateLowerCase,
  validateUpperCase,
  validatAlphabets
}
