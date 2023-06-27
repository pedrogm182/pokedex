// console.log("teste")

const pokemonName =document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector(".pokemon-image")

const form = document.querySelector(".form");
const input = document.querySelector(".buscar");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let pokemonAtual = 1;

// função que ira fazer requisção na API
async function buscarPokemon(pokemon){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`
   
    // realizando a requisição e obtendo a uma resposta
    const response = await fetch(url)
    if (response.status == 200 ){
        const data = await response.json();
       return data;
    }
}

// função que ira renderizar o pokemon na pagina
async function renderPokemon(pokemon){
    pokemonName.innerText = "carregando..."
    pokemonNumber.innerText = "";
    const data = await buscarPokemon(pokemon);
    console.log(data);
    if (data){
        pokemonImage.computedStyleMap.display="block";
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
        input.value = "";
        pokemonAtual = data.id;

    }
    else {
        pokemonName.innerText = "não encontrado"
        pokemonNumber.innertText = "";
        pokemonImage.style.display = "none";

    }


}

// evento de submit do formulario
form.addEventListener("submit", (e) =>{
    // impede a pagina de dar o "reload"
    e.preventDefault();
    // chamando a função renderPokemon passando o value e e digitado
    renderPokemon(input.value.toLowerCase());
    
})

// botao para passar para o proximo ou o anterior
btnNext.addEventListener("click",() =>{
    pokemonAtual++;
    renderPokemon(pokemonAtual);

})

btnPrev.addEventListener("click", () =>{
    if(pokemonAtual > 1) {
        pokemonAtual--;
        renderPokemon(pokemonAtual)
    }
})

renderPokemon(pokemonAtual)