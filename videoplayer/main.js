
var player; //Youtube 播放器
var currentPlay= 0; //紀錄目前播到第幾首歌

//當Youtube API 準備好時
function onYouTubeIframeAPIReady(){
    //console.log("[onYouTubeIframeAPIReady]");
    player= new YT.Player("player",{
        height:"390",
        width:"640",
        videoId:playlist[currentPlay],
        playerVars:{
            "autoplay":0,//是否自動播放
            "controls":0,//是否顯示控制項
            "start":playTime[currentPlay][0],//開始播放秒數
            "end":playTime[currentPlay][1],//結束播放秒數
            "showinfo":0,//上方是否顯示影片標題
            "rel":0,//結束時是否顯示相關影片
            "iv_load_policy":3//是否顯示置入性行銷連結
        },
        events:{
            "onReady":onPlayerReady,
            "onStateChange":onPlayerStateChange
        }
    });
}
//當Youtube 播放器準備好時
function onPlayerReady(event){
    
    $("#playButton").click(function(){
        $("h2").text(player.getVideoData(1).title);
        player.playVideo();
    });
}
//當播放器播放狀態改變時
function onPlayerStateChange(event){ //當兩種情況發生時:
        // 當播放到指定的最後一秒時
        if(event.data== 0 && (Math.floor(player.getCurrentTime())== playTime[currentPlay][1])){
            /* event.data{
            -1 – unstarted
            0 – ended
            1 – playing
            2 – paused
            3 – buffering
            5 – video cued}
            */

            // 如果還沒播到最後一首
            if(currentPlay< playlist.length-1){
                currentPlay++;
                player.loadVideoById({
                    "videoId": playlist[currentPlay],
                    "startSeconds": playTime[currentPlay][0],
                    "endSeconds":playTime[currentPlay][1],
                    "suggestedQuality":"large"
                });
            }else{ // 已經播到最後一首
                currentPlay= 0;
                player.cueVideoById({
                    "videoId": playlist[currentPlay],
                    "startSeconds": playTime[currentPlay][0],
                    "endSeconds": playTime[currentPlay][1],
                    "suggestedQuality": "large"
                });
            } 
        }
        //避免影片還沒開始播時抓不到標題
        if(player.getVideoLoadedFraction()>0)
        {
            $("h2").text(player.getVideoData(1).title);
        }
    }