const token = sessionStorage.getItem('token')
const jsonData = JSON.parse(token)

const email = document.getElementById('email')
const valor = document.getElementById('valor')

const enviar = document.getElementById('enviar')

enviar.addEventListener('click', async () => {

    const value = Number(valor.value)
    fetch('http://localhost:4001/user/logado/transferir',{
        method: "PATCH",
        mode: "cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization" : `Bearer ${jsonData.token.token}`
        },
                body : JSON.stringify({
                    pId : email.value,
                    valor : value
                })
    })
    .then(json => json.json())
    .then(data => {
        console.log(data)
        alert(data.mensagem)
        valor.value = ''
        email.value = ''
    })
    .catch(error => console.log(error))
})

const perfil = document.getElementById('perfil')

perfil.addEventListener('click', () => {
    window.location.href = './conta.html'
})