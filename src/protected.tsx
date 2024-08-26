/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useAuth } from './lib/auth-provider';
import { useEffect, useState } from 'react';
import Loader from './components/ui/loader';
import authService from './appwrite/auth';



const ProtectedRoute = ({ element }: any) => {
    const { setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const session = await authService.getCurrentSession(); // Replace this with the appropriate API call to check authentication
                if (session) {
                    setUser(session);
                    setIsLoading(false)
                } else {
                    setUser(session);
                    setIsLoading(false);
                    navigate("/login")
                }
            } catch (error) {
                console.error('Error checking authentication:', error);
                setIsLoading(false);
                navigate("/login")
            }
        };
        checkAuthentication();
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return <>{element}</>;
};

export default ProtectedRoute;



