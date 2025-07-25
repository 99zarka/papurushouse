function countCart(){
    var cart = JSON.parse(localStorage.getItem('cart'))
    if(cart === null) cart = {};
    var itemsCounter = 0;
    if (Object.keys(cart).length !== 0) {
        for(var i = 0; i < Object.values(cart).length; i++){
            itemsCounter += Object.values(cart)[i];
        }       
    }
    if(document.getElementById('cart-counter'))
        document.getElementById('cart-counter').textContent = itemsCounter;
    return itemsCounter;
}


document.addEventListener('DOMContentLoaded', function() {
    var navHtml = 
    `
    <header class="navbar">
      <div class="container">
        <div class="logo">
          <a href="index.html"><img src="./images/logo.png" alt="Papurus House" /></a>
        </div>

        <nav class="nav-links">
          <a href="index.html">Home</a>
          <a href="products.html">Products</a>
          <a id="login-link" href="login.html">Log in</a>
          <a id="register-link" href="register.html">Register</a>
          <a href="#" id="logout-button" style="display: none;">Logout</a>


          <a href="#myfooter">About Us</a>
        </nav>

        <div class="nav-actions">
          <span id="user-name-display" style="margin-left: 15px; display: none;"></span>
          <form action="products.html">
            <input type="text" class="search-input" name="q" placeholder="Search..."  required/>
            <button type="submit" class="icon-btn"><i class="fas fa-search"></i></button>
          </form>
          <a href="checkout.html" class="icon-btn"><i class="fas fa-shopping-cart"></i> <span id="cart-counter">${countCart()}</span></a>
          <button class="icon-btn dark-toggle" id="theme-toggle">
            <i class="fas" id="theme-icon"></i>
          </button>
        </div>
      </div>
    </header>
    `


    document.body.insertAdjacentHTML('afterbegin', navHtml);

    

    const loggedInUser = localStorage.getItem('loggedInUser');
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutButton = document.getElementById('logout-button');
    const userNameDisplay = document.getElementById('user-name-display');

    if (loggedInUser) {
        const user = JSON.parse(loggedInUser);
        if (loginLink) loginLink.style.display = 'none';
        if (registerLink) registerLink.style.display = 'none';
        if (logoutButton) logoutButton.style.display = 'block';
        if (userNameDisplay) {
            userNameDisplay.textContent = `Hi, ${user.name} 👋`;
            userNameDisplay.style.display = 'block';
        }
    } else {
        if (loginLink) loginLink.style.display = 'block';
        if (registerLink) registerLink.style.display = 'block';
        if (logoutButton) logoutButton.style.display = 'none';
        if (userNameDisplay) userNameDisplay.style.display = 'none';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            localStorage.removeItem('loggedInUser');
            window.location.href = 'index.html'; // Redirect to home or login page after logout
        });
    }

    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const currentTheme = localStorage.getItem('theme');

    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            document.body.classList.remove('dark-mode');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        localStorage.setItem('theme', 'light');
        applyTheme('light');
    }

    themeToggle.addEventListener('click', function() {
        let theme = localStorage.getItem('theme');
        if (theme === 'light') {
            applyTheme('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            applyTheme('light');
            localStorage.setItem('theme', 'light');
        }
    });

});
