function newPopup(){
    
    Swal.fire({
        title: 'Contato Processo',
        html: `
            <input type="text" id="login" name="nome" class="swal2-input" placeholder="Nome">
            <input type="text" id="password" name="moivo" class="swal2-input" placeholder="Motivo">
            <textarea id="descricao" name="descricao "cols="30" rows="500" style="resize:none" class="swal2-textarea"  maxlength="200" placeholder="Descrição"></textarea>`,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        focusConfirm: false,
        preConfirm: () => {
        const login = Swal.getPopup().querySelector('#login').value
        const password = Swal.getPopup().querySelector('#password').value
        const descricao = Swal.getPopup().querySelector('#descricao').value
        if (!login || !password) {
            Swal.showValidationMessage(`Nome e motivo devem ser preenchidos.`)
        }
        return { login: login, password: password , descricao: descricao}
    }
    }).then((result) => {
        if (!result.value){
            Swal.fire(`
            Contato cancelado
            `)
        }else{
            const nome = result.value.login;
            const motivo = result.value.password;
            const descricao = result.value.descricao;
            const dict_values = {nome, motivo, descricao};
            const s = JSON.stringify(dict_values);
            $.ajax({
                url:"/send",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(s)
            });
            Swal.fire(`
            Informações enviadas com sucesso!!
            `.trim())
        }
    }) 
}
