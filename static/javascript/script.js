function confereCodigo(){
    let input = document.querySelector("#input_2")
    if (input.value != null && input.value != '' && input.value != undefined){
        axios.post("/confereStats", {
            valor: input.value,
        }).then(response => {
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }else{
        Swal.fire({
            title: "Digite um CEMB ou PN para pesquisar o FPQ",
            icon: "warning",
            showConfirmButton: true,
            confirmButtonColor: '#007bff',
        })
    }
}
