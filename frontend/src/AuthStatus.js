import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const AuthStatus = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div className="bg-gray-800 text-white p-2 text-center">Loading ...</div>;;
    }

    if (isAuthenticated) {
        return (
            <div className="bg-gray-800 text-white p-2 flex items-center justify-between">
                <span>Welcome, {user.email}.</span>
                <LogoutButton />
            </div>
        )
    }
    else {
        return (
            <div className="bg-gray-800 text-white p-2 flex items-center justify-between">
                <span>You are not logged in.</span>
                <LoginButton />
            </div>
        )
    }
};

const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();

    return <button
        onClick={() => loginWithRedirect()}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
    >
        Log In
    </button>;
};

const LogoutButton = () => {
    const { logout } = useAuth0();

    return (
        <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
            Log Out
        </button>
    );
};
