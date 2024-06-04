const InitialState: any = []

const SelectedCompany = (state = InitialState, action: { type: string, payload: any}) => {  
    
  switch(action.type) {
    case '@selectedCompany/ADD_SelectedCompany':
      return action.payload
    case '@selectedCompany/INITIAL_STATE':
      return InitialState;
    default:
      return state;
  }
}

export default SelectedCompany;