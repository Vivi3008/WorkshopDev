
function onOff(){
  document
    .querySelector("div#modal")
    .classList
    .toggle('hide')

  document
    .querySelector("div#container")
    .classList
    .toggle('hide')

  document
    .querySelector("body")
    .classList
    .toggle('hideScrool')

  document
    .querySelector("#modal")
    .classList
    .toggle('addScroll')
}

document
    .querySelector("section button")
    .addEventListener('click', onOff)


//funçao para validar os campos do formulario se tiver campo vazio
function checkFields(event){
    const valuesToCheck = [
      "title",
      "category",
      "image",
      "description",
      "link"
    ]
//cria a variavel  para procurar no vetor se tem alguma variavel vazia
    const isEmpty = valuesToCheck.find(function(value){
         //checa se a variavel do vetor é do tipo string e se tem valor
        const checkIfString = typeof event.target[value].value === "string"
        //checa se esta vazio o valor do vetor
        const checkIfIsEmpty = !event.target[value].value.trim()

        if(checkIfString && checkIfIsEmpty){
            return true
        }
    })

    if(isEmpty){
      event.preventDefault()
      alert('Por favor, preencha todos os campos!')
    }
}

