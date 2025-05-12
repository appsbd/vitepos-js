import axios from "axios";
import ObjectToFormData from "@/libraries/ObjectToFormData";
function get_header(isMultiPart){
    let config= {
        headers: {
            'Content-Type': isMultiPart?'': 'application/x-www-form-urlencoded'
        }
    }
    if(process.env.NODE_ENV==='development'){
        config.headers['appsbd_dev']='Y';
    }
    return config;
}
const AxiosHelper={
    ObjectToQueryString:function(obj, prefix){
        var str = [], k, v;
        for(var p in obj) {
            if (!obj.hasOwnProperty(p)) {continue;} // skip things from the prototype
            if (~p.indexOf('[')) {
                k = prefix ? prefix + "[" + p.substring(0, p.indexOf('[')) + "]" + p.substring(p.indexOf('[')) : p;
                // only put whatever is before the bracket into new brackets; append the rest
            } else {
                k = prefix ? prefix + "[" + p + "]" : p;
            }
            v = obj[p];
            str.push(typeof v == "object" ?
                AxiosHelper.ObjectToQueryString(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
        return str.join("&");
    },
    post:function(url,params,isMultiPart){
        let queryparams={}
        if(isMultiPart){
            queryparams= ObjectToFormData(params);
        }else{
            queryparams = AxiosHelper.ObjectToQueryString(params);

        }
        return axios.post(url,queryparams,get_header(isMultiPart));
    },
    get:function(url){
        return axios.get(url,get_header(false));
    },
    crc32:function(r){
        if(typeof r =='object'){
            r=JSON.stringify(r);
        }
        for(var a,o=[],c=0;c<256;c++){a=c;for(var f=0;f<8;f++)a=1&a?3988292384^a>>>1:a>>>1;o[c]=a}for(var n=-1,t=0;t<r.length;t++)n=n>>>8^o[255&(n^r.charCodeAt(t))];
        return(-1^n)>>>0;
    }

}


export default AxiosHelper;
