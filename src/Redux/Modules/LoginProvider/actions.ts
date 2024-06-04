export function AddToLoginProvider(ProviderLogin: any) {
  return {
    type: '@loginprovider/ADD_PROVIDER_LOGIN',
    payload: ProviderLogin
  }
}

export function InitialState() {
  return {
    type: '@loginprovider/INITIAL_STATE',
  }
}
