const token=localStorage.getItem('token')
if(!token){

    window.location.href='https://user-managmentdashboard.vercel.app/franten/src/signup.html'
}
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
let tduserName=document.querySelector(".td-name");
let tdemail=document.querySelector(".td-email");
let tdpassword=document.querySelector(".td-password");
let tdrole=document.querySelector(".td-role");
let UserContainer=document.querySelector(".user-containe");
const Logout=document.getElementById('Logout')

const logout=()=>{
    
    window.location.href='https://user-managmentdashboard.vercel.app/franten/index.html'
    localStorage.removeItem('token')

}


function adduser(){
    form.style.display="flex";
}
function cancleform(){
    form.style.display="none"
}

function navigate(id){
    window.location.href=`http://localhost:5500/franten/src/Edite.html?userId=${id}`
}

form.addEventListener('submit', async function(e){
    e.preventDefault()

    const name=nameInput.value
    const email=emailInput.value
    const password=passwordInput.value
    const role=roleInput.value
    const url=profileUrl.value
  
    

//user fatch
    const response = await fetch('https://user-managmentdashboardbackend.vercel.app/create-user',{
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
     profileUrl.value=""
    
     cancleform()
     getAllUser()

})


async function getAllUser(){
    const response = await fetch('https://user-managmentdashboardbackend.vercel.app/users')
    const data = await response.json()
    if(data.status === 'false'){
        return alert(`X ${data.err} X`)
    }
   // console.log(data.users)
  generateHtml(data.users)
 
}


async function deleteUser(id){
    const response = await fetch(`https://user-managmentdashboardbackend.vercel.app/delete/${id}`, {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json'
        },
    })
    const data = await response.json()
    if(data.status === 'false'){
        return alert(`❌ ${data.err} ❌`)
    }
    alert(data.message)

    
//generateHtml(data.users)
   getAllUser()
}



function generateHtml(arrayofUsers){
    UserContainer.innerHTML ='';
    arrayofUsers.forEach(user =>{
        UserContainer.innerHTML +=`
         <tr>
    <td class="user-td">
        <img src="${user.url}" alt="profile" class="profile-img">
     <div >
        <p class="td-username">${user.name} </p>
        <p class="td-email">${user.email}</p>
    </div>
    </td>
    <td class="td-password">${user.password}</td>
    <td class="td-role" id="admin"><div>${user.role}</div></td>
    <td  >
    <img src="../asset/delet.png" alt="edit" class="td-action"  onclick="deleteUser('${user._id}')">
    <img src="../asset/write.png" alt="edit" class="td-action"  onclick="navigate('${user._id}')">
    </td>
  </tr>
         
        `

    })
    
}
   getAllUser()    
         
    
