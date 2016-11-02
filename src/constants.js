const constants = {
  development: {
    baseUrl: "http://localhost:3000/",
  },
  production: {
    baseUrl: "https://azz0r.github.io/react-base-kit/",
  },
}

export default constants[process.env.NODE_ENV]
