import $ from 'jquery';


// TODO 새로운 사람 저장, 과거력

/**
 * 이름으로 조회
 */
$('#btn-name-send').on('click', () => {
    const name = $.trim($('#nameInput').val());
    let docs;
    let date;

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

            date = new Date();
            $('#firstcome').val(date.getFullYear() + ' 년 ' + (date.getMonth()+1) + ' 월 ' + date.getDate() + ' 일 ');

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

            date = new Date(result[0].createdAt).toISOString().slice(0,10);

            $('#firstcome').val(date);

            date = new Date(result[0].birth).toISOString().slice(0,10);

            $('#birth').attr("disabled", true).val(date);

            $('#gender').dropdown('set selected', result[0].gender);

            $('.ui.dropdown').addClass("disabled");

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

        date = new Date(result.createdAt).toISOString().slice(0,10);

        $('#firstcome').val(date);

        date = new Date(result.birth).toISOString().slice(0,10);

        $('#birth').attr("disabled", true).val(date);

        $('#gender').dropdown('set selected', result.gender);

        $('.ui.dropdown').addClass("disabled");

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

