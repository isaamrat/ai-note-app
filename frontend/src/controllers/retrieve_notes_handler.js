const getNotes = async (user_email) => {
    console.log('http://127.0.0.1:8000/notes/'+user_email);
    try {1
      const response = await fetch('http://127.0.0.1:8000/get_notes/'+user_email, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }, 
      });
  
      if (!response.ok) {
        throw new Error('Failed to get note: ');
      }
  
      return response.json(); // Assuming backend returns JSON data on success
    } catch (error) {
      throw new Error(`Failed to get note: ${error.message}`);
    }
  };
  
  export default getNotes;