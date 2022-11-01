export interface JwtModel {
    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string
    jti: string
    "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string
    exp: number
    iss: string
    aud: string
  }
  