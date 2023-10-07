(() => {
  "use strict";

  // Seleccionar todos los formularios con la clase "needs-validation"
  const forms = document.querySelectorAll(".needs-validation");

  // Iterar a través de cada formulario
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      // Prevenir el comportamiento predeterminado del envío de formularios
      event.preventDefault();
      event.stopPropagation();
      // Mostrar retroalimentación de validación
      showValidationFeedback(form);
      form.classList.add("was-validated");
    });
  });

  // Función para mostrar la retroalimentación de validación
  function showValidationFeedback(form) {
    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      const validFeedback = input.nextElementSibling;
      const invalidFeedback = validFeedback.nextElementSibling;
      const isValid = input.checkValidity();

      validFeedback.style.display = isValid ? "block" : "none";
      invalidFeedback.style.display = isValid ? "none" : "block";
    });
  }

  // Configurar eventos de entrada para cada campo de entrada
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      const validFeedback = input.nextElementSibling;
      const invalidFeedback = validFeedback.nextElementSibling;
      const isValid = input.checkValidity();

      validFeedback.style.display = isValid ? "block" : "none";
      invalidFeedback.style.display = isValid ? "none" : "block";
    });
  });
})();
