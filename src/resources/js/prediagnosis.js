import $ from 'jquery';

$('#waitingList').on('click', () => {

    if($('#tableBody').children().length)
        $('#tableBody *').remove();

    const docs = {
        status : '1',
    };

    console.log("waitList Callback");
    console.log("waitList Callback");
    console.log("waitList Callback");

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

        $('#getPastCC').attr('disabled', false);
    })


    $('.ui.longer.modal').modal('hide');
});

$('#sendToDoctor').on('click', () => {
    const heartRate = $('#heartRate').val();
    const pulseRate = $('#pulseRate').val();
    const bodyTemporature = $('#bodyTemporature').val();
    const systoleBloodPressure = $('#systoleBloodPressure').val();
    const diastoleBloodPressure = $('#diastoleBloodPressure').val();
    const bloodGlucose = $('#bloodGlucose').val();
    const mealTerm = $('#mealTerm').val();
    const chartNumber = $('#preChartId').val();
    const ccData = $('#CCform').serializeArray();

    const docs = {
        heartRate,
        pulseRate,
        bodyTemporature,
        systoleBloodPressure,
        diastoleBloodPressure,
        bloodGlucose,
        mealTerm,
        chartNumber,
        ccArray : JSON.stringify(ccData),
    };

    $.ajax({
        type: 'POST',
        url: 'http://localhost:3000/chart/update',
        data: docs,
        dataType: 'json',
        cache: false,
    }).done(result => {
        console.log(result);
        if(result.length == 1) {
            $('#chartForm, #CCform').each(function(){
                this.reset();
            });

            if($('#CCsegment').children().length > 0) {
                $('#CCsegment *').remove();
            }


            $('#getPastCC').attr('disabled', true);
            return 0;
        }

    })

});

$('#CCbutton').on('click', () => {
    const ref = $('#CCsegment').children().length;

    $('#CCsegment').append(
        `<div class="ui grid">
            <div class="sixteen wide column">
                <div class="ui fluid input focus">
                    <input name="CC ${ref}" type="text" placeholder="C.C">
                </div>

                <div class="ui form" style="margin-top: 1%">
                    <div class="field">
                        <textarea name="HistoryOfCC ${ref}" rows="3" placeholder="History of C.C"></textarea>
                    </div>
                </div>
            </div>
         </div>`
    );
});
