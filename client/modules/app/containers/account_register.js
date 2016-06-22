import { useDeps, composeWithTracker, composeAll } from 'mantra-core';
import Component from '../components/account_register';
import { authComposer } from 'meteor-auth';

export const composer = ( { context, clearRegisterErrors }, onData ) => {
  const { LocalState } = context();
  const error = LocalState.get( 'REGISTER_ERROR' );
  onData( null, { error } );

  return clearRegisterErrors;
};

export const depsMapper = ( context, actions ) => ({
  register: actions.accounts.register,
  clearRegisterErrors: actions.accounts.clearRegisterErrors,
  context: () => context,
});

export default composeAll(
  composeWithTracker( composer ),
  composeWithTracker( authComposer ),
  useDeps( depsMapper ),
)( Component );
