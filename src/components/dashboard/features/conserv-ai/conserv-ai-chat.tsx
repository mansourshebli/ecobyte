// Previous imports remain the same...

const handleSend = async () => {
  // Previous code remains the same until the prompt...

  const response = await client.chat({
    message: `You are ConservAI, a concise environmental analysis assistant. 
    Keep responses brief and focused, using 2-3 short sentences per point.
    Include key statistics when relevant.

    User query: ${prompt}

    Guidelines:
    - Be direct and specific
    - Use bullet points for multiple items
    - Include numbers and percentages when available
    - Limit response to 3-4 main points
    Format numerical data clearly for visualization.`,
    model: 'command-r',
    temperature: 0.7,
    maxTokens: 300,  // Reduced from 500 to encourage shorter responses
  });

  // Rest of the code remains the same...
};

// Rest of the file remains the same...