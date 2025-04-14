const localFilter=function (data,params,src_all_props){
    let responseData={
        limit:params.limit,
        page:params.page,
        records:data.records,
        total: 0,
        rowdata:[...data.rowdata]
    }
    if(!src_all_props){
        src_all_props=[];
    }
    filterBySearchParam(responseData,params.src_by,src_all_props);
    sortBySortParam(responseData,params.sort_by);
    responseData.total= Math.ceil(responseData.records/params.limit);
    if(data.rowdata.length>params.limit) {
        let limitEnd = (params.limit * params.page);
        let limitStart = limitEnd - params.limit;
        responseData.rowdata = responseData.rowdata.splice(limitStart, limitEnd);
    }
    return responseData;
}
const checkItemFilter=function(item,prop,opr,val){
    if(item[prop]){
        if(opr=='like') {
            let regex = new RegExp(val, 'i');
            if (regex.test(item[prop])) {
                return true;
            }
        }else if(opr=='eq'){
            if(item[prop]==val){
                return true;
            }
        }else if(opr=='lt'){
            if(item[prop]>val){
                return true;
            }
        }else if(opr=='le'){
            if(item[prop]>=val){
                return true;
            }
        }else if(opr=='gt'){
            if(item[prop]<val){
                return true;
            }
        }else if(opr=='ge'){
            if(item[prop]<=val){
                return true;
            }
        }else if(opr=='bt'){
            if(val.start) {
                if (!val.end) {
                    val.end = val.start
                }
                if (item[prop] >= val.start && item[prop] <= val.end) {
                    return true;
                }
            }else{
                return true;
            }
        }else if(opr=='dr'){
            if(val.start) {
                let startDate = new Date(val.start);
                let endDate = null;
                if (val.end) {
                    endDate = new Date(val.end);
                }
                let calDate=new Date(item[prop]);
                if (calDate >= startDate && calDate <= endDate) {
                    return true;
                }
            }else{
                return true;
            }
        }

    }
    return false;
}
const filterBySearchParam = function(data,src_by,src_all_props){
    if(!src_by || src_by.length<=0){
        return;
    }
    data.rowdata= data.rowdata.filter((item) =>{
        for(let i in src_by) {
            let src_obj=src_by[i];
            if(src_obj.prop =='*'){
                if(src_all_props && src_all_props.length>0){
                    for(let ap in src_all_props){
                        if (checkItemFilter(item, src_all_props[ap], src_obj.opr, src_obj.val)) {
                            return true;
                        }
                    }
                }
            }else {
                if (checkItemFilter(item, src_obj.prop, src_obj.opr, src_obj.val)) {
                    return true;
                }
            }
        }
        return false;
    });
    data.records=data.rowdata.length;
}

const sortBySortParam = function(data,sort_by) {
    if (!sort_by || sort_by.length <= 0 || !sort_by[0]) {
        return;
    }
    let sort_obj = sort_by[0];
    data.rowdata = data.rowdata.sort((a, b) => {
        if (a[sort_obj.prop] && b[sort_obj.prop]) {
            if (a[sort_obj.prop].toLowerCase() < b[sort_obj.prop].toLowerCase()) {
                return sort_obj.ord=='desc'?1:-1;
            }
            if (a[sort_obj.prop].toLowerCase() > b[sort_obj.prop].toLowerCase()) {
                return sort_obj.ord=='desc'?-1:1;
            }
        }
        return 0;
    });

}
export default localFilter;