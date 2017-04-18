//bind events to body; delegated events
// $('body').on('click','button', function(){
//         // console.log(this.id);
// });

const fridgeItems= [
    {"id": 1,
    "name":"fruit"},
    {"id": 2,
    "name":"vegetable"},
    {"id": 3,
    "name":"eggs"},
    {"id": 4,
    "name":"meat"},
    {"id": 5,
    "name":"frozen"}
    ];

function showCategoryMenu() {
    $.each(fridgeItems, (index, value)=> {
        $('#app').append('<button id="' + value.name + '">' + value.name + '</button>');
    });
};



$('#openFridge').click(function() {
    $('#app').empty();
    
    $.each(fridgeItems, (index, value)=> {
        var frigdeItem = value.name;
        $.get('/openfridge', {id: frigdeItem}).done(function(data) {

            $.each(data, (index, value)=> {
                 
                // console.log(frigdeItem + ': ' + value.name);
                $('#app').append('<p>' + frigdeItem + ': ' + value.name + '</p>');
            });                
        });
    });
});



$('#addInFridge').click(function() {
    $('#app').empty();
    showCategoryMenu(); 

    $('body').on('click','button', function(){
        var buttonClicked = this.id;
        var itemToAdd;
        // var itemToAdd;

        if (buttonClicked !== 'addInFridge' && buttonClicked !== 'openFridge') {
            $('#app').empty();
            $('#app').append('</br><input type="text" placeholder = "' + buttonClicked + '" id = "itemToAdd"><button id = "save">Save</button>');
        };

        $('#save').click(function() {
            itemToAdd = $('#itemToAdd').val();
            
            $.post('/save', {id: buttonClicked, val: itemToAdd}).done(function(data) {
                
            });  

            $('#app').empty();
        });
    });
});