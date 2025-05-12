const fs = require('fs');
const Comments = require('parse-comments');
module.exports ={
    GetBuildString(isProductionMode){
        const now = new Date();
        const padTwo = (val) => (val > 9 ? "" : "0") + val;
        const nowMonth = now.getMonth() + 1;
        const nowDay = now.getDate();
        const verBuildDate = now.getFullYear() + padTwo(nowMonth) + padTwo(nowDay);
        const verBuildTime = padTwo(now.getHours()) + padTwo(now.getMinutes()) + padTwo(now.getSeconds());
        return `${verBuildDate}.${verBuildTime}`;
    }

}

