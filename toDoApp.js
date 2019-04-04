
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
 const addTask = document.getElementById("addTask");
 const signOut = document.getElementById("signOut");
 var user = localStorage.getItem("user");
 var list = document.getElementById("tasksList");
 
 user = JSON.parse(user);
/******************************************** User Greetings ***********************************/
var welcomeNote = document.getElementById("welcome");
          welcomeNote.innerHTML = "Welcome! "+ user.name;



/******************************** Retrieving Data From Database**************************************/
Ref.child("users").child(user.uid).child("toDoList").on("value", data => {
list.innerHTML = "";
const listTask = data.val();
//console.log(listTask);
for(x in listTask)
{
  displayList(x, listTask[x]);
}
});
function displayList(taskId, newTask)
{
   
    var newNode = document.createElement("li");
    newNode.setAttribute("id", taskId);
    var t = document.createTextNode(newTask);
    newNode.appendChild(t);
    var delButton =  document.createElement("button");
    delButton.setAttribute("class", "deleteButton");
    delButton.setAttribute("onClick",`deleteTask('${taskId}')`);
    delButton.appendChild(document.createTextNode("Delete"));
    newNode.appendChild(delButton);
    list.appendChild(newNode); 
  //  console.log(taskId);

}
  /***************************** Adding Tasks in To-Do-App ***************************************/

  addTask.addEventListener("click" , function(){
   var newTask = document.getElementById("newTask");
   if(newTask.value !== "")
   {
   Ref.child("users").child(user.uid).child("toDoList").push(newTask.value);
   newTask.value = "";
 }
 } ) 
 
/***************************** Deleting Tasks in To-Do-App *************************************/   
       function deleteTask(fieldId)
       {
           let taskList = {};
            const taskToDel = document.getElementById(fieldId);
            //console.log(taskToDel);
            Ref.child("users").child(user.uid).child("toDoList").on("value" , data => {
            taskList = data.val();
            //console.log(taskList);
            taskToDel.remove();
           delete taskList[fieldId];
          
        });
       // console.log(taskList);
        Ref.child("users").child(user.uid).child("toDoList").set(taskList);
       }

 /*************************** Signing Out ************************************/
 signOut.addEventListener("click", function(){
     window.location.replace("./index.html");
     localStorage.clear();
 })