var label = document.querySelectorAll('label')


label.forEach(label => label.classList.remove('form-label'))
function clickevent() {

    label.forEach(label => {
        label.classList.remove('input_group_label')
        label.classList.add('form-label')
    })


}