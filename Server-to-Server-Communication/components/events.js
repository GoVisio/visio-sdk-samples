var socket = io.connect();
let user;

Visio.api('/auth/me', 'GET', {}, function(status,response) {
  if(status == 200){
    console.log('user is logged in with id : '+response.id_user);
    user = response;
  }else {
    console.warn('user is not logged in');
  }
});

socket.on('event', function (event) {
  console.log(event);
  if (event.type === 'incoming_call' && user.id_user && event.data.from_user_id !== user.id_user) {
    var r = confirm('incoming_call from : '+event.data.display_name);
    if (r == true) {
      document.getElementById('visio-chat-module').style.display = "block";
      Visio.ui.chatModule({
        userId: event.data.from_user_id
      },'visio-chat-module');
    } else {
      Visio.api('/calls/2/decline', 'POST', {}, function(status,response) {
        if(status == 200){
          console.log('call '+event.data.call_id+' was refused by the user');
        }
      });
    }
  }
});
