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
        criaLi.appendChild(botaoDeleta(item.id))

        lista.appendChild(criaLi)
       
    }

    function atualizaElemento(item) {
        const strongId = document.querySelector("[data-id = '"+item.id+"']")
        strongId.innerHTML = item.quantidade
    }

    function botaoDeleta(id) {

        const btnDeleta = document.createElement('button')
        btnDeleta.innerText = 'X'

        btnDeleta.addEventListener('click', (e) => {
            //console.log(e.target.parentNode)
            deletaElemento(e, id)
            
        })

        return btnDeleta
    }

    function deletaElemento(elemento, id) {
        //remove na tela
        const deletaLi = elemento.target.parentNode

        deletaLi.remove()

        const indice = itens.findIndex(item => item.id === id)

        // Para remover no local storage tenho que remover no array
        //itens.splice(indice, 1),  o indice posso conseguir pelo id.
        itens.splice(indice, 1)
        localStorage.setItem('storageItens', JSON.stringify(itens))
        
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

            const indice = itens.findIndex(item => item.id === existe.id)

            itens[indice] = novoItem

        } else {

            novoItem.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0

            criaElementos(novoItem)

            itens.push(novoItem)
        }

        localStorage.setItem('storageItens', JSON.stringify(itens))
       
        nome.value =''
        quantidade.value = ''
        nome.focus()
        
    })
})();
