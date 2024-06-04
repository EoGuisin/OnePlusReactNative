export function AddToLoginData(DataLogin: any) {
  return {
    type: '@logindata/ADD_DATA_LOGIN',
    payload: DataLogin
  }
}

export function InitialState() {
  return {
    type: '@logindata/INITIAL_STATE',
  }
}
