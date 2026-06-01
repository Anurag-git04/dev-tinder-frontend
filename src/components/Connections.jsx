import axios from "axios"
import { BASE_URL } from "../utils/constants"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";


const Connections = () => {
    const Connections = useSelector((store) => store.connections)
    const dispatch = useDispatch();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/users/connections", {
                withCredentials: true
            })
            console.log('connections', res.data)
            dispatch(addConnection(res.data.data))
        } catch (error) {
            //Handle error
            console.log(error)
        }
    }

    useEffect(() => {
        fetchConnections()
    })
    if (!Connections) return;

    if (Connections.length === 0) {
        return (
            <div className="text-center my-10">
                <p className="text-2xl font-bold">No Connections Found</p>
            </div>
        )
    }


    return (
        <div className="text-center my-10">
            <p className="text-2xl font-bold">Connections</p>

            {
                Connections.map((connection) => {
                    const { firstName, lastName, photoUrl, age, gender, about } = connection;
                    return (
                        <div className="flex my-4 p-4  rounded-lg bg-base-300 w-1/2 mx-auto" key={connection.id}>
                            <div>
                                <img src={photoUrl} className="w-20 h-20 rounded-full" alt="Image of Connection" />
                            </div>
                            <div className="text-left mx-4">
                                <h2 className="text-xl font-bold">{firstName} {lastName}</h2>
                                <p>{age}, {gender}</p>
                                <p>{about}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Connections