$(document).ready(function(){
    var sec = 0, min = 0, hour = 0,deg = 1,interval,row = 1;
    const circle = "<svg><circle></circle></svg>"
    // var timernumbers = setnumbers(hour)+":"+setnumbers(min)+":"+setnumbers(sec);

    
    

    /*            Elements             */
    $("body").html("<div id=\"all\">");
    const all = $("#all");
    all.html(`<div id="d1"></div><div id="d2"></div>`)
    const d1 = $("#d1");
    const d2 = $("#d2");
    d1.html(`<div id="timer"></div><div id="buttons"></div>`);
    d2.html(`<ul id="list"></ul>`)
    const timer = $("#timer");
    const buttons = $("#buttons");
    timer.html(`<svg height="100%" width="100%">
    <circle id="clock" cx="50%" cy="50%" r="7vmax" stroke="#0000ff88" stroke-dasharray="20 10" stroke-width="5" fill="none"/></svg><span id="timernumber" class="stoping"></span>`);
    const timernumber = $("#timernumber");
    setnumbers(sec,min,hour);
    buttons.html(`<button id="play"></button><button id="pause"></button><button id="replay"></button><button id="save"></button>`);
    var btns = $("#buttons button");
    btns.eq(0).html(`<i class="material-icons">play_arrow</i>`);
    btns.eq(1).html(`<i class="material-icons">pause</i>`);
    btns.eq(2).html(`<i class="material-icons">replay</i>`);
    btns.eq(3).html(`<i class="material-icons">save</i>`);

    
    /*        styles          */
    $("body").css({
        "background-image":`url("./bg.jpg")`,
        "background-position":"center",
        "background-repeat":"no-repeat",
        "background-size":"cover",
        "background-attachment":"fixed",
        "display":"flex",
        "align-items":"center",
        "justify-content":"center",
        "padding":"5vh 0"
    });
    all.css({"width":"60vw","height":"100%","display":"flex","flex-direction":"column","justify-content":"center"});
    d1.css({"background-image": "linear-gradient(160deg, #0093E977 0%, #80D0C777 100%)","width":"100%","height":"100%","border-radius":"20px","transition":"height .5s linear"});
    d2.css({"background-image": "linear-gradient(-160deg, #0093E977 0%, #80D0C777 100%)","width":"100%","height":"45%","border-radius":"20px","margin-top":"5px","padding":"10px","opacity":"0","overflow-y": "scroll"});
    timer.css({"width":"100%","height":"70%","display":"flex","justify-content":"center","align-items":"center","position":"relative"})
    buttons.css({"width":"100%","height":"30%","display":"flex","justify-content":"space-around","align-items":"center"});
    btns.css({"width":"5vmax","height":"5vmax","background": "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)","color": "#ffffff","border-radius":"10%","transition":"width .1s linear"});
    $("i").css({"font-size":"4vw"});
    timernumber.css({"position":"absolute","font-family":"digital-7","font-size":"3.5vmax","color": "#ffffff"});
    $("#timer svg").css({"transform":"rotate(0deg)"});
    $("#list").css({"list-style":"none","display":"flex","flex-direction":"column","color": "#ffffff"});
    



    // $("body").html(timer);


    /*    actions               */
    function setnumbers(second,minute,hours){
        let sec2 = second <10 ? "0"+second : second;
        let min2 = minute <10 ? "0"+minute : minute;
        let hour2 = hours<10 ? "0"+hours : hours;
        timernumber.text(hour2+":"+min2+":"+sec2);
    }

    async function setborder(selectbtn){
        selectbtn.css("border","2px solid red");
        setTimeout(()=>{
            selectbtn.css("border","none");
        },100);
    }

    btns.eq(0).click(function(){
        if(timernumber.attr("class") == "stoping"){
            timernumber.attr("class","continuing");
            setborder(btns.eq(0));
            interval = setInterval(()=>{
                if(sec <= 60){
                    sec++;
                }else{
                    sec = 0;
                    min++;
                }
                if(min == 60){
                    min = 0;
                    hour++;
                }
                setnumbers(sec,min,hour);
                $("#timer svg").css({"transform":`rotate(${deg}deg)`});
                deg+=5;
            },1000)
        }
    })

    btns.eq(1).click(()=>{
        if(timernumber.attr("class") == "continuing"){
            setborder(btns.eq(1));
            clearInterval(interval);
            timernumber.attr("class","stoping");
        }
    })

    btns.eq(2).click(async ()=>{
        await setborder(btns.eq(2));
        window.location.reload();
    })

    btns.eq(3).click(()=>{
        d2.css("opacity","1");
        d1.css("height","50%");
        setborder(btns.eq(3));
        // $("#d2 ul").prepend(`<li id="listitems"><p id="row" style="flex-grow: 2"></p><p id="item" style="flex-grow: 8"></p></li>`);

        const li = $(`<li id="listitems"><p id="row" style="flex-grow: 2"></p><p id="item" style="flex-grow: 6"></p><button id="remove" style="flex-grow: 2"></button></li>`);
        $("#d2 ul").prepend(li);

        $("#listitems").css({"display":"flex","font-size":"2.5vmax"});
        $("#item").css({"display":"flex","justify-content":"center"});
        $("#row").css({"display":"flex","justify-content":"center"});
        $("#remove").html(`<i class="material-icons" id="removeicon">delete</i>`);
        $("#remove").css({"background-color":"#00000000","color": "#ffffff"});
        $("#removeicon").hover(function (e1) {
            $(e1.target).css("color", "#ff000077");
            $(e1.target).parents("ul li").css("background-color","#ff000033")
            }, function (e2) {
                $(e2.target).css("color", "#ffffff");
                $(e2.target).parents("ul li").css("background-color","#ffffff00")
            }
        );
        
        setrow();
        
        $("#remove").click((e1)=>{
            $(e1.target).parents("ul li").remove();
            setrow();
        })


        if(row > 9){
            $("#item").css("padding-right","0.9vmax");
        }
        
        $("#item").text(timernumber.text());
        
        
    })

    function setrow(){
        var rownumber = $("#d2 ul li #row").toArray();
        rownumber.reverse();
        $(rownumber).each((index,ele)=>{
            $(ele).text(index+1);
        })
    }

    $("#buttons").mousemove((e1)=>{
        let idname = $(e1.target).attr("id");
        switch (idname) {
            case 'play': $(btns.eq(0)).css({"width":"7vmax","box-shadow":"5px 5px 5px #0000ff55"});
                break;
            case 'pause': $(btns.eq(1)).css({"width":"7vmax","box-shadow":"5px 5px 5px #0000ff55"});
                break;
            case 'replay': $(btns.eq(2)).css({"width":"7vmax","box-shadow":"5px 5px 5px #0000ff55"});
                break;
            case 'save': $(btns.eq(3)).css({"width":"7vmax","box-shadow":"5px 5px 5px #0000ff55"});
                break;
            default: console.log("error");
            break;
        }
    })
    $("#buttons button").mouseleave(()=>{
        btns.css({"width":"5vmax","box-shadow":"none"});
    })
    

    
})