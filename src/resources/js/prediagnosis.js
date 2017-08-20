import $ from 'jquery';

$('#waitingList').on('click', () => {
    console.log('clicked');

    if($('#tableBody').children().length)
        $('#tableBody *').remove();

    const docs = {
        status : '1',
    };

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/waitingList',
        data: docs,
        dataType: 'json',
        cache: false,
    }).done(result => {
        console.log(result);
        for(let i = 0; i < result.length; i++) {
            $('#tableBody').append(
                `<tr id=${result[i].chart_id}>
                       <td>${result[i].chart_id}</td>
                       <td>${result[i].name}</td>
                       <td>${result[i].birth}</td>

                </tr>`

            )}
    });

    $('.ui.longer.modal')
        .modal('show');


});

