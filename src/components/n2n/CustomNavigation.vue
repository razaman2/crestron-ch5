<script lang="jsx">
import ReactiveView, {setup, access} from "@razaman2/reactive-view";
import CustomCollapse from "./CustomCollapse.vue";
import AppLink from "./AppLink.vue";

export default {
    props: {
        ...setup,
    },

    setup() {
        return ($vue) => (
            <ReactiveView
                modelName="CustomNavigation"
                setup={(parent) => {
                    const template = () => {
                        return (
                            <ul class="menu w-80 min-h-full bg-base-200/90 text-base-content">
                                {
                                    access($vue).navigationTop()
                                }

                                <li>
                                    <AppLink to="/">Home</AppLink>
                                </li>

                                <li>
                                    <AppLink to={`/user/1`}>User</AppLink>
                                </li>

                                <li>
                                    <AppLink to="/list">List</AppLink>
                                </li>

                                <li>
                                    <CustomCollapse
                                        title="Admin"
                                        class="hover:bg-transparent"
                                        titleClass="px-0"
                                        // opened={useNavigationStore().get("admin")}
                                        onUpdate:modelState={({after}) => {
                                            // useNavigationStore().set({admin: after.open});
                                        }}
                                    >
                                        <li>
                                            <AppLink to="/admin/users">Users</AppLink>
                                        </li>

                                        <li>
                                            <AppLink to="/admin/calendar">Calendar</AppLink>
                                        </li>
                                    </CustomCollapse>
                                </li>

                                <li>
                                    <CustomCollapse
                                        title="Super"
                                        class="hover:bg-transparent"
                                        titleClass="px-0"
                                        // opened={useNavigationStore().get("super")}
                                        onUpdate:modelState={({after}) => {
                                            // useNavigationStore().set({super: after.open});
                                        }}
                                    >
                                        <li>
                                            <AppLink to="/super/development">Development</AppLink>
                                        </li>

                                        <li>
                                            <AppLink to="/super/roles">Roles</AppLink>
                                        </li>
                                    </CustomCollapse>
                                </li>

                                {
                                    access($vue).navigationBottom()
                                }
                            </ul>
                        );
                    };

                    const navigationTop = () => false;

                    const navigationBottom = () => false;

                    const vnodes = {template, navigationTop, navigationBottom};

                    const self = Object.assign(vnodes, {});

                    return $vue.setup({parent, self});
                }}

                v-slots={$vue.$slots}
            />
        );
    },
};
</script>
