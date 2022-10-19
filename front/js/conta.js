const token = sessionStorage.getItem('token')
const jsonData = JSON.parse(token)

const nome = async (nome) => {
    const p = document.getElementById('nome')
    p.innerHTML =`Email: ${nome.email}`

    return p
}

const saldo = async (data) => {
    const p = document.getElementById('saldo')
    p.innerHTML = `R$: ${data.valor}`

    return p
}

fetch('http://localhost:4001/user/logado/',{
    method : "GET",
    mode: "cors",
    headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Authorization" : `Bearer ${jsonData.token.token}`
    }
})
.then(json => json.json())
.then(data => {
    nome(data[0])
    saldo(data[0])
})
.catch(error => console.log(error))

const deslogar = document.getElementById('deslogar')

deslogar.addEventListener('click', () => {
    const token = sessionStorage.clear()
    window.location.href = './index.html'
})

const adicionar = document.getElementById('adicionar')

adicionar.addEventListener('click', () => {
    window.location.href = './adicionar.html'
})

const enviar = document.getElementById('enviar')

enviar.addEventListener('click', () => {
    window.location.href = './enviar.html'
})