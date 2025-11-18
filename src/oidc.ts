import { UserManager } from 'oidc-client-ts'

const cognitoAuthConfig = {
  authority: 'https://cognito-idp.ap-northeast-1.amazonaws.com/ap-northeast-1_homrqmZEM',
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_CLOUD_FRONT,
  response_type: 'code',
  scope: 'email openid phone',
}

// create a UserManager instance
export const userManager = new UserManager({
  ...cognitoAuthConfig,
})

export async function signOutRedirect() {
  const clientId = import.meta.env.VITE_COGNITO_CLIENT_ID
  const logoutUri = import.meta.env.VITE_CLOUD_FRONT
  const cognitoDomain = 'https://ap-northeast-1homrqmzem.auth.ap-northeast-1.amazoncognito.com'
  window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`
}
