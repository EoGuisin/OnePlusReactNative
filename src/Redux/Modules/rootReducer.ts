import { combineReducers } from 'redux';

import DataLogin from './LoginData/reducer';
import SelectedCompany from './SelectedCompany/reducer';
import ProponentLead from './Proponents/reducer';
import ProviderLogin from './LoginProvider/reducer';
import ProviderSummary from './SummaryProvider/reducer';

export default combineReducers({
    DataLogin,
    SelectedCompany,
    ProponentLead,
    ProviderLogin,
    ProviderSummary,
});