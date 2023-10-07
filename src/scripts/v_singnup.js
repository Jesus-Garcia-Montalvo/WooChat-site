const form = document.getElementById("userForm");

form.addEventListener("submit", async function (event) {
  event.preventDefault();

  // Obtener los valores de los campos
  const nombre = form.querySelector("#nombre").value;
  const numero_usuario = form.querySelector("#numero_usuario").value;
  const contraseña = form.querySelector("#contraseña").value;
  const url = form.querySelector("#url").value;
  const info = form.querySelector("#info").value;

  //  se verifica si los campos nombre, numero_usuario y contrasena están vacíos.
  if (!nombre || !numero_usuario || !contraseña || !url || !info) {
    //  Si alguno de ellos está vacío, se muestra un mensaje de error SweetAlert2
    await Swal.fire({
      icon: "error",
      title: "Error",
      html: '<p class="swal2-text">Por favor, complete todos los campos obligatorios.</p>',
      background: "#131a47",
      iconColor: "#00a4ff",
      timer: 5000,
      timerProgressBar: true,
    });
    return; // No envíes el formulario si faltan campos obligatorios
  }

  //Si todos los campos obligatorios están llenos y se completa el formulario con éxito, se muestra un mensaje de éxito con SweetAlert2. Si el usuario confirma el mensaje, la página se redirecciona a "login.html".
  await Swal.fire({
    icon: "success",
    title: "Éxito",
    html: '<p class="swal2-text">El nuevo usuario ha sido creado correctamente.</p>',
    background: "#131a47",
    iconColor: "#00a4ff",
    allowOutsideClick: false,
    allowEscapeKey: false,
  }).then(async (result) => {
    if (result.isConfirmed) {
      window.location.href = "login.html";
    }
  });

  // Finalmente, si todos los campos están llenos, se llama a la función crearNuevoUsuario pasando los valores nombre, numero_usuario, contrasena, url e info como argumentos.
  await crearNuevoUsuario(nombre, numero_usuario, contraseña, url, info);
});

// La función crearNuevoUsuario permanece igual
async function crearNuevoUsuario(
  nombre,
  numero_usuariom,
  contraseña,
  url,
  info
) {
  // Datos del nuevo usuario
  const nuevoUsuario = {
    nombre: nombre,
    numero_usuario: numero_usuariom,
    contraseña: contraseña,
    url: url,
    info: info,
  };
  try {
    await axios.post("https://base-data-h823.onrender.com/usuarios", nuevoUsuario);
  } catch (error) {
    console.error(error);
  }
}
