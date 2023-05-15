({
    init: function (cmp, event, helper) {
        cmp.set('v.columns', [
            {label: 'Name', fieldName: 'name', type: 'text'},
            {label: 'Phone', fieldName: 'phone', type: 'Number'},
            {label: 'Email', fieldName: 'email', type: 'Email'},
            {label: 'Address', fieldName: 'address', type: 'Address'},
            
        ]);

        
    },
    putInput : function(cmp, event, helper) {
        var params = event.getParam('arguments');
        // console.log(params.dataObject);
        let inputData=cmp.get("v.data");
        // let myObject = event.getParam("inputValue");
        // // console.log(myObject.name);
        inputData.push(params.dataObject);
        cmp.set("v.data",inputData);
    }
})
