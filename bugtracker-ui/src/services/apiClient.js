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
    return await this.request({ endpoint: `auth/users/${devId}`, method: `GET`})
  }
  async checkValidEmail(userEmail){
    return await this.request({ endpoint: `team/user/${userEmail}`, method: `GET`, data: {email: userEmail} })
  }
  logoutUser() {
    this.setToken(null)
    localStorage.setItem(this.tokenName, "")
  }

  // teams
  async listAllTeams(){
    return await this.request({ endpoint:'team', method: 'GET'})
  }
  async fetchTeamById(){
    return await this.request({ endpoint:`team/${teamId}`, method: 'GET'})
  }
  async createNewTeam(credentials){
    return await this.request({ endpoint: 'team', method: 'POST', data: credentials })
  }
  async addMemberToTeam({ teamId, memberToAdd}){
    return await this.request({ endpoint: `team/${teamId}/add`, method: 'PATCH',  data: {email: memberToAdd} })
  }

  // project requests 
  async listAllProjects(credentials){
    return await this.request({ endpoint: 'project', method: 'GET', data: credentials })
  }
  async createNewProject(credentials){
    return await this.request({ endpoint: 'project', method: 'POST', data: credentials })
  }
  async fetchProjectById(projectId){
    return await this.request({ endpoint: `project/:${projectId}`, method: 'GET'})
  }
  async updateProject({ projectId, projectInfo}){
    return await this.request({ endpoint: `project/${projectId}/update`, method: 'PATCH',  data: projectInfo })
  }

}

// export default new ApiClient(API_BASE_URL || "http://localhost:3001")
export default new ApiClient(API_BASE_URL)