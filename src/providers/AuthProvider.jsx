import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import axios from 'axios';

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)

    const googleProvider = new GoogleAuthProvider()

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }
    const createSignIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const signOutUser = () => {
        setLoading(true)
        return signOut(auth)

    }

    const goooleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    const updateUserProfile = (name, photoURL) => {
        if (!auth.currentUser) {
            console.error('No user is logged in');
            return;
        }

        setLoading(true);
        return updateProfile(auth.currentUser, { displayName: name, photoURL: photoURL })
            .then(() => {
                console.log('User profile updated successfully');
                setUser({ ...auth.currentUser });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error updating user profile:', error);
                setLoading(false);
            });
    };


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (curentUser) => {
            console.log('current user from authProvider', curentUser);
            setUser(curentUser)

            if (curentUser) {
                axios.post(`${import.meta.env.VITE_BASE_URL}/authentication`, {
                    email: curentUser.email,
                })
                    .then(data => {
                        if (data.data) {
                            localStorage.setItem('access-token', data?.data.token)
                            setLoading(false)
                        }
                    })
            } else {
                localStorage.removeItem('access-token')
                setLoading(false)
            }

        });
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        user,
        loading,
        createUser,
        createSignIn,
        signOutUser,
        goooleLogin,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;