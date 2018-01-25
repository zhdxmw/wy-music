
#一个react 版本的  仿 酷狗音乐播放器
---------

注：本项目仅供学习，涉及版权请提示删除。

    api接口是之前大神分享的  https://segmentfault.com/a/1190000010222913

#技术栈：
---------

react-create-app + react + redux + webpack + react-router（4.2）+ antd-mobile + better-scroll

#运行项目：
---------

 npm i

 npm start

 npm run build （发布）
 
 #多代理设置
 ---
 package.json 中
 "proxy": {
    "/proxy/":{
      "target": "http://m.kugou.com",
      "secure": false,
      "changeOrigin": true,
      "pathRewrite": {"^/proxy" : ""}
    },
    
    "/sproxy/": {
      "target": "http://mobilecdn.kugou.com/api/v3",
      "secure": false,
      "changeOrigin": true,
      "pathRewrite": {"^/sproxy": ""}
    },
    
    "/dproxy/": {
      "target": "http://www.kugou.com",
      "secure": false,
      "changeOrigin": true,
      "pathRewrite": {"^/dproxy": ""}
    }
    
  }

#项目截图
---------
    
![](https://github.com/zhdxmw/wy-music/blob/master/project-img/a.jpeg)
![](https://github.com/zhdxmw/wy-music/blob/master/project-img/b.jpeg)
![](https://github.com/zhdxmw/wy-music/blob/master/project-img/c.jpeg)
![](https://github.com/zhdxmw/wy-music/blob/master/project-img/d.jpeg)
![](https://github.com/zhdxmw/wy-music/blob/master/project-img/e.jpeg)
![](https://github.com/zhdxmw/wy-music/blob/master/project-img/f.jpeg)
![](https://github.com/zhdxmw/wy-music/blob/master/project-img/g.jpeg)
![](https://github.com/zhdxmw/wy-music/blob/master/project-img/h.jpeg)

