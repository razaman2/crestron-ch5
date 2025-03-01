<script lang="jsx">
import EventEmitter from "@razaman2/event-emitter";
import ReactiveVue, {setup, access} from "@razaman2/reactive-view";
import {computed, onMounted, cloneVNode} from "vue";

export default {
    props: {
        ...setup,
        name: String,
        accordion: String,
        title: {
            type: String,
            default: "Custom Collapse",
        },
        titleClass: {
            type: String,
            default: "",
        },
        contentClass: {
            type: String,
            default: "",
        },
        icon: {
            default: "plus",
            validator: (icon) => {
                return ["plus", "arrow", false].includes(icon);
            },
        },
        eager: {
            type: Boolean,
            default: false,
        },
        opened: {
            type: Boolean,
            default: false,
        },
    },

    setup() {
        const notifications = new EventEmitter();

        return ($vue) => (
            <ReactiveVue
                modelName="CustomCollapse"
                defaultData={{activated: false, open: false}}
                notifications={notifications}
                setup={(parent) => {
                    if ($vue.accordion) {
                        EventEmitter.global().on($vue.accordion, (open, component) => {
                            if (open && $vue.accordion && component.accordion && (access(component).getState !== access(parent).getState)) {
                                access(parent).getState.setData({open: false});
                            }
                        });
                    }

                    const content = computed(() => {
                        if ($vue.eager || access(parent).getState.getData("activated")) {
                            return ($vue.$slots.default?.($vue) ?? []).map((vnode) => {
                                return cloneVNode(vnode, {
                                    notifications: access(parent).notifications,
                                    onVnodeMounted: () => {
                                        access(parent).notifications.emit("open", true, $vue);
                                    },
                                });
                            });
                        }
                    });

                    const template = () => {
                        const vnode = (
                            <div class={{
                                "collapse flex flex-col": true,
                                "collapse-arrow": ($vue.icon === "arrow"),
                                "collapse-plus": ($vue.icon === "plus"),
                            }}>
                                <input
                                    class="hidden"
                                    name={$vue.name}
                                    type={$vue.accordion ? "radio" : "checkbox"}
                                    checked={access(parent).getState.getData("open")}
                                />

                                {
                                    access($vue).collapseTitle()
                                }
                                {
                                    access($vue).collapseContent()
                                }
                            </div>
                        );

                        return $vue.$slots.template?.({$vue, vnode}) ?? vnode;
                    };

                    const collapseTitle = () => {
                        const vnode = (
                            <div
                                class={{
                                    "collapse-title": true,
                                    [$vue.titleClass]: true,
                                }}
                                onClick={() => {
                                    access(parent).notifications.emit("open", !access(parent).getState.getData("open"), $vue);
                                }}
                            >{$vue.title}</div>
                        );

                        return $vue.$slots.collapseTitle?.({$vue, vnode}) ?? vnode;
                    };

                    const collapseContent = () => {
                        const vnode = (
                            <div class={{
                                "hidden": !access(parent).getState.getData("open"),
                                "collapse-content w-full p-0": true,
                                [$vue.contentClass]: true,
                            }}>{content.value}</div>
                        );

                        return $vue.$slots.collapseContent?.({$vue, vnode}) ?? vnode;
                    };

                    const vnodes = {template, collapseTitle, collapseContent};

                    const self = Object.assign(vnodes, {});

                    onMounted(() => {
                        access(parent).notifications.once("activated", (activated, component) => {
                            if (access(component).getState === access(parent).getState) {
                                access(component).getState.setData({activated});
                            }
                        });

                        access(parent).notifications.on("open", (open, component) => {
                            if (open) {
                                access(parent).notifications.emit("activated", true, $vue);
                            }

                            if (access(component).getState === access(parent).getState) {
                                access(parent).getState.setData({open});
                            }

                            EventEmitter.global().emit($vue.accordion, open, $vue);
                        });

                        if ($vue.opened) {
                            access(parent).notifications.emit("open", true, $vue);
                        }
                    });

                    return $vue.setup({parent, self});
                }}

                v-slots={$vue.$slots}
            />
        );
    },
};
</script>
