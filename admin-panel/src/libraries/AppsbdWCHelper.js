
const AppsbdWCHelper = {
    install(Vue) {
        const wcCalculation={
            wc_amount: function ($amount) {
                return $amount.toFixed(vitePos.decimal_places)
            },
            wc_price: function ($amount) {
                $amount = parseFloat($amount);
                return vitePos.currency_symbol + ' ' + wcCalculation.wc_amount($amount);
            },
        }
        Vue.config.globalProperties.$appsbdWCHelper = wcCalculation;
    },
}
export default AppsbdWCHelper;