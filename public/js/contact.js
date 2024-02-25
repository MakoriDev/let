
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting via the browser

    var name = document.querySelector('input[name="name"]').value;
   
    var subject = document.querySelector('input[name="subjecte"]').value; // Ensure this matches your input's name attribute
    
    var message = document.querySelector('textarea[name="message"]').value;

    var whatsappNumber = "+254796733007"; // Your WhatsApp number in international format without '+'
    var textMessage = `Name: ${name} \nSubject: ${subject} \nMessage: ${message}`;
    var whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(textMessage)}`;

    window.open(whatsappUrl, '_blank'); // Open WhatsApp in a new tab/window
});
