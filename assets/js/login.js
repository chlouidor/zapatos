document.getElementById('loginButton').addEventListener('click', () => {
    const correo = document.getElementById('correo').value.trim();
    const contraseña = document.getElementById('contraseña').value;

    // Obtener usuarios registrados del almacenamiento local
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Verificar si existe un usuario con el correo electrónico y la contraseña proporcionados
    const userLocal = users.find(user => user.email === correo && user.password === contraseña);

    if (userLocal) {
        alert('Inicio de sesión exitoso. Redirigiendo...');
        window.location.href = './index.html';
    } else {
        alert('Correo o contraseña incorrectos. Inténtalo de nuevo.');
    }
});
