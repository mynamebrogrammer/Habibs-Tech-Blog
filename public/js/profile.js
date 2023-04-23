const newFormHandler = async (event) => {
  event.preventDefault();
// creating a user profile
  const name = document.querySelector('#profile-name').value.trim();

  if (name) {
    const response = await fetch(`/api/profile`, {
      method: 'POST',
      body: JSON.stringify({ name }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create profile');
    }
  }
};

const loginFormHandler = async (event) => {
  event.preventDefault();
// logging in
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(response);

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert(response.statusText);
      console.log(response);
    }
  }
};
