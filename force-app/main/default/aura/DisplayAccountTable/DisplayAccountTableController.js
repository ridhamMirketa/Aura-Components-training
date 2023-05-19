({
    doInit : function(component, event, helper) {
        component.set('v.columns', [
            {label: 'Id', fieldName: 'Id'},
            {label: 'Name', fieldName: 'Name'},
            {label: 'Account Number', fieldName: 'AccountNumber'},
            {label: 'Type', fieldName: 'Type'},
            {label: 'Industry', fieldName: 'Industry'},
            {label: 'Annual Revenue', fieldName: 'AnnualRevenue'}
        ]);
        let action=component.get("c.getAccountRecords");
        
        
        action.setCallback(this,function(response){
            let state=response.getState();
            if(state==="SUCCESS"){
                component.set("v.accList",response.getReturnValue());
            }
        });

        $A.enqueueAction(action);

        
    }
})
