<script lang="jsx">
import ObjectManager from "@razaman2/object-manager";
import ReactiveView, {setup, access} from "@razaman2/reactive-view";
import CustomButton from "./CustomButton.vue";
import {ref, computed, onMounted} from "vue";

export default {
    props: {
        ...setup,
        title: {
            type: String,
            default: "Modal Title",
        },
        persistent: {
            type: Boolean,
            default: false,
        },
        fullWidth: {
            type: Boolean,
            default: false,
        },
        fullHeight: {
            type: Boolean,
            default: false,
        },
        actions: {
            type: Boolean,
            default: true,
        },
        header: {
            type: Boolean,
            default: true,
        },
        ok: {
            type: Boolean,
            default: true,
        },
        cancel: {
            type: Boolean,
            default: false,
        },
        show: {
            type: Boolean,
            default: true,
        },
        close: {
            type: Boolean,
            default: true,
        },
        whenOk: {
            type: Function,
            default: () => { },
        },
        whenCancel: {
            type: Function,
            default: () => { },
        },
        whenDismiss: {
            type: Function,
            default: () => { },
        },
    },

    setup() {
        return ($vue) => {
            return (
                <ReactiveView
                    modelName="CustomModal"
                    setup={(parent) => {
                        const modalRef = ref();
                        const isValid = computed(() => true);

                        const template = () => {
                            return (
                                <dialog ref={modalRef} class="modal">
                                    {
                                        access($vue).modalBox()
                                    }
                                    {
                                        access($vue).modalBackdrop()
                                    }
                                </dialog>
                            );
                        };

                        const modalBox = () => {
                            return (
                                <div class={{
                                    "h-full": $vue.fullHeight,
                                    "max-w-full": $vue.fullWidth,
                                    "modal-box p-0 rounded": true,
                                }}>
                                    {
                                        access($vue).modalHeader()
                                    }
                                    {
                                        access($vue).modalContent()
                                    }
                                    {
                                        access($vue).modalActions()
                                    }
                                </div>
                            );
                        };

                        const modalContent = () => {
                            return (
                                <div class={{
                                    "px-4": !$vue.$slots.default,
                                }}>
                                    {$vue.$slots.default?.($vue) ?? "No Content"}
                                </div>
                            );
                        };

                        const modalBackdrop = () => {
                            if (!$vue.persistent) {
                                return (
                                    <div class="modal-backdrop" onClick={() => access($vue).hide()}/>
                                );
                            }
                        };

                        const modalActions = () => {
                            return (
                                <div class={{
                                    "hidden": !$vue.actions,
                                    "modal-action flex-wrap m-0 px-4 pb-4": true,
                                }}>
                                    {
                                        access($vue).cancel()
                                    }
                                    {
                                        access($vue).ok()
                                    }
                                </div>
                            );
                        };

                        const modalHeader = () => {
                            return (
                                <div class={{
                                    "hidden": !$vue.header,
                                    "bg-blue-50 px-10 py-4 relative": true,
                                }}>
                                    {
                                        access($vue).modalTitle()
                                    }
                                    {
                                        access($vue).close()
                                    }
                                </div>
                            );
                        };

                        const modalTitle = () => {
                            return (
                                <h3 class="font-bold text-center truncate">
                                    {$vue.title}
                                </h3>
                            );
                        };

                        const close = () => {
                            return (
                                <i-mdi-highlight-off
                                    class={{
                                        "hidden": !$vue.close,
                                        "text-xl cursor-pointer hover:scale-90 hover:ring hover:ring-offset-1 hover:ring-offset-white/10 transition duration-500 absolute right-3 transform top-1/2 -translate-y-1/2 rounded-full": true,
                                    }}
                                    onClick={() => access($vue).hide()}
                                />
                            );
                        };

                        const ok = (hide = true) => {
                            return (
                                <CustomButton
                                    class={{
                                        "hidden": !$vue.ok,
                                        "btn-success text-white": true,
                                    }}
                                    onClick={async () => {
                                        const close = await $vue.whenOk(ObjectManager.on(access(parent).getState.getData()).clone(), $vue);

                                        if ((close !== false) && hide) {
                                            access($vue).hide();
                                        }
                                    }}
                                    disabled={!access($vue).isValid.value}
                                >ok</CustomButton>
                            );
                        };

                        const cancel = (hide = true) => {
                            return (
                                <CustomButton
                                    class={{
                                        "hidden": !$vue.cancel,
                                        "btn-error text-white": true,
                                    }}
                                    onClick={async () => {
                                        const close = await $vue.whenCancel($vue);

                                        if ((close !== false) && hide) {
                                            access($vue).hide();
                                        }
                                    }}
                                >cancel</CustomButton>
                            );
                        };

                        const vnodes = {template, modalBox, modalContent, modalBackdrop, modalActions, modalTitle, modalHeader, close, ok, cancel};

                        const show = () => {
                            modalRef.value.showModal();
                        };

                        const hide = () => {
                            modalRef.value.close();
                        };

                        const showing = () => {
                            return modalRef.value.open;
                        };

                        const self = Object.assign(vnodes, {isValid, show, hide, showing, modalRef});

                        onMounted(() => {
                            modalRef.value.addEventListener("close", async () => {
                                await $vue.whenDismiss($vue);
                            });

                            if ($vue.show) {
                                access($vue).show();
                            }
                        });

                        return $vue.setup({parent, self});
                    }}

                    v-slots={$vue.$slots}
                />
            );
        };
    },
};
</script>
