import $ from 'jquery';


// TODO 새로운 사람 저장, 과거력

/**
 * 이름으로 조회
 */
$('#btn-name-send').on('click', () => {
    const name = $.trim($('#nameInput').val());
    let docs;
    let date;
    let idx = 1;

    $('#name').attr({
        disabled: false,
    });

    $('#birth').attr({
        disabled: false,
    });

    $('.ui.dropdown').removeClass("disabled");

    if(!name) {
        alert("이름을 입력해주세요.");
        return;
    }

    docs = {
        name,
    };

    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/receipt/patients',
        data: docs,
        dataType: 'json',
        cache: false,
    }).done((result) => {

        console.log(result);
        if(!result.length) {


            $('#nameMessage').html('[ ' + name + ' ]' + ' 님에 대한 정보가 없습니다.');

            $('#message').attr({
                class: 'ui negative message',
                hidden: false,
            });

            setTimeout(() => {
                $('#message')
                    .closest('.message')
                    .transition('fade')
            }, 1000);

            $('#nameInput').val('');
            $('#name').val(name);
            $('#height').val('');
            $('#weight').val('');
            $('#drinking').val('');
            $('#smoking').val('');
            $('#birth').val('');
            $('#smokingPeriod').val('');
            $('#drinkingPeriod').val('');
            $('#bmi').val('');
            $('#diseaseDescription').val('');
            $('#allergyDescription').val('');
            $('input[name="pastMedical"][value="Y"]').prop("checked", true).trigger("change");
            $('input[name="pastMedication"][value="Y"]').prop("checked", true).trigger("change");
            $('input[name="pastMedicationDescription"]').val('');
            $('input[name="pastMedicalDescription"]').val('');

            date = new Date();
            $('#firstcome').val(date.getFullYear() + ' 년 ' + (date.getMonth()+1) + ' 월 ' + date.getDate() + ' 일 ');


            for (idx; idx < 12; idx++) {
                let id = '#disease'+idx;
                let id2 = '#allergy'+idx;

                $(id).prop("checked", false);
                $(id2).prop("checked", false);
            }
            idx = 1;



            return;
        }

        if(result.length == 1) {

            $('#nameMessage').html('[ ' + result[0].name + ' ]' + ' 님이 조회됐습니다.');

            $('#message').attr({
                class: 'ui positive message',
                hidden: false,
            });

            setTimeout(() => {
                $('#message')
                    .closest('.message')
                    .transition('fade')
            }, 1000);


            $('#nameInput').val('');

            $('#name').attr("disabled", true).val(result[0].name);


            $('#height').val(result[0].height);

            $('#weight').val(result[0].weight);

            $('#drinking').val(result[0].smokingAmount);

            $('#smoking').val(result[0].drinkingAmount);

            $('#smokingPeriod').val(result[0].smokingPeriod);

            $('#drinkingPeriod').val(result[0].drinkingPeriod);
            $('#bmi').val(result[0].bmi);

            date = new Date(result[0].firstVisit).toISOString().slice(0,10);

            $('#firstcome').val(date);

            date = new Date(result[0].birth).toISOString().slice(0,10);

            $('#birth').attr("disabled", true).val(date);

            $('#gender').dropdown('set selected', result[0].gender);

            $('.ui.dropdown').addClass("disabled");


            for (let i of result[0].histories[0].pastHistory) {
                let id = '#disease'+idx;
                if(i == 1) {
                    $(id).prop("checked", true);
                }
                idx++;
            }

            idx = 1;
            for (let i of result[0].histories[0].allergy) {
                let id = '#allergy'+idx;
                if(i == 1) {
                    $(id).prop("checked", true);
                }
                idx++;
            }
            let value = result[0].histories[0].pastMedical;

            $('input[name="pastMedical"][value=' + value + ']').prop('checked', true).trigger("change");

            $('#pastMedicalTime').val(result[0].histories[0].pastMedicalTime);
            $('#pastMedicalArea').val(result[0].histories[0].pastMedicalArea);

            value = result[0].histories[0].pastMedication;

            $('input[name="pastMedication"][value=' + value + ']').prop('checked', true).trigger("change");

            $('#pastMedicationPeriod').val(result[0].histories[0].pastMedicationPeriod);
            $('#pastMedicationType').val(result[0].histories[0].pastMedicationType);

            $('#diseaseDescription').val(result[0].histories[0].pastHistoryComment);

            $('#allergyDescription').val(result[0].histories[0].allergyComment)

        } else {

            $('#nameInput').val('');


            if($('#list').children().length)
                $('#list *').remove();

            for(let i = 0; i < result.length; i++) {
                date = new Date(result[i].birth);
                $('#nameInput').val('');
                $('#list').append(
                    '  <div id=' + result[i].id + '  class="item" align="middle">\n' +
                    '                    <div id=' + result[i].id + ' class="content">\n' +
                    '                        <div id=' + result[i].id + ' class="header">' + result[i].name +'</div>\n' +
                    '                        ' + date.getFullYear() + ' 년 ' + (date.getMonth()+1) + ' 월 ' + date.getDate() + ' 일 '+
                    '                    </div>\n' +
                    '                </div>');

            }

            $('.ui.basic.modal')
                .modal('show');
        }
    });
});

/**
 * 동명이인 id로 조회
 */
$(document).on('click', '.item', (e) => {
    let date;
    let idx = 1;
    const docs = {
        id: e.target.id,
    };


    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/receipt/patient',
        data: docs,
        dataType: 'json',
        cache: false,
    }).done((result) => {
        console.log('#####')
        console.log(result)
        $('#nameMessage').html('[ ' + result.name + ' ]' + ' 님이 조회됐습니다.');

        $('#message').attr({
            class: 'ui positive message',
            hidden: false,
        });

        setTimeout(() => {
            $('#message')
                .closest('.message')
                .transition('fade')
        }, 1000);


        $('#nameInput').val('');

        $('#name').attr("disabled", true).val(result.name);


        $('#height').val(result.height);

        $('#weight').val(result.weight);

        $('#drinking').val(result.smokingAmount);

        $('#smoking').val(result.drinkingAmount);

        $('#smokingPeriod').val(result.smokingPeriod);

        $('#drinkingPeriod').val(result.drinkingPeriod);

        $('#bmi').val(result.bmi);

        date = new Date(result.firstVisit).toISOString().slice(0,10);

        $('#firstcome').val(date);

        date = new Date(result.birth).toISOString().slice(0,10);

        $('#birth').attr("disabled", true).val(date);

        $('#gender').dropdown('set selected', result.gender);

        $('.ui.dropdown').addClass("disabled");

        for (let i of result.histories[0].pastHistory) {
            let id = '#disease'+idx;
            if(i == 1) {
                $(id).prop("checked", true);
            }
            idx++;
        }

        idx = 1;
        for (let i of result.histories[0].allergy) {
            let id = '#allergy'+idx;
            if(i == 1) {
                $(id).prop("checked", true);
            }
            idx++;
        }
        let value = result.histories[0].pastMedical;

        $('input[name="pastMedical"][value=' + value + ']').prop('checked', true).trigger("change");

        $('#pastMedicalTime').val(result.histories[0].pastMedicalTime);
        $('#pastMedicalArea').val(result.histories[0].pastMedicalArea);

        value = result.histories[0].pastMedication;

        $('input[name="pastMedication"][value=' + value + ']').prop('checked', true).trigger("change");

        $('#pastMedicationPeriod').val(result.histories[0].pastMedicationPeriod);
        $('#pastMedicationType').val(result.histories[0].pastMedicationType);

        $('#diseaseDescription').val(result.histories[0].pastHistoryComment);

        $('#allergyDescription').val(result.histories[0].allergyComment)


        $('.ui.basic.modal')
            .modal('hide');
    })
});


$('.ui.dropdown')
    .dropdown();

$('.ui.checkbox')
    .checkbox()
;

$('#weight, #height').change(() => {
    const weight = $('#weight').val();
    const height = $('#height').val()/100;
    const bmi = weight/(height*height);

    $('#bmi').val(bmi.toFixed(5));
});

const getDiseaseHistory = () => {
    let check = '';
    console.log('#####################################');

    // $('input[name="H blood pressure"]').is(':checked') ? check += "1" : check+= "0";
    // $('input[name="glucose"]').is(':checked') ? check += "1" : check+= "0";
    // $('input[name="hepatitis A"]').is(':checked') ? check += "1" : check+= "0";
    // $('input[name="hepatitis B"]').is(':checked') ? check += "1" : check+= "0";
    // $('input[name="hepatitis C"]').is(':checked') ? check += "1" : check+= "0";
    // $('input[name="tuberculosis"]').is(':checked') ? check += "1" : check+= "0";
    // $('input[name="heart disease"]').is(':checked') ? check += "1" : check+= "0";
    // $('input[name="kidney disease"]').is(':checked') ? check += "1" : check+= "0";
    // $('input[name="tumor"]').is(':checked') ? check += "1" : check+= "0";
    // $('input[name="infectious disease"]').is(':checked') ? check += "1" : check+= "0";
    // $('input[name="venereal disease"]').is(':checked') ? check += "1" : check+= "0";

    $('.disease').each(()=>{
        $('.disease').is(':checked') ? check += "1" : check+= "0";
    });

    console.log(check);
    console.log('#####################################');
    return check;
};

getDiseaseHistory();

$('input[name="pastMedical"]').on('change', () => {
    const type = $('input[name="pastMedical"]:checked').val();

    console.log('&&&&&&&&&&&&&&&&&&&&&&')
    console.log(type)
    if(type === 'N' ) {
        $('#pastMedicalTime').prop('disabled', true);
        $('#pastMedicalArea').prop('disabled', true);
    }

    if(type === 'Y' ) {
        $('#pastMedicalTime').prop('disabled', false);
        $('#pastMedicalArea').prop('disabled', false);
    }
});

$('input[name="pastMedication"]').on('change', () => {
    const type = $('input[name="pastMedication"]:checked').val();

    if(type === 'N' ) {
        $('#pastMedicationPeriod').prop('disabled', true);
        $('#pastMedicationType').prop('disabled', true);
    }

    if(type === 'Y' ) {
        $('#pastMedicationPeriod').prop('disabled', false);
        $('#pastMedicationType').prop('disabled', false);
    }
});