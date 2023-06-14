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

            // Processar a resposta aqui se necessário
            console.log(response.data);

            // Exemplo de exibição de mensagem de sucesso
            Swal.fire({
                title: "Sucesso!",
                text: "Acesso concedido!",
                icon: "success"
            });

            // Fechar o modal após o sucesso
            Swal.close();
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
