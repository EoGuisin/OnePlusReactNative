export function AddToProponentLead(Proponent: any) {
  return {
      type: '@proponent/ADD_PROPONENT',
      payload: Proponent,
    };
}

export function InitialState() {
  return {
    type: '@proponent/INITIAL_STATE',
  };
}
