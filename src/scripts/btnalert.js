async function eliminarMensaje(idMensaje) {
  try {
    // Mostrar el cuadro de diálogo de confirmación
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el mensaje. ¿Deseas continuar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar",
      background: "#131a47",
      iconColor: "#00a4ff",
    });

    // Verificar si el usuario confirmó la eliminación
    if (result.isConfirmed) {
      const mensajeHTML = document.getElementById(`mensaje-${idMensaje}`);
      if (mensajeHTML) {
        mensajeHTML.remove();
        console.log(`Mensaje con ID ${idMensaje} eliminado del HTML.`);
      } else {
        console.error(`Mensaje con ID ${idMensaje} no encontrado en el HTML.`);
      }

      // Mostrar un mensaje de éxito
      await Swal.fire({
        title: "Mensaje eliminado",
        text: "", // Puedes dejar el texto en blanco si no deseas un mensaje adicional
        icon: "success", // Puedes cambiar el icono aquí
        showConfirmButton: false, // Para ocultar el botón "Aceptar"
        timer: 2000, // Cerrar automáticamente después de 2 segundos (ajusta según tus preferencias)
        background: "#131a47",
        iconColor: "#00a4ff",
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      await Swal.fire({
        title: "Cancelado",
        text: "El mensaje no ha sido eliminado",
        icon: "info", // Puedes cambiar el icono aquí
        showConfirmButton: false, // Para ocultar el botón "Aceptar"
        timer: 2000, // Cerrar automáticamente después de 2 segundos (ajusta según tus preferencias)
        background: "#131a47",
        iconColor: "#00a4ff",
      });
    }
  } catch (error) {
    console.error("Error al eliminar el mensaje:", error);
  }
}

async function editarMensaje(idMensaje, mensajeActual) {
  try {
    const result = await Swal.fire({
      title: "Editar Mensaje",
      input: "text",
      inputValue: mensajeActual,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar",
      background: "#131a47",
      iconColor: "#00a4ff",
      inputValidator: (value) => {
        if (!value) {
          return "Debes ingresar un mensaje";
        }
      },
      inputAttributes: {
        style: "color: white;", // Estilo inline para el cuadro de entrada
      },
    });

    if (result.isConfirmed) {
      const nuevoMensaje = result.value;
      actualizarMensajeEnHTML(idMensaje, nuevoMensaje);
      await Swal.fire({
        title: "Mensaje editado",
        text: "El mensaje ha sido editado con éxito",
        icon: "success", // Puedes cambiar el icono aquí
        showConfirmButton: true, // Mostrar el botón "Aceptar"
        confirmButtonText: "Aceptar", // Personalizar el texto del botón
        background: "#131a47",
        iconColor: "#00a4ff",
      });
    }
  } catch (error) {
    console.error("Error al editar el mensaje:", error);
  }
}

function actualizarMensajeEnHTML(idMensaje, nuevoMensaje) {
  const labelMensaje = document.querySelector(`#mensaje-${idMensaje} label`);
  if (labelMensaje) {
    labelMensaje.textContent = nuevoMensaje;
  }
}
