const deleteNote = async (note_id) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/delete_note/'+note_id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete the note: ');
      }
  
      return response.json(); // Assuming backend returns JSON data on success
    } catch (error) {
      throw new Error(`Failed to delete the note: ${error.message}`);
    }
  };
  
  export default deleteNote;