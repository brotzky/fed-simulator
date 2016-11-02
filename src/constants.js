const constants = {
  development: {
    baseUrl: "http://localhost:3000/",
  },
  production: {
    baseUrl: "https://azz0r.github.io/wwe-draft-generator/",
  },
}

export default constants[process.env.NODE_ENV]
