;( function () {
    //Variáveis
    const frm = document.getElementById('novoItem')
    const nome = document.getElementById('nome')
    const quantidade = document.getElementById('quantidade')
    const lista = document.getElementById('lista')

    //Criando os elemento para ficarem na tela
    const itens = JSON.parse(localStorage.getItem('storageItens')) || []
    itens.forEach((elemento) => {
        criaElementos(elemento)
    });

    //Funções
    function criaElementos (item) {
        
        const criaLi = document.createElement('li')
        criaLi.classList.add('item')

        const criaStrong = document.createElement('strong')
        criaStrong.innerHTML = item.quantidade
        criaStrong.dataset.id = item.id

        criaLi.appendChild(criaStrong) 
        criaLi.innerHTML += item.nome

        lista.appendChild(criaLi)
        console.log(lista)
    }

    function atualizaElemento(item) {
        const strongId = document.querySelector("[data-id = '"+item.id+"']")
        strongId.innerHTML = item.quantidade
    }

    //Eventos
    frm.addEventListener('submit', (e) => {
        e.preventDefault()

        const nomeInput = nome.value
        const quantidadeInput = quantidade.value

        const existe = itens.find((elemento) => elemento.nome === nomeInput)

         //Criando os elemento para o local storage
        const novoItem = {
            "nome": nomeInput,
            "quantidade": quantidadeInput 
        }

        if(existe) {

            novoItem.id = existe.id

            atualizaElemento(novoItem)

            itens[existe.id] = novoItem

        } else {

            novoItem.id = itens.length

            criaElementos(novoItem)

            itens.push(novoItem)
        }

        localStorage.setItem('storageItens', JSON.stringify(itens))
       
        nome.value =''
        quantidade.value = ''
        nome.focus()
        
    })
})();
