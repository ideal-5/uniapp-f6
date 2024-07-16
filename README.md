# uniapp 中使用 AntV F6 的模板示例

```js
import force from "@/f6/extends/layout/forceLayout"; // 在这里引入你想要的布局算法

    created() { // 布局引入完需要在created 中注册一下
        F6.registerLayout("force", force);
    },
```

<!--还有不知道什么原因，我把F6实例赋值到data中就会报错-->
