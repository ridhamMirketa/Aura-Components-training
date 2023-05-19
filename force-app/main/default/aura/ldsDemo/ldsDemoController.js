({
    checkType : function(component, event, helper) {
        let typeCmp=component.find("type");
        let type=typeCmp.get("v.value"); 
        
        if(type){
            component.set("v.isAccountNumberRequired",true);
        }else{
            component.set("v.isAccountNumberRequired",false);
        }
        if(type==='Prospect'|| type==='Other'){
            component.set("v.showAnnualRevenue",false);
        }else{
            component.set("v.showAnnualRevenue",true);
        }
    },
    
    saveRecord: function(component, event, helper) {
        let navService = component.find("navService");
        let record=event.getParams().response;
        var pageReference = {
            type: 'standard__recordPage',
            attributes: {
                recordId: record.id, // this is what you will need
                actionName: 'view',
                objectApiName: 'Account' // the object's api name
            }
        };
        
        navService.navigate(pageReference);
    },  
})
