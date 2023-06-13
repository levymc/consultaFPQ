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



/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    // document.getElementById("sideBtn").style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    // document.getElementById("sideBtn").style.marginLeft = "0";
}

const procurar = () => {
    const inputProc = document.getElementById("inputProc").value
    console.log(inputProc)
}

function editStatus(){
    const html = `
    <div class="editModal">
        <div class="inputField-editModal input-group input-group-sm mb-3">
            <input class="form-control" id="inputProc" type="text" placeholder="Digite o PN ou o CEMB">
            <button type="button" class="btn btn-primary" onclick="procurar()" id="btnProcurar">Procurar</button>
        </div>
    </div>
    `
    Swal.fire({
        title: "Editar Status",
        icon: "question",
        allowOutsideClick: false,
        html: html,
        confirmButtonColor: "#0D6EFD",
    })

    const editModal = document.getElementsByClassName("editModal")
    const inputField = document.getElementsByClassName("inputField-editModal")
    
}
function addPN(){
    Swal.fire({
        title: "Adicionar PN",
        icon: "question",
        allowOutsideClick: false,

    })
}