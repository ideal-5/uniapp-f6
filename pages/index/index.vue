<template>
    <view class="main">
        <view class="canvas_box">
            <f6-canvas :width="width" :height="height" :pixelRatio="pixelRatio" @onInit="onCanvasInit" @onTouchEvent="onTouchEvent"></f6-canvas>
        </view>
    </view>
</template>

<script>
import F6Canvas from "../../components/canvas/canvas.vue";
import F6 from "f6";
import force from "@/f6/extends/layout/forceLayout";
export default {
    components: {
        "f6-canvas": F6Canvas,
    },
    computed: {},
    data() {
        return {
            width: 400,
            height: 900,
            pixelRatio: 2,
            nodeSize: 80,
            nodeFill: "#eff4ff",
            activeNodeFill: "r(0.5, 0.5, 1) 0:#fc7d9b 0.8:#ffffff 1:#ffffff",
            type: 0, // 0引力标签  1希望他
            list: [],
        };
    },
    created() {
        F6.registerLayout("force", force);
        let { activeNodeFill, nodeFill } = this;
        for (let i = 0; i < 15; i++) {
            this.list.push({
                id: "node" + i + "",
                label: "node" + i,
                isActive: false,
                style: {
                    // fill: item.selected ? activeNodeFill : nodeFill,
                    fill: false ? activeNodeFill : nodeFill,
                },
            });
        }
    },

    methods: {
        onTouchEvent(e) {
            this.graph && this.graph.emitEvent(e);
        },
        async onCanvasInit({ ctx, rect, container, renderer }) {
            console.log("canvas init ready", ctx, rect, container, renderer);
            const { width, height, pixelRatio, nodeSize } = this;
            const graph = new F6.Graph({
                container: container, // 图的 DOM 容器，可以传入该 DOM 的 id 或者直接传入容器的 HTML 节点对象。
                context: ctx,
                renderer, // 渲染方式，目前支持 'canvas' / 'svg' / 'mini' / 'mini-native'
                width,
                height,
                pixelRatio,
                layout: {
                    type: "force",
                    width,
                    height,
                    nodeSize: nodeSize + 10, // 节点大小碰撞检测
                    preventOverlap: true, //防止重叠
                    linkDistance: 50, //边长度
                    nodeStrength: 800, //节点作用力负数斥力
                    edgeStrength: 1, //边的作用力
                },
                // 默认节点配置
                defaultNode: {
                    type: "circle",
                    size: [nodeSize],
                    style: {
                        fill: "#eff4ff",
                        lineWidth: 0,
                        // stroke: "red", //边框颜色
                        // lineWidth: 3,  // 边框宽度
                    },
                    labelCfg: {
                        position: "center",
                        style: {
                            fill: "green", // TODO 文字颜色
                            fontSize: 10,
                        },
                    },
                },
                modes: {
                    default: ["drag-canvas", "drag-node"],
                },
            });
            this.graph = graph;

            this.graph.data({ nodes: this.list, edges: [] }); // 数据初始化
            this.graph.render(); // 渲染
            // 点击节点
            this.graph.on("node:tap", async (e) => {
                let { activeNodeFill, nodeFill, type } = this;
                const w = e.item._cfg.model;
                w.isActive = !w.isActive;
                w.style.fill = w.isActive ? activeNodeFill : nodeFill;
                graph.refresh();
                // this.graph.layout();
            });
            // 开始拖拽
            this.graph.on("node:dragstart", (e) => {
                // this.graph.layout(); // 重新以当前配置的属性进行一次布局。
                this.refreshDragedNodePosition(e);
            });
            // 拖拽中
            this.graph.on("node:drag", (e) => {
                const forceLayout = this.graph.get("layoutController").layoutMethods[0];
                forceLayout.execute();
                this.refreshDragedNodePosition(e);
                // this.graph.layout();
            });
            // 拖拽结束
            this.graph.on("node:dragend", (e) => {
                e.item.get("model").fx = null;
                e.item.get("model").fy = null;
                // this.graph.layout();
            });
        },
        refreshDragedNodePosition(e) {
            const model = e.item.get("model");
            model.fx = e.x;
            model.fy = e.y;
        },
    },
    // 接受路由参数
    // onLoad({ type }) {
    //     this.type = type;
    //     this.getList();
    // },
};
</script>

<style scoped lang="scss">
.main {
    width: 100%;
    height: 100vh;
}
</style>
