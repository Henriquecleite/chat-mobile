import request from '../utils/request'

const signupRequest = async (email: string, name: string, password: string) => {
  const data = { email, name, password }

  try {
    const res = await request.put('/auth/signup', data)

    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, data: error.response.data }
  }
}

const signinRequest = async (email: string, password: string) => {
  const data = { email, password }

  try {
    const res = await request.post('/auth/signin', data)

    return { success: true, data: res.data }
  } catch (error) {
    return { success: false, data: error.response.data }
  }
}

export { signupRequest, signinRequest }
