self.addEventListener('push', (e)=>{
    const data = e.data.json();
    console.log('push recevied ...', data);
    
    self.registration.showNotification(data.title, {
        body: 'Notified by Edison devadoss',
        icon: 'http:image:ibb.co/frYoFd/tmlogo.png'
    })
})