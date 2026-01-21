const token=localStorage.getItem('token')
if(token){
     window.location.href='http://127.0.0.1:5500/franten/src/ManagUser.html'
}

const emailInput=document.getElementById('email-input');
const passwordInput=document.getElementById('password-input');
const form =document.querySelector('form');

form.addEventListener('submit',async function(e){
    e.preventDefault()
    
    const email=emailInput.value 
    const password=passwordInput.value
    const response= await fetch ('http://localhost:8000/login',{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify({email,password})

    })
    const data = await response.json();
    if(data.status==='false'){
        return alert(`x ${data.err} x`)
    }
    alert(data.message)
    localStorage.setItem('token', data.token)
    window.location.href='http://127.0.0.1:5500/franten/src/ManagUser.html'
    emailInput.value=""
    passwordInput.value=""
})
