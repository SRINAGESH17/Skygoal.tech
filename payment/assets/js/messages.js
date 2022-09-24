let NotifyMSG = (msg,type)=>{
    let notification = new Notify('This is to notify that', msg,type ,{
        
        // or 'left'
        hAlign: 'right',
        // auto close after a timeout
        autoClose: true,
        // duration in ms
        autoCloseDuration: 5000,
        // click x button to close
        closeOnCrossClick: true,
        // click the notification box to close
        closeOnNotifyClick: false,
    });

}

const validate_url = (userInput) => {
    var res = userInput.match(
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    );

    //console.log(res)
    if (res == null) return false;
    else return true;
  };