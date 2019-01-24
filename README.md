# 注意

### 生产环境构建

````
# 构建生产环境版本
npm run build:prod
```

1. 构建项目的的assetsPublicPath(config/index.js)
```
module.exports = {
  build: {
    assetsPublicPath: '/statics/admin/pages/dashboard/',//根据ztbcms目录调整
  }
}

```

构建后请把`/dist/statics`目录copy到ZTBCMS的`/statics/admin/pages/dashboard/`目录下。
`index.html`文件的内容覆盖到`app/Application/Admin/View/Index/dashboard.php`



### 如何调试？

由于本项目开发时与ZTBCMS存在跨域问题，所以cookie无法共享。建议在`Admin\Controller\AdminApiBaseController`中
```php
class AdminApiBaseController extends CMS
{
  

    protected function _initialize()
    {
        parent::_initialize();
        $this->supportCros();
        //直接固定登录一个后台账号！！！
        User::getInstance()->login('admin','admin');
    }
}
```


### 核心文件

- Layout/index.vue 后台框架页(整个后台页的交互)
- Launch/index.vue 框架启动页(用来获取菜单)


### 页面权限：功能按权限显示

`src/utils/mixin.js`中的`hasRolePermission()`用于检测当前登录用户是否有权限访问路由。请参考`Navbar.vue`中的『缓存清理』功能实现。

![图片](https://dn-coding-net-production-pp.codehub.cn/988b5094-4b3b-4869-9d29-c7635bcd5386.png)


### 页面操作

1.打开新窗口
```js
//方法1. 封装后再调用
window.openNewIframe = function (title, url) {
    if (parent.window != window) {
        parent.window.__adminOpenNewFrame({
            title: title,
            url: url
        })
    } else {
        window.location.href = url;
    }
}.bind(this)

//调用
window.openNewIframe('标题','http://baidu.com');


//方法2.直接调用(兼容性差)

parent.window.__adminOpenNewFrame({
    title: '标题',
    url: 'http://baidu.com'
})

//方法3 底层实现方法,使用事件触发
const event = new CustomEvent('adminOpenNewFrame', {
  detail: {
    title: '启动父窗口1', 
    router_path: '/a/b/c', 
    url: 'http://baidu.com'
  }
})
window.parent.dispatchEvent(event)
```

2.刷新指定页面（一般很少用）

```
const event = new CustomEvent('adminRefreshFrame', {
  detail: {
    refreshView: {
      name:'路由的name',
      meta:{
        url: "/index.php?g=Admin&m=Adminmanage&a=chanpass&menuid=6"
      },
    }
  }
})
window.parent.dispatchEvent(event)
```

3. 图标配置


到iconfont.cn选取icon,用的是svg
![图片](https://dn-coding-net-production-pp.codehub.cn/c02721e8-2d56-4407-8e59-8101e6f3fe1b.png)

在dashborad.php 引入js
![图片](https://dn-coding-net-production-pp.codehub.cn/8b6dea28-655d-4dc0-9525-848ab9452635.png)

设置菜单的icon
![图片](https://dn-coding-net-production-pp.codehub.cn/f856614b-fcbe-40f6-9f47-b332c34852dd.png)


