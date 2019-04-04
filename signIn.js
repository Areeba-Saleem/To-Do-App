
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDdGDg2pn4vzhaDd60ZsqQkQauKFnC6-e0",
    authDomain: "to-do-app-6752b.firebaseapp.com",
    databaseURL: "https://to-do-app-6752b.firebaseio.com",
    projectId: "to-do-app-6752b",
    storageBucket: "to-do-app-6752b.appspot.com",
    messagingSenderId: "759713250162"
  };

  firebase.initializeApp(config);
  const Ref = firebase.database().ref();
  const signInButton = document.getElementById("signIn");
  const signUpButton = document.getElementById("signUp");
  
  window.addEventListener('load', function () {
    localStorage.clear;
})
  
  /*********************************Saving To Firebase Database*****************************/
  function saveToDatabase(userId , user)
  {
    Ref.child("users").child(userId).set(user);
  }
  
  
  
  
  /****************************** Reading Data from Database *********************************/
  function readUserData(uid)
  {
      Ref.child("users").child(uid).once("value" , data => {
          var user = data.val();
          localStorage.setItem("user", JSON.stringify(user));
          window.location.replace("./toDoApp.html");

      });
  }

  
  
  
  
  /******************************** Creating User Id *******************************/ 
  signUpButton.addEventListener("click",function ()
  {

   const userName = document.getElementById("userName").value;
    const userEmail = document.getElementById("email").value;
   const userPassword = document.getElementById("password").value;
   console.log(userEmail);
   firebase.auth().createUserWithEmailAndPassword(userEmail, userPassword) 
       .then(function (data) {
         const user = { 
             name: userName,
             email: userEmail,
             uid: data.user.uid
         };     
         console.log(data);
        console.log(data.user.uid);
        console.log(user);
        saveToDatabase(data.user.uid , user);
        localStorage.setItem('user', JSON.stringify(user));
        window.location.replace("./toDoApp.html");
       })
       .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
        console.log(error);
      });

  })



  /***************************** Login User Id ***************************************/
  signInButton.addEventListener('click', function(){
    
      const email = document.getElementById("email1").value;
      const password = document.getElementById("password1").value;

      firebase.auth().signInWithEmailAndPassword(email , password)
      .then(data => {
          alert("Logged In successfully!");
          readUserData(data.user.uid);
      })
      .catch(error => {
          alert(error);
      });
  })  
  
  


  /**************************** Displaying Sign Up and Sign In Form *************************************/
  function displayForm(id1,id2)
  {
     document.getElementById(id1).className="hide";
      document.getElementById(id2).className="show";
  }
 
