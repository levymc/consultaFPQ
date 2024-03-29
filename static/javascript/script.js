let input = document.querySelector("#input_2");
const btn = document.querySelector("#button-addon2");
input.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      confereCodigo();
    }
  });
  
let confereCodigo = () => {
    if (input.value != null && input.value != ' ' && input.value != undefined){
        axios.post("/confereStats", {
            valor: input.value,
        }).then(response => {
            console.log(response.data);
            const divPrincipal = document.querySelector(".container");
            divPrincipal.innerHTML = '';
            let conteudo;
            let btnMaisInfo = ``;
            console.log(response.data[0][5])
            if (response.data[0][5] == "Aprovado"){
                conteudo = `<div class="col-sm"><h4 style="color:rgb(23, 184, 8)">Aprovado</h4>
                <section class="botaoInfo">Mais Informações: <a id="botaoInfo" onClick="Teste()"><i class="fa-solid fa-circle-info"></i></a></section></div>`;
            }else{
                conteudo = `<div class="col-sm"><h4 style="color:rgb(211, 7, 7)">Não Aprovado</h4></div>`;
            }
            divPrincipal.innerHTML+=`
                <div class="cabecalho">
                    <div class="col-sm"><h2>PN Topo</h2></div>
                    <div class="col-sm"><h2>Código Embraer</h2></div>
                    <div class="col-sm"><h2>STATUS</h2></div>
                </div>
                <div class="conteudo">
                    <div class="col-sm"><p style="font-size:18px">${response.data[0][1]}</p></div>
                    <div class="col-sm"><p style="font-size:18px">${response.data[0][2]}</p></div>
                    ${conteudo}
                </div>
                `
        }).catch(error => {
            console.log(error);
            Swal.fire({
                title: "O código digitado está errado",
                icon: "error",
                showConfirmButton: true,
                confirmButtonColor: '#007bff',
            })
            input.value = '';
        })
    }else{
        alert("Ocorreu um erro, tente novamente ou acione o Processo.")
    }
}
