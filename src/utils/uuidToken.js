import { v4 as uuidv4 } from 'uuid'

export const getUUID = () => {
  let uuidToken = localStorage.getItem('UUIDTOKEN')
  if (!uuidToken) {
    uuidToken = uuidv4()
    localStorage.setItem('UUIDTOKEN', uuidToken)
  }
  return uuidToken
}
