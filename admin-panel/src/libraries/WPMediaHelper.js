const WPMediaImageCropped = function (params) {
    var AppsbdImgCropController = function (attachment, controller) {

        var control = controller.get('control');

        var flexWidth = !!parseInt(control.params.flex_width, 10);
        var flexHeight = !!parseInt(control.params.flex_height, 10);

        var realWidth = attachment.get('width');
        var realHeight = attachment.get('height');

        var xInit = parseInt(control.params.width, 10);
        var yInit = parseInt(control.params.height, 10);

        var ratio = xInit / yInit;

        controller.set('canSkipCrop', true);

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
        if (!params.flex_width && !params.flex_height) {
            imgSelectOptions.aspectRatio = xInit + ':' + yInit;
        }
        return imgSelectOptions;
    }
    var cropControl = {
        id: "control-id",
        params: {
            flex_width: params.flex_width,  // set to true if the width of the cropped image can be different to the width defined here
            flex_height: params.flex_height, // set to true if the height of the cropped image can be different to the height defined here
            width: params.width,  // set the desired width of the destination image here
            height: params.height, // set the desired height of the destination image here
        }
    };

    cropControl.mustBeCropped = function (flexW, flexH, dstW, dstH, imgW, imgH) {
        // If the width and height are both flexible
        // then the user does not need to crop the image.

        if (true === flexW && true === flexH) {
            return false;
        }

        // If the width is flexible and the cropped image height matches the current image height,
        // then the user does not need to crop the image.
        if (true === flexW && dstH === imgH) {
            return false;
        }

        // If the height is flexible and the cropped image width matches the current image width,
        // then the user does not need to crop the image.
        if (true === flexH && dstW === imgW) {
            return false;
        }

        // If the cropped image width matches the current image width,
        // and the cropped image height matches the current image height
        // then the user does not need to crop the image.
        if (dstW === imgW && dstH === imgH) {
            return false;
        }
        // If the destination width is equal to or greater than the cropped image width
        // then the user does not need to crop the image...
        if (imgW <= dstW) {
            return false;
        }

        return true;

    };
    let mediaUploader = wp.media({
        title: params.title,
        library: {
            type: 'image'
        },
        button: {
            text: params.button_text,
            close: false
        }, multiple: false,
        states: [
            new wp.media.controller.Library({
                title: params.title, // l10n.chooseImage,
                library: wp.media.query({type: 'image'}),
                multiple: false,
                date: false,
                priority: 20,
                suggestedWidth: params.width,
                suggestedHeight: params.height
            }),
            new wp.media.controller.CustomizeImageCropper({
                imgSelectOptions: AppsbdImgCropController,
                control: cropControl
            })
        ]
    }).on('cropped', function (croppedImage) {
        params.callback(croppedImage);
    });
    mediaUploader
        .on('skippedcrop', function (selection) {
            params.callback(selection.attributes);
            return;
        })
        .on("select", function () {
            var attachment = mediaUploader.state().get('selection').first().toJSON();
            if (cropControl.params.width === attachment.width
                && cropControl.params.height === attachment.height
                && !cropControl.params.flex_width
                && !cropControl.params.flex_height) {
                callback(attachment);
                mediaUploader.close();
            } else {
                mediaUploader.setState('cropper');
            }
        })
        .on('close', function () {
            params.onClose();
        }).open();
}
export default WPMediaImageCropped;