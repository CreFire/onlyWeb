
// src/api/user.ts

import axios from 'axios'

export async function getUserList() {
  // Replace with your real API endpoint
  return axios.get('/api/users')
}

export async function createUser(user: { username: string; email: string; tenant: string }) {
  // Replace with your real API endpoint
  return axios.post('/api/users', user)
}
