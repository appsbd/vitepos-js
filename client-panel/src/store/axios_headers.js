const getRequestHeader=function(state,isMultiPart){
        let headers_content_type= 'application/x-www-form-urlencoded';
        if(isMultiPart){
            headers_content_type= 'multipart/form-data';
        }
        try {
            if (typeof (vitePos.tokenBased) !="undefined" && state && state.loggedUserData.token) {
                let requestHeader = {
                    'Content-Type': headers_content_type,
                    'Authorization': 'Bearer ' + state.loggedUserData.token,
                    'vite-outlet': ''
                };
                if (state.currentPlace.outlet ) {
                    requestHeader["vite-outlet"] = state.currentPlace.outlet + '|' + state.currentPlace?.counter;
                }
                return requestHeader;
            }
            else if (state && vitePos.wcnonce) {
                let requestHeader = {
                    'Content-Type': headers_content_type,
                    "X-WP-Nonce": vitePos.wcnonce,
                    'vite-outlet': ''
                };
                if (state && state.currentPlace.outlet) {
                    requestHeader["vite-outlet"] = state.currentPlace.outlet + '|' + state.currentPlace.counter;
                }
                return requestHeader
            }

        } catch (e) {}
        let requestHeader = {
            'Content-Type': headers_content_type,
            'vite-outlet': ''
        };
        if (state && state.currentPlace.outlet) {
            requestHeader["vite-outlet"] = state.currentPlace.outlet + '|' + state.currentPlace.counter;
        }
        return requestHeader;
    };


export default function (state,isMultiPart) {
    if(typeof (isMultiPart) =="undefined"){
        isMultiPart=false;
    }
    return {
        crossdomain: true,
        withCredentials: true,
        headers:getRequestHeader(state,isMultiPart)
    }
};