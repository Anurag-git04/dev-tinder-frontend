import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { BASE_URL } from "../utils/constants"
import { removeUser } from "../utils/userSlice"

const Navbar = () => {
    // normalize user shape — some endpoints return { data: user } or { user: user }
    const rawUser = useSelector((store) => store.user)
    const user = rawUser?.data ?? rawUser?.user ?? rawUser
    console.log('Navbar user:', user)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = async () => {
        try {
            await axios.post(
                BASE_URL + "/logout",
                {},
                { withCredentials: true }
            )
            dispatch(removeUser())
            navigate('/login')

        } catch (error) {
            console.error("Error logging out:", error)
        }
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">DevTinder</Link>
            </div>
            {user && (
                <div className="flex gap-2">
                    <div className="bg-linear-to-r from-gray-800 to-gray-700 text-green-400 font-semibold px-4 py-2 rounded-xl shadow-md text-center">
                        👋 Welcome, {user.firstName}!
                    </div>
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user.photoUrl} />
                            </div>
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <Link to='/profile' className="justify-between">
                                    Profile
                                </Link>
                            </li>
                            <li><Link to='/connections'>Connections</Link></li>
                            <li><Link to='/requests'>Requests</Link></li>
                            <li><a onClick={handleLogout}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    )
}


export default Navbar