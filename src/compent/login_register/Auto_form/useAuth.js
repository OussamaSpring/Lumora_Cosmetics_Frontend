// import { useState, useEffect } from 'react';

// const API_BASE_URL = 'https://api.lumora.com/api';
// const USE_MOCK_AUTH = true;

// export default function useAuth() {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem('userToken'));
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const validateMockToken = (token) => {
//     if (token && token.startsWith('mock_')) {
//       try {
//         const email = atob(token.split('_')[1]);
//         return {
//           id: 123,
//           email: email,
//           username: email.split('@')[0],
//           role: "customer"
//         };
//       } catch (e) {
//         return null;
//       }
//     }
//     return null;
//   };

//   useEffect(() => {
//     const verifyAuth = async () => {
//       setLoading(true);
//       try {
//         if (!token) {
//           setUser(null);
//           return;
//         }

//         if (USE_MOCK_AUTH) {
//           const mockUser = validateMockToken(token);
//           if (mockUser) {
//             setUser(mockUser);
//             return;
//           }
//         }

//         const response = await fetch(`${API_BASE_URL}/user/profile`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });

//         if (!response.ok) throw new Error('Authentication failed');
//         const userData = await response.json();
//         setUser(userData);
//       } catch (error) {
//         localStorage.removeItem('userToken');
//         setToken(null);
//         setUser(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyAuth();
//   }, [token]);

//   const login = async (email, password) => {
//     try {
//       let result;
//       if (USE_MOCK_AUTH) {
//         await new Promise(resolve => setTimeout(resolve, 500));
//         const mockToken = `mock_${btoa(email)}_${Date.now()}`;
//         localStorage.setItem('userToken', mockToken);
//         setToken(mockToken);
//         result = { success: true };
//       } else {
//         const response = await fetch(`${API_BASE_URL}/login`, {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ email, password })
//         });
//         const data = await response.json();
//         localStorage.setItem('userToken', data.accessToken);
//         setToken(data.accessToken);
//         result = { success: response.ok };
//       }
//       return result;
//     } catch (error) {
//       return { success: false, error: error.message };
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('userToken');
//     setToken(null);
//     setUser(null);
//   };

//   return {
//     user,
//     token,
//     loading,
//     error,
//     login,
//     logout,
//     isAuthenticated: !!user
//   };
// }