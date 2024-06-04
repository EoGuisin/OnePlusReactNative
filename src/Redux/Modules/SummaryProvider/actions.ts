export function AddToSummaryProvider(ProviderSummary: any) {
  return {
    type: '@summaryprovider/ADD_PROVIDER_SUMMARY',
    payload: ProviderSummary,
  }
}

export function InitialState() {
  return {
    type: '@summaryprovider/INITIAL_STATE',
  }
}
