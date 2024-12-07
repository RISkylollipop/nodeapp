`use strict;`

var password = document.querySelector(`.password`)
var email = document.querySelector(`.email`)
var emailerror = document.querySelector(`.emailerror`)
var passworderror = document.querySelector(`.passworderror`)
var regbtn = document.querySelector(`.register`)
var phone = document.querySelector(`.phone`)
var passwordconfirm = document.querySelector(`.passwordconfirm`)
var passwordconfirmerror = document.querySelector(`.passwordconfirmerror`)


// function printpage() {
//     window.print()
// }


function emailval() {
    if(!email.value.match(/^[A-Za-z\_.\-0-9]*[@]*[A-Za-z]*[\.][A-Za-z]{3,4}$/)){
        emailerror.textContent = "please input a valid email"
        emailerror.style.color = "red"
        regbtn.style.display = "none"
    }else{
        emailerror.textContent = "Email Validate"
        emailerror.style.color = "green"
        regbtn.style.display = "block"
    }
}

function pass() {
    if(!password.value || !password.value.match(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/) || password.value.length < 8){
        passworderror.textContent = "Please Use specified Password Format";
        passworderror.style.color = "red"
        regbtn.style.display = "none"

    }else{
        passworderror.textContent = "strong password"
        passworderror.style.color = "green"
        regbtn.style.display = "block"
    }
}

function passmatch() {
    if(password.value !== passwordconfirm.value ){
        
        passwordconfirmerror.textContent = "Password do not match ❌";
        passwordconfirmerror.style.color = "red"
         regbtn.style.display = "none"
    }else{
        passwordconfirmerror.textContent = "Password Confirmed ✅";
        passwordconfirmerror.style.color = "red"
         regbtn.style.display = "block"
    }
}

let date = document.querySelector('.date')
let datetop = document.querySelector('.datetop')

let today = new Date()
let formatdate = today.toLocaleDateString()
date.textContent = formatdate
datetop.textContent = today


let commentsub = document.getElementById('commentsub')
let commentform = document.getElementById('commentform')
let commenttext = document.getElementById('commenttext')

commentform.addEventListener(`submit`, function commnentsubmit() {
    commenttext.textContent = "Comment Submitted successfullly"
    commenttext.style.color = "green"
})