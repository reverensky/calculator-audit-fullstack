import { Component } from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };

    this.handleResetError = this.handleResetError.bind(this);
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleResetError() {
    this.setState({ hasError: false });
  }

  renderFallbackUI() {
    return (
      <div className="page gap-[16px] w-screen h-screen flex items-center justify-center">
        <h1>Something went wrong. Please try again later.</h1>
        {/* <Link
          to="/"
          onClick={this.handleResetError}
          className="whitespace-nowrap"
        >
          Back to Wallet
        </Link> */}
      </div>
    );
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return this.renderFallbackUI();
    }

    return children;
  }
}

export default ErrorBoundary;
