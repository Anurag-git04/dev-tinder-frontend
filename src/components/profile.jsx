import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"


export const Profile = () => {
    const user = useSelector((store) => store.user)
    console.log("user in profile", user)
    return (
        <div>
            <EditProfile user={user} />
        </div>
    )
}
