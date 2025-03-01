<script lang="jsx">
import ReactiveView, {setup, access} from "@razaman2/reactive-view";
import CustomInput from "./CustomInput.vue";
import CustomButton from "./CustomButton.vue";
import CustomNavigation from "./CustomNavigation.vue";
import {getAuth} from "firebase/auth";
import {version} from "../../package.json";

export default {
    props: {
        ...setup,
        side: {
            type: String,
            default: "right",
            validator: (side) => {
                return ["left", "right"].includes(side);
            },
        },
        opened: Boolean,
    },

    setup() {
        return ($vue) => (
            <ReactiveView
                modelName="CustomDrawer"
                defaultData={$vue.opened}
                setup={(parent) => {
                    const template = () => {
                        const vnode = (
                            <div class={{
                                "drawer": true,
                                "drawer-end": ($vue.side === "right"),
                            }}>
                                <CustomInput
                                    id="drawer-toggle"
                                    type="checkbox"
                                    class="hidden drawer-toggle"
                                    state={access(parent).getState.getData()}
                                />

                                <div class="h-full drawer-content flex flex-col">
                                    {
                                        $vue.$slots.default?.() ?? "No Content"
                                    }
                                </div>

                                <div class="drawer-side">
                                    <label for="drawer-toggle" aria-label="close sidebar" class="drawer-overlay"/>

                                    {
                                        access($vue).navigation()
                                    }
                                </div>
                            </div>
                        );

                        return $vue.$slots.template?.({$vue, vnode}) ?? vnode;
                    };

                    const navigation = () => {
                        return (
                            <CustomNavigation
                                setup={(parent) => {
                                    const navigationTop = () => {
                                        return (
                                            access($vue).logoutButton()
                                        );
                                    };

                                    const navigationBottom = () => {
                                        return (
                                            <p class="p-4 font-mono font-semibold mt-auto mb-0">Version {version}</p>
                                        );
                                    };

                                    const vnodes = {navigationTop, navigationBottom};

                                    const self = Object.assign(vnodes, {});

                                    return {parent, self};
                                }}
                            />
                        );
                    };

                    const logoutButton = () => {
                        return (
                            <CustomButton
                                class="btn-lg bg-red-500 text-white mb-3"
                                onClick={() => getAuth().signOut()}
                            >logout</CustomButton>
                        );
                    };

                    const self = {template, navigation, logoutButton};

                    return $vue.setup({parent, self});
                }}

                v-slots={$vue.$slots}
            />
        );
    },
};
</script>

