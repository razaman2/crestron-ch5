import {createApp} from "vue";

export const showModal = function(component: any) {
    const dialogs = document.getElementById("app-modal");

    if (dialogs) {
        const dialog = document.createElement("div");
        const id = `dialog_${dialogs.children.length + 1}`;

        dialog.setAttribute("id", id);
        dialogs.appendChild(dialog);

        return createApp({
            setup() {
                return () => component;
            },
        }).mount(`#${id}`);
    } else {
        throw new Error(`Missing "div" in your html with id="app-modal"\n\t\t   eg. <div id="app-modal"></div>`);
    }
};
