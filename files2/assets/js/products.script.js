$(document).ready(function() {

    $.ajax({
        url:'http://localhost:3000/api/product/findall',
        type:'get',
        dataType:'JSON'
    })
    .done(function(response) {
        let data = response.data;
        let status = response.status
        console.log(data)
        if(status) {
            createTbody(data);
        } else {
            alert(false, 'Πρόβλημα στην αναζήτηση των χρηστών (' + data.message + ')');
        }
    });

    $('.row').off('click', '.btnSubmit').on('click','.btnSubmit', function() {

        let name = $("#name").val();
        let cost = $("#cost").val();
        let description = $("#description").val();
        let quantity = $("#quantity").val();

        const item = {
            'product': name,
            'cost': cost,
            'description': description,
            'quantity': quantity
        }

    $.ajax({
        url: "http://localhost:3000/api/product/create",
        type: "post",
        data: item,
        dataType: "JSON"
    })
    .done(function(response) {
        let data = response.data
        let status = response.status

        if(status) {
            console.log(true, 'Επιτυχής εισαγωγή προϊόντος')
            alert(true, 'Επιτυχής εισαγωγή προϊόντος')
            $('#frmProduct')[0].reset();
        } else {
            console.log(false, 'Πρόβλημα στην εισαγωγή του χρήστη ('+ data.message + ')')
            alert(false, 'Πρόβλημα στην εισαγωγή του χρήστη ('+ data.message + ')')
            $('#frmProduct')[0].reset();
        }
    })

      return false
    })
})

function createTbody(data) {
    $('#productTable > tbody').empty();

    const len = data.length;
    for(let i = 0; i<len; i++) {
        let name = data[i].product;
        let cost = data[i].cost;
        let description = data[i].description;
        let quantity = data[i].quantity;

        let tr_str = "<tr>" +
        "<td>" + name + "</td>" +
        "<td>" + cost + "€" + "</td>" +
        "<td>" + description + "</td>" +
        "<td>" + quantity + "</td>" +
        "<td>" +
            "<button class='btn btnUpdate btn-primary' value=\'"+name+"\'>Τροποποίηση</button> " +
            "<button class='btn btnDelete btn-primary ml-2' value=\'"+name+"\'>Διαγραφή</button>" +
        "</td>"+
        "</tr>"

       $('#productTable tbody').append(tr_str) 
    }

    $('#productTable tbody').on('click', '.btnDelete', function() {
        let name = $(this).val();
        $.ajax({
            url: `http://localhost:3000/api/product/delete/${name}`,
            type: 'delete'
        })
        location.reload();
    })
}

function alert(status, message){
    if (status){
        $('.alert').addClass('alert-success');
        $('.alert').removeClass('alert-danger');
    } else {
        $('.alert').addClass('alert-danger');
        $('.alert').removeClass('alert-success');
    }
    $('.alert').html(message);
    }
