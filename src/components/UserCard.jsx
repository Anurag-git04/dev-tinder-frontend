import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";


const UserCard = ({ user }) => {
    const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
    const dispatch = useDispatch();

    const handlesendRequest = async ({ status, userId }) => {
        try {
            console.log("sending friend request with status", status, "to user", userId)
            const res = await axios.post(
                BASE_URL + "/request/send/" + status + "/" + userId,
                {},
                { withCredentials: true })
            console.log("response in sending friend request", res)
            dispatch(removeFeed(userId))
        } catch (error) {
            console.log("error in sending friend request", error)
        }
    }

    return (
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img
                    src={photoUrl}
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{firstName} {lastName}</h2>
                {age && gender && <p>{age + ", " + gender}</p>}
                <p>{about}</p>
                <div className="card-actions justify-end my-4">
                    <button className="btn btn-primary" onClick={() => handlesendRequest({ status: "ignored", userId: _id })}>Ignore</button>
                    <button className="btn btn-secondary" onClick={() => handlesendRequest({ status: "interested", userId: _id })}>Interested</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard