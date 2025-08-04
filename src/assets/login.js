async function login(username, password) {
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
  
    if (!response.ok) {
      throw new Error('Invalid username or password.');
    }
  
    return await response.json();
  }