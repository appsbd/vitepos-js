//import { useNotificationStore } from '@dafcoe/vue-notification'
//const { setNotification } = useNotificationStore()
import Darkmode from 'darkmode-js';
import Swal from "sweetalert2";
import WPMediaImageCropped from "@/libraries/WPMediaHelper";
import { useToast,POSITION as ToastPosition } from "vue-toastification";
const AppsbdUtls = {
    install(Vue, translate) {
        const options = {
            bottom: '64px', // default: '32px'
            right: 'unset', // default: '32px'
            left: '32px', // default: 'unset'
            time: '0.5s', // default: '0.3s'
            mixColor: '#fff', // default: '#fff'
            backgroundColor: '#fff',  // default: '#fff'
            buttonColorDark: '#100f2c',  // default: '#100f2c'
            buttonColorLight: '#fff', // default: '#fff'
            saveInCookies: false, // default: true,
            label: '🌓', // default: ''
            autoMatchOsTheme: true // default: true
        }
        const newToast = useToast();
        const $swal = Vue.config.globalProperties.$swal;
        const appDarkmode = new Darkmode(options);
        const Toast = $swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', $swal.stopTimer)
                toast.addEventListener('mouseleave', $swal.resumeTimer)
            }
        });
        const translateGettext = (msg, params) => {
            if (typeof params == 'undefined') {
                params = {};
            }
            Object.keys(params).forEach(pr => {
                params[pr] = translate.$gettext(params[pr]);
            })

            return translate.interpolate(translate.$gettext(msg), params);
        };
        const imgCropController = function (attachment, controller) {

            var control = controller.get('control');

            var flexWidth = !!parseInt(control.params.flex_width, 10);
            var flexHeight = !!parseInt(control.params.flex_height, 10);

            var realWidth = attachment.get('width');
            var realHeight = attachment.get('height');

            var xInit = parseInt(control.params.width, 10);
            var yInit = parseInt(control.params.height, 10);

            var ratio = xInit / yInit;

            controller.set('canSkipCrop', !control.mustBeCropped(flexWidth, flexHeight, xInit, yInit, realWidth, realHeight));

            var xImg = xInit;
            var yImg = yInit;

            if (realWidth / realHeight > ratio) {
                yInit = realHeight;
                xInit = yInit * ratio;
            } else {
                xInit = realWidth;
                yInit = xInit / ratio;
            }

            var x1 = (realWidth - xInit) / 2;
            var y1 = (realHeight - yInit) / 2;

            var imgSelectOptions = {
                handles: true,
                keys: true,
                instance: true,
                persistent: true,
                imageWidth: realWidth,
                imageHeight: realHeight,
                minWidth: xImg > xInit ? xInit : xImg,
                minHeight: yImg > yInit ? yInit : yImg,
                x1: x1,
                y1: y1,
                x2: xInit + x1,
                y2: yInit + y1
            };

            return imgSelectOptions;
        }
        const AppsbdUtls =
            {
                getAppLogo(){
                  try{
                      return vitePos.app_logo;
                  }catch (e) {
                      return "logo.svg";
                  }
                },
                getAssetUrl(url){
                    if(vitePos.assets_path){
                        return vitePos.assets_path+url
                    }
                    return url;
                },
                getPOSAssetUrl(url){
                    if(vitePos.assets_pos){
                        return vitePos.assets_pos+url
                    }
                    return url;
                },
                getFileInfo: (file) => {
                    let ext = file.name.split('.').pop();
                    ext = ext.toLowerCase();
                    let fileInfo = AppsbdUtls.getFileIconByExt(ext, file.type);
                    file.isImage = fileInfo.isImage;
                    file.fileIcon = fileInfo.fileIcon;
                    if ((file.size / 1048576) > 2.0) {
                        /* setNotification({
                             "message": translateGettext("File size is larger then %{allowed_size}", {allowed_size: '2MB'}),
                             "type": "alert",
                         });*/
                        return null;
                    }
                    return file;
                },
                getFileIconByExt: (ext, type) => {
                    ext = ext.toLowerCase();
                    let file = {isImage: false, fileIcon: 'apw apw-file-o'}
                    if (type.substr(0, 3) == "ima") {
                        file.isImage = true;
                    } else if (ext == "pdf") {
                        file.fileIcon = 'apw apw-file-pdf';
                    } else if (ext == "zip") {
                        file.fileIcon = 'apw apw-file-zip-o';
                    } else if (ext == "doc" || ext == "docx") {
                        file.fileIcon = 'apw apw-file-word';
                    } else if (ext == "xls" || ext == "xlsx") {
                        file.fileIcon = 'apw apw-file-excel';
                    } else if (ext == "ppt" || ext == "pptx") {
                        file.fileIcon = 'apw apw-file-powerpoint';
                    } else if (ext == "mp4" || ext == "mpeg" || ext == "mkv" || ext == "avi") {
                        file.fileIcon = 'apw apw-file-movie';
                    }
                    return file;
                },
                getUploadedFile: (file) => {
                    let fileInfo = AppsbdUtls.getFileIconByExt(file.ext, file.type);
                    return {...file, ...{name: AppsbdUtls.basename(file.url)}, ...fileInfo};
                },
                basename: function (path) {
                    return path.split('/').reverse()[0];
                },
                bytesToSize: function (bytes) {
                    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
                    if (bytes === 0) return 'n/a'
                    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 10)
                    if (i === 0) return `${bytes} ${sizes[i]}`
                    return `${(bytes / (1024 ** i)).toFixed(1)} ${sizes[i]}`
                },
                getErrorMsg: (msg) => {
                    if (msg != '') {
                        /* setNotification({
                             "message": translateGettext(msg),
                             "type": "alert",
                         });*/
                        return null;
                    }
                },
                ScreenWidth: function () {
                    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                },
                ScreenHeight: function () {
                    return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                },
                IsExtraSmallDevice() {
                    return AppsbdUtls.ScreenWidth() <= 576;
                },
                IsSmallDevice() {
                    let w = AppsbdUtls.ScreenWidth();
                    return w > 576 && w <= 768;
                },
                IsUptoSmallDevice() {
                    return AppsbdUtls.ScreenWidth() <= 768;
                },
                IsMediumDevice() {
                    let w = AppsbdUtls.ScreenWidth();
                    return w > 786 && w <= 992;
                },
                IsUptoMediumDevice() {
                    return AppsbdUtls.ScreenWidth() <= 992;
                },
                IsLargeDevice() {
                    let w = AppsbdUtls.ScreenWidth();
                    return w > 992 && w <= 1199;
                },
                IsUptoLargeDevice() {
                    return AppsbdUtls.ScreenWidth() <= 1199;
                },
                IsExtraLargeDevice() {
                    return AppsbdUtls.ScreenWidth() > 1199;
                },
                DarkmodeTaggle() {
                    appDarkmode.toggle();
                },
                ChangeDarkmode(status) {
                    let dStatus = appDarkmode.isActivated();
                    if (status) {
                        if (!dStatus) {
                            appDarkmode.toggle();
                        }
                    } else {
                        if (dStatus) {
                            appDarkmode.toggle();
                        }
                    }
                },
                DarkmodeObject() {
                    return appDarkmode;
                },
                ShowConfirmRequest(msg, callBack, props, error_callback) {
                    var cData = {
                        title: "",
                        // html: translateGettext(msg),
                        text: msg,
                        type: "warning",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: '#dc3545',
                        cancelButtonColor: '#02cc1b',
                        confirmButtonText: translateGettext("Delete"),
                        cancelButtonText: translateGettext("Cancel"),
                        showLoaderOnConfirm: true,
                        // showDenyButton: false,
                        preConfirm: function () {
                            return new Promise(async (resolve, reject) => {
                                let response = await callBack();
                                if (!response.status) {
                                    return reject(AppsbdUtls.GetErrorString(response, 'and'), null);
                                } else {
                                    return resolve({
                                        status: true,
                                        msg: AppsbdUtls.GetInfoString(response, 'and')
                                    });

                                }
                            }).catch((error) => {
                                let errorMsg = "";
                                try {
                                    errorMsg = error.toString();
                                } catch (e) {
                                    errorMsg = translateGettext("Unknown error");
                                }
                                Swal.showValidationMessage(
                                    translateGettext('Request failed: %{errorMsg}', {errorMsg: errorMsg})
                                )
                            })
                        },
                        allowOutsideClick: () => !Swal.isLoading()
                    };
                    if (props && (typeof props == 'object')) {
                        cData = {...cData, ...props}
                    }
                    Swal.fire(cData).then(function (result) {
                        if (result.isConfirmed) {
                            Swal.fire({
                                type: "success",
                                icon: "success",
                                title: result.value.msg,
                                confirmButtonColor: '#02cc1b',
                                timer: 3000,
                            });
                        } else {
                            if (typeof error_callback == "function") {
                                error_callback(result);
                            }
                        }
                    });
                },
                GetErrorString(response, joinStr) {
                    try {
                        if (!joinStr) {
                            joinStr = ',';
                        } else {
                            joinStr = translateGettext(joinStr);
                        }
                        return response.msg.error.join(joinStr)
                    } catch (e) {
                        return "";
                    }
                },
                GetInfoString(response, joinStr) {
                    try {
                        if (!joinStr) {
                            joinStr = ',';
                        } else {
                            joinStr = translateGettext(joinStr);
                        }
                        return response.msg.info.join(joinStr)
                    } catch (e) {
                        return "";
                    }
                },
                ConfirmDialog(msg, callback, params, props, error_callback) {
                    var thisObj = this;
                    AppsbdUtls.ShowConfirmRequest(msg, function () {
                        return callback(params, props, error_callback);
                    });
                },
                changedFormData(addProps, currentProps) {
                    return Object.keys(addProps).reduce((formData, field) => {
                        if (addProps[field] !== currentProps[field]) {
                            formData[field] = addProps[field];
                        }
                        return formData;
                    }, {});
                },

                ShowNotification(msg, status, time_in_ms, position) {

                    if (typeof status != "boolean") {
                        if (!status) {
                            newToast.error("My toast content", {
                                timeout: time_in_ms
                            });
                            return;
                        }
                    }
                    newToast.success(msg, {
                        timeout: time_in_ms,
                        position:position
                    });
                },
                NotificationPosition:ToastPosition,
                ShowServerResponseNotification(msgs,time_in_ms,options) {
                    if(!options){
                        options={};
                    }
                    let opt={...{
                        timeout: time_in_ms,
                        position: ToastPosition.BOTTOM_RIGHT
                    },...options}
                    try {
                        msgs.info.forEach(function (msg, index) {
                            newToast.success(msg, opt);
                        });
                    } catch (e) {
                    }
                    try {
                        msgs.error.forEach(function (msg, index) {
                            newToast.error(msg, opt);
                        });

                    } catch (e) {
                        newToast.warning(e.message, opt);
                    }
                },
                AddLoadingClass(elem, status) {
                    try {
                        if (status) {
                            elem.$el.classList.add('apbd-form-sending');
                        } else {
                            elem.$el.classList.remove('apbd-form-sending');
                        }
                    } catch (e) {

                    }
                },
                WPFileChooser: function (title, buttonText, callback, fileType, isSingle, onClose) {
                    let params = {
                        ...{
                            type: "",
                            title: "Image Chooser",
                            button_text: "Select",
                            multiple: false,
                            callback: function (selected) {
                            },
                            onClose: function () {
                            }
                        }, ...args
                    }

                    if (typeof wp == "undefined" || !wp.media) {
                        let testObj = {
                            "id": 3598,
                            "title": "w-logo-blue.png",
                            "filename": "w-logo-blue.png",
                            "url": "wp-admin/images/w-logo-blue.png"
                        }
                        params.callback(testObj);
                        return;
                    }
                    params.title = translateGettext(params.title);
                    params.button_text = translateGettext(params.button_text);

                    let Uploader = wp.media({
                        title: params.title,
                        library: {
                            type: params.type
                        },
                        button: {
                            text: params.button_text,
                        }, multiple: params.multiple
                    }).on('select', function () {
                        var attachment = Uploader.state().get('selection').first().toJSON();
                        try {
                            params.callback(attachment);
                        } catch (e) {
                            console.log(e.message);
                        }
                    }).on('close', function () {
                        params.onClose();
                    }).open();
                },
                AppVersion:function(){
                    return process.env.VUE_APP_VERSION;
                },
                POSLink:function(){
                    try {
                        return vitePos.pos_link;
                    }catch (e) {
                       return '';
                    }
                },
                WPMediaImageCropped: function (args) {
                    let params = {
                        ...{
                            width: 200,
                            height: 200,
                            title: "Image Chooser",
                            button_text: "Select",
                            flex_width: false,
                            flex_height: false,
                            crop: true,
                            callback: function (selected) {
                            },
                            onClose: function () {
                            }
                        }, ...args
                    }
                    if (typeof wp == "undefined" || !wp.media) {
                        let testObj = {
                            "title": "T_2_back.jpg",
                            "url": "wp-content/uploads/2022/04/T_2_back.jpg"
                        }
                        params.callback(testObj);
                        return;
                    }
                    params.title = translateGettext(params.title);
                    params.button_text = translateGettext(params.button_text);
                    WPMediaImageCropped(params);
                }
            };
        Vue.config.globalProperties.$appsbdUtls = AppsbdUtls;
        Vue.config.globalProperties.vitePos = window.vitePos;
    },
}
export default AppsbdUtls;