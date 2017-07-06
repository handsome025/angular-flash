/**
 * 方便百分比加载flash导出的createjs文件
 *
 * @使用说明
 *
 *  新建目录 flash/demo/demo.fla
 *
 *  执行导出操作(无需修改任何导出的文件)
 *
 *  package.json gulpConfig.lib 中加入 "vendor/createjs.js" 依赖
 *
 *  页面控制器中调用:
 *
uCreatejs.load({
    selector: 'canvas', // 元素选择器或者元素对象
    name: 'demo', // 导出的文件名
    path: 'flash/demo', // 存放导出文件的目录
    spritesheetLength: 4, // 导出的雪碧图数量,
    spritesheetName: 'demo_atlas_', //导出的雪碧图名称
    onProgress: function (value) {
        console.log('加载 ' + ~~(value * 100) + '%')
    },
    onComplete: function (obj) {
        console.log(obj) // 会回调stage, exportRoot等对象 用于后续操作
    }
})
 */
angular.module('ued').factory('uCreatejs', function () {
    function loadScript(url, cb) {
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.onload = cb
        script.src = url
        document.querySelector('head').appendChild(script)
    }

    function initScript(options) {
        var canvas, stage, exportRoot;

        function init() {
            canvas = $(options.selector)[0]
            images = images || {};
            ss = ss || {};

            loadSpritesheetResource(function (array) {
                lib.properties.manifest = lib.properties.manifest.map(function (obj) {
                    obj.src = options.path + '/' + obj.src
                    return obj
                })

                array = array.concat(lib.properties.manifest)

                loadImages(array, options.onProgress, handleComplete)
            })
        }

        function loadSpritesheetResource(cb) {
            var array = []
            var count = options.spritesheetLength

            for (var i = 1; i <= options.spritesheetLength; i++) {
                var id = options.spritesheetName + (i == 1 ? '' : i)
                var src = options.path + "/images/" + id + ".json";

                (function (id, src) {
                    loadSpritesheetJSON(src, function (json) {
                        ss[id] = new createjs.SpriteSheet(json)
                        json.images.forEach(function (src) {
                            array.push({id: id, src: src, isSpritesheet: true})
                        })

                        if (--count == 0) {
                            cb(array)
                        }
                    })
                })(id, src)
            }
        }

        function loadSpritesheetJSON(url, cb) {
            $.getJSON(url, function (data) {
                data.images = data.images.map(function (image) {
                    image = options.path + '/' + image
                    return image
                })
                cb(data)
            })
        }

        function loadImages(array, progress, complete) {
            var count = 0

            array.forEach(function (item) {
                loadImage(item.src, function (image) {
                    if (!item.isSpritesheet) {
                        images[item.id] = image
                    }
                    count++
                    progress && progress(count / array.length)
                    if (count == array.length) {
                        complete()
                    }
                })
            })
        }

        function loadImage(src, cb) {
            var image = new Image()
            image.onload = function () {
                cb(image)
            }
            image.src = src
        }

        function handleComplete() {
            exportRoot = new lib[options.name]();

            stage = new createjs.Stage(canvas);
            stage.addChild(exportRoot);
            stage.update();

            createjs.Ticker.setFPS(lib.properties.fps);
            createjs.Ticker.addEventListener("tick", stage);

            options.onComplete && options.onComplete({
                lib: lib,
                ss: ss,
                stage: stage,
                exportRoot: exportRoot,
                images: images
            })
        }

        init()
    }
    
    return {
        load: function (options) {
            loadScript(options.path + '/' + options.name + '.js', function () {
                initScript(options)
            })
        }
    }
})