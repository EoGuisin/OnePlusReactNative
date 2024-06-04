const InitialState: any = []

const ProviderSummary = (state = InitialState, action: { type: string, payload: any}) => {  
    
  switch(action.type) {
    case '@summaryprovider/ADD_PROVIDER_SUMMARY':
      return action.payload
    case '@summaryprovider/INITIAL_STATE':
      return InitialState;
    default:
      return state;
  }
}

export default ProviderSummary;