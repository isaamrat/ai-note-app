const addNewNote = async (userData, user_email) => {
    try {
        console.log(userData);
      const response = await fetch('http://127.0.0.1:8000/add_note/'+user_email, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to add new note: ');
      }
  
      return response.json(); // Assuming backend returns JSON data on success
    } catch (error) {
      throw new Error(`Failed to add new note: ${error.message}`);
    }
  };
  
  export default addNewNote;