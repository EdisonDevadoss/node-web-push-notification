const publicVapidKey = 'BC-m2A1tQrWmqcp55m0vSqiYHngPUmhtiYr65NVirRygz-klpR6pqp3W_TYPv7rOS_-8m4sD19sGVM83YUEn_pA';

//Check for service worker
if('serviceWorker' in navigator){
    send().catch(err=> console.error(err));
}

// Register SW, Register Push, Send Push
async function send(){
    console.log('Registering service worker ...');
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log('register ...', register);

    const subscrption = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    await fetch('/subscribe',{
        method: 'POST',
        body: JSON.stringify(subscrption),
        host: '_host_',
        family: 4,
        port: 80,
        path: '/',
        headers:{
            'content-type': 'application/json'
        }
    })
    console.log('notification send')
      
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }