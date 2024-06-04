export function SelectedCompany( SelectedCompany: any) {
  return {
    type: '@selectedCompany/ADD_SelectedCompany',
    payload: SelectedCompany
  }
}

export function InitialState() {
  return {
    type: '@selectedCompany/INITIAL_STATE',
  }
}