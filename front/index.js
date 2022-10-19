
const url = "http://localhost:4001/conta/login"

const form = document.querySelector('form')

form.addEventListener('submit', async (e) =>{
    e.preventDefault() 
    const email = document.getElementById('email')
    const senha = document.getElementById('senha')

    fetch("http://localhost:4001/conta/login",
    {
        method: "POST",
        headers: {"Content-type": "application/json; charset=UTF-8"},
        body : JSON.stringify({
            email : email.value,
            senha : senha.value
        })
    })
        .then(data => data.json())
        .then(async data =>{
            if(data.men){
                alert('email ou senha errado')
            }else{
                await alert('logado com sucesso')
                const token = { token: data}
                const josn = JSON.stringify(token)
                sessionStorage.setItem('token', josn)
                window.location.href = './conta.html'
            }
    
            
        })
        .catch(error => {console.log(error)})
})

    
