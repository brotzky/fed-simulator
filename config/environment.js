const setEnvs = {}
const setEnvDefault = (key, val) => {
  if (!process.env[key]) {
    process.env[key] = val
  }
  setEnvs[key] = process.env[key]
}

setEnvDefault('NODE_ENV', 'development')
setEnvDefault('PORT', 3000)
