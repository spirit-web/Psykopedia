import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

function AccountMenu() {

    const { user, loading, signOut } = useAuth();

    if (loading) {

        return null;

    }

    if (!user) {

        return (

            <Link to="/konto" className="nav-button">
                🔑 Logga in
            </Link>

        );

    }

    return (

        <button
            onClick={signOut}
            className="nav-button"
            title={user.email}
            style={{ border: "none", cursor: "pointer" }}
        >
            🔑 Logga ut
        </button>

    );

}

export default AccountMenu;
