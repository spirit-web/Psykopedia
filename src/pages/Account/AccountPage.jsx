import { useState } from "react";
import { useNavigate } from "react-router-dom";

import BackButton from "../../components/BackButton/BackButton";
import useAuth from "../../hooks/useAuth";

function AccountPage() {

    const { user, loading, signIn, signUp, signOut } = useAuth();

    const navigate = useNavigate();

    const [mode, setMode] = useState("login");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const [info, setInfo] = useState("");

    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        setInfo("");

        setSubmitting(true);

        if (mode === "login") {

            const { error: signInError } = await signIn(email, password);

            if (signInError) {

                setError("Fel e-post eller lösenord.");

            } else {

                navigate("/");

            }

        } else {

            const { data, error: signUpError } = await signUp(email, password);

            if (signUpError) {

                setError(signUpError.message || "Något gick fel, försök igen.");

            } else if (!data.session) {

                setInfo("Kontot är skapat! Kolla din e-post för en bekräftelselänk innan du kan logga in.");

            } else {

                navigate("/");

            }

        }

        setSubmitting(false);

    }

    if (loading) {

        return <p style={{ textAlign: "center", marginTop: 80 }}>Laddar...</p>;

    }

    if (user) {

        return (

            <div style={{ maxWidth: 400, margin: "80px auto", padding: 40, textAlign: "center" }}>

                <BackButton />

                <h1>👤 Mitt konto</h1>

                <p style={{ color: "#666" }}>Inloggad som {user.email}</p>

                <button
                    onClick={signOut}
                    style={{ marginTop: 10, background: "#173B78", color: "white", border: "none", borderRadius: 10, padding: "10px 20px", fontWeight: 600, cursor: "pointer" }}
                >
                    Logga ut
                </button>

            </div>

        );

    }

    return (

        <div style={{ maxWidth: 400, margin: "80px auto", padding: 40 }}>

            <BackButton />

            <h1>{mode === "login" ? "👤 Logga in" : "👤 Skapa konto"}</h1>

            <p style={{ color: "#666" }}>
                {mode === "login"
                    ? "Logga in för att spara dina egna favoriter."
                    : "Skapa ett konto för att kunna spara dina egna favoriter."}
            </p>

            <form onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder="E-post"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                    required
                    style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd", marginBottom: 12 }}
                />

                <input
                    type="password"
                    placeholder="Lösenord"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                    required
                    minLength={6}
                    style={{ width: "100%", padding: 12, borderRadius: 10, border: "1px solid #ddd", marginBottom: 12 }}
                />

                {error && <p style={{ color: "#c0392b" }}>{error}</p>}
                {info && <p style={{ color: "#2E7D32" }}>{info}</p>}

                <button
                    type="submit"
                    disabled={submitting}
                    style={{ width: "100%", background: "#173B78", color: "white", border: "none", borderRadius: 10, padding: 14, fontWeight: 600, cursor: "pointer" }}
                >
                    {submitting ? "Vänta..." : mode === "login" ? "Logga in" : "Skapa konto"}
                </button>

            </form>

            <p style={{ marginTop: 15, textAlign: "center" }}>

                {mode === "login" ? (
                    <>
                        Inget konto än?{" "}
                        <button
                            onClick={() => { setMode("signup"); setError(""); setInfo(""); }}
                            style={{ background: "none", border: "none", color: "#173B78", fontWeight: 600, cursor: "pointer", padding: 0 }}
                        >
                            Skapa ett här
                        </button>
                    </>
                ) : (
                    <>
                        Har du redan ett konto?{" "}
                        <button
                            onClick={() => { setMode("login"); setError(""); setInfo(""); }}
                            style={{ background: "none", border: "none", color: "#173B78", fontWeight: 600, cursor: "pointer", padding: 0 }}
                        >
                            Logga in här
                        </button>
                    </>
                )}

            </p>

        </div>

    );

}

export default AccountPage;
