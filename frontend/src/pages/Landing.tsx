import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { Mark, ThemeToggle } from '../components/ui'

const DIAGRAM = `WHEN  webhook received
  │
  ▼
IF    event.country equals "PT"
  ├── true ──▶ HTTP request ──▶ Create record
  │
  └── false ─▶ Notification

queued ─▶ running ─▶ success
every step stored: input, output, attempts, duration`

export default function Landing() {
    const { token } = useAuth()
    return (
        <>
            <header className="rail">
                <div className="rail-inner">
                    <Mark to="/" />
                    <div className="whoami" style={{ marginLeft: 'auto' }}>
                        <ThemeToggle />
                        {token ? (
                            <Link to="/dashboard" className="btn btn-primary btn-sm">
                                Open dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/login">Sign in</Link>
                                <Link to="/register" className="btn btn-primary btn-sm">
                                    Create account
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <div className="wrap">
                <section className="hero">
                    <div>
                        <span className="plate">Event-driven workflow engine</span>
                        <h1>A signal comes in. The graph decides what happens.</h1>
                        <p className="lead">
                            Draw a workflow as a graph of triggers, conditions and actions. Events,
                            webhooks, schedules and manual runs start it; a queue-backed worker
                            executes it step by step and records every attempt.
                        </p>
                        <div className="hero-actions">
                            {token ? (
                                <Link to="/dashboard" className="btn btn-primary">
                                    Open dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link to="/register" className="btn btn-primary">
                                        Create account
                                    </Link>
                                    <Link to="/login" className="btn">
                                        Sign in
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                    <pre className="hero-diagram" aria-label="Example workflow">
                        {DIAGRAM}
                    </pre>
                </section>

                <section className="specs">
                    <div className="spec">
                        <span className="plate">Triggers</span>
                        <h3>Four ways in</h3>
                        <p>
                            Named events, public webhooks, cron schedules and manual runs with a
                            JSON payload.
                        </p>
                    </div>
                    <div className="spec">
                        <span className="plate">Graph</span>
                        <h3>Real branching</h3>
                        <p>
                            Conditions split the path into true and false. HTTP, email, records and
                            delays follow.
                        </p>
                    </div>
                    <div className="spec">
                        <span className="plate">Trace</span>
                        <h3>Every step recorded</h3>
                        <p>
                            Retries with backoff, timeouts and skipped branches all show up in the
                            execution history.
                        </p>
                    </div>
                </section>

                <footer className="base">
                    <span>FlowEngine</span>
                    <span>portfolio project</span>
                </footer>
            </div>
        </>
    )
}
