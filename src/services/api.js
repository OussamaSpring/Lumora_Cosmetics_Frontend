// src/services/api.js

// Mock response delays to simulate network requests
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock user database
const users = [
  {
    id: 1,
    firstName: "Test",
    lastName: "User",
    username: "testuser",
    email: "test@example.com",
    phoneNumber: "1234567890",
    password: "password123",
    accountType: "customer"
  }
];

// Mock authentication API
export const authAPI = {
  // Login method
  login: async (credentials) => {
    await delay(800); // Simulate network delay
    
    const { usernameOrEmail, password } = credentials;
    
    // Find user by email or username
    const user = users.find(
      user => (user.email === usernameOrEmail || user.username === usernameOrEmail)
    );
    
    // Check if user exists and password matches
    if (!user || user.password !== password) {
      // Simulate API error response
      return Promise.reject({
        response: {
          data: {
            message: "Invalid email/username or password"
          },
          status: 401
        }
      });
    }
    
    // Successful login response
    return {
      status: 200,
      data: {
        accessToken: "mock-jwt-token-" + Math.random().toString(36).substring(2),
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          accountType: user.accountType
        }
      }
    };
  },
  
  // Registration method
  register: async (userData) => {
    await delay(1000); // Simulate network delay
    
    // Check if username or email already exists
    const emailExists = users.some(user => user.email === userData.email);
    const usernameExists = users.some(user => user.username === userData.username);
    
    if (emailExists) {
      return Promise.reject({
        response: {
          data: {
            message: "Email already in use"
          },
          status: 400
        }
      });
    }
    
    if (usernameExists) {
      return Promise.reject({
        response: {
          data: {
            message: "Username already taken"
          },
          status: 400
        }
      });
    }
    
    // Add new user to mock database
    const newUser = {
      id: users.length + 1,
      ...userData
    };
    
    users.push(newUser);
    
    // Return success response
    return {
      status: 201,
      data: {
        message: "User registered successfully"
      }
    };
  },
  
  // Get current user profile (to use with token)
  getCurrentUser: async () => {
    await delay(500);
    
    // Just return the first user for testing purposes
    const user = users[0];
    
    return {
      status: 200,
      data: {
        user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          email: user.email,
          accountType: user.accountType
        }
      }
    };
  }
};

// You can add other API services here
export const productAPI = {
  // Mock method to get products
  getProducts: async () => {
    await delay(600);
    
    return {
      status: 200,
      data: [
        { id: 1, name: "Product 1", price: 19.99 },
        { id: 2, name: "Product 2", price: 29.99 },
        { id: 3, name: "Product 3", price: 39.99 }
      ]
    };
  }
};