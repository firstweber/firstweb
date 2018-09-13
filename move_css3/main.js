$(document).ready(function() {
       var c=0;
       setInterval(function(){
           $("#branch").css("transform","rotate("+c+"deg)");
           c=c+30;
       },50);    
})
$(document).ready(function() {
       var c=0;
       setInterval(function(){
           $("#mill").css("transform","rotate("+c+"deg)");
           c=c-20;
       },100);    
})
