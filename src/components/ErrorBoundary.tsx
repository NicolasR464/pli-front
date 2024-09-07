'use client'

import React, { Component, ReactNode } from 'react'

interface ErrorBoundaryProps {
    fallback: ReactNode // Fallback UI
    children: ReactNode // Children components
}

interface ErrorBoundaryState {
    hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        // Update state so the next render will show the fallback UI.
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            // Render the fallback UI when an error occurs
            return this.props.fallback
        }

        return this.props.children
    }
}

export default ErrorBoundary
