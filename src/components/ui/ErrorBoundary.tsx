import { Component } from "react";
import type { ErrorInfo, ReactNode } from "react";
import "./ErrorBoundary.css";

interface Props {
  children: ReactNode;
  /** Changing this value clears a caught error (e.g. the route path). */
  resetKey?: string;
}

interface State {
  error: Error | null;
}

/**
 * Last line of defence around the page content.
 *
 * Content comes from a hand-edited projects.json, so a malformed entry
 * is always possible. Data is repaired in data/projects.ts; this
 * catches anything that still slips through and shows a readable panel
 * instead of a blank white screen.
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidUpdate(prev: Props) {
    // A new route gets a clean slate.
    if (this.state.error && prev.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Page failed to render:", error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <main className="errb" id="main">
        <div className="container errb__inner">
          <span className="eyebrow">Terjadi kesalahan · Something went wrong</span>

          <h1 className="errb__title">Halaman ini gagal dimuat.</h1>
          <p className="errb__desc">
            Silakan muat ulang halaman. Jika masalah berlanjut, hubungi tim kami
            melalui WhatsApp.
            <br />
            <span className="errb__en">
              This page failed to load. Please reload; if the problem persists,
              contact our team on WhatsApp.
            </span>
          </p>

          <div className="errb__actions">
            <button
              type="button"
              className="btn btn--primary"
              onClick={() => window.location.reload()}
            >
              Muat Ulang / Reload
            </button>
            <a className="btn btn--ghost-ink" href="/">
              Beranda / Home
            </a>
          </div>
        </div>
      </main>
    );
  }
}

export default ErrorBoundary;
