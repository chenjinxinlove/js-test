const fs  = require('fs');

const BAIDU_IMG = /https\:\/\/imgsa.+jpg/g;
const BAIDU_CSS = /https\:\/\/imgsa.+css/g;
const BAIDU_JS =  /https\:\/\/imgsa.+js/g;

readHtml();

function readHtmlMergeUrl (path) {
    const str = fs.readFileSync(path, 'utf8');
    const imgArr = str.match(BAIDU_IMG);
    const cssArr = str.match(BAIDU_CSS);
    const jsArr = str.match(BAIDU_JS);
    return {imgarr, cssArr, jsArr};
}

