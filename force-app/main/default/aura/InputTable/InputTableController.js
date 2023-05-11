({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Name', fieldName: 'name', type: 'text'},
            {label: 'Phone', fieldName: 'phone', type: 'Number'},
            {label: 'Email', fieldName: 'email', type: 'Email'},
            {label: 'Address', fieldName: 'address', type: 'Address'},
            
        ]);

        let fetchData = cmp.get("v.myInputObj");
        let inputData=cmp.get("v.data");
        inputData.push(fetchData);
        cmp.set("v.data",inputData);


       
    },
    handleInputChange:function(cmp,event,helper){
        let fetchData = cmp.get("v.myInputObj");
        let inputData=cmp.get("v.data");
        inputData.push(fetchData);
        cmp.set("v.data",inputData);
    }
})
