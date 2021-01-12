import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        app: {
            name: "CheatSheet",
            desc: "Trading Journal",
            vers: "0.0.1",
            auth: "rhalfcaacbay@gmail.com"
        },
        links: [
            { icon: "dashboard", text: "Dashboard", route: "/Dashboard", admin: false, },
            { icon: "notes", text: "Funds", route: "/Funds", admin: false },
            { icon: "timeline", text: "Trades", route: "/Trades", admin: false },
            { icon: "mdi-database", text: "Datas", route: "/Datas", admin: false },
            { icon: "mdi-information", text: "About", route: "/About", admin: false },
            { icon: "person", text: "Users", route: "/users", admin: true },
        ],
        user: null,
        notify: {
            message: "Welcome to cheatsheet",
            status: 'success',
            visible: true
        },
    },
    mutations: {
        notifyOpen: (state, payload) => {
            state.notify.message = payload.message
            state.notify.status = payload.status
            state.notify.visible = payload.visible
        },
        notifyClose: (state) => {
            state.notify.visible = false
        },
        setUser: (state, payload) => {
            state.user = payload
        }
    },
    actions: {
        notifyOpen: (contex, payload) => {
            contex.commit('notifyOpen', payload);
        },
        notifyClose: (contex) => {
            contex.commit('notifyClose');
        },
        setUser: (contex, payload) => {
            contex.commit('setUser', payload);
        }
    },
    getters: {
        notify: state => {
            return state.notify
        },
        user: state => {
            return state.user
        },
        app: state => {
            return state.app
        },
        links: state => {
            return state.links
        }
    }
});
