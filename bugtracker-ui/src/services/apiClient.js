import axios from "axios"
import API_BASE_URL from "../constants"

class ApiClient {
  constructor(remoteHostUrl) {
    this.remoteHostUrl = remoteHostUrl
    this.token = null
    this.tokenName = "bugtracker_token"
  }
  
  setToken(token) {
    this.token = token
    localStorage.setItem(this.tokenName, token)
  }

  async request({ endpoint, method = `GET`, data = {} }) {
    const url = `${this.remoteHostUrl}/${endpoint}`

    const headers = {
      "Content-Type": "application/json",
      Authorization: this.token ? `Bearer ${this.token}` : "",
    }

    try {
      const res = await axios({ url, method, data, headers })
      return { data: res.data, error: null }
    } catch (error) {
      console.error("APIclient.makeRequest.error:")
      console.error({ errorResponse: error.response })
      const message = error?.response?.data?.error?.message
      return { data: null, error: message || String(error) }
    }
  }
  
  //authentication
  async login(credentials) {
    return await this.request({ endpoint: `auth/login`, method: `POST`, data: credentials })
  }
  async signup(credentials) {
    return await this.request({ endpoint: `auth/register`, method: `POST`, data: credentials })
  }
  async fetchUserFromToken() {
    return await this.request({ endpoint: `auth/me`, method: `GET` })
  }
  async fetchUserById(devId) {
    return await this.request({ endpoint: `auth/users/${devId}`, method: `GET`, data: { id: devId }})
  }
  logoutUser() {
    this.setToken(null)
    localStorage.setItem(this.tokenName, "")
  }

  // teams
  async listAllTeams(){
    return await this.request({ endpoint:'team', method: 'GET'})
  }
  async createNewTeam(credentials){
    return await this.request({ endpoint: 'team', method: 'POST', data: credentials })
  }
  async addMemberToTeam({ teamId, memberToAdd}){
    console.log("running new request")
    console.log("MEMBER TO ADD: ", memberToAdd)
    return await this.request({ endpoint: `team/${teamId}/add`, method: 'PATCH',  data: {email: memberToAdd} })
  }

  // projects 
  async getAllProjects(credentials){
    return await this.request({ endpoint: 'project', method: 'GET', data: credentials })
  }


}

// export default new ApiClient(API_BASE_URL || "http://localhost:3001")
export default new ApiClient(API_BASE_URL)