import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useEffect } from "react"
import { BASE_URL } from "../utils/constants"

export const Body = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userData = useSelector((store) => store.user)


    const fetchuser = async () => {
        try {
            const res = await axios.get(BASE_URL + "/profile/view",
                {
                    withCredentials: true
                })
            const user = res.data?.user ?? res.data?.data ?? res.data;
            dispatch(addUser(user))
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
