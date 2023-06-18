// function toggleMobileMenu(menu) {
//     menu.classlist.toggle('open');
// }


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

auth.onAutgStarteChange(function (user) {
    if (user){
        var email = user.email;
        var user = document.getElementById("user");
        var text = document.createTextNode(email);
        user.appendChild(text);
        console.log(user);
    }
});

// logout
let signOutButton = document.getElementById("signout");
signOutButton.addEventListener("click", (e) => {
    e.preventDefault();
    console.log("logout clicked");
    auth.sigOut();
    window.location = "main.html"
});