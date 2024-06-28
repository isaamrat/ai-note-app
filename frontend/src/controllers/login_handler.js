


const logInUser = async (userData) => {
    try {
        console.log(userData);
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Log in failed');
      }
  
      return response.json(); // Assuming backend returns JSON data on success
    } catch (error) {
      throw new Error('Log in failed: ${error.message}');
    }
  };
  
  export default logInUser;
  