import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

export const Login = () => {
    const [emailId, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isLoginForm, setIsLoginForm] = useState(true);
    const [error, setError] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/login",
                {
                    emailId,
                    password,
                },
                { withCredentials: true }
            );
            const user = res.data?.user ?? res.data?.data ?? res.data;
            dispatch(addUser(user));
            return navigate("/");
        } catch (err) {
            setError(err.response?.data || "Login failed");
            console.log(err);
        }
    };

    const handleSignUp = async () => {
        try {
            const res = await axios.post(
                BASE_URL + "/signup",
                {
                    firstName,
                    lastName,
                    emailId,
                    password,
                },
                {
                    withCredentials: true,
                }
            );
            console.log(res);
            const user = res.data?.user ?? res.data?.data ?? res.data;
            dispatch(addUser(user));
            return navigate("/profile");
        } catch (error) {
            setError(error.response?.data || "Signup failed");
            console.log(error);
        }
    };

    return (
        <div className="flex justify-center my-10">
            <div className="card bg-base-300 w-96 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title justify-center">
                        {isLoginForm ? "Login" : "Signup"}
                    </h2>
                    <div>
                        {!isLoginForm && (
                            <>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Firstname</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                                <label className="form-control w-full max-w-xs my-2">
                                    <div className="label">
                                        <span className="label-text">Lastname</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        className="input input-bordered w-full max-w-xs"
                                    />
                                </label>
                            </>
                        )}
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
                    </div>
                    <p className="text-red-500 text-center">{error}</p>
                    <div className="card-actions justify-center mt-2">
                        <button
                            className="btn btn-primary"
                            onClick={isLoginForm ? handleLogin : handleSignUp}
                        >
                            {isLoginForm ? "Login" : "Signup"}
                        </button>
                    </div>
                    <p
                        className=" text-center cursor-pointer py-2"
                        onClick={() => setIsLoginForm((value) => !value)}
                    >
                        {isLoginForm
                            ? "New user ? signup here"
                            : "Existing User ? Login here"}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;

