/**
 * Created by Admin on 2016/7/25.
 */

var Upload = function () {
 this._init(options);
};

// options = {
//     "id":"id",
//     "url":"asdas",
//     "type":'*.gif; *.jpg; *.png',
//     'fileSizeLimit' : '1024',
//     'auto':true,
//     'fileUpload':"fileUpload",
//     'onUploadComplete' : function(file) {
//         alert('The file ' + file.name + ' finished processing.');
//     },
//     'onUploadError' : function(file, errorCode, errorMsg, errorString) {
//         alert('The file ' + file.name + ' could not be uploaded: ' + errorString);
//     }
// }

Upload.prototype._init = function(options){
    var _options = {};
    _options.id = options['id'];
    _options.url = options['url'];
    _options.type = options['type'] || '*.gif; *.jpg; *.png';
    _options.fileSizeLimit = options['fileSizeLimit'] || '2048';
    _options.auto = options['auto'] || false;
    this._fileUpload(_options,onUploadComplete(),onUploadError())
}

Upload.prototype._isIE = function () {
    return document.all ? true:false;
}

Upload.prototype._getFileSize = function (_f) {
    var _fileSize = 0;
    if(this._isIE()&&!_f.files) {
        var filePath = _f.value;
        var fileSystem = new ActiveXObject("Scripting.FileSystemObject");
        if(!fileSystem.FileExists(filePath)){
            return 0;
        }
        var file = fileSystem.GetFile(filePath);
        _fileSize = file.Size;
    }else{
        _fileSize = (_f.files[0] && _f.files[0].size) || 0;
    }
    return _fileSize;
}



Upload.prototype._fileType = function (_eForm,types) {
    var _elements = _eForm.elements,
        _elementsLen = _elements.length,
        _ei = null,
        _v = "",
        _contentType = "",
        i = 0;
    for(;i<_elementsLen;i++){
        _ei = _elements[i];
        if(_ei.type == "file"){
            _v = _ei.value,
                _types = types.split(";");
            for (var j = 0 ,len = _types.length;j<len;i++){
                if (_v.test(/^"+ _types[j]+"$/g)){
                    return false;
                }
            }
        }
    }
    return true;
}

Upload.prototype._fileUpload = function (_options,onUploadComplete,onUploadError) {
    var _filedemo = document.getElementById(_options['id']),
        _fileSize =  this._getFileSize(_filedemo),
        _fileUpload = document.getElementById(_options['fileUpload']);
    if (!(_fileSize && _fileSize >_options['fileSizeLimit'])){

    };
    if(!this_fileType(_fileUpload,_options["type"])) {

    }
    if(_options["auto"]){
        __upload()
    }else{
        _fileUploadSub = document.getElementById("fileUploadSub");
        _fileUploadSub.onclick = function () {
            __upload()
        }
    }
    function __upload() {
            var formData = new FormData(document.getElementById("fileUpload"));
            var ajax = new Ajax({"type":"post","url":_options['url'],"data":formData},function () {
            })

    }

}
module.exports = Upload;
