<script lang="jsx">
import ReactiveView, {setup} from "@razaman2/reactive-view";

export default {
    props: {
        ...setup,
        label: {
            validator: (label) => {
                return ["String", "Number"].includes(label.constructor.name);
            },
        },
        tag: {
            type: String,
            default: "button",
        },
    },

    setup() {
        return ($vue) => {
            return (
                <ReactiveView
                    modelName="CustomButton"
                    setup={(parent) => {
                        const template = () => {
                            return (
                                <$vue.tag class="btn uppercase transition duration-500 hover:opacity-60 disabled:opacity-60">
                                    {$vue.$slots.default?.($vue) ?? $vue.label}
                                </$vue.tag>
                            );
                        };

                        const self = {template};

                        return $vue.setup({parent, self});
                    }}

                    v-slots={$vue.$slots}
                />
            );
        };
    },
};
</script>
