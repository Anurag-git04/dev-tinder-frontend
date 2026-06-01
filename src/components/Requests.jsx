import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";
import { removeRequests } from "../utils/requestSlice";

const Requests = () => {

    const requests = useSelector((store) => store.requests)

    const dispatch = useDispatch();
    const fetchRequests = async () => {
        try {
            const res = await axios.get(BASE_URL + "/users/requests", {
                withCredentials: true
            })
            console.log('requests', res.data)
            dispatch(addConnection(res.data.data))
        } catch (error) {
            //Handle error
            console.log(error)
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    if (!requests) return;

    if (requests.length === 0) {
        return (
            <div className="text-center my-10">
                <p className="text-2xl font-bold">No Requests Found</p>
            </div>
        )
    }

    const reviewRequest = async (status, requestId) => {
        try {
            const res = await axios.post(
                BASE_URL + "/requests/review/" + status + "/" + requestId,
                {
                    requestId,
                    status
                },
                { withCredentials: true }
            )
            console.log(res.data)
            dispatch(removeRequests(requestId))
        } catch (error) {
            console.error("Error reviewing request:", error)
        }
    }


    return (
        <div className="text-center my-10">
            <p className="text-2xl font-bold">Requests</p>

            {
                requests.map((request) => {
                    const { firstName, lastName, photoUrl, age, gender, about, _id } = request.fromUserId;
                    return (
                        <div className="flex justify-between my-4 p-4  rounded-lg bg-base-300 w-2/3 mx-auto" key={_id}>
                            <div>
                                <img src={photoUrl} className="w-20 h-20 rounded-full" alt="Image of Request" />
                            </div>
                            <div className="text-left mx-4">
                                <h2 className="text-xl font-bold">{firstName} {lastName}</h2>
                                <p>{age}, {gender}</p>
                                <p>{about}</p>
                            </div>
                            <div className="">
                                <button
                                    className="btn btn-secondary mx-2"
                                    onClick={() => reviewRequest("accepted", request._id)}
                                >
                                    Accept
                                </button>
                                <button
                                    className="btn btn-primary mx-2"
                                    onClick={() => reviewRequest("rejected", request._id)}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Requests