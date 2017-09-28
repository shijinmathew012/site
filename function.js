var hidden = 0;
var power = 1;
var color = "#000";
document.createElement("window");
$("head").prepend("<style id='winStyle'></style>");
$(function(){
$("#colorSel").change(function(){
    color = $(this).val();
});
var height = document.documentElement.clientHeight * .85;
$("window").css("minHeight", height);
$("#winStyle").append("window{width:80vw;height:85vh;background-color:#FFF;position:fixed;left:10vw;top:5vh;overflow:auto;visibility:hidden;}");
var c = document.getElementById("c");
var ctx = c.getContext("2d");
c.width = document.documentElement.clientWidth * .80;
c.height = document.documentElement.clientHeight * .85;
c = $("#c");
ctx.lineWidth = "3";
ctx.fillStyle = "#000";
var mouse_down = false;
c.on("mouseup", function(){
    mouse_down = false;
});
c.on("touchstart mousedown", function(e){
    if(e.changedTouches){
        e = e.changedTouches[0];
        c.off("mousedown");
        c.off("mousemove");
        c.off("mouseup");
    }
    else{
        mouse_down = true;
    }
    ctx.strokeStyle = color;
    var x = e.clientX || e.pageX;
    var y = e.clientY || e.pageY;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y);
    ctx.stroke();
});
c.on("touchmove mousemove", function(e){
    e.preventDefault();
    var x, y;
    if(e.changedTouches){
        e = e.changedTouches[0];
        ctx.strokeStyle = color;
        x = ((e.clientX) ? e.clientX : e.pageX) - (document.documentElement.clientWidth * .1);
        y = ((e.clientY) ? e.clientY : e.pageY) - (document.documentElement.clientHeight * .05);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
    else{
        if(mouse_down == true){
            ctx.strokeStyle = color;
            x = ((e.clientX) ? e.clientX : e.pageX) - (document.documentElement.clientWidth * .1);
            y = ((e.clientY) ? e.clientY : e.pageY) - (document.documentElement.clientHeight * .05);
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        else{}
    }
});
$("#clrPaint").click(function(){
    ctx.clearRect(0, 0, c.width, c.height);
});
});
$(function(){
    function cal(){
    var calBox = document.querySelector("#cal");
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    var months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
    var date = new Date();
    var maxDays = 31;
    var month = date.getMonth();
    if(month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11){
        maxDays = 31;
    }
    else if(month == 1){
        maxDays = 28;
    }
    else if(month == 3 || month == 5 || month == 8 || month == 10){
        maxDays = 30;
    }
    var day = days[date.getDay()];
    // Day of Week ^
    var dateNum = date.getDate();
    // Day of Month ^
    // Calculate first day of month
     date.setDate(1)                    
     var dateX = date.getDay();
     date.setDate(dateNum)
     var i = dateX;
    while(dateX > 0){
        if((dateX % 6) >= 1){
            dateX -= 6;
        }
        else{
            i -= dateX
            dateX -= dateX;
        }
    }
    i += 8;
    $(".day").eq(0).text(months[month]);
    $(".day").eq(i).text("1")
    var cnt = 1;
    while(cnt <= maxDays){
        $(".day").eq(i).text(" " + cnt + " ");
        ++cnt;
        ++i;
    }
    $(".day:contains(' " + dateNum + " ')").css({
        "background" : "#DDD"
    });
}
cal()
    function email(addr, subj, body){
    subj=subj.replace(/\s/g, "%20");
    body=body.replace(/\s/g, "%20");
    var link = "mailto:" + addr + "?subject=" + subj + "&body=" + body;
    return link;
}
    var gameStart = false;
    var gameOpp = 4;
    function endGame(){
        $("#gameBg").html("");
        gameStart = false;
    }
    function makePlayer(){
        var badguy = $("<img src='http://piq.codeus.net/static/media/userpics/piq_40021_400x400.png' alt='Loading' class='target' />");
        badguy = $(badguy).css({
            "left" : "0px",
            "bottom" : "0"
        });
        badguy = $(badguy).addClass("target");
        $("#gameBg").append(badguy);
        var index = $(badguy).index();
        var max = document.documentElement.clientWidth * .8 - 75
        var min = 0;
        setInterval(function(){
            var offsetLeft = parseInt($(".target").eq(index).css("left"));
            if(gameStart){
                if(offsetLeft >= max){
                    $(".target").eq(index).css({
                    "left":  "-10px",
                    "transform" : "rotateY(180deg)"
                });
                }
                else if(offsetLeft <= 0){
                    $(".target").eq(index).css({
                    "left": "calc(100% - 40px)",
                    "transform": "none"
                    });
                }
                else{
                    
                }
            }
        }, 1500);
    }
    function startGame(){
        gameOpp = 4;
        $("#gameBg").html("");
        gameStart = true;
        makePlayer();
        setTimeout(function(){
            makePlayer();
            setTimeout(function(){
                makePlayer();
                setTimeout(function(){
                    makePlayer();
                }, (Math.floor(Math.random() * 1000) + 500));
                }, (Math.floor(Math.random() * 1000) + 500));
        }, (Math.floor(Math.random() * 1000) + 500));
        setInterval(function(){
            if(gameStart == true){
                if(gameOpp <= 0){
                var end = $("<div></div>");
                end = $(end).addClass("note");
                end = $(end).text("You Won! Click to Restart");
                $("#gameBg").append(end);
                gameStart = false;
                $(".note").click(function(){
                    startGame();
                });
            }
            else{
                
            }
            }
        }, 100);
    }
    $("#gameBg").on("touchstart", ".target", function(){
        $(this).fadeOut(500);
        setTimeout(function(){
            $(this).remove();
            --gameOpp;
        }, 500);
    });
    $("#beginGame").click(function(){
        $("#beginGame").fadeOut(1000);
        setTimeout(function(){
            var note = $("<div></div>");
            note = $(note).addClass("note");
            note = $(note).text("Destroy The Enemies!");
            $("#gameBg").prepend(note);
            setTimeout(startGame, 2000);
        }, 1000);
    });
    function dedicate(){
        var users = {
            "Paola" : {
                img : "https://api.sololearn.com/Uploads/Avatars/3075471.jpg",
                id : "3075471",
                link : "https://www.sololearn.com/Profile/3075471?ref=app"
            },
            "Frost" : {
                img : "https://api.sololearn.com/Uploads/Avatars/1170424.jpg",
                id : "1170424",
                link : "https://www.sololearn.com/Profile/1170424?ref=app"
            },
            "Maz" : {
                img : "https://api.sololearn.com/Uploads/Avatars/2034207.jpg",
                id : "2034207",
                link : "https://www.sololearn.com/Profile/2034207?ref=app"
            },
            "Shamima Yasmin" : {
                img : "https://api.sololearn.com/Uploads/Avatars/2437074.jpg",
                id : "2437074",
                link : "https://www.sololearn.com/Profile/2437074?ref=app"
            },
            "Nomeh Uchenna Gabriel" : {
                img : "https://api.sololearn.com/Uploads/Avatars/3888540.jpg",
                id : "3888540",
                link : "https://www.sololearn.com/Profile/3888540/?ref=app"
            },
            "Russel Reeder" : {
                img : "https://api.sololearn.com/Uploads/Avatars/4182852.jpg",
                id : "4182852",
                link : "https://www.sololearn.com/Profile/4182852/?ref=app"
            },
            "ValentinHacker" : {
                img : "https://api.sololearn.com/Uploads/Avatars/788415.jpg",
                id : "788415",
                link : "https://www.sololearn.com/Profile/788415/?ref=app"
            },
            "$Vengat" : {
                img : "https://api.sololearn.com/Uploads/Avatars/2200299.jpg",
                id : "2200299",
                link : "https://www.sololearn.com/Profile/2200299/?ref=app"
            },
            "Amrit Mahendra Joseph" : {
                img : "https://api.sololearn.com/Uploads/Avatars/940396.jpg",
                id : "940396",
                link : "https://www.sololearn.com/Profile/940396/?ref=app"
            },
            "Hatsy Rei" : {
                img : "https://api.sololearn.com/Uploads/Avatars/2034558.jpg",
                id : "2034558",
                link : "https://www.sololearn.com/Profile/2034558/?ref=app"
            }
        };
        var keys = new Array();
        for(items in users){
            keys.push(items);
        }
        var len = keys.length;
        var randomUser = keys[(Math.floor(Math.random() * len))];
        var user = users[randomUser];
        $("#dedUser").text(randomUser);
        $("#dedImg").attr("src", user.img);
        $("#gotoDed").off("click");
        $("#gotoDed").on("click", function(){
            window.open(user.link);
        });
    }
    dedicate()
    $("#newDed").click(dedicate);
    function windowOpen(id, zpos){
        $(id).css({"zIndex":zpos, "visibility":"visible"});
        $(id).slideUp(0);
        $(id).slideDown(50);
        hidden = 1;
    }
    function windowClose(id){
        $(id).slideUp(50);
        function hide(){
        $(id).css({"zIndex":"0", "visibility":"hidden"});
        hidden = 0;
        }
        setTimeout(hide, 50);
    }
    $("#bright").change(function(){
        var val = $(this).val();
        if(val.length < 2){
            val = "0." + val;
        }
        else{
            val = "1.0";
        }
        $("#brightness").css("opacity", val);
    });
    $("#home").click(function(){
       if(hidden == 1){ $("window").css({"zIndex":"0","visibility":"hidden"});
       hidden = 0;
       }
       else{
           windowOpen("#apps", 3);
           hidden = 1;
       }
        
    });
    $("#search").keyup(function(e){
        if(e.which == 13){
           var val = $("#search").val();
           val = val.replace(/\s/ig, "+");
           var query = "http://google.com/search?q=" + val;
           window.open(query);
        }
    });
    $("#ppl").click(function(){
        windowOpen("#contacts", "2")
    });
    $(".btnC").click(function(){
        var which = $(this).text();
        if(which == "CE"){
           $("#scn").text("");
        }
        else if(which == "="){
          var mathVal = $("#scn").text();
          mathVal = mathVal.replace(/π/ig, "(3.14)");
          try{
          $("#scn").text(eval(mathVal))
          }
          catch(e){
             $("#scn").text("ERROR")
          }
        }
        else{
           var mathVal = $("#scn").text();
           mathVal += which;
           $("#scn").text(mathVal);
           
        }
    });
    $("#calc").click(function(){
        windowOpen("#calculator", "2");
    });
    $("#bgcolor").keyup(function(e){
    if(e.which == 13){
        $("#screen").css("background", $(this).val());
        $("#bgcolor").css("background", $(this).val());
        $(this).trigger("blur");
        }
        else{
            
        }
    });
    $("#openSet").click(function(){
        windowOpen("#settings", 2);
    });
    $("#openEmail").click(function(){
        windowOpen("#email", 2);
    });
    $("#sendEmail").click(function(){
        var addr = $("#addr").val();
        var subj = $("#subj").val();
        var body = $("#ebody").val();
        var mail = email(addr, subj, body);
        window.open(mail);
    });
    $("#openNews").click(function(){
        windowOpen("#news", 2);
    });
    $("#openNotes").click(function(){
        windowOpen("#notepad", 2);
    })
    $("#openPaint").click(function(){
        windowOpen("#paint", 2);
    });
    $("#openCal").click(function(){
        windowOpen("#calendar", 2);
    });
    $("#openGame").click(function(){
        windowOpen("#game", 2);
    });
    $("#openDed").click(function(){
        windowOpen("#ded", 2);
    });
    $("#power").click(function(){
        if(power == 1){
           windowOpen("#blackScn", 4);
           power = 0;
        }
        else {
           windowClose("#blackScn");
           power = 1; 
        }
    });
    setInterval(function(){
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var mer;
        if(h > 12){
            h = h - 12;
            mer = "PM";
        }
        else{
            mer = "AM"
        }
        if(m <= 9){
            m = "0" + m;
        }
        else{
            m = m;
        }
        var time = h + ":" + m + " " + mer;
        $("#clock").text(time);
    }, 500);
});