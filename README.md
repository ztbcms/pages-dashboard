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

