import routes from "../routes"

describe("<Routes />", ()=>{
  it("should always start with /", () => {
    Object.keys(routes).forEach(route => {
      expect(routes[route].path.substr(0,1)).to.equal("/", "route does not start with /")
    })
  })

  it("should always end with /", () => {
    Object.keys(routes).forEach(route => {
      expect(routes[route].path.substr(-1)).to.equal("/", "route does not end with /")
    })
  })
})
