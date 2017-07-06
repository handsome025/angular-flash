angular.module('ued').controller('index', function ($scope,uCreatejs) {
    $scope.$on("$viewContentLoaded", onViewContentLoaded);

    // var bg = new buzz.sound("dist/default/page/index/music/music", {
    //     formats: ["mp3","ogg"],
    //     preload: true,
    //     loop: true
    // });
    var isOpen = true;
    
    document.addEventListener("WeixinJSBridgeReady", function () {
        $("#music")[0].play();
    }, false);

    // $("body").one("touchstart",function(){$("#music")[0].play();});
    $scope.playPause = function(){
        $(".btn_music").toggleClass('music_off');
        if(isOpen){
            $("#music")[0].pause();
        }else{
            $("#music")[0].play();
        }
        isOpen = !isOpen
    }
    function  onViewContentLoaded()
    {
        uCreatejs.load({
            selector: 'canvas', // 元素选择器或者元素对象
            name: 'h5', // 导出的文件名
            path: 'flash/h5', // 存放导出文件的目录
            spritesheetLength: 12, // 导出的雪碧图数量,
            spritesheetName: 'h5_atlas_', //导出的雪碧图名称
            onProgress: function (value) {
                // console.log('加载 ' + ~~(value * 100) + '%');
            },
            onComplete: function (obj) {
                // console.log(obj) // 会回调stage, exportRoot等对象 用于后续操作
                exportRoot = obj.exportRoot;
                swipeH5(exportRoot);
                // $('.btn_music,.arrow').fadeIn();
                if(!isOpen){ 
                    $("#canvas").one("touchstart",function(){$("#music")[0].play();});
                }
                
            }
        });
    }
    // window.showQrcode = function(){
    //     $('.qrcode').fadeIn();
    // }

    function swipeH5(stage){
        var childs = [
            exportRoot.instance_12,
            exportRoot.instance_11,
            exportRoot.instance_10,
            exportRoot.instance_9,
            exportRoot.instance_8,
            exportRoot.instance_7,
            exportRoot.instance_6,
            exportRoot.instance_5,
            exportRoot.instance_4,
            exportRoot.instance_3,
            exportRoot.instance_2,
            exportRoot.instance_1
        ];

        stage.addChild(childs[0]);
        var verticalSwipe = new Swipe(document.getElementById('container'), {
            continuous: false, // 是否循环滚动
            stopPropagation: true,
            callback:function(e){
                stage.removeAllChildren();
                setTimeout(function(){
                    $('#canvas').appendTo($('#container ul li:eq('+e+')'));
                    stage.addChild(childs[e]);
                    childs[e].gotoAndPlay(0);
                },500);
                // if(e == 6){
                //     $('.arrow').hide();
                // }else{
                //     $('.qrcode').hide();
                //     $('.arrow').show();
                // }
            }
        });
    }
})
