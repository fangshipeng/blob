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
  setup (props, { emit }) {
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
