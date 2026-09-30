const showPwrd = document.querySelector('#show-password')
const inptPswrd = document.querySelector('#password')


showPwrd.addEventListener('click', ()=>{
    if(inptPswrd.type == "password"){
        inptPswrd.type = "text";
    }else{
        inptPswrd.type = "password";
    }
})