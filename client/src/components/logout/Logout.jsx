import { useContext, useEffect } from "react"
import { UserContext } from "../../contexts/UserContext.jsx"
import { useNavigate } from "react-router";

export default function Logout() {
    const { logoutHandler } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            await logoutHandler();
            navigate('/');
        })()
    }, []);
    return null
}