const Cookies = {
    // Sets a cookie
    set: function(name, value, hours) {
        let expires = "";
        if (hours) {
            const date = new Date();
            date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    },

    // Gets a cookie by name
    get: function(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    // Deletes a cookie by name
    delete: function(name) {
        document.cookie = name + '=; Max-Age=-99999999;';
    }
};

function signOut(){
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';// Cookies.delete("user_id")
    alert("logged Out"); // Show success message
    window.location.href = './index.html'; // Redirect to index.html (path may need to be adjusted)
}
// export default Cookies;