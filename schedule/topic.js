var topic = [
    "尚未開學",
    "國定假日",
    "環境準備",
    "隨機性",
    "重複性",
    "Good",
    "Morning"
];

var startDate = new Date();

function setMonthAndDay(startMonth,startDay)
{
    console.log("[setMonthAndDay]");
    //startDate.setFullYear(startYear,startMonth-1,startDay)
    startDate.setMonth(startMonth-1,startDay);
    //startDate.setDate(startDay); 修正成上
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
}
//setMonthAndDay = (4,21);

/*function setMonthAndDay(startYear,startMonth,startDay){
    
    startDate.setFullYear(startYear,startMonth-1,startDay)
    startDay.setHours(0)
    startDay.setMinutes(0)
    startDay.setSeconds(0)
}*/
