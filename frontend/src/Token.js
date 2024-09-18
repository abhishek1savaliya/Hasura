import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const style = {
    backgroundColor: "#282c34",
    color: "white",
    padding: "8px"
}

export const Token = () => {
    const { getAccessTokenSilently, isAuthenticated, isLoading, user } = useAuth0();
    const [token, setToken] = useState();

    if (isAuthenticated && !token) {
        getAccessTokenSilently().then(t => setToken(t))
    }

    if (isLoading) {
        return <div style={style}>Loading ...</div>;
    }
    else if (isAuthenticated) {
        if (!token) {
            return <div style={style}>Loading ...</div>;
        }
        else {
            const spanStyle = {
                width: "170px",
                display: "inline-block"
            }

            const textStyle = {
                width: "500px",
                height: "16px"
            }
            return (
                <div className="p-4 border rounded-md">
                    <p className="mb-2">
                        <span className="font-semibold">Your user ID: </span>
                        <textarea
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md resize-none bg-gray-100 cursor-not-allowed"
                            readOnly
                            disabled
                            value={user.sub}
                        ></textarea>
                        <button
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            onClick={() => {
                                navigator.clipboard.writeText(user.sub);
                                alert("User ID copied to clipboard!");
                            }}
                        >
                            Copy User ID
                        </button>
                    </p>

                    <p className="mb-2">
                        <span className="font-semibold">Your access token is: </span>
                        <textarea
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md resize-none bg-gray-100 cursor-not-allowed"
                            readOnly
                            disabled
                            value={token}
                        ></textarea>
                        <button
                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            onClick={() => {
                                navigator.clipboard.writeText(token);
                                alert("Access token copied to clipboard!");
                            }}
                        >
                            Copy Access Token
                        </button>
                    </p>
                </div>

            )
        }
    }

    return null;
};