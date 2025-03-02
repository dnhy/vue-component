export const constantRoute = [
  {
    path: "/home",
    component: () => import("../views/home.vue"),
    name: "home",
  },
  {
    path: "/form",
    component: () => import("../views/form.vue"),
    name: "form",
  },
  {
    path: "/vantForm",
    component: () => import("../views/vantForm.vue"),
    name: "form",
  },
  {
    path: "/Foo",
    component: () => import("../views/Foo.vue"),
    name: "Foo",
  },
  {
    path: "/testLayout",
    component: () => import("../views/TestLayout.vue"),
    name: "testLayout",
  },
];
