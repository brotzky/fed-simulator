const constants = {
  development: {
    baseUrl: "http://localhost:3000/",
  },
  production: {
    baseUrl: "/",
  },
}

export default constants[process.env.NODE_ENV]
