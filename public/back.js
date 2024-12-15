'use strict;'

function goBack() {
    window.history.back()
}


let number = document.getElementById('number')
let generate = document.getElementById('generate')


generate.addEventListener('click', function(e){
    const secret = Math.floor(Math.random()*2000000+999 * Math.floor(Math.random()*200000+9999))
    number.value = secret
    e.preventDefault()
})