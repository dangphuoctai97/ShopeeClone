type Role = 'User' | 'Admin'

export interface User {
  _id: string
  roles: Role[]
  email: string
  name: string
  data_of_birth: null
  address: string
  phone: string
  createAt: string
  updateAt: string
}
