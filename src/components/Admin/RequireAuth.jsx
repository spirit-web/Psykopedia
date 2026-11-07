import useAuth from "../../hooks/useAuth";
import LoginForm from "./LoginForm";

function RequireAuth({ children }) {

    const { user, isAdmin, loading, signOut } = useAuth();

    if (loading) {

        return <p style={{ textAlign: "center", marginTop: 80 }}>Laddar...</p>;

    }

    if (!user) {

        return <LoginForm />;

    }

    if (!isAdmin) {

        return (

            <div style={{ maxWidth: 400, margin: "80px auto", padding: 40, textAlign: "center" }}>

                <h1>🚫 Ingen åtkomst</h1>

                <p style={{ color: "#666" }}>Det här kontot har inte adminbehörighet.</p>

                <button
                    onClick={signOut}
                    style={{ marginTop: 10, background: "#173B78", color: "white", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 600, cursor: "pointer" }}
                >
                    Logga ut
                </button>

            </div>

        );

    }

    return children;

}

export default RequireAuth;
