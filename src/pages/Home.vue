<script lang="jsx">
import ReactiveView, {setup, access} from "@razaman2/reactive-view";
import {useRouter} from "vue-router";
import CrComLib from "@helpers/useCrComLib.ts";
// import XPanel from "@crestron/ch5-webxpanel";

// const rmc4 = XPanel(true).WebXPanel;
// rmc4.authenticate();
// rmc4.initialize({host: "192.168.1.70", ipId: "0x04"});

// console.log("WegXPanel:", {getVersion: rmc4.getVersion(), getBuildDate: rmc4.getBuildDate()});

// const Ch5Emulator = CrComLib.Ch5Emulator.getInstance();

// Ch5Emulator.loadScenario({
//     cues: [],
//     onStart: [],
// });
//
// Ch5Emulator.run();

export default {
    props: {
        ...setup,
    },

    setup() {
        const router = useRouter();

        return ($vue) => (
            <ReactiveView
                modelName="Home"
                setup={(parent) => {
                    // CrComLib.subscribeState("s", 102, (value) => {
                    //     console.log("Signal 102 state:", value);
                    // });

                    const template = () => {
                        return (
                            <div class="bg-blue-500 h-full px-4">
                                <h1 class="text-white">Home Page</h1>

                                <ch5-text
                                    horizontalAlignment="left"
                                    label="Garage Door"
                                />

                                <div style="display: flex; gap: 1em; margin: 1em 0;">
                                    <ch5-button
                                        label="OPEN"
                                        size="x-large"
                                        type="success"
                                        sendEventOnClick="1"
                                        receiveStateEnable="2"
                                    />

                                    <ch5-button
                                        label="CLOSE"
                                        size="x-large"
                                        type="danger"
                                        sendEventOnClick="2"
                                        receiveStateEnable="1"
                                    />
                                </div>

                                <label class="floating-label">
                                    <span>First Name</span>

                                    <input type="text" placeholder="First Name" class="input"/>
                                </label>

                                <ch5-list
                                    size="3"
                                    orientation="vertical"
                                    indexId="idx"
                                    scrollbar="true"
                                >
                                    <template>
                                        <div class="horizontal-list-item">
                                            <span>item_idx</span>
                                        </div>
                                    </template>
                                </ch5-list>

                                <ch5-segmented-gauge
                                    value="50000">
                                </ch5-segmented-gauge>

                                <ch5-keypad
                                    showExtraButton="false"
                                    type="default"
                                    shape="rounded-rectangle"
                                />

                                <button
                                    onClick={async () => {
                                        // CrComLib.publishEvent("s", "102", "hello world");
                                        // router.push("/user/1");
                                    }}
                                    class="btn btn-xl btn-success text-white uppercase"
                                >click me</button>
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
