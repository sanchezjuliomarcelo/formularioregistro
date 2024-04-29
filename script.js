document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe automáticamente
  
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
  
    // Ejecutar el Actor de Apify para obtener el token reCAPTCHA
    fetch('https://api.apify.com/v2/acts/sJE922cATviBgMkXv/runs?token=apify_api_h3xwxLv33p8eoiKuwITC4dCTbg6MoQ1AlEGv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "proxyType": "http",
        "proxyAddress": "8.8.8.8",
        "proxyPort": 8080,
        "proxyLogin": "theLogin",
        "proxyPassword": "thePassword",
        "userAgent": "Opera 6.0",
        "cookies": "name=value; name2=value2"
      })
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.data && data.data.token) {
        var recaptchaToken = data.data.token;
  
        // Envía el token reCAPTCHA y los datos del formulario al servidor para su validación
        var formData = {
          'name': name,
          'email': email,
          'recaptchaToken': recaptchaToken
        };
  
        // Aquí puedes enviar los datos del formulario al servidor usando Ajax, fetch, etc.
        // Por ejemplo, si estás usando fetch:
        /*
        fetch('URL_DEL_SERVIDOR', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          // Manejar la respuesta del servidor
        })
        .catch(error => {
          console.error('Error al enviar el formulario:', error);
        });
        */
  
        // Simplemente para demostración, aquí mostramos una alerta de éxito
        alert('Registro exitoso!');
        document.getElementById('contactForm').reset(); // Reinicia el formulario
      } else {
        alert('Error al obtener el token reCAPTCHA.');
      }
    })
    .catch(error => {
      console.error('Error al obtener el token reCAPTCHA:', error);
      alert('Error al obtener el token reCAPTCHA.');
    });
  });
  
  function validateName(name) {
    var regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  }
  
  function validateEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }
  
  
  
  