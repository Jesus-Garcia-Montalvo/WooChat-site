// Establecer el modo estricto para asegurar buenas prácticas y evitar errores.
(() => {
  "use strict";

  // Obtener referencias a elementos del formulario y campos de entrada.
  const loginForm = document.getElementById("login-form");
  const numeroUsuarioInput = document.getElementById("numeroUsuario");
  const contraseñaInput = document.getElementById("contraseña");

  // Agregar un evento de escucha al formulario para manejar el inicio de sesión.
  loginForm.addEventListener("submit", async function (event) {
    // Prevenir el comportamiento predeterminado del formulario (evitar recarga de página).
    event.preventDefault();

    // Obtener el número de usuario y contraseña ingresados por el usuario.
    const usuario = numeroUsuarioInput.value;
    const contraseña = contraseñaInput.value;

    try {
      // Hacer una solicitud para verificar si el usuario existe en la base de datos.
      const userExistResponse = await axios.get(
        `https://base-data-h823.onrender.com/usuarios?numero_usuario=${usuario}`
      );
      const userData = userExistResponse.data;

      // Si no se encuentra ningún usuario con el número proporcionado, mostrar alerta y salir.
      if (userData.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          html: '<p class="swal2-text">El número de usuario no existe.</p>',
          background: "#131a47",
          iconColor: "#00a4ff",
          timer: 5000,
          timerProgressBar: true,
        });
        return;
      }

      // Hacer una solicitud para verificar si la contraseña es válida para el usuario.
      const validContraseñaResponse = await axios.get(
        `https://base-data-h823.onrender.com/usuarios?numero_usuario=${usuario}&contraseña=${contraseña}`
      );
      const validContraseñaData = validContraseñaResponse.data;

      // Si no se encuentra ninguna coincidencia de contraseña, mostrar alerta y salir.
      if (validContraseñaData.length === 0) {
        Swal.fire({
          icon: "error",
          title: "Error",
          html: '<p class="swal2-text">La contraseña ingresada es incorrecta.</p>',
          background: "#131a47",
          iconColor: "#00a4ff",
          timer: 5000,
          timerProgressBar: true,
        });

        return;
      }

      // Almacenar la información del usuario autenticado en el localStorage
      localStorage.setItem(
        "authenticatedUser",
        JSON.stringify(validContraseñaData[0])
      );

      // Obtener el nombre de usuario y mostrar un mensaje de bienvenida.
      const nombreUsuario = userData[0].nombre;
      await Swal.fire({
        icon: "success",
        title: "Éxito",
        html: `<p class="p">¡Bienvenido,<b class="nombre"> ${nombreUsuario}!</b>  Has iniciado sesión correctamente.</p>`,
        background: "#131a47",
        iconColor: "#00a4ff",
      });

      // Redirigir a la página "home.html" después de iniciar sesión.
      loginForm.reset();
      window.location.href = "home.html";
    } catch (error) {
      console.error("Error al realizar la petición:", error);
    }
  });
})();
