class APBDRequestParam{
    constructor() {
        this.data=null;
        this.limit="";
        this.page="";
        this.filter_prop="";
        this.sort_by=[];
        this.src_by=[];
        this.group_by=[];
        this.force=false;
    }
    AddSortItem(prop,ord){
        if(typeof ord =='undefined'){
            ord='asc';
        }
        const srcp=new APBDSortParam();
        srcp.prop=prop;
        srcp.ord=ord;
        this.sort_by.push(srcp);
    }
    AddSrcItem(prop,val,opr){
        if(typeof opr =='undefined'){
            opr='eq';
        }
        const srcp=new APBDSrcParam();
        srcp.prop=prop;
        srcp.val=val;
        srcp.opr=opr;
        this.src_by.push(srcp);
    }

}
class APBDSortParam{
    constructor() {
        this.prop="";
        this.ord="asc";
    }
};
class APBDSrcParam{
    constructor() {
        this.prop="";
        this.val="";
        this.opr="eq";
    };
};
export {APBDSortParam,APBDSrcParam};
export default APBDRequestParam;