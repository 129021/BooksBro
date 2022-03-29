<template>
  <div class="tab-control">
    <div
      class="tab-control-item"
      v-for="(item, index) in titles"
      :key="index"
      @click="itemClick(index)"
      :class="{active:index==currentIndex}"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default: [],
    },
  },
  setup(props,{emit}) {
    let currentIndex = ref(0);

    const itemClick = (index) => {
      currentIndex.value = index;
      emit('tabClick',index)
    };

    return {
      currentIndex,
      itemClick,

    };
  },
};
</script>

<style scoped >
.tab-control {
  display: flex;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 14px;
  background-color: white;
  width: 100%;
  position: sticky;
  top:45px;
  z-index: 10;
}
.tab-control .tab-control-item {
  flex: 1;
}

.tab-control .active {
  color: var(--color-tint);
}

.tab-control .active span {
  border-bottom: 3px solid var(--color-tint);
}
.tab-control-item span {
  padding: 6px;
}
</style>