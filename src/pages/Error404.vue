<script lang="jsx">
import ReactiveView, {setup} from "@razaman2/reactive-view";
import {useRouter} from "vue-router";

export default {
    props: {
        ...setup,
    },

    setup() {
        const router = useRouter();

        return ($vue) => (
            <ReactiveView
                modelName="Error404"
                setup={(parent) => {
                    const template = () => {
                        return (
                            <div style="height: 100%; padding: 1em; background-color: white;">
                                <h1>Error404</h1>

                                <button
                                    onClick={() => router.back()}
                                >back</button>
                            </div>
                        );
                    };

                    const self = {template};

                    return $vue.setup({parent, self});
                }}

                v-slots={$vue.$slots}
            />
        );
    },
};
</script>
