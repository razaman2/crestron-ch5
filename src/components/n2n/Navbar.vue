<script lang="jsx">
import ReactiveView, {setup, access} from "@razaman2/reactive-view";

export default {
    props: {
        ...setup,
    },

    setup() {
        return ($vue) => (
            <ReactiveView
                modelName="Navbar"
                setup={(parent) => {
                    const template = () => {
                        return (
                            <div class="navbar bg-base-100 shadow-sm">
                                <div class="navbar-start">
                                    {
                                        access($vue).title()
                                    }
                                </div>

                                <div class="navbar-end">
                                    {
                                        access($vue).menu()
                                    }
                                </div>
                            </div>
                        );
                    };

                    const title = () => {
                        return "App Title";
                    };

                    const menu = () => {
                        return (
                            <button class="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block h-5 w-5 stroke-current">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                </svg>
                            </button>
                        );
                    };

                    const self = {template, title, menu};

                    return $vue.setup({parent, self});
                }}

                v-slots={$vue.$slots}
            />
        );
    },
};
</script>
