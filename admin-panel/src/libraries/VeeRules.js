import {required, email, min,confirmed} from '@vee-validate/rules';
import { useGettext } from "@jshmrtn/vue3-gettext";

const allRules={
    required:(value,params,field) => {
        return required(value,params);
    },
    email:(value,params ,field) => {
        return email(value,params);
    },
    min:(value,params,field) => {
       return min(value,params);
    },
    confirmed:(value,params,field) => {
        const { $gettext } = useGettext();
        return confirmed(value,params)?true:field.field+''+$gettext("does not match with its password");
    }
}
export default allRules;
