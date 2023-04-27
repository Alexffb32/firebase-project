import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth, provider } from './firebaseconfig';
import { signInWithPopup } from 'firebase/auth';

const Login = () => {

    const [user, loading, error] = useAuthState(auth);
    const [errorMessage, setErrorMessage] = useState('');

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);

        } catch (error) {
            setErrorMessage((error as Error).message);
        }
    };
    const handleLogout = () => {
        auth.signOut();
    };
 return (
        <div className="flex justify-center">
            <div className="w-full max-w-sm mt-8 rounded-lg shadow-md bg-white p-6">
                {loading && <p>Carregando...</p>}
                {error && <p>Erro ao carregar o usuário</p>}
                {user ? (
                    <>
                        <img
                            className="w-24 h-24 rounded-full mr-4"
                            src={user.photoURL ?? undefined}
                            alt="Imagem do usuário"
                        />
                        <div>
                            <p className="text-xl font-medium">{user.displayName}</p>
                            <p className="text-gray-600">{user.email}</p>
                        </div>

                        <button
                            className="mt-4 w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </>

                ) : (
                    <>
                        <button
                            className="mt-4 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            onClick={handleGoogleLogin}
                        >
                            Login com o Google
                        </button>
                        {errorMessage && <p className="mt-4 text-red-500">{errorMessage}</p>}
                    </>
                )}
            </div>
        </div>

    );}
export default Login;