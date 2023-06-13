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

const procDB = async (codigo) => {
    try {
        const response = await axios.post("/confereStats", {
            valor: codigo,
        });
        Swal.resetValidationMessage();
        console.log(response.data);
        return response.data;
    } catch (error) {
        Swal.showValidationMessage(
            'O código digitado não foi encontrado'
          )
        console.log(error);
        throw error;
    }
};

const procurar = async () => {
    const inputProc = document.getElementById("inputProc").value;
    const editModal = document.getElementsByClassName("editModal");
    const inputField = document.getElementsByClassName("inputField-editModal");
    console.log(inputProc);
    try {
        const response = await procDB(inputProc);
        // Faça algo com a resposta obtida
    } catch (error) {
        // Trate o erro de alguma forma
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