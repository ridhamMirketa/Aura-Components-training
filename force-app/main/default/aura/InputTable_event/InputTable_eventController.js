({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Name', fieldName: 'name', type: 'text'},
            {label: 'Phone', fieldName: 'phone', type: 'Number'},
            {label: 'Email', fieldName: 'email', type: 'Email'},
            {label: 'Address', fieldName: 'address', type: 'Address'},
            
        ]);

        
    },
   
    childComponentEvent:function(cmp,event,helper){
       
        let inputData=cmp.get("v.data");
        let myObject = event.getParam("inputValue");
        inputData.push(myObject);
        cmp.set("v.data",inputData);
        
    }

})
