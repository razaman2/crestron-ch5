<script lang="jsx">
import ReactiveView, {setup} from "@razaman2/reactive-view";
import {RouterLink} from "vue-router";

export default {
    props: {
        ...setup,
        to: {
            type: String,
            default: "#",
        },
    },

    setup() {
        return ($vue) => {
            return (
                <ReactiveView
                    modelName="AppLink"
                    setup={(parent) => {
                        // region TEMPLATE V-NODES
                        const template = () => {
                            return (
                                <RouterLink
                                    exactActiveClass="text-blue-500"
                                    class="hover:text-blue-700 transition duration-200"
                                    to={$vue.to}
                                >
                                    {
                                        $vue.$slots.default?.() ?? "No Content"
                                    }
                                </RouterLink>
                            );
                        };

                        const vnodes = {template};
                        // endregion

                        const self = Object.assign(vnodes, {});

                        return $vue.setup({parent, self});
                    }}

                    v-slots={$vue.$slots}
                />
            );
        };
    },
};
</script>
