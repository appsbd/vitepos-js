import {email,numeric, required} from "@vee-validate/rules";
import { defineRule } from 'vee-validate';
const VeeRules = {
    install(app,store,translate) {
        const translateGettext = (msg,params) =>{
                if(typeof params =='undefined'){
                    params= {};
                }
                Object.keys(params).forEach(pr => {
                    params[pr]=translate.$gettext(params[pr]);
                })

            return translate.interpolate(translate.$gettext(msg),params);
        };
        const translateGetMsg = (msg,params) =>{
            if(typeof params =='undefined'){
                params= {};
            }
            return translate.interpolate(translate.$gettext(msg),params);
        };
        const getFieldLabel = (field) =>{
           return field.field.replace('_',' ');
        };
        const getTransfunc=(params)=>{
            if (params.length > 0) {
               for(let i in params){
                   if('nt'==params[i]){
                       return translateGetMsg;
                   }
               }
            }
            return translateGettext;
        }
        const allRules={
            required:(value,params,field) => {
                try {
                   return required(value, params) ? true : getTransfunc(params)("%{fld_name} is required", {fld_name: getFieldLabel(field)});
                }catch (e) {}
                return required(value,params)?true:translateGettext("%{fld_name} is required",{fld_name:getFieldLabel(field)});
            },
            numeric:(value,params,field) => {
                return numeric(value,params)?true:translateGettext("%{fld_name} should be numeric",{fld_name:getFieldLabel(field)});
            },
            email:(value,params ,field) => {
                return email(value,params)?true:translateGettext("%{fld_name} not a valid email address",{fld_name:getFieldLabel(field)});
            },
        }
        Object.keys(allRules).forEach(rule => {
            defineRule(rule, allRules[rule]);
        });
        app.config.globalProperties.$translate=translate;
        app.config.globalProperties.$translateGettext=translateGettext;
        app.config.globalProperties.$translateGetMsg=translateGetMsg;
    },
}
export default VeeRules;
