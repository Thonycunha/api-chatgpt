let count = 1;
const inputPergunta = document.getElementById("pergunta");
const resultado = document.getElementById("resultado");
const OPEN_API_KEY = "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";
document.getElementById("radio1").checked = true;

setInterval(function () {
    nextImage();
}, 3000)

function nextImage() {
    count++;
    if (count > 4) {
        count = 1;
    }
    document.getElementById("radio" + count).checked = true;
}

inputPergunta.addEventListener("keypress",(e) => {
    if(inputPergunta.value && e.key === "Enter"){
        sendPergunta();
    }
});

let sendPergunta = () => {
    var sPergunta = inputPergunta.value;

    fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + OPEN_API_KEY,
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: sPergunta,
            max_tokens: 2048, // Tamanho da Resposta
            temperature: 0.5, // Criatividade da Resposta
        }),
    })
    .then((response) => response.json())
    .then((json) => {
        if (resultado.value){
            resultado.value += "\n"
        }
        if(json.error?.message){
            resultado.value += `Erro: ${json.error.mesage}`
        }else if (json.choices?.[0].text){
            var text = json.choices[0].text || "Erro";
            resultado.value += "Resposta: " + text;
        }
        resultado.scrollTop = resultado.scrollHeight;
    })
    .catch((error) => console.error("Error",error))
    .finally(()=>{
        inputPergunta.value = "";
        inputPergunta.disabled = false;
        inputPergunta.focus();
    })
    if (resultado.value){
        resultado.value += "\n\n\n";
    }

    resultado.value += `${sPergunta}`
    inputPergunta.value = "Carregando..."
    inputPergunta.disabled = true;

    resultado.scrollTop = resultado.scrollHeight;
}

let limpaCampo = () => {
    resultado.value = '';
}