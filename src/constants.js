const constants = {
  development: {
    baseUrl: 'http://localhost:8080/',
  },
  production: {
    baseUrl: '/',
  },
}

export default constants[process.env.NODE_ENV]
