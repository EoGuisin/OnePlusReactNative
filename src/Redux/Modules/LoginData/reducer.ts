const InitialState: any = []

const DataLogin = (state = InitialState, action: { type: string, payload: any}) => {  
    
  switch(action.type) {
    case '@logindata/ADD_DATA_LOGIN':
      return action.payload
    case '@logindata/INITIAL_STATE':
      return InitialState;
    default:
      return state;
  }
}

export default DataLogin;