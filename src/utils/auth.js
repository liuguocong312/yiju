import Cookies from 'js-cookie'

const TokenKey = 'Token';
const UidKey = 'UUID';

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}


export function getUUID() {
  return Cookies.get(UidKey)
}

export function setUUID(uuid) {
  return Cookies.set(UidKey, uuid)
}

export function removeUUID() {
  return Cookies.remove(UidKey)
}
