document.addEventListener("DOMContentLoaded", function() {

    const formulario = document.querySelector(".form-group");
    const descricaoInput = document.getElementById("description");
    const codigoHTLM = document.getElementById("html-code");
    const codigoCss = document.getElementById("css-code");
    const secaoPreview = document.getElementById("preview-section");

    formulario.addEventListener("submit", async function(evento){

        evento.preventDefault();

        const descricao = descricaoInput.value.trim();
        console.log(descricao);
        
        if(!descricao){
            return;
        }

        mostrarCarregamento(true);

        try{
            const resposta = await fetch("https://bernardosusenlunkes.app.n8n.cloud/webhook/fundinho", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body:  JSON.stringify({ descricao })
            });

            const dados = await resposta.json();
            
            codigoHTLM.textContent = dados.html || "";
            codigoCss.textContent = dados.css || "";

            secaoPreview.style.display = "block";
            secaoPreview.innerHTML = dados.html || "";

            let tagEstilo = document.getElementById("estilo-dinamico");
            if(tagEstilo){
                tagEstilo.remove();
            }
            if(dados.css){
                tagEstilo = document.createElement("style");
                tagEstilo.id = "estilo-dinamico";
                tagEstilo.textContent = dados.css;
                document.head.appendChild(tagEstilo);
            }

        }catch(error){
            console.error("Erro ao enviar a requisição:", error);
            codigoHTLM.textContent = "Não consegui gerar o HTML, tnte novamente.";
            codigoCss.textContent = "Não consegui gerar o CSS, tnte novamente.";
            secaoPreview.innerHTML = "";
        }finally{
            mostrarCarregamento(false);
        }
    });

    function mostrarCarregamento(estaCarregando) {
		const botaoEnviar = document.getElementById("generate-btn");
		if (estaCarregando) {
			botaoEnviar.textContent = "Carregando Background...";
		} else {
			botaoEnviar.textContent = "Gerar Background Mágico";
		}
	}

});