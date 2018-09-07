$(document).ready(function()//The ready()method specifies what happens when a ready event occurs(document).
{ // alert() ; console.log() 可用來尋找選項是否有執行
    var currentQuiz = null //Tip: The ready() method should not be used together with <body onload="">.
    //按下按鈕後 將要做的事情放裡面
    $("#startButton").click(function(){
        if(currentQuiz == null)
        {
            //設定目前作答到第0題 currentQuiz = 做到第幾題
            currentQuiz = 0;
            //顯示題目 data.js.text(quesrions[0].question)
            $("#question").text(questions[0].question);
            //每次顯示選項前先將該區域清空（可以試著不做這一步）
            $("#options").empty();
            //將一個一個選項內容 添加至選項區塊
            for(var x=0;x<questions[0].answers.length;x++)
            {
                $("#options").append("<input name= 'options' type= 'radio' value= "+x+">"+"<label>"+questions[0].answers[x][0]+"</label><br><br>");//#options逐個添加"選項"X[0,1,2]+questions[0]的answers[0,1,2]中的第0個之後<br>
            }
            //執行完迴圈後將按鈕上的文字換成Next或下一題
            $("#startButton").attr("value","Next");
            
        }
        //如果已經開始作答就從這裡繼續
        else
        {
            //尋訪每個選項是否被選取
            $.each($(":radio"),function(i,val){
                if(val.checked)
                {
                    //使用者所選取項目是否以產生最終結果 A~D
                    if(isNaN(questions[currentQuiz].answers[i][1])) //isNaN= is not a number
                    {
                        //通往最終結果    
                        var finalResult= questions[currentQuiz].answers[i][1];
                        //顯示最終結果的標題
                        $("#question").text(finalAnswers[finalResult][0]);
                        //將選項區域清空
                        $("#options").empty();
                        //顯示最終結果的詳細內容
                        $("#options").append(finalAnswers[finalResult][1]+"<br><br>");
                        //將目前的做達到第幾題的變數清空
                        currentQuiz= null;
                        //修改按鈕為重新開始
                        $("#startButton").attr("vale","Restart");
                    }
                    else
                    {   //currentQuiz 為做到第幾題
                        //指定下一個要顯示的題目 由於原始資料是從1開始算 所以 -1
                        currentQuiz= questions[currentQuiz].answers[i][1]-1;
                        //顯示新題目
                        $("#question").text(questions[currentQuiz].question);
                        //清空選項區塊
                        $("#options").empty();
                        //將一個一個選項內容 添加至選項區塊 顯示新的選項內容
                        for(var x=0;x< questions[currentQuiz].answers.length;x++)
                        {
                            $("#options").append("<input name= 'options' type= 'radio' value= "+x+" >"+"<label>"+questions[currentQuiz].answers[x][0]+"</label><br><br>");
                            // <label>" "</label> HTML的給使用者看的標籤
                        }
                    }
                    //完成跳出迴圈
                    return false;
                }
            })
        }
    });
})