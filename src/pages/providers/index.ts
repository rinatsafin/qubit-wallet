import compose from 'compose-function';

import withErrorBoundary from './withErrorBoundary';
import withWagmi from './withWagmi';

const withProviders = compose(withErrorBoundary, withWagmi);

export default withProviders;
