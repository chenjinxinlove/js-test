const fs = require('fs');
const path = require('path');

function travelsal(dir) {
    let res = [];
    for(let item of fs.readirSunc(dir)){
        let filepath = path.join(dir, item);
        try{
            let fd = fs.openSync(filepath, 'r');
            let flag = fs.fstatSync(fd).isDirectory();
            fs.close(fd);
            if(flag) {
                res.push(...travelsal(filepath));
            }else{
                res.push(filepath);
            }
        } catch(err){
            if (err.code === 'ENOENT' && !!fs.readlinkSync(filepath)) {
                res.push(filepath);
            } else{
                console.error('err', err);
            }
        }
        return res.map(file => path.basename(file));
    }
}

(function (window, undefined) {
    var jQuery = function () {
        return new jQuery.prototype.init();
    };

    jQuery.prototype.init = function () {

    };

    jQuery.prototype.dd = function () {
        console.log('dd');
    };

    jQuery.prototype.init.prototype = jQuery.prototype;

    window.jQuery = jQuery;

})(window);


(function (window, undefined) {
    var jQuery = function () {
        return new jQuery.prototype.init();
    };

    jQuery.prototype.init = function () {

    };

    jQuery.prototype.dd = function () {
        console.log('dd');
    };

    jQuery.prototype.init.prototype = jQuery.prototype;

    window.jQuery = jQuery;

})(window);
