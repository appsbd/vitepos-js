import {confirmed, email, min, required,url,numeric} from "@vee-validate/rules";
import { defineRule } from 'vee-validate';
const VeeRules = {
    install(app,translate) {
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
        const allRules={
            required:(value,params,field) => {
                return required(value,params)?true:translateGettext("%{fld_name} is required",{fld_name:getFieldLabel(field)});
            },
            numeric:(value,params,field) => {
                return numeric(value,params)?true:translateGettext("%{fld_name} should be numeric",{fld_name:getFieldLabel(field)});
            },
            email:(value,params ,field) => {
                return email(value,params)?true:translateGettext("%{fld_name} not a valid email address",{fld_name:getFieldLabel(field)});
            },
            min:(value,params,field) => {
                return min(value,params);
            },
            confirmed:(value,params,field) => {
                return confirmed(value,params)?true:translateGettext("%{fld_name} does not match with its password",{fld_name:getFieldLabel(field)});
            },
            url:(value,params,field) => {
                return url(value,params)?true:translateGettext("%{fld_name} is invalid",{fld_name:getFieldLabel(field)});
            },
            isUnique:async (value,params,field) => {
                if (field == 'email' && !email(value, params, field)) {
                    return true;
                } else if (value.length < 3) {
                    return true;
                }
                return true;
                //let result = await store.dispatch('CheckUnique', {fld_name: field.field, fld_value: value});
               // return result ? true : translateGettext("%{fld_name} is already registered", {fld_name: getFieldLabel(field)});
            },
            isValid:async (value,params,field) => {
                if(params[0]=='custom') {
                    let minLength=3;
                    if(params[1] != undefined) {
                        if (params[2] != undefined) {
                            minLength = params[2];
                        }
                        if (value.length >= minLength) {

                            let result = await store.dispatch('IsValidCF', {fld_name: params[1], fld_value: value});
                            return result.status ? true : translate.interpolate(result.msg, {fld_name: getFieldLabel(field)});
                        } else {
                            return translateGettext("%{fld_name} length is not valid, please check it", {fld_name: getFieldLabel(field)});
                        }
                    }
                   return true;
                }else{
                    return true;
                }
            }
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