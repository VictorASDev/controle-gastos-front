import { useState } from "react";
import { login } from "../services/login";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<boolean | null>(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await login(username, password);
            console.log("Token recebido:", res);
            sessionStorage.setItem("token", JSON.stringify(res.accessToken));
            navigate("/home"); 
        } catch (err) {
            setError(true);
            console.error("Erro ao fazer login:", err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-background">
            <h1 className="text-4xl font-title uppercase mb-6">Login</h1>
            <form className="bg-white p-8 rounded shadow-md w-96" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        required
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-secondary text-white py-2 rounded hover:bg-accent transition duration-200 cursor-pointer"
                >
                    Login
                </button>
            </form>

            {error && (
                <div className="mt-4 text-red-500">
                    Erro ao fazer login. Verifique suas credenciais.
                </div>
            )}
        </div>
    );
};

export default Login;
