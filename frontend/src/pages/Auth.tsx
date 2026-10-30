import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { errorText } from '../api/client'
import { auth } from '../api/endpoints'
import { useAuth } from '../auth/AuthContext'
import { Fault, Mark, PasswordInput, ThemeToggle } from '../components/ui'

function useSubmit() {
    const [error, setError] = useState('')
    const [busy, setBusy] = useState(false)
    const run = async (work: () => Promise<void>) => {
        setError('')
        setBusy(true)
        try {
            await work()
        } catch (err) {
            setError(errorText(err))
        } finally {
            setBusy(false)
        }
    }
    return { error, busy, run }
}

export function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const { error, busy, run } = useSubmit()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submit = (event: FormEvent) => {
        event.preventDefault()
        void run(async () => {
            const res = await auth.login({ email, password })
            login(res.token, res.user)
            navigate('/dashboard')
        })
    }

    return (
        <div className="gate">
            <ThemeToggle className="corner-toggle" />
            <Mark to="/" />
            <h2>Sign in</h2>
            <p className="sub">Access your workflows and their execution history.</p>
            <Fault message={error} />

            <form onSubmit={submit}>
                <div className="form-row">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="field"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        className="field"
                        type="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-primary" disabled={busy}>
                    {busy ? 'Signing in...' : 'Sign in'}
                </button>
            </form>

            <p className="gate-alt">
                No account yet? <Link to="/register">Create one</Link>
            </p>
        </div>
    )
}

export function Register() {
    const navigate = useNavigate()
    const { login } = useAuth()
    const { error, busy, run } = useSubmit()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirm, setConfirm] = useState('')
    const mismatch = confirm !== '' && confirm !== password

    const submit = (event: FormEvent) => {
        event.preventDefault()
        if (password !== confirm) return
        void run(async () => {
            const res = await auth.register({ name, email, password })
            login(res.token, res.user)
            navigate('/dashboard')
        })
    }

    return (
        <div className="gate">
            <ThemeToggle className="corner-toggle" />
            <Mark to="/" />
            <h2>Create account</h2>
            <p className="sub">Your workflows and executions are visible only to you.</p>
            <Fault message={error} />

            <form onSubmit={submit}>
                <div className="form-row">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        className="field"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        maxLength={100}
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        className="field"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-row">
                    <label htmlFor="password">Password</label>
                    <PasswordInput
                        id="password"
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                    />
                    <span className="hint">At least 8 characters, with a letter and a digit.</span>
                </div>
                <div className="form-row">
                    <label htmlFor="confirm">Confirm password</label>
                    <PasswordInput
                        id="confirm"
                        autoComplete="new-password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        required
                        aria-invalid={mismatch || undefined}
                        aria-describedby={mismatch ? 'confirm-hint' : undefined}
                    />
                    {mismatch && (
                        <span id="confirm-hint" className="hint bad">
                            The two passwords do not match.
                        </span>
                    )}
                </div>
                <button type="submit" className="btn-primary" disabled={busy}>
                    {busy ? 'Creating...' : 'Create account'}
                </button>
            </form>

            <p className="gate-alt">
                Already have an account? <Link to="/login">Sign in</Link>
            </p>
        </div>
    )
}
