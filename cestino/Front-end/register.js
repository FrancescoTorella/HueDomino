document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(registerForm);
        const username = formData.get('username');
        const password = formData.get('password');

        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.status === 201) {
            // Registrazione riuscita
            console.log('Registrazione riuscita');
        } else {
            // Registrazione fallita
            console.log('Registrazione fallita');
        }
    });
});