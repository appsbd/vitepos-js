import useBreakpoint from "@/libraries/Responsive";
const AppsbdUtls = {
    install(Vue, store, translate) {
        const AppsbdUtls =
            {
                makeFullscreen(event){
                    var element = document.body;

                    if (event instanceof HTMLElement) {
                        element = event;
                    }
                    var isFullscreen = document.fullscreenElement !== null ||  document.webkitIsFullScreen ||document.mozFullScreen || false;
                    element.requestFullScreen = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || function() {
                        return false;
                    };
                    document.cancelFullScreen = (document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || function() {
                        return false;
                    });
                    try {
                        isFullscreen ? document.cancelFullScreen() : element.requestFullScreen();
                    }catch (e) {

                    }
                },
                WPFOOTER:function(){
                    return atob('R2VuZXJhdGVkIGJ5IDogVml0ZVBvcywgdmlzaXQ6IHZpdGVwb3MuY29t');
                },
                WPCR:function(){
                    return atob('PGEgaHJlZj0iaHR0cHM6Ly92aXRlcG9zLmNvbSIgdGFyZ2V0PSJfYmxhbmsiPlZpdGVwb3M8L2E+LCBDb3B5cmlnaHQgqQ==')+(new Date().getFullYear())+atob('IDxhIGhyZWY9Imh0dHBzOi8vYXBwc2JkLmNvbSIgdGFyZ2V0PSJfYmxhbmsiPkFwcHNiZDwvYT4uIEFsbCByaWdodHMgcmVzZXJ2ZWQu');
                },

            };
        Vue.config.globalProperties.$appsbdUtls = AppsbdUtls;
        Vue.config.globalProperties.vitePos = window.vitePos;
        //Vue.config.globalProperties.apbdWpsBase = window.apbdWpsBase;
    },
}
export default AppsbdUtls;
