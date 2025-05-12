
const reCaptcha = {
    gc_site_key:"",
    install(Vue, store, translate) {
        Vue.config.globalProperties.$reCaptcha = reCaptcha;
    },
    hide_badge: function (status) {
        const body = document.body;
        if (status) {
            body.classList.add("apbd-hide-re-badge");
        } else {
            body.classList.remove("apbd-hide-re-badge");
        }
    },
    loadCaptcha: function (site_key, hideBadge) {
        reCaptcha.gc_site_key = site_key;
        if (!document.getElementById('apbd-s-gc-' +  reCaptcha.gc_site_key)) {
            let recaptchaScript = document.createElement('script')
            recaptchaScript.setAttribute('id', 'apbd-s-gc-' + reCaptcha.gc_site_key);
            recaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js?render=' +  reCaptcha.gc_site_key);
            document.head.appendChild(recaptchaScript);
        }
        try {
            if (hideBadge) {
                document.body.classList.add("apbd-hide-re-badge");
            }
        } catch (e) {
        }

    },
    getToken() {
        return new Promise((resolve, reject) => {
            try {
                window.grecaptcha.execute( reCaptcha.gc_site_key, {action: 'submit'}).then(function (token) {
                    resolve(token);
                });
            } catch (e) {
                reject(e);
            }
        });
    }
}

export default reCaptcha;
