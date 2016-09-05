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
    //绑定下拉框change事件，当下来框改变时调用 SelectChange()方法
    $("#selectID").change(function() { SelectChange(); });
})

function SelectChange() {
    //获取下拉框选中项的text属性值
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


    ////获取下拉框选中项的value属性值
    //var selectValue = $("#selectID").val();
    //console.log(selectValue);
    ////获取下拉框选中项的index属性值
    //var selectIndex = $("#selectID").get(0).selectedIndex;
    //console.log(selectIndex);
    //////获取下拉框最大的index属性值
    //var selectMaxIndex = $("#selectID option:last").attr("index");
    //console.log(selectMaxIndex);
}