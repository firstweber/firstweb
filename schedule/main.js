$(document).ready(function(){
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");
    
        $("input[type=date]").change(function(){
        //alert( $( "input[type=date]" ).val() );
        //2018-09-03
        
        var inputDate = $("input[type=date]").val();
        if(inputDate){
        var splitText = inputDate.split("-");
        console.log(splitText[1]);
        setMonthAndDay(splitText[1],splitText[2]);
        setTable();
        }
    });
    
});
    
    function setTable(){
    
    $("#courseTable").empty();
    
    $("#courseTable").append("<tr>");
    $("#courseTable").append("<th>場次</th>");
    $("#courseTable").append("<th>時間</th>");
    $("#courseTable").append("<th>主題</th>");
    $("#courseTable").append("</tr>");
        
    
    var topicCount = topic.length; 
    
    var secondUnit = 1000; //時間運算;轉換
    var minuteUnit = secondUnit * 60;
    var hourUnit = minuteUnit * 60;
    var dayUnit = hourUnit * 24;
    
    for(var x=0;x<topicCount;x++){
        if(x%2==0)
        {
            $("#courseTable").append("<tr>");
            $("#courseTable").append("<td class='even'>"+(x+1)+"</td>");
            //$("#courseTable").append("<td>"+(startDate+7*x)+"</td>");
            // slice(5)切割 " 2018/ "
            $("#courseTable").append("<td class='even'>"+(new Date(startDate.getTime()+x*7*dayUnit)).toLocaleDateString().slice(5)+"</td>");//"dayUnit" 可替換 "*24*60*60*1000"
            $("#courseTable").append("<td class='even'>"+topic[x]+"</td>");
            $("#courseTable").append("</tr>");
        }
        else
        {
            $("#courseTable").append("<tr>");
            $("#courseTable").append("<td>"+(x+1)+"</td>");
            $("#courseTable").append("<td>"+(new Date(startDate.getTime()+7*x*24*60*60*1000)).toLocaleDateString().slice(5)+"</td>");
            $("#courseTable").append("<td>"+topic[x]+"</td>");
            $("#courseTable").append("</tr>");
        }
        
    }
        
}

/*$("input[type= date]").change(function(){
    var inputDate= $("input[type= date]").val;
    var splitText= inputDate.split("-");
    
    setMonthAndDay(splitText[0],splitText[1],splitText[2]);
    setTable();
})*/