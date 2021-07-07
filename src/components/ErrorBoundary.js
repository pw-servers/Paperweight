import React from "react";
import {ExclamationTriangleFill} from "react-bootstrap-icons";

// From React docs
export class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {    // Update state so the next render will show the fallback UI.
        return { hasError: true };

    }

    componentDidCatch(error, errorInfo) {    // You can also log the error to an error reporting service
        console.log(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {      // You can render any custom fallback UI
            return (
                <div className="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                    <ExclamationTriangleFill className="text-muted" />
                    <span className="text-muted text-center">Something went wrong.</span>
                </div>
            )
        }
        return this.props.children;
    }
}