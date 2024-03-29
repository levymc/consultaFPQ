function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    // document.getElementById("sideBtn").style.marginLeft = "250px";
}
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    // document.getElementById("sideBtn").style.marginLeft = "0";
}

const atualizaAxios = async (cod) => {
    const inputStatus = document.getElementById("inputStatus").value
    if (inputStatus === ''){
        Swal.showValidationMessage('Nenhum status foi escrito');
    }else{
        Swal.resetValidationMessage();
        try {
            const response = await axios.post("/atualizaStatus", {
                cod: cod,
                status: inputStatus
            })
            Swal.resetValidationMessage();
            response.data.data && Swal.fire({title:"Status Alterado com Sucesso!", icon:"success", confirmButtonColor: "#0D6EFD"})
            return response.data;
        }catch (error){
            Swal.showValidationMessage('Ocorreu um erro');
            console.log(error);
            throw error;
        }
    }
}

const editarButtonFunc = (cod) => {
    const resp = confirm(`Deseja editar as informações do código: ${cod}?`)
    if (resp){
        const html = `
        <div class="editModal">
            <div class="inputField-editModal input-group input-group-sm mb-3">
                <input class="form-control" id="inputStatus" type="text" placeholder="Digite o novo Status">
                <button type="button" class="btn btn-secondary" onclick="atualizaAxios(${cod})" id="btnProcurar">Alterar</button>
            </div>
        </div>
        `;
        Swal.fire({
            title: `Editar status do código: ${cod}`,
            allowOutsideClick: false,
            confirmButtonColor: "#0D6EFD",
            html: html,
            icon: "info",
        })

    }
}

const removerButtonFunc = async (cod) => {
    const resp = confirm(`Deseja remover as informações do código: ${cod}?`)
    if (resp){
        try {
            const response = await axios.post("/removeCEMB", {
                cod: cod,
            })
            Swal.resetValidationMessage();
            response.data.data && Swal.fire({title:"CEMB Removido com Sucesso!", icon:"success", confirmButtonColor: "#0D6EFD"})
            return response.data;
        }catch (error){
            Swal.showValidationMessage('Ocorreu um erro!');
            console.log(error);
            throw error;
        }
    }
}

const renderizarInfos = (data) => {
    console.log(data[0]);
    const editModal = document.getElementsByClassName("editModal")[0];
    const inputField = document.getElementsByClassName("inputField-editModal")[0];
    const table = document.createElement("table");

    // Adicionar títulos das colunas
    const titleRow = document.createElement("tr");

    const titleCol1 = document.createElement("th");
    titleCol1.textContent = "PN";
    titleRow.appendChild(titleCol1);

    const titleCol2 = document.createElement("th");
    titleCol2.textContent = "CEMB";
    titleRow.appendChild(titleCol2);

    const titleCol3 = document.createElement("th");
    titleCol3.textContent = "Status";
    titleRow.appendChild(titleCol3);

    const titleCol4 = document.createElement("th");
    titleCol4.innerHTML = ``;
    titleRow.appendChild(titleCol4);

    const titleCol5 = document.createElement("th");
    titleCol5.innerHTML = ``;
    titleRow.appendChild(titleCol5);

    table.appendChild(titleRow);

    // Adicionar linhas com valores
    data.forEach((item) => {
        const row = document.createElement("tr");

        const col1 = document.createElement("td");
        col1.textContent = item[1];
        row.appendChild(col1);

        const col2 = document.createElement("td");
        col2.textContent = item[2];
        row.appendChild(col2);

        const col3 = document.createElement("td");
        col3.textContent = item[5];
        row.appendChild(col3);

        const col4 = document.createElement("td");
        const editarButton = document.createElement("button");
        editarButton.className = "btn-editar";
        editarButton.id = "ediBTNcemb"; // ID do botão
        const editIconSpan = document.createElement("span");
        editIconSpan.innerHTML = `<ion-icon name="create-outline"></ion-icon>`;
        editarButton.appendChild(editIconSpan);
        editarButton.addEventListener("click", () => {
            editarButtonFunc(item[2]);
        });
        col4.appendChild(editarButton);
        row.appendChild(col4);

        const col5 = document.createElement("td");
        const removerButton = document.createElement("button");
        removerButton.className = "btn-remover";
        removerButton.id = "ediBTNcemb"; // ID do botão
        const removeIconSpan = document.createElement("span");
        removeIconSpan.innerHTML = `<ion-icon name="trash-outline"></ion-icon>`;
        removerButton.appendChild(removeIconSpan);
        removerButton.addEventListener("click", () => {
            removerButtonFunc(item[2]);
        });
        col5.appendChild(removerButton);
        row.appendChild(col5);

        table.appendChild(row);
    });

    editModal.insertBefore(table, inputField.nextSibling);
};

const procDB = async (codigo) => {
    try {
        const response = await axios.post("/confereStats", {
            valor: codigo,
        });
        Swal.resetValidationMessage();
        // console.log(response.data);
        return response.data;
    } catch (error) {
        Swal.showValidationMessage('O código digitado não foi encontrado!');
        console.log(error);
        throw error;
    }
};

const procurar = async () => {
    const inputProc = document.getElementById("inputProc").value;
    try {
        const response = await procDB(inputProc);
        renderizarInfos(response); // Chamada para a função renderizarInfos com a resposta recebida
    } catch (error) {
        Swal.showValidationMessage('Algum erro ocorreu.');
        console.log(error);
        throw error;
    }
};

function editStatus() {
    const html = `
    <div class="editModal">
        <div class="inputField-editModal input-group input-group-sm mb-3">
            <input class="form-control" id="inputProc" type="text" placeholder="Digite o PN ou o CEMB">
            <button type="button" class="btn btn-primary" onclick="procurar()" id="btnProcurar">Procurar</button>
        </div>
    </div>
    `;
    Swal.fire({
        title: "Editar Status",
        icon: "question",
        allowOutsideClick: false,
        html: html,
        confirmButtonColor: "#0D6EFD",
    });
}



function addPN() {
    const html = `
    <div class="form-group">
        <label for="inputPN">PN</label>
        <input type="text" class="form-control" id="inputPN" placeholder="Digite o PN">
    </div>
    <div class="form-group">
        <label for="inputCEMB">CEMB</label>
        <input type="text" class="form-control" id="inputCEMB" placeholder="Digite o CEMB">
    </div>
    <div class="form-group">
        <label for="inputStatus">Status</label>
        <input type="text" class="form-control" id="inputStatus" placeholder="Digite o Status">
    </div>
    `;

    Swal.fire({
        title: "Adicionar PN",
        icon: "question",
        allowOutsideClick: false,
        html: html,
        showCancelButton: true,
        confirmButtonText: "Adicionar",
        cancelButtonText: "Cancelar",
        showLoaderOnConfirm: true,
        preConfirm: async () => {
            const inputPN = document.getElementById("inputPN").value;
            const inputCEMB = document.getElementById("inputCEMB").value;
            const inputStatus = document.getElementById("inputStatus").value;
            try {
                const response = await axios.post("/adicionarPN", {
                    pn: inputPN,
                    cemb: inputCEMB,
                    status: inputStatus
                });
                if (response.data) {
                    return response.data;
                } else {
                    throw new Error("Erro ao adicionar PN");
                }
            } catch (error) {
                Swal.showValidationMessage(`${error}`);
            }
        }
    })
        .then(result => {
            if (result.value) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "PN adicionado com sucesso!",
                    icon: "success"
                });
            }
        });
}


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
                    (resp.isConfirmed && type === 1) && editStatus() || (resp.isConfirmed && type === 2) && addPN()
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
