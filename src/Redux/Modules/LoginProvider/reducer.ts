const InitialState: any = []

const ProviderLogin = (state = InitialState, action: { type: string, payload: any}) => {  
    
  switch(action.type) {
    case '@loginprovider/ADD_PROVIDER_LOGIN':
      return action.payload
    case '@loginprovider/INITIAL_STATE':
      return InitialState;
    default:
      return state;
  }
}

export default ProviderLogin;