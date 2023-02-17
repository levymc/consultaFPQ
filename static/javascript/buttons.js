function Teste(){
    $.ajax({
        url:"/info",
        type: "POST",
        contentType: "application/json",
    }).done((x) => {
        console.log(x)
        Swal.fire({
            icon: "info",
            width:'30em',
            confirmButtonColor:'hwb(216 31% 1%)',
            html:`
            <div class="row">
                <div class="col" style="font-size:24px; line-height:1.75em"> 
                    <p>PN Topo: <b>${x[0][1]}</b></p>
                    <p>CEMB: <b>${x[0][2]}</b></p>
                    <p>Família: <b>${x[0][6]}</b></p>
                    <p>Relatório: <b>${x[0][7]}</b></p>
                </div>
            </div>
            `
        });
    });
  }