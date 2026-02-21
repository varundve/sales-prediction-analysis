/**
 * Example API Usage
 * 
 * This file demonstrates how to use the Sales Prediction API
 */

// Example 1: Health Check
const healthCheck = async () => {
    const response = await fetch('http://localhost:5000/health');
    const data = await response.json();
    console.log('Health Check:', data);
};

// Example 2: Get Model Information
const getModelInfo = async () => {
    const response = await fetch('http://localhost:5000/api/predict/model');
    const data = await response.json();
    console.log('Model Info:', data);
};

// Example 3: Make a Prediction
const makePrediction = async () => {
    const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tv: 230000,      // TV advertising spend in INR
            radio: 37000,    // Radio advertising spend in INR
            newspaper: 69000 // Newspaper advertising spend in INR
        }),
    });
    const data = await response.json();
    console.log('Prediction:', data);
};

// Example 4: Sign Up
const signUp = async () => {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
        }),
    });
    const data = await response.json();
    console.log('Sign Up:', data);
};

// Example 5: Sign In
const signIn = async () => {
    const response = await fetch('http://localhost:5000/api/auth/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: 'test@example.com',
            password: 'password123',
        }),
    });
    const data = await response.json();
    console.log('Sign In:', data);
    return data.data?.session?.access_token;
};

// Example 6: Get User (with authentication)
const getUser = async (token: string) => {
    const response = await fetch('http://localhost:5000/api/auth/user', {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    const data = await response.json();
    console.log('User:', data);
};

// Run examples
const runExamples = async () => {
    console.log('=== Sales Prediction API Examples ===\n');

    await healthCheck();
    console.log('\n---\n');

    await getModelInfo();
    console.log('\n---\n');

    await makePrediction();
    console.log('\n---\n');
};

// Uncomment to run:
// runExamples();
