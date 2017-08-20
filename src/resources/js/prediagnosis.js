import $ from 'jquery';

$('#waitingList').on('click', () => {

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
                `<tr id=${result[i].chart_id} class="table-content">
                       <td id=${result[i].chart_id}>${result[i].chart_id}</td>
                       <td id=${result[i].chart_id}>${result[i].name}</td>
                       <td id=${result[i].chart_id}>${result[i].birth}</td>

                </tr>`

            )}
    });

    $('.ui.longer.modal')
        .modal('show');

});

$(document).on('click', '.table-content', (e) => {

    const docs = {
        chartNumber: e.target.id,
    };

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/chart',
        data: docs,
        dataType: 'json',
        cache: false,
    }).done(result => {

        $('#preChartId').val(result.chartNumber);
        $('#preName').val(result.patient.name);
    })


    $('.ui.longer.modal').modal('hide');
});

