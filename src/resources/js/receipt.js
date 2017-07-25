import $ from 'jquery';
import _ from 'partial-js';
import 'jquery-typeahead';



$.typeahead({
    input: '.js-typeahead-user_v1',
    minLength: 1,
    order: "asc",
    dynamic: true,
    delay: 500,
    backdrop: {
        "background-color": "#fff"
    },
    template: function (query, item) {

        var color = "#777";

        return '<span class="row">' +
            '<span class="username">{{name}} <small style="color: ' + color + ';">({{birth}})</small></span>' +
            "</span>"
    },
    emptyTemplate: "no result for {{query}}",
    source: {
        user: {
            display: ["name", "birth"],
            ajax: function (query) {
                return {
                    type: "GET",
                    url: "http://localhost:3000/receipt/patients",
                    //path: "data.user",
                    data: {
                        q: "{{query}}"
                    },
                    callback: {
                        done: function (data) {
                            console.log(data);
                            return data;
                        }
                    }
                }
            }

        }
    },
    callback: {
        onClick: function (node, a, item, event) {

            // You can do a simple window.location of the item.href

            $.ajax({
                type:"GET",
                url:"http://localhost:3000/receipt/patient",
                data:{ id : item.id },
                success:function(result){
                    $('#name').val(result.name);
                    $('#birth').val(result.birth);
                    $('#height').val(result.height);
                    $('#weight').val(result.weight);
                    var createdAt = new Date(result.createdAt);

                    $('#firstcome').val(createdAt.getFullYear()+"년 "+(createdAt.getMonth()+1)+"월 " + createdAt.getDate()+"일");

                    $('#gender > option[value="'+result.gender+'"]').attr("selected",true);

                    //$('#bmi').val(item.bmi);
 //                   $('input:radio[name=gender]:input[value=' + result.gender + ']').attr("checked", true);
                },
                error:function(e){
                    console.log("error : " + e);
                }
            });

        },
        onSendRequest: function (node, query) {
            console.log('request is sent');
            console.log(query);
        },
        onReceiveRequest: function (node, query) {
            console.log('request is received')
            console.log(query);
        },
        onSubmit : function(){
            alert("새로등록합니다");
            console.log($('#input').val());
            $('#name').val($('#input').val());
        }
    },
    debug: true
});


$("#patient_form").submit( function(e) {
    var postData = $(this).serializeArray();
    alert(JSON.stringify(postData));
    $.ajax({
        url : "http://localhost:3000/receipt/patient",
        type: "POST",
        data : postData,
        success:function(data) {
            //data: return data from server
        },
        error: function(jqXHR, textStatus, errorThrown)
        {
            //if fails
        }
    });
});


    $('.ui.form')
        .form({
            fields: {
                name     : 'empty',
                gender   : 'empty',
                birth : 'empty',
                height : 'empty',
                weight : 'empty',
                bmi : 'empty',
                smoke : 'empty',
                alcohol : 'empty'
            }
        })
    ;

    $('.ui.dropdown')
        .dropdown();




    $('.ui.form')
        .form({
            fields: {
                name     : 'empty',
                gender   : 'empty',
                birth : 'empty',
                height : 'empty',
                weight : 'empty',
                bmi : 'empty',
                smoke : 'empty',
                alcohol : 'empty'
            }
        })
    ;

    $('.ui.dropdown')
        .dropdown();
