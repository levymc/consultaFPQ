function Teste(){
    $.ajax({
        url:"/info",
        type: "POST",
        contentType: "application/json",
    }).done((x) => {
        console.log(x)
        Swal.fire({
            icon: "info",
            width:'50em',
            confirmButtonColor:'hwb(216 31% 1%)',
            html:`
            <div class="row">
                <div class="col"> 
                    <p>PN Topo: ${x[0][1]}</p>
                    <p>CEMB: ${x[0][2]}</p>
                </div>
            </div>
            `
        });
    });
  }