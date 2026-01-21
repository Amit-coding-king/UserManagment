const nameInput=document.getElementById('name-input')
const emailInput=document.getElementById('email-input')
const passwordInput=document.getElementById('password-input')
const form=document.querySelector('form')

const h1 = document.querySelector('h1')
const params = new URLSearchParams(window.location.search);
const value = params.get("userId");

  function backtohome(){
    window.location.href='https://user-managmentdashboard.vercel.app/src/ManagUser.html'
  }



async function getUserById(id){
    const response = await fetch(`https://user-managmentdashboardbackend.vercel.app/user/${id}`);
    const data = await response.json();
    if(data.status === 'false'){
        return alert(`❌ ${data.err} ❌`)
    }
    // console.log(data.user)
    h1.innerText = `Edit User ( ${data.user.name} )`//esko yeha esliye rakhe kyoki api se data esi function ke andar aa raha hai
    nameInput.value=data.user.name
    emailInput.value=data.user.email
    passwordInput.value=data.user.password
}

function updateUser(id){
  


}
form.addEventListener('submit', async function(e){
    e.preventDefault()
    const name=nameInput.value
    const email=emailInput.value
    const password=passwordInput.value
    

    const response=await fetch(`https://user-managmentdashboardbackend.vercel.app/update/${value}`,{

     method:'PUT',
     headers:{
        'content-type':'application/json'
     },
     body:JSON.stringify({name,email,password})

    })
    const data = await response.json();

    if(data.status === 'false'){
    return alert(`x ${data.err}x`)

}
alert(data.message)
nameInput.value=""
emailInput.value=""
passwordInput.value=""
window.location.href='https://user-managmentdashboard.vercel.app/src/ManagUser.html'

})




getUserById(value)