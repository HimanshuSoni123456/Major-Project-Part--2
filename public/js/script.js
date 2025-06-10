(() => {
  'use strict';

  // Select all forms that require custom Bootstrap validation
  const forms = document.querySelectorAll('.needs-validation');

  // Loop through each form and apply validation handling
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      // If the form is invalid, prevent submission and propagation
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      // Add Bootstrap validation class to trigger visual feedback
      form.classList.add('was-validated');
    }, false);
  });
})();
