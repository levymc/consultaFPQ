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
        const iconSpan = document.createElement("span");
        iconSpan.innerHTML = `<ion-icon name="create-outline"></ion-icon>`;
        editarButton.appendChild(iconSpan);
        editarButton.addEventListener("click", () => {
            console.log(item[2]);
        });
        col4.appendChild(editarButton);
        row.appendChild(col4);
        
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



function addPN(){
    Swal.fire({
        title: "Adicionar PN",
        icon: "question",
        allowOutsideClick: false,

    })
}