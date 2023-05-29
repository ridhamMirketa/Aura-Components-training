({
    doInit: function(component, event, helper) {
        let action = component.get("c.getAccountFields");
        
        action.setCallback(this, function(response) {
            // console.log('hi');
            let state = response.getState();
            if (state === "SUCCESS") {
                // console.log(response.getReturnValue());
                // console.log(response.getReturnValue()[0]);
                component.set("v.fieldInfoMap", response.getReturnValue());
                var mapEntries = [];
                let fieldInfoMap=component.get("v.fieldInfoMap");
                // Convert the map to a list of key-value pairs
                for (var key in fieldInfoMap) {
                    if (fieldInfoMap.hasOwnProperty(key)) {
                        mapEntries.push({ key: key, value: fieldInfoMap[key] });
                    }
        }

                // Set the list of map entries as a new attribute in the component
                component.set("v.mapEntries", mapEntries);
            }
            // console.log(component.get("v.fieldInfoList")[0].fieldLabel);
        });
        
        $A.enqueueAction(action);
        let recordId=component.get("v.recordId");
        console.log(recordId);
        
        if(recordId){
            console.log('pra');
            let actionGetValues=component.get("c.getInputValues");
            actionGetValues.setParams({
                "recordId": recordId
            });
            actionGetValues.setCallback(this, function(response) {
                console.log('hi');
                let state = response.getState();
                if (state === "SUCCESS") {
                    console.log('hello');
                    // console.log(response.getReturnValue());
                    // function findValueByKey(key) {
                    //     for (var i = 0; i < wrapperArray.length; i++) {
                    //       if (wrapperArray[i].key === key) {
                    //         return wrapperArray[i].value;
                    //       }
                    //     }
                    //     return null; // Key not found
                    //   }
                    // console.log(response.getReturnValue()[0]);
                    let inputValues=response.getReturnValue()
                    let myMap=component.get("v.fieldInfoMap");
                    // for(let i=0;i<inputValues.length;i++){
                    //     component.set("v.fieldInfoList[i].values", inputValues[i]);
                    // }
                    console.log(myMap['AnnualRevenue']);
                    // for(let field in myMap){
                    //     console.log("hi");
                    //     console.log(field);
                    // }
                    for(let fieldName in inputValues){
                        // console.log(typeof fieldName);
                        if(myMap.hasOwnProperty(fieldName)){
                            console.log(fieldName);
                            myMap[fieldName].values=inputValues[fieldName];
                        }
                        
                    }
                    // component.set("v.fieldInfoMap", myMap);
                    //component.set("v.fieldInfoList", response.getReturnValue());
                }
                // console.log(component.get("v.fieldInfoList")[0].fieldLabel);
            });
            $A.enqueueAction(actionGetValues);
        }
        
        

        
        console.log("init");
    },
    onSubmit: function(component, event, helper) {
       

        let inputValCmp=component.find('inputVal');
        let fieldInfoMap=component.get("v.fieldInfoMap");
        let account=component.get("v.account");
       
        let i=0;
        for(let fieldName in fieldInfoMap){
            fieldInfoMap[fieldName].values=inputValCmp[i].get("v.value");
            i++;
        }
        
        for (var fieldName in fieldInfoMap) {
            
            account[fieldName] = fieldInfoMap[fieldName].values;
            
        }
        let account1=component.get("v.account");
        
        console.log(account1);
        
        let recordId=component.get("v.recordId");
        console.log(recordId);
        if(recordId){
            let action = component.get("c.updateAccountRecord");
            action.setParams({
                "account": account1,
                "recordId":recordId
            });
            $A.enqueueAction(action);
        }else{
            let action = component.get("c.createAccountRecord");
            action.setParams({
                "account": account1
            });
            $A.enqueueAction(action);
        }
       

    },

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
})
