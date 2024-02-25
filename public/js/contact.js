
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting via the browser

    var name = document.querySelector('input[name="name"]').value;
    var email = document.querySelector('input[name="email"]').value;
    var subject = document.querySelector('input[name="subjecte"]').value; // Ensure this matches your input's name attribute
    var phone = document.querySelector('input[name="phone"]').value;
    var message = document.querySelector('textarea[name="message"]').value;

    var whatsappNumber = "254704166140"; // Your WhatsApp number in international format without '+'
    var textMessage = `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\nPhone: ${phone}\nMessage: ${message}`;
    var whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;

    window.open(whatsappUrl, '_blank'); // Open WhatsApp in a new tab/window
});
