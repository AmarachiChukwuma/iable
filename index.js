function toggleMobileMenu(menu) {
    menu.classlist.toggle('open');
}



const firebaseConfig = {
    apiKey: "AIzaSyCUDTrmdO2nW_H2CTk8S1M1MvD6euJpPLg",
    authDomain: "register-7fc8f.firebaseapp.com",
    projectId: "register-7fc8f",
    storageBucket: "register-7fc8f.appspot.com",
    messagingSenderId: "1092275612543",
    appId: "1:1092275612543:web:69a412543579549c0cc84a"
   };
   firebase.initializeApp(firebaseConfig);

   const auth = firebase.auth();

   let signUpButton = document.getElementById("signup");
   signUpButton.addEventListener("click", (e) => {

    e.preventDefault();
    console.log("registered");

    var email = document.getElementById("inputEmail");
    var password = document.getElementById("inputPassword");

    auth
    .createUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
        location.reload();
        alert("user Registered successfuly")

        var user = userCredential.user;
        console.log("user", user.email);
    })

    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("error code", errorCode);
        console.log("error code", errorMessage);
        alert(errorMessage)
    });
});



// signin function

let signInButton = document.getElementById("signin");
signInButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("signin click");

    var email = document.getElementById("inputEmail");
    var password = document.getElementById("inputPassword");

    auth
    .signInUserWithEmailAndPassword(email.value, password.value)
    .then((userCredential) => {
        var user = userCredential.user;
        console.log("user", user.mail);
        window.location = ("logged.html")

    })
    .catch ((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
    });
});







