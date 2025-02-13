function buscarCEP() {
    let cep = document.getElementById("cep").value.trim();

    if (cep.length !== 8 || isNaN(cep)) {
        mostrarMensagem("Digite um CEP válido com 8 números!", "alert-danger");
        return;
    }

    fetch(`https://cep.awesomeapi.com.br/json/${cep}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("CEP não encontrado.");
            }
            return response.json();
        })
        .then(data => {
            mostrarMensagem(`
                <strong>Endereço:</strong> ${data.address} <br>
                <strong>Bairro:</strong> ${data.district} <br>
                <strong>Cidade:</strong> ${data.city} <br>
                <strong>Estado:</strong> ${data.state}
            `, "alert-success");
        })
        .catch(error => {
            mostrarMensagem(error.message, "alert-danger");
        });
}

function mostrarMensagem(mensagem, tipo) {
    let resultado = document.getElementById("resultado");
    resultado.className = `alert ${tipo}`;
    resultado.innerHTML = mensagem;
    resultado.classList.remove("d-none");
}
