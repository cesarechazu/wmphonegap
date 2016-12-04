dojo.declare("CameraPhoto", wm.Page, {
start: function() {
document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
console.log(navigator.camera);
}
app.cameraPicVar.setValue("dataValue",null);
},
"preferredDevice": "phone",
phoneGapCallPhotoError: function(inSender, inError) {
app.alert(inError.toString());
},
takePhotoPGButtonClick: function(inSender) {
this.phoneGapCallPhoto.update();
this.picture1.setSource(this.phoneGapCallPhoto.getValue("dataValue"));
},
takePhotoJSButtonClick: function(inSender) {
navigator.camera.getPicture(onJSSuccess, onJSFail, {quality: 50,destinationType: Camera.DestinationType.FILE_URI});
function onJSSuccess(imageURI) {
//var image = document.getElementById('myImage');
//image.src = imageURI;
app.toastSuccess("Taken", 2500);
app.cameraPicVar.setValue("dataValue",imageURI);
}
function onJSFail(message) {
alert('Failed because: ' + message);
}
},
_end: 0
});

CameraPhoto.widgets = {
phoneGapCallPhoto: ["wm.PhoneGapCall", {"inFlightBehavior":"executeLast","operation":"capture_picture"}, {"onError":"phoneGapCallPhotoError"}, {
input: ["wm.ServiceInput", {"type":"capture_pictureInputs"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":"50","targetProperty":"quality"}, {}],
wire1: ["wm.Wire", {"expression":"\"Camera\"","targetProperty":"sourceType"}, {}]
}]
}]
}],
layoutBox1: ["wm.Layout", {"horizontalAlign":"center","verticalAlign":"top"}, {}, {
takePhotoPGButton: ["wm.Button", {"border":"1","caption":"Take photo with PhoneGapCall","height":"40px","width":"100%"}, {"onclick":"takePhotoPGButtonClick"}],
takePhotoJSButton: ["wm.Button", {"border":"1","caption":"Take photo with java script function","height":"40px","width":"100%"}, {"onclick":"takePhotoJSButtonClick"}],
picture1: ["wm.Picture", {"aspect":"h","height":"100%","width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"app.cameraPicVar.dataValue","targetProperty":"source"}, {}]
}]
}],
imageURIText: ["wm.LargeTextArea", {"border":"0","caption":undefined,"displayValue":"","height":"80px","mobileHeight":"80px","readonly":true,"styles":{},"width":"98%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"app.stringAppVar.dataValue","targetProperty":"dataValue"}, {}]
}]
}]
}]
};

CameraPhoto.prototype._cssText = '';
CameraPhoto.prototype._htmlText = '';