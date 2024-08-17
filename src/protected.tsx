// ProtectedRoute.js
import { Navigate } from 'react-router-dom';
import { useAuth } from './lib/auth-provider';
import { ReactNode } from 'react';

const ProtectedRoute = ({ element }: { element: ReactNode }) => {
    const { isAuthenticated } = useAuth();
   
    
    if (!isAuthenticated.value) {
        return <Navigate to="/login" replace />;
    }

    return element;
};

export default ProtectedRoute;