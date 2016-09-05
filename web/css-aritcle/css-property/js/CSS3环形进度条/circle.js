/**
 * Created by qhao on 2016/7/8.
 */
function getTime(){
    var date = new Date();
    var second = date.getSeconds();

    var timerightcircle = document.getElementById('timerightcircle');
    var timeleftcircle = document.getElementById('timeleftcircle');
    var timeshow = document.getElementById('timeshow');

    //console.log(second);
    $('#timeshow').text(second);

    if(second<=30){
        $('#timerightcircle').css("transform","rotate("+ (-135+6*second) +"deg)");
        $('#timeleftcircle').css("transform","rotate(-135deg)") ;
    }else{
        $('#timerightcircle').css( "transform","rotate(45deg)");
        $('#timeleftcircle').css("transform"," rotate("+ (-135+6*(second-30)) +"deg)");
    }
}
getTime();
setInterval(function(){
    getTime();
}, 1000)

var psecond = 0;
var percent = 75;
var drawCircle = setInterval(function(){
    if(psecond<percent){
        psecond += 1;
        getpercent();
    }
    else{
        clearInterval(drawCircle);
    }
},30)


function getpercent(){

    var rightcircle = document.getElementById('rightcircle');
    var leftcircle = document.getElementById('leftcircle');
    var show = document.getElementById('percent-show');

    show.innerHTML = psecond;

    if(psecond<50){
        rightcircle.style.cssText = "transform: rotate("+ (-135+3.6*psecond) +"deg)";
        leftcircle.style.cssText = "transform: rotate(-135deg)";
    }else{
        rightcircle.style.cssText = "transform: rotate(45deg)";
        leftcircle.style.cssText = "transform: rotate("+ (-135+3.6*(psecond-50)) +"deg)";
    }
}

$(document).ready(function() {
    //��������change�¼�����������ı�ʱ���� SelectChange()����
    $("#selectID").change(function() { SelectChange(); });
})

function SelectChange() {
    //��ȡ������ѡ�����text����ֵ
    var selectText = $("#selectID").find("option:selected").text();
    console.log(selectText);

    if(percent<selectText){
        percent = parseInt(selectText);
        console.log(percent);
        var drawCircle = setInterval(function(){
            if(psecond<percent){
                psecond += 1;
                getpercent();
            }
            else{
                clearInterval(drawCircle);
            }
        },30)
    }
    else{
        percent = parseInt(selectText);
        console.log(percent);
        var drawCircle = setInterval(function(){
            if(psecond>percent){
                psecond -= 1;
                getpercent();
            }
            else{
                clearInterval(drawCircle);
            }
        },30)
    }


    ////��ȡ������ѡ�����value����ֵ
    //var selectValue = $("#selectID").val();
    //console.log(selectValue);
    ////��ȡ������ѡ�����index����ֵ
    //var selectIndex = $("#selectID").get(0).selectedIndex;
    //console.log(selectIndex);
    //////��ȡ����������index����ֵ
    //var selectMaxIndex = $("#selectID option:last").attr("index");
    //console.log(selectMaxIndex);
}