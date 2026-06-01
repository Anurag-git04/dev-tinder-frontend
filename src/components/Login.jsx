import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"

export const Login = () => {
    const [emailId, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const handleLogin = async () => {
        try {
            const res = await axios.post('http://localhost:5000/login',
                {
                    emailId,
                    password
                }, { withCredentials: true })
            console.log(res.data)
            dispatch(addUser(res.data))
            navigate('/')
        } catch (error) {
            console.error('Login failed:', error)
            setError(error.response?.data || 'An error occurred during login. Please try again.')
        }
    }

    return (
        <div className="flex justify-center my-10">
            <div className="card card-border bg-base-100 w-96 shadow-sm">
                <div className="card-body">
                    <h2 className="card-title justify-center">Login</h2>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label">
                            <span className="label-text">Email</span>
                        </div>
                        <input
                            type="text"
                            value={emailId}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>
                    <label className="form-control w-full max-w-xs my-2">
                        <div className="label">
                            <span className="label-text">Password</span>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="input input-bordered w-full max-w-xs"
                        />
                    </label>

                    {error && <p className="text-red-500">{error}</p>}
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary" onClick={handleLogin}>
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

