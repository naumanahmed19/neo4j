
<script setup lang="ts">

import type { Item } from "../interfaces";
import ItemService from '../services/items.service';
import { ref, type Ref } from 'vue';
import NodeChart from '../components/NodeChart.vue'
import Sidebar from '../components/Sidebar.vue';


const items: Ref<Item[]> = ref([]);
const selectedItem = ref();
const chartRefs = ref(null);
const headline=ref(null);
const isLoading: Ref<boolean> = ref(false);
const hasNetworkError: Ref<boolean> = ref(false);
const showSidebar: Ref<boolean> = ref(false);
// Fetch items when component is mounted
getItems();

async function getItems() {
  try {
    isLoading.value = true;
    const res = await ItemService.fetchItems();
    items.value = await res.json();

  } catch (error) {
    console.error('Error fetching items:', error);
    hasNetworkError.value = true;
  } finally {
    isLoading.value = false;
  }
}

const onSelect = (item: any) => {
   showSidebar.value = true;
   selectedItem.value = item;
}

const onCloseSidebar = () =>{
  showSidebar.value = false
  selectedItem.value = null
}
</script>

<template>
  <div>
    <div v-if="hasNetworkError">Unable to connect to server</div>
    <div v-if="isLoading">
      Loading.....
    </div>
    <div v-else>
      <NodeChart v-if="items.length" ref="chartRefs" :data="items" @onSelect="onSelect" :showSidebar="showSidebar ?? false"></NodeChart>
      <Sidebar v-if="showSidebar" @onClose="onCloseSidebar">
        <h2>{{ selectedItem.name }}</h2>
        <p>{{ selectedItem.description }}</p>
    </Sidebar>
    </div>
  </div>
</template>