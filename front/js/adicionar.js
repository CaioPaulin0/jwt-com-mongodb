const token = sessionStorage.getItem('token')
const jsonData = JSON.parse(token)

const adicionar = document.getElementById('adicionar')
const valor = document.getElementById('valor')

adicionar.addEventListener('click', async () => {
    const value =  Number(valor.value)

    fetch('http://localhost:4001/user/logado/adicionar',{
        method: "PATCH",
        mode: "cors",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization" : `Bearer ${jsonData.token.token}`
        },
        body: JSON.stringify({
            valor: value
        })
    })
    .then(json => json.json())
    .then(data => {
        alert(data.mensagem)
    })
    .catch(error => console.log(error))
})

const voltar = document.getElementById('voltar')

voltar.addEventListener('click' , () => {
    window.location.href = './conta.html'
})
