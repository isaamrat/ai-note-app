const updateNote = async (content, note_id) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/update_note/'+note_id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"content":content}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update the note: ');
      }
  
      return response.json(); // Assuming backend returns JSON data on success
    } catch (error) {
      throw new Error(`Failed to update the note: ${error.message}`);
    }
  };
  
  export default updateNote;