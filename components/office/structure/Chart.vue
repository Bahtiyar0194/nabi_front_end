<template>
  <div class="chart-container" style="height: 90vh"></div>
</template>
<script>
import { OrgChart } from "d3-org-chart";
export default {
  props: ["data"],
  data() {
    return {
      chartReference: null,
    };
  },
  watch: {
    data(value) {
      this.renderChart(value);
    },
  },
  methods: {
    renderChart(data) {
      if (!this.chartReference) {
        this.chartReference = new OrgChart();
      }
      this.chartReference
        .container(".chart-container")
        .data(data)
        .nodeHeight((d) => 85)
        .nodeWidth((d) => {
          return 170;
        })
        .childrenMargin((d) => 50)
        .compactMarginBetween((d) => 25)
        .compactMarginPair((d) => 50)
        .neightbourMargin((a, b) => 25)
        .siblingsMargin((d) => 25)
        .buttonContent(({ node, state }) => {
          return `
          <div class="structure_button">
           <div>
                <span>${
                  node.children
                    ? `<i class="bi bi-chevron-up"></i>`
                    : `<i class="bi bi-chevron-down"></i>`
                }</span> ${node.data._directSubordinates}
           </div>
          </div>`;
        })
        .nodeContent(function (d, i, arr, state) {
          return `
            <div class="user_node">
            <div style="font-size: 10px; position:absolute; right: 20px">
            ЛО: <span class="text-green-500">${d.data.p_t}</span>
            <br>
            ГО: <span class="text-yellow-500">${d.data.g_t}</span>
            <br>
            ОЛГ: <span class="text-red-500">${d.data.p_g_v}</span>
            </div>

            <div class="user_img_structure" style="background-image: url('https://www.patrasevents.gr/imgsrv/f/full/726358.jpg')"></div>
            <div class="user_name_structure"> ${d.data.fio} ${d.data.nodeId}</div>
            <div class="text-xs"> ${d.data.status} </div>
           </div>`;
        })
        .render();
    },
  },
};
</script>