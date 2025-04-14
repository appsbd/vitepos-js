/*const ACL = {
    install(Vue, store) {
        var isAgent=()=>{
            try {
                return store.state.isLoggedIn && store.getters.getLoggedUserData.isAgent;
            }catch (e){
                return false
            }
        }
        Vue.config.globalProperties.$CheckACL = (action_param) => {
            if(isAgent()){
                try {
                    return store.state.isLoggedIn && store.getters.getLoggedUserData.caps[action_param];
                }catch (e){
                    return false
                }
            }
            return false;
        }
        Vue.config.globalProperties.$isAgent=isAgent;
    },
}
export default ACL;*/


const ACL = {
    install(Vue, store) {
        Vue.config.globalProperties.$CheckACL = (action_param) => {
            return store.state.isLoggedIn && store.getters.getLoggedUserData.caps[action_param];
        }
    },
}
export default ACL;