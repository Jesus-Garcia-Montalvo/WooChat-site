function mostrar_menu_mi_mensaje(button) {
  const mensaje = button.closest(".cont-mi_mensaje");
  const menu = mensaje.querySelector(".menu-mi_mensaje");

  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}

function mostrar_menu_su_mensaje(button) {
  const mensaje = button.closest(".cont-su_mensaje");
  const menu = mensaje.querySelector(".menu-su_mensaje");

  if (menu.style.display === "none" || menu.style.display === "") {
    menu.style.display = "block";
  } else {
    menu.style.display = "none";
  }
}
