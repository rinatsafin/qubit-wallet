import { type ReactElement } from 'react';
import { ErrorBoundary } from './ErrorBoundary';

const withErrorBoundary = (component: () => ReactElement) => () =>
  <ErrorBoundary>{component()}</ErrorBoundary>;

export default withErrorBoundary;
