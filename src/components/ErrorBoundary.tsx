import { Component, type ReactNode } from 'react'

interface Props { children: ReactNode }
interface State { hasError: boolean }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Something went wrong</p>
          <h2 className="mt-3 text-2xl font-bold text-gray-900">Page failed to load</h2>
          <p className="mt-2 max-w-sm text-sm text-gray-500">Try refreshing the page. If the problem persists, contact us at info@supvision.ai</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-colors"
          >
            Refresh page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
