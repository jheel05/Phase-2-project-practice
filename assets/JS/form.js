document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('customer-form');
    const formDataSection = document.getElementById('form-data');

    
    const savedName = localStorage.getItem('name');
    if (savedName) {
        document.getElementById('name').value = savedName;
    }
    const savedEmail = localStorage.getItem('email');
    if (savedEmail) {
        document.getElementById('email').value = savedEmail;
    }
    const savedAddress = localStorage.getItem('address');
    if (savedAddress) {
        document.getElementById('address').value = savedAddress;
    }

   
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const address = document.getElementById('address').value;

        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('address', address);

        
        formDataSection.innerHTML = `
            <h2>Your Information:</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address:</strong> ${address}</p>
        `;

        
        form.style.display = 'none';
        formDataSection.style.display = 'block';

       
        const apiData = { name, email, address };
        console.log('API data:', apiData);
    });
});
