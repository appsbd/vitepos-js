import { computed, onMounted, onUnmounted, ref } from "vue"

export default function () {
    let windowWidth = ref(window.innerWidth)

    const onWidthChange = () => windowWidth.value = window.innerWidth
    onMounted(() => window.addEventListener('resize', onWidthChange))
    onUnmounted(() => window.removeEventListener('resize', onWidthChange))
        /*
        X-Small             None 	<576px
        Small 	            sm 	    ≥576px
        Medium 	            md  	≥768px
        Large 	            lg 	    ≥992px
        Extra large 	    xl 	    ≥1200px
        Extra extra large 	xxl 	≥1400px
         */
    const ScreenType = computed(() => {
        if (windowWidth.value < 576) return 'xs'
        else if (windowWidth.value >= 576 && windowWidth.value < 786) return 'sm'
        else if (windowWidth.value >= 786 && windowWidth.value < 992) return 'md'
        else if (windowWidth.value >= 992 && windowWidth.value < 1200) return 'lg'
        else if (windowWidth.value >= 1200 && windowWidth.value < 1920) return 'xl'
        else if (windowWidth.value >= 1920) return 'xxl'

        return null; // This is an unreachable line, simply to keep eslint happy.
    })

    const ScreenWidth = computed(() => windowWidth.value)

    return { ScreenWidth, ScreenType }
}