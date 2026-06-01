import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"

export const Body = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((store) => store.user)


    const fetchuser = async () => {
        try {
            const res = await axios.get("http://localhost:5000/profile/view",
                {
                    withCredentials: true
                })
            dispatch(addUser(res.data))
        } catch (error) {
            navigate('/login')
            console.error("Error fetching user:", error)
        }
    }

    useEffect(() => {
        if (!userData) {
            fetchuser()
        }
    }, [userData, dispatch])

    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
