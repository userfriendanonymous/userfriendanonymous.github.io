const crazysdk = window.CrazyGames.CrazySDK.getInstance();
crazysdk.init();
crazysdk.addEventListener('adStarted', adStarted);
crazysdk.addEventListener('adFinished', adFinished);
crazysdk.addEventListener('adError', adError);
crazysdk.requestAd();

function adStarted() {
    console.log('adStarted!');
}
function adFinished() {
    console.log('adFinished!');
}
function adError() {
    console.log('adError!');
}