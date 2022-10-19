const form = document.querySelector('form')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    const email = document.getElementById('email')
    const senha = document.getElementById('senha')

    if(!email.value || !senha.value){
        console.log('falta')
    }else{

        fetch("http://localhost:4001/conta/criar",
        {
            method: "POST",
            headers: {"Content-type": "application/json; charset=UTF-8"},
            body : JSON.stringify({
                email : email.value,
                senha : senha.value
            })
        })
        .then(json => json.json())
        .then(data => {
            alert(data.mensagem)
        })
        .catch(error => console.log(error))
    }
    
})
