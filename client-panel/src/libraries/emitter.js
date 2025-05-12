import emitter from 'tiny-emitter/instance'
const EventBus = {
    emitterObj: {
        $on: (...args) => emitter.on(...args),
        $once: (...args) => emitter.once(...args),
        $off: (...args) => emitter.off(...args),
        $emit: (...args) => emitter.emit(...args)
    },
    install(Vue, store, translate) {
        Vue.config.globalProperties.$eventBus = EventBus.emitterObj;
    }
}
export default EventBus;