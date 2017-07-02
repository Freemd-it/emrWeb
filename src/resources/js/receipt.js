import $ from 'jquery';
import _ from 'partial-js';

function enter_n_has_val(e) {
    return e.keyCode == 13 && e.target.value;
}
function e_to_patient(e) {
    return $(e.target).closest('.patient');
}
function patient_to_patients(patient) {
    return _.find_where(users, {})
}

var users = [
    {
        id: 3444,
        name: '조현우',
        gender: 'girl',
        birth: '1993.01.24',
        marriage: 'single',
        kidney: '174',
        weight: '68',
        bmi: '123'
    },
    {
        id: 3445,
        name: '이기섭',
        gender: 'man',
        birth: '1990.01.24',
        marriage: 'single',
        kidney: '175',
        weight: '64',
        bmi: '141'
    },
    {
        id: 3415,
        name: '이동열',
        gender: 'man',
        birth: '1993.02.24',
        marriage: 'single',
        kidney: '172',
        weight: '62',
        bmi: '115'
    },
    {
        id: 3425,
        name: '김동현',
        gender: 'man',
        birth: '1993.03.24',
        marriage: 'single',
        kidney: '173',
        weight: '66',
        bmi: '117'
    }
]

$('#patients')
    .on('keyup', '.search__input',
    _.if(enter_n_has_val,
        _.pipe(
            _.v('target'),
            _.tap(
                function (input) {
                    //enter > 사용자 정보 가져오기
                    console.log(input.value);
                    var user = users[0];// api로 가져왔다 가정
                    console.log(user);
                    $('#name').val(user.name);
                    $('#birth').val(user.birth);
                    $('#kidney').val(user.kidney);
                    $('#weight').val(user.weight);
                    $('#bmi').val(user.bmi); 
                    $('input:radio[name=gender]:input[value=' + user.gender + ']').attr("checked", true);

                    
                }
            ),
            _.set('value', '')
        )).else(
        _.pipe(
            _.v('target'),
            _.tap(
                function (input) {
                    $('#patients .list').children().remove();
                    return users; //api로 가져왔다 가정
                },
                _.teach('user', '\
                li.user\
                  .name {{user.name}}\
                  .birth {{user.birth}}'),
                function (html) {
                    $('#patients .list').append(html);
                }
            )
        )
        ))
    .on('click', '.user', _.pipe(
        _.v('target'),
        function (input) {
            var user = $(input).closest('li');
            console.log(user);
        }
    ))




