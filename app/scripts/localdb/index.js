import LovefieldProvider from './lovefield.provider';
import LovefieldService from './lovefield.service';

export default angular.module('localDb', [])
  .provider('Lovefield', LovefieldProvider)
  .factory('LovefieldService', LovefieldService);
