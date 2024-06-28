const summaryNote = async (content) => {
    try {
      const response = await fetch('http://127.0.0.1:8000/summarize/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"text":content}),
      });
  
      if (!response.ok) {
        throw new Error('Failed to update the note: ');
      }
  
      return response.json(); // Assuming backend returns JSON data on success
    } catch (error) {
      throw new Error(`Failed to update the note: ${error.message}`);
    }
  };
  
  export default summaryNote;