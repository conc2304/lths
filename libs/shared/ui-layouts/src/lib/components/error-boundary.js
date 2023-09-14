/* eslint-disable no-unused-vars */
//source:https://react.dev/reference/react/Component#alternatives

//TODO There is no direct equivalent for componentDidCatch in function components yet. If you’d like to avoid creating class components, write a single ErrorBoundary component like above and use it throughout your app. Alternatively, you can use the react-error-boundary package which does that for you.
// This will be replace with react-error-boundary
import { Component } from 'react';
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMsg: '' };
  }

  static getDerivedStateFromError(_error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, errorMsg: _error };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  componentDidCatch(_error, _info) { }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI otherwise display error message
      const content = this.props.fallback ? this.props.fallback : decodeURI(this.state.errorMsg);
      return <div data-testid="error-boundary">{content}</div>;
    }

    return this.props.children;
  }
}
