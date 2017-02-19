import LovefieldProvider from './lovefield.provider';

export default angular.module('localDb', [])
  .provider('Lovefield', LovefieldProvider);
