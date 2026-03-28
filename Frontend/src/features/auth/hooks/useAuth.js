import { useContext } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout } from "../services/auth.api";

export const useAuth = () => {

    const { user, setUser, loading, setLoading } = useContext(AuthContext);

    // ✅ LOGIN
    const handleLogin = async ({ email, password }) => {
        setLoading(true);
        try {
            const data = await login({ email, password });
            setUser(data.user);
        } catch (err) {
            console.log("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ REGISTER
    const handleRegister = async ({ username, email, password }) => {
        setLoading(true);
        try {
            const data = await register({ username, email, password });
            setUser(data.user);
        } catch (err) {
            console.log("Register error:", err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ LOGOUT
    const handleLogout = async () => {
        setLoading(true);
        try {
            await logout();
            setUser(null);
        } catch (err) {
            console.log("Logout error:", err);
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        logout: handleLogout
    };
};