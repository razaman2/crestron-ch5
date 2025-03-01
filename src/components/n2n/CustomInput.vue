<script lang="jsx">
import {ref, computed} from "vue";
import ReactiveView, {access, setup, getProps} from "@razaman2/reactive-view";
import {v4 as uuid} from "uuid";

export default {
    props: {
        ...setup,
        type: {
            type: String,
            default: "text",
        },
        currency: {
            type: String,
            default: "USD",
        },
        style: {
            type: String,
            default: "currency",
        },
        debounce: {
            default: 0,
            validator: (debounce) => {
                return /^\d+$/.test(debounce);
            },
        },
        decimals: {
            default: 0,
            validator: (decimals) => {
                return /^\d+$/.test(decimals);
            },
        },
        label: {
            validator: (label) => {
                return ["String", "Number"].includes(label.constructor.name);
            },
        },
        locale: {
            type: String,
            default: "en-US",
        },
        unsigned: {
            type: Boolean,
            default: false,
        },
        money: {
            type: Boolean,
            default: false,
        },
        grouping: {
            type: Boolean,
            default: true,
        },
    },

    setup() {
        return ($vue) => {
            return (
                <ReactiveView
                    modelName="CustomInput"
                    setup={(parent) => {
                        const id = `input_${uuid()}`;
                        const type = $vue.money ? "tel" : ($vue.type === "toggle") ? "radio" : $vue.type;
                        const numeric = ($vue.money || (type === "number"));

                        const timeoutRef = ref();
                        const inputRef = ref();

                        const parsed = computed(() => {
                            const value = access(parent).getState.getData();

                            if (numeric) {
                                return Intl.NumberFormat($vue.locale, {
                                    ...(type
                                        && $vue.money
                                        && {
                                            style: $vue.style,
                                            currency: $vue.currency,
                                        }),
                                    minimumFractionDigits: $vue.decimals
                                        ? $vue.decimals
                                        : ($vue.money ? 2 : $vue.decimals),
                                    useGrouping: (type !== "number") && numeric && $vue.grouping,
                                }).format(isNaN(value) ? 0 : value);
                            } else {
                                return ["string", "number"].includes(typeof value) ? value : null;
                            }
                        });

                        const template = () => {
                            return $vue.label
                                ? access($vue).label()
                                : access($vue).field();
                        };

                        const radio = () => {
                            const checked = () => {
                                const name = $vue.$attrs.name;
                                const value = $vue.$attrs.value;
                                const isName = name !== undefined;
                                const isValue = value !== undefined;
                                const isBoth = isName && isValue;

                                if (isBoth) {
                                    const data1 = access(parent).getState.getData(name);
                                    const data2 = access(parent).getState.getData(`${name}.${value}`);

                                    return Array.isArray(data1)
                                        ? data1.includes(value)
                                        : ((data1 === value) || data2);
                                } else if (isName) {
                                    return access(parent).getState.getData(name);
                                } else if (isValue) {
                                    const data = access(parent).getState.getData();

                                    return Array.isArray(data)
                                        ? data.includes(value)
                                        : access(parent).getState.getData() === value;
                                } else {
                                    return access(parent).getState.getData();
                                }
                            };

                            return (
                                <input
                                    ref={inputRef}
                                    {...$vue.$attrs}
                                    id={id}
                                    type={type}
                                    class={{
                                        "toggle": ($vue.type === "toggle"),
                                        "radio": ($vue.type === "radio"),
                                    }}
                                    checked={checked()}
                                    onInput={(e) => {
                                        const {checked, value, name} = e.target;

                                        try {
                                            if (data.constructor.name === "Object") {
                                                access(parent).getState.setData(name, value);
                                            } else if (["String", "Number"].includes(data.constructor.name)) {
                                                access(parent).getState.replaceData(data);
                                                console.log("log data here:", data);
                                                // access(parent).getState.replaceData(checked ? data.concat(value) : data.filter((item) => (item !== value)));
                                            } else {
                                                access(parent).getState.replaceData(checked);
                                            }
                                        } catch {
                                            access(parent).getState.replaceData(checked);
                                        }
                                    }}
                                />
                            );
                        };

                        const checkbox = () => {
                            const checked = () => {
                                const name = $vue.$attrs.name;
                                const value = $vue.$attrs.value;
                                const isName = name !== undefined;
                                const isValue = value !== undefined;
                                const isBoth = isName && isValue;

                                if (isBoth) {
                                    const data1 = access(parent).getState.getData(name);
                                    const data2 = access(parent).getState.getData(`${name}.${value}`);

                                    return Array.isArray(data1)
                                        ? data1.includes(value)
                                        : ((data1 === value) || data2);
                                } else if (isName) {
                                    const data = access(parent).getState.getData(name);

                                    return (typeof data === "boolean") && data;
                                } else if (isValue) {
                                    const data = access(parent).getState.getData();

                                    return (Array.isArray(data)
                                            ? data.includes(value)
                                            : access(parent).getState.getData() === value)
                                        || (data.id ?? "" === value.id)
                                        || (data.id ?? "" === value);
                                } else {
                                    const data = access(parent).getState.getData();

                                    return (typeof data === "boolean") && data;
                                }
                            };

                            return (
                                <input
                                    ref={inputRef}
                                    {...$vue.$attrs}
                                    id={id}
                                    type={type}
                                    class="checkbox"
                                    checked={checked()}
                                    onInput={(e) => {
                                        const {checked, value} = e.target;

                                        try {
                                            if (access(parent).getState.getData().constructor.name === "Object") {
                                                if ($vue.$attrs.name) {
                                                    access(parent).getState.setData($vue.$attrs.name, checked);
                                                } else {
                                                    access(parent).getState.setData(checked);
                                                }
                                            } else if (data1.constructor.name === "Array") {
                                                const items = (checked ? data1.concat(value) : data1.filter((item) => (item !== value)));

                                                if ($vue.$attrs.name) {
                                                    access(parent).getState.setData($vue.$attrs.name, items);
                                                } else {
                                                    access(parent).getState.replaceData(items);
                                                }
                                            } else {
                                                access(parent).getState.replaceData(checked);
                                            }
                                        } catch {
                                            access(parent).getState.replaceData(checked);
                                        }
                                    }}
                                />
                            );
                        };

                        const textarea = () => {
                            const input = access($vue).input();

                            return (
                                <textarea
                                    {...getProps(input.props, ["oninput", "class", "value"])}
                                    value={access(parent).getState.getData({alternative: ""})}
                                    class={input.props.class.replace(/input/, " textarea ").replace(/input-bordered/, " textarea-bordered ")}
                                    onInput={(e) => {
                                        throttle(() => {
                                            access(parent).getState.setData(e.target.value);
                                        });
                                    }}
                                />
                            );
                        };

                        const file = () => {
                            const input = access($vue).input();

                            return (
                                <input.type
                                    {...getProps(input.props, ["oninput", "class", "value"])}
                                    class={input.props.class.replace(/input/, " file-input ").replace(/input-bordered/, " file-input-bordered ")}
                                    multiple={$vue.$attrs.multiple}
                                />
                            );
                        };

                        const input = () => {
                            return (
                                <input
                                    ref={inputRef}
                                    {...$vue.$attrs}
                                    id={id}
                                    type={type}
                                    placeholder={$vue.label ?? $vue.$attrs.placeholder}
                                    class="input input-bordered w-full"
                                    value={parsed.value}
                                    onInput={(e) => {
                                        const value = e.target.value.replace(/[$,]/g, "");

                                        try {
                                            throttle(() => {
                                                const digits = value.replace(/[.]/g, "").split("");

                                                digits.splice(parseFloat(`-${$vue.money ? 2 : $vue.decimals}`), 0, value.match(/[.]/) ? "." : "");

                                                const joined = digits.join("");
                                                const match = RegExp(/^(?=-*).*(\d*\.*\d+)*$/).exec(joined);
                                                const number = parseFloat(joined);

                                                if (isNaN(number) ? false : match) {
                                                    if ($vue.unsigned && (number < 0)) {
                                                        access(parent).getState.replaceData(Math.abs(number));
                                                        e.target.value = parsed.value;
                                                    } else {
                                                        access(parent).getState.replaceData(number);
                                                    }
                                                } else {
                                                    access(parent).getState.replaceData(numeric ? parseFloat(value) : value);
                                                }
                                            });
                                        } catch {
                                            access(parent).getState.replaceData(numeric ? parseFloat(value) : value);
                                        }
                                    }}
                                />
                            );
                        };

                        const label = () => {
                            return (
                                <label
                                    for={id}
                                    class="floating-label"
                                >
                                    <span>{$vue.label}</span>

                                    {
                                        access($vue).field()
                                    }
                                </label>
                            );
                        };

                        const field = () => {
                            return ["textarea", "file", "checkbox", "radio"].includes(type)
                                ? access($vue)[type]()
                                : access($vue).input();
                        };

                        const vnodes = {template, field, label, input, file, textarea, checkbox, radio};

                        const throttle = (callback) => {
                            clearTimeout(timeoutRef.value);
                            timeoutRef.value = setTimeout(callback, $vue.debounce);
                        };

                        const self = Object.assign(vnodes, {throttle, inputRef});

                        return $vue.setup({parent, self});
                    }}

                    v-slots={$vue.$slots}
                />
            );
        };
    },
};
</script>
