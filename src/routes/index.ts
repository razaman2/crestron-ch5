// @ts-nocheck

import {createRouter, createWebHashHistory} from "vue-router";

const Route = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: () => import("../layouts/Base.vue"),
            children: [
                {
                    path: "",
                    component: () => import("../pages/Home.vue"),
                },
            ],
        },

        {
            path: "/:pathMatch(.*)*",
            component: () => import("../pages/Error404.vue"),
        },
    ],
});

// Route.beforeEach((to, from, next) => {
//     const cache = () => {
//         if (!["/login"].includes(to.path) && (to.fullPath !== navigation.value.to.fullPath)) {
//             navigation.value.to = to;
//
//             console.info(`%cto: ${to.fullPath} from: ${from.fullPath} cached: ${navigation.value.to.fullPath}`, "color: purple;");
//         }
//
//         return next();
//     };
//
//     if (to.meta.requiresAuth) {
//         console.log("log requires auth:", to.meta, authenticated());
//         if (authenticated()) {
//             if (authorized(to)) {
//                 return cache();
//             } else {
//                 showModal(h(CustomModal, "Not Authorized."));
//
//                 if ((to.fullPath && navigation.value.to.fullPath) && (to.fullPath !== navigation.value.to.fullPath)) {
//                     return next({path: navigation.value.to.fullPath});
//                 }
//             }
//         } else {
//             return cache();
//         }
//     } else {
//         return cache();
//     }
// });

export default Route;
