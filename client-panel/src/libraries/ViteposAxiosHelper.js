import axios from "axios";
const VTAxios={
    getUrl(url){
        try {
            if(url.includes('?')){
                return url.concat("&t="+Date.now());
            }else{
                return  url.concat("?t="+Date.now());
            }
        }catch (e) {
            console.log(e.message);
        }
        return 'no-route-found';
    },
    get:function(url,header){
        url=VTAxios.getUrl(url);
        return axios.get(url,header);
    },
    post:function(url,params,header){
        if(typeof params =='undefined'){
            params={}
        }
        if(typeof header =='undefined'){
            header={}
        }

        url=VTAxios.getUrl(url);
        return axios.post(url,params,header);
    }

}
export default VTAxios;
