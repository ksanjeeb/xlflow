/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom';
import { useAuth } from './lib/auth-provider';
import { useEffect, useState } from 'react';
import { account } from '@/appwrite';
import Loader from './components/ui/loader';



const ProtectedRoute = ({ element }: any) => {
    const { setUser } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                const session = await account.get(); // Replace this with the appropriate API call to check authentication
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



