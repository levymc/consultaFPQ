const modalAcesso = (type) => {
    const html = `
    <form class='formLogin'>
        <div class="form-group">
            <label for="inputUsuario">Usuário</label>
            <input type="text" class="form-control" id="inputUsuario" placeholder="Digite o usuário">
        </div>
        <div class="form-group">
            <label for="inputSenha">Senha</label>
            <input type="password" class="form-control" id="inputSenha" placeholder="Digite a senha">
        </div>
        <button type="submit" class="btn btn-primary">Entrar</button>
    </form>
    `;

    Swal.fire({
        title: "Acesso Restrito ao Processo",
        html: html,
        showCancelButton: true,
        showConfirmButton: false,
        cancelButtonText: "Fechar"
    });

    // Adicionar o evento de submit do formulário
    const form = document.querySelector('.formLogin');
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); // Impede o envio padrão do formulário

        // Obter os valores dos inputs
        const inputUsuario = document.getElementById("inputUsuario").value;
        const inputSenha = document.getElementById("inputSenha").value;

        try {
            const response = await axios.post("/acessoProcesso", {
                usuario: inputUsuario,
                senha: inputSenha
            });
            console.log(response.data.value)
            if(response.data.value){
                Swal.fire({
                    title: "Sucesso!",
                    text: "Acesso concedido!",
                    icon: "success"
                }).then(resp => {
                    (resp.isConfirmed && type === 1) &&  
                })
            }else{
                Swal.fire({
                    title: "Erro!",
                    text: "Usuário ou Senha incorreto",
                    icon: "warning"
                });
            }

        } catch (error) {
            // Exemplo de exibição de mensagem de erro
            Swal.fire({
                title: "Erro!",
                text: "Falha ao acessar o processo.",
                icon: "error"
            });
        }
    });
}
