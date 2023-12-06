document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('../server/playerAPI.php?action=login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            alert(data.message); // Show success message
            window.location.href = './index.html'; // Redirect to index.html (path may need to be adjusted)
        } else {
            document.getElementById('message').textContent = data.error;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').textContent = 'An error occurred during login.';
    });
});