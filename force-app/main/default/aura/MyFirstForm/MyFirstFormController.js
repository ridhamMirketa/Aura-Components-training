({
    handleSubmit : function(component, event, helper) {
       
        let nameComp = component.find("name");
        let phoneComp = component.find("phone");
        let addressComp = component.find("address");
        let emailComp = component.find("email");
        let name = nameComp.get("v.value");
        let phone = phoneComp.get("v.value");
        let address = addressComp.get("v.value");
        let email = emailComp.get("v.value");
        let showBool=true;

        if(nameComp.checkValidity() && phoneComp.checkValidity() && addressComp.checkValidity() && emailComp.checkValidity()   ){
            
            component.set("v.myInputObj", {
                "name":name,
                "phone":phone,
                "email":email,
                "address":address
            });
            component.set("v.showBool",showBool);
            
        }
        
        nameComp.reportValidity();
        addressComp.reportValidity();
        emailComp.reportValidity();
        phoneComp.reportValidity();        
    }
})