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
   
    $("#home").click(function(){
       if(hidden == 1){ $("window").css({"zIndex":"0","visibility":"hidden"});
       hidden = 0;
       }
       else{
          
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
	
	
	
	
	
	
	 $("#openEvent").click(function(){
        windowOpen("#event", 2);
    });
	 $("#openRegister").click(function(){
        windowOpen("#register", 2);
    });
	 $("#openContact").click(function(){
        windowOpen("#contact", 2);
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