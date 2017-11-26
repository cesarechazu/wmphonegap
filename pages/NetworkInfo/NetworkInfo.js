dojo.declare("NetworkInfo", wm.Page, {
    start: function() {
        var form = this;

        document.addEventListener("online", onOnline, false);

        function onOnline() {
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';

            //alert('Connection type: ' + states[networkState]);
            form.textConnStatus.setValue("dataValue", 'Connection type: ' + states[networkState]);

        }

        document.addEventListener("offline", onOffline, false);

        function onOffline() {
            alert("Your device is not connected.");
        }

    },
    "preferredDevice": "phone",

    _end: 0
});