var forms = document.forms['cashfreeForm']
var submitButton = document.getElementById('load')
var myModal = new bootstrap.Modal(document.getElementById('thanks'), {
    keyboard: false
  })

forms.addEventListener('submit', async (event)=>{
   event.preventDefault();
    
   const name = forms.elements["name"].value;
   const businessType = forms.elements["businessType"].value;
   const contactName = forms.elements["contactName"].value;
   const businessLine = forms.elements["businessLine"].value;
   const email = forms.elements["email"].value;
   const accountNumber = forms.elements['accountNumber'].value;
   const phoneNumber = forms.elements['phoneNumber'].value;
   const ifsc = forms.elements['ifsc'].value;
   const siteUrl = forms.elements['siteUrl'].value;
   const panNumber = forms.elements['panNumber'].value;

   if(_.isEmpty(name)){
      return NotifyMSG("Merchant Name cannot be empty",'error')
   }
   if(_.isInteger(parseInt(name))){
     return NotifyMSG("Merchant Name is Invalid",'error')
   }

   if(_.isEmpty(businessType)){
      return NotifyMSG("Business Type required to be specified",'error')
   }
   if(_.isEmpty(contactName)){
      return NotifyMSG("Contact Name Cannot be empty",'error')
   }
   if(_.isInteger(parseInt(contactName))){
     return NotifyMSG("Contact Name is Invalid",'error')
   }
   if(_.isEmpty(businessLine)){
      return NotifyMSG("Business Line required to be specified",'error')
   }
   if(_.isEmpty(email)){
      return NotifyMSG("An Email is required",'error')
   }
   if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
     return NotifyMSG("Your Email id is Invalid",'error')
   }
   if(_.isEmpty(accountNumber)){
      return NotifyMSG("An Account Number required to be specified",'error')
   }

   if(!_.isInteger(parseInt(accountNumber))){
      return NotifyMSG("Account Number should not contain letters",'error')
   }
   if(_.isEmpty(phoneNumber)){
      return NotifyMSG("Phone required to be specified",'error')
   }
   if(!_.isInteger(parseInt(phoneNumber))){
      return NotifyMSG("Phone number is invalid",'error')
   }
   if(phoneNumber.length > 10){
      return NotifyMSG("Phone number cannot exceed above 10 digits",'error')
   }
   if(phoneNumber.length !== 10){
      return NotifyMSG("Phone number cannot be lower then 10 digits",'error')
   }

   if(_.isEmpty(ifsc)){
      return NotifyMSG("IFSC code is required",'error')
   }
   if(ifsc.length > 11){
      return NotifyMSG("IFSC code should contain 11 characters",'error')
   }
   if(ifsc.length !== 11){
      return NotifyMSG("IFSC code should contain 11 characters",'error')
   }
   if(_.isEmpty(siteUrl)){
      return NotifyMSG("Website URL is required",'error')
   }
   if(!validate_url(siteUrl)){
     return NotifyMSG("Website URL is invalid",'error')
   }
   if(_.isEmpty(panNumber)){
      return NotifyMSG("Pan Number is required",'error')
   }
   if(panNumber.length > 10){
      return NotifyMSG("PAN number cannot exceed above 10 digits",'error')
   }
   if(panNumber.length !== 10){
      return NotifyMSG("PAN number cannot be lower then 10 digits",'error')
   }

   const resp = {

       "merchant_name": name,
       "poc_name": contactName,
       "poc_email": email,
       "poc_phone": phoneNumber,
       "merchant_site_url": siteUrl,
       "business_type":businessType,
       "line_of_business": businessLine,
       "bank_account_number": accountNumber,
       "ifsc": ifsc,
       "business_pan": panNumber

       } 

       console.log(resp)
       submitButton.innerHTML =
       ' <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Please Wait...';
       submitButton.className = "btn btn-lg btn-dark px-5 disibled"
       async function postData(url = '', data = {}) {
             // Default options are marked with *
             const response = await fetch(url, {
               method: 'POST', // *GET, POST, PUT, DELETE, etc.
               mode: 'cors', // no-cors, *cors, same-origin
               cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
               credentials: 'same-origin', // include, *same-origin, omit
               headers: {
                 'Content-Type': 'application/json'
                 // 'Content-Type': 'application/x-www-form-urlencoded',
               },
               redirect: 'follow', // manual, *follow, error
               referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
               body: JSON.stringify(data) // body data type must match "Content-Type" header
             });
             return response.json(); // parses JSON response into native JavaScript objects
           }

           postData('http://localhost:3000/api/create-merchant', resp)
             .then((data) => {
               console.log(data); // JSON data parsed by `data.json()` call
               if( data.code == 200){
                myModal.show()
                submitButton.innerHTML ='SUBMIT';
                submitButton.className = "btn btn-lg btn-dark px-5"
                forms.reset(); 
                  return NotifyMSG(data.message,"success")
               }
               if(data.code == 400){
                submitButton.innerHTML ='SUBMIT';
                submitButton.className = "btn btn-lg btn-dark px-5"
                 return NotifyMSG(data.response.message,"error")
               }
               if(data.code == 409){
                submitButton.innerHTML ='SUBMIT';
                submitButton.className = "btn btn-lg btn-dark px-5"
                 return NotifyMSG("User with this email already exist","error")
               }
               if(data.code == 401){
                submitButton.innerHTML ='SUBMIT';
                submitButton.className = "btn btn-lg btn-dark px-5"
                 return NotifyMSG("Something went Wrong","error")
               }
             }).catch((err)=>{
                submitButton.innerHTML ='SUBMIT';
                submitButton.className = "btn btn-lg btn-dark px-5"
                 return NotifyMSG("Something went Wrong try again later","error")
             })

        
   


 
});