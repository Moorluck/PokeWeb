const URL = "https://pokeapi.co/api/v2/pokemon/"

const input = document.getElementById("search_input")
const btn = document.getElementById("search_btn")

const name = document.getElementById("name")
const img = document.getElementById("img")

const typeList = document.getElementById("type")
const desc = document.getElementById("desc")

btn.addEventListener("click", () => {
    const value = input.value
    changePokeInfo(value)
})

function changePokeInfo(value) {
    fetch(URL + value)
        .then(response => response.json())
        .then(pokemon => {
            img.style.visibility = "visible"
            
            name.innerText = pokemon.name[0].toUpperCase() + pokemon.name.slice(1)
            img.src = pokemon.sprites.other["official-artwork"].front_default
            getTypes(pokemon.types)
            getDescription(pokemon.species.url)
        })
}

function getTypes(types) {
    typeList.innerHTML = ""
    for (const type of types) {
        console.log(type.type.name)
        const typeHTML = document.createElement("p")
        typeHTML.innerText = type.type.name[0].toUpperCase() + type.type.name.slice(1)

        typeList.appendChild(typeHTML)
    }
}

function getDescription(url) {
    fetch(url)
        .then(response => response.json())
        .then(species => {
            const descList = species.flavor_text_entries
            console.log(descList)
            let descText = ""

            let descTrouvee = false
            let i = 0
            while (descTrouvee == false && i < descList.length) {
                const flavorText = descList[i]

                if (flavorText.language.name == "en") {
                    descText = flavorText.flavor_text
                    descTrouvee = true
                }

                i++
            }

            desc.innerText = descText.replace("", " ").replace("POKéMON", "pokemon")
        })
}