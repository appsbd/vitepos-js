const fs = require('fs');
const Comments = require('parse-comments');
module.exports ={
    loadPluginData:()=>{
        const comments = new Comments();
        let rawdata = fs.readFileSync('./../../vitepos-lite.php',{encoding:'utf8', flag:'r'});
        const ast = comments.parse(rawdata);
        let description=ast[0].description.split("\n");
        let resposneDes={};
        for(let i in description) {
            let desItem=description[i].split(":");
            if(desItem.length==2) {
                resposneDes[desItem[0].replace(" ",'_').trim().toLowerCase()]=desItem[1].trim();
            }
        }
        return resposneDes;
    },
    GetBuildID:()=>{
        if(fs.existsSync('./build_info.json')) {
            let rawdata = fs.readFileSync('build_info.json');
            let buildInfo = JSON.parse(rawdata);
            try{
                return buildInfo.buildId;
            }catch (e) {
                return 0;
            }
        }else{
            return 0;
        }

    },
    GetBuildString(isProductionMode){
        const buildId = this.GetBuildID()+1;
        const now = new Date();
        const padTwo = (val) => (val > 9 ? "" : "0") + val;
        const nowMonth = now.getMonth() + 1;
        const nowDay = now.getDate();
        const verBuildDate = now.getFullYear() + padTwo(nowMonth) + padTwo(nowDay);
        const verBuildTime = padTwo(now.getHours()) + padTwo(now.getMinutes()) + padTwo(now.getSeconds());
        if(isProductionMode) {
            this.SetBuildID(buildId);
        }
        return `${buildId}.${verBuildDate}.${verBuildTime}`;
    },
    SetBuildID:(buildId)=>{
        try {
            fs.writeFileSync('./build_info.json', JSON.stringify({buildId: buildId}));
        }catch (e) {
            console.log(e.message);
        }
    }
}

