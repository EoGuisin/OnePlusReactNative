const InitialState: any = {
  item: []
}

const ProponentLead = (state = InitialState, action: { type: string, payload: any}) => {

  switch(action.type) {
    case '@proponent/ADD_PROPONENT':
      return {
        ...state,
        item: state.item.concat(action.payload)
      }
    case '@proponent/INITIAL_STATE':
      return InitialState;
    default:
      return state;
  }
}

export default ProponentLead;