var mapArray, ctx, currentImgMainX, currentImgMainY;
var imgMountain, imgMain, imgEnemy;
// mapArray: 決定地圖中每個格子元素
// ctx: HTML5 Canvas 用
// currentImgMainX currentImgMainY: 決定主角所在座標
//imgMountain imgMain imgEnemy: 障礙物 主角 敵人的圖片物件

//當網頁元件載入完成後要做的事情
$(document).ready(function(){ 
    //遊戲地形設定 0: 可走 1: 障礙 2: 終點 3: 敵人
    mapArray= [0,1,1,0,0,0,3,1,2]; // 存放資料
    ctx= $("#myCanvas")[0].getContext("2d"); //一般平面繪圖
    
    imgMain= new Image(); //擺上主角位置 使用預設位置
    imgMain.src= "rpg/images/spriteSheet.png";
    currentImgMainX= 0;
    currentImgMainY= 0;
    imgMain.onload= function() //主角圖片載入後執行下面函數
    { //ctx.drawImage(圖片位置,圖片裁切起始點:0 0 寬高:80,130 放置位子 currentX,Y,200,200 )
        ctx.drawImage(imgMain,0,0,80,130,currentImgMainX,currentImgMainY,200,200);
    }
    imgMountain= new Image();//障礙物圖片物件
    imgMountain.src= "rpg/images/material.png";
    imgEnemy= new Image();//敵人圖片物件
    imgEnemy.src= "rpg/images/Enemy.png";
    imgMountain.onload= function(){
        imgEnemy.onload=function(){
        for(var x in mapArray)
        {
            if(mapArray[x]==1)//擺上障礙物
                {                                       //x轉成座標
                ctx.drawImage(imgMountain,256,190,33,35,x%3*200,Math.floor(x/3)*200,200,200);
                }
            else if(mapArray[x]==3)//擺上敵人
                {
                    ctx.drawImage(imgEnemy,7,40,104,135,x%3*200,Math.floor(x/3)*200,200,200);
                }
        }
        }
    }
});
//當有人按下按鍵後要做的事情
$(document).keydown(function(event){
    var targetImgMainX, targetImgMainY, targetBlock, cutImagePositionX;
    // targetImgMainX, targetImgMainY : 主角即將要移動過去的目標位置
    // targetBlock : 主角即將要移動過去的那一個編號
    // cutImagePositionX :依據主角朝向什麼方向而決定的圖片 (切換圖片)
    event.preventDefault();
    console.log(event.which)
    //避免點擊鍵盤出現瀏覽器其他行為 : 捲動 放大 換頁
    //依據使用者點擊按鍵 計算出目標位置及設定新的圖片
    switch(event.which){ //switch() 開關的意思  .which 使用者按下鍵盤的編碼
        case 37://往左走
            targetImgMainX= currentImgMainX-200;
            targetImgMainY= currentImgMainY;
            cutImagePositionX= 175;
            break
        case 38://往上走
            targetImgMainX= currentImgMainX;
            targetImgMainY= currentImgMainY-200;
            cutImagePositionX= 355;
            break;
        case 39://往右走
            targetImgMainX= currentImgMainX+200;
            targetImgMainY= currentImgMainY;
            cutImagePositionX= 540;
            break;
        case 40://往下走
            targetImgMainX= currentImgMainX;
            targetImgMainY= currentImgMainY+200;
            cutImagePositionX= 0;
            break;
        default://當有人按這四個按鍵以外的設定
            return;
    }
//沒超出邊界
       // (x && y && z....) : 需要條件全部都符合才執行
    if( targetImgMainX <=400 && targetImgMainX >=0 && targetImgMainY <=400 && targetImgMainY >=0)
    {
        targetBlock= targetImgMainX/200+targetImgMainY/200*3 ; //座標轉數值
        
    }
    else{
    targetBlock= -1;// -1代表異常 不移動
}

    ctx.clearRect(currentImgMainX, currentImgMainY,200,200);//清除主角原本所在位置
    if(targetBlock==-1 || mapArray[targetBlock]==1 || mapArray[targetBlock]==3) // ("||") :代表"or"任一條件成立才執行
    {
        //目標位置異常 遇到障礙 遇到敵人都不能走 在原地(稍後會依移動方向轉頭)什麼都不做
    }
    else{
    $("#talkbox").text("");
    currentImgMainX= targetImgMainX;
    currentImgMainY= targetImgMainY;
}
    ctx.drawImage(imgMain,cutImagePositionX,0,80,130,currentImgMainX,currentImgMainY,200,200);
    
    switch(mapArray[targetBlock]){
        case undefined: // -1 or 無法辨識
            $("#talkBox").text("border");
            break;
        case 1:
            $("#talkBox").text("Wood");
            break;
        case 2:
            $("#talkBox").text("Goal");
            break;
        case 3:
            $("#talkBox").text("I'll be back");
            break;
            
    }

    });//可以增加物件 主角走過去的時候替換物件