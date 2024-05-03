<template>
  <div>
    <div class="svgElementContainer" ref="svgElementContainer"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';
import { OrgChart } from 'd3-org-chart';
const svgElementContainer = ref(null);
const chartReference = ref(null);

const props = defineProps({
  data: Array,
  showSidebar: Boolean
})
const emit = defineEmits(['onSelect'])

let selectedNode = ref(null);


watch(props, (props) => {
  if (props.showSidebar == false) {
    selectedNode = null;
    renderChart()
  }
})


const renderChart = () => {
  if (!chartReference.value) {
    chartReference.value = new OrgChart();
  }
  const containerElement = document.querySelector('.svgElementContainer');
  if (containerElement) {
    chartReference.value
      .container(containerElement)
      .data(props.data)
      .nodeId((dataItem) => dataItem.name)
      .parentNodeId(d => d.parent)
      .layout('left').render().fit()
      .compact(false).render().fit()
      .onNodeClick((d) => {
        selectedNode = d;
        emit('onSelect', d.data)
        chartReference.value.render().clearHighlighting();

      })
      .nodeContent(function (d, i, arr, state) {
        let color = '#FFFFFF';
        let borderColor = '#E4E2E9';
        const imageDiffVert = 25 + 2;
        var isSelected = selectedNode?.id == d.id;
        if (isSelected) {
          borderColor = 'green'
        }
        return `
                <div style='width:${d.width
          }px;height:${d.height}px;padding-top:${imageDiffVert - 2}px;padding-left:1px;padding-right:1px'>
                        <div style="font-family: 'Inter', sans-serif;background-color:${color};  margin-left:-1px;width:${d.width - 2}px;height:${d.height - imageDiffVert}px;border-radius:10px;border: 1px solid ${borderColor}">
                            <div style="font-size:15px;color:#08011E;margin-left:20px;margin-top:10px">  ${d.data.name
          } </div>
                        </div>
                    </div>
                            `;
      })
      .render();
  } else {
    console.error('Container element not found.');
  }
};


onMounted(() => {
  renderChart();
});
</script> 