# ued前端标准框架

### 首次使用准备工作

* 安装 node.js 5.x 以上版本 

    若已安装过 node.js, 使用 node -v 查询版本号
    
* 安装 gulp 
    
    npm i gulp -g


* 执行 npm i 

    将自动安装所有依赖模块, 把生成的 node_modules 目录设置为 svn ignore


### 后续使用步骤

* 拷贝 seed 目录到你的工程

    不拷贝 node_modules 目录, 而是做软连接, 不用每次下载依赖
    
    软连接命令如下: ( 在你的工程目录下运行 )
  
    windows平台: mklink /D node_modules [seed绝对路径]
    
    linux/unix: ln -sv [seed绝对路径]/node_modules node_modules


* 开发时运行 npm run dev

* 上线前运行 npm run prod
