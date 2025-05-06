# ContextMenu 组件

## 功能
- 支持动态传递菜单内容。
- 使用 `slot` 指定触发区域。
- 支持点击菜单项的回调事件。

## 使用方法

### 基本用法
```vue
<template>
  <ContextMenu
    :menuItems="menuItems"
    @menu-click="handleMenuClick"
  >
    <div class="target-area">右键点击这里</div>
  </ContextMenu>
</template>

<script>
import ContextMenu from "@/components/ContextMenu.vue";

export default {
  components: { ContextMenu },
  data() {
    return {
      menuItems: [
        { label: "复制", action: "copy" },
        { label: "粘贴", action: "paste" },
        { label: "删除", action: "delete" },
      ],
    };
  },
  methods: {
    handleMenuClick(item) {
      console.log("菜单项点击：", item);
    },
  },
};
</script>

<style>
.target-area {
  width: 200px;
  height: 100px;
  background: #f0f0f0;
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
```

右键菜单组件
```vue
<template>
  <div>
    <slot @contextmenu.prevent="showMenu"></slot>
    <Teleport to="body">
      <div
        v-if="visible"
        class="context-menu"
        :style="{ top: `${position.y}px`, left: `${position.x}px` }"
        @click="hideMenu"
      >
        <ul>
          <li
            v-for="(item, index) in menuItems"
            :key="index"
            @click="handleClick(item)"
          >
            {{ item.label }}
          </li>
        </ul>
      </div>
    </Teleport>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "ContextMenu",
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
  },
  setup(props, { emit }) {
    const visible = ref(false);
    const position = ref({ x: 0, y: 0 });

    const showMenu = (event) => {
      position.value = {
        x: Math.min(event.clientX, window.innerWidth - 200), // 防止超出屏幕
        y: Math.min(event.clientY, window.innerHeight - 200),
      };
      visible.value = true;
    };

    const hideMenu = () => {
      visible.value = false;
    };

    const handleClick = (item) => {
      emit("menu-click", item);
      hideMenu();
    };

    return {
      visible,
      position,
      showMenu,
      hideMenu,
      handleClick,
    };
  },
};
</script>

<style>
.context-menu {
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 10px;
  border-radius: 4px;
}
.context-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.context-menu li {
  padding: 5px 10px;
  cursor: pointer;
}
.context-menu li:hover {
  background: #f0f0f0;
}
</style>

```
## Props
| 参数       | 类型   | 必填 | 默认值 | 说明           |
| ---------- | ------ | ---- | ------ | -------------- |
| `menuItems` | Array | 是   | 无     | 菜单项数组，每项包含 `label` 和 `action` |

## Events
| 事件名       | 参数         | 说明               |
| ------------ | ------------ | ------------------ |
| `menu-click` | `item` (Object) | 点击菜单项时触发，返回菜单项对象 |

## 样式
- 菜单样式可通过覆盖 `.context-menu` 类进行自定义。

---

### 难点总结
1. **菜单位置计算**：
   - 需要动态计算菜单位置，避免超出屏幕边界。
   - 使用 `Math.min` 限制菜单位置。

2. **全局渲染**：
   - 使用 `Teleport` 将菜单渲染到 `body`，避免父级样式干扰。

3. **事件绑定与解绑**：
   - 需要处理右键菜单的显示与隐藏逻辑，避免菜单残留。

通过以上实现，组件可以灵活适配不同场景，满足通用右键菜单的需求。
