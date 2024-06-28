// signUpUser function to handle registration
const signUpUser = async (userData) => {
    try {
        console.log(userData);
      const response = await fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Sign up failed');
      }
  
      return response.json(); // Assuming backend returns JSON data on success
    } catch (error) {
      throw new Error(`Sign up failed: ${error.message}`);
    }
  };
  
  export default signUpUser;
  