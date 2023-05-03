async function logout() {
  try {
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
  catch (err) {
    console.log("there was an error logging out",err);
  }
};

document.querySelector('#logout').addEventListener('click', logout);