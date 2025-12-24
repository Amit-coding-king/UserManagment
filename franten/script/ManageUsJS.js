let btn=document.querySelector("#btn");
let form=document.querySelector("form");
let canclebtn=document.querySelector("#canclebtn")
let main2=document.querySelector(".main2");
// input selecting
let nameInput=document.getElementById('user-input');
let emailInput=document.getElementById('email-input');
let passwordInput=document.getElementById('password-input');
let roleInput=document.getElementById('role-input');
let profileUrl=document.querySelector('.profileUrl');
// user data section element
let tduserName=document.querySelector(".td-name")
let tdemail=document.querySelector(".td-email")
let tdpassword=document.querySelector(".td-password")
let tdrole=document.querySelector(".td-role")


function adduser(){
    form.style.display="flex";
}
function cancleform(){
    form.style.display="none"
}


form.addEventListener('submit', async function(e){
    e.preventDefault()

    const name=nameInput.value
    const email=emailInput.value
    const password=passwordInput.value
    const role=roleInput.value
    const url=profileUrl.value
  
    


    const response = await fetch('http://localhost:8000/create-user',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify({name,email,password,role,url})
    })
    const data = await response.json();
    if(data.status ==='false'){
       return alert(`X ${data.error} X`)
    }
    alert(data.message)
    nameInput.value=""
    emailInput.value=""
    passwordInput.value=""
    roleInput.value=""
    
     cancleform()

})