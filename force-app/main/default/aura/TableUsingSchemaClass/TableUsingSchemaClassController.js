({
    init: function (cmp, event, helper) {
        let actions=[
            {label:'Edit',name:'edit'},
            {label:'Delete',name:'delete'}

        ]
        cmp.set('v.columns', [
            {label: 'Name', fieldName: 'Name'},
            {label: 'Type', fieldName: 'Type'},
            {label: 'Account Number', fieldName: 'AccountNumber'},
            {label: 'Annual Revenue', fieldName: 'AnnualRevenue'},
            {type:'action',typeAttributes:{rowActions:actions}}
        ]);

        // let fetchData = cmp.get("v.myInputObj");
        // let inputData=cmp.get("v.data");
        // inputData.push(fetchData);
        // cmp.set("v.data",inputData);
       
        let action = cmp.get("c.getAccountRecords");
        action.setParams({
            "offSet":0
        });
       
        action.setCallback(this,function(response){
            let state = response.getState();
            console.log(state);
            
            if (state === "SUCCESS") {
                // let newData=component.get("v.data");
                // newData.push(response.getReturnValue());
                // console.log(response.getReturnValue());
                cmp.set("v.data", response.getReturnValue());
            }
        })
        
        $A.enqueueAction(action);

        let action1 = cmp.get("c.getCount");
        
       
        action1.setCallback(this,function(response){
            let state = response.getState();
            console.log(state);
            
            if (state === "SUCCESS") {
                // let newData=component.get("v.data");
                // newData.push(response.getReturnValue());
                // console.log(response.getReturnValue());
                cmp.set("v.count", response.getReturnValue());
            }
        })
        
        $A.enqueueAction(action1);
        
       
    },
    handleRowAction:function(cmp,event,helper){
        let action=event.getParam('action');
        let row=event.getParam('row');

        switch(action.name){
            case 'edit':
                $A.get("e.force:editRecord").setParams({"recordId":row.Id}).fire();
                break;
            
            case 'delete':
                let act = cmp.get("c.deleteAccountRecord");
        
                act.setParams({
                    "recordId":row.Id
                });
                act.setCallback(this,function(response){
                    let state = response.getState();
                    console.log(state);
                    if (state === "SUCCESS") {
                        
                    }
                })
                
                $A.enqueueAction(act);

                break;

        }
    },
    handleScroll: function(component, event, helper) {
        console.log('hello scrolle');
        // var scrollContainer = component.find("scrollContainer").getElement();
        // var scrollTop = scrollContainer.scrollTop;
        // var clientHeight = scrollContainer.clientHeight;
        // var scrollHeight = scrollContainer.scrollHeight;
        let offSet = component.get("v.offSet");
        // Check if scrolled to the end
        let count=component.get("v.count");
        console.log(offSet);
        if(offSet<count){
            offSet += 20; // Increase the offset value as per your requirements

            // Update the offset attribute
            component.set("v.offSet", offSet);
            // let off=component.get("v.offSet")
            let action = component.get("c.getAccountRecords");
            action.setParams({
                "offSet":offSet
            });
       
            action.setCallback(this,function(response){
                let state = response.getState();
                console.log(state);
                
                if (state === "SUCCESS") {
                    let newData=component.get("v.data");
                    console.log(response.getReturnValue());

                    newData.push(...response.getReturnValue());
                    console.log("hi",newData);
                    // console.log(response.getReturnValue());
                    component.set("v.data", newData);
                }
            })
            
            $A.enqueueAction(action);
        }
            
        
    },
    toggleButton: function(component, event, helper) {
        console.log("toggled");
        var isToggled = component.get("v.isToggled");
        component.set("v.isToggled", !isToggled);
        component.set("v.offSet",0);
    },
    onPrevious: function(component, event, helper) {

        let offSet = component.get("v.offSet");
        // Check if scrolled to the end
        let count=component.get("v.count");
        console.log(offSet);
        if(offSet<count && offSet>=0){
            offSet -= 20; // Increase the offset value as per your requirements

            // Update the offset attribute
            component.set("v.offSet", offSet);
            // let off=component.get("v.offSet")
            let action = component.get("c.getAccountRecords");
            action.setParams({
                "offSet":offSet
            });
       
            action.setCallback(this,function(response){
                let state = response.getState();
                console.log(state);
                
                if (state === "SUCCESS") {
                    // console.log(response.getReturnValue());
                    component.set("v.data", response.getReturnValue());
                }
            })
            
            $A.enqueueAction(action);
        }
        
    },
    
    onNext: function(component, event, helper) {
        let offSet = component.get("v.offSet");
        // Check if scrolled to the end
        let count=component.get("v.count");
        console.log(offSet);
        if(offSet<count){
            offSet += 20; // Increase the offset value as per your requirements

            // Update the offset attribute
            component.set("v.offSet", offSet);
            // let off=component.get("v.offSet")
            let action = component.get("c.getAccountRecords");
            action.setParams({
                "offSet":offSet
            });
       
            action.setCallback(this,function(response){
                let state = response.getState();
                console.log(state);
                
                if (state === "SUCCESS") {
                    // console.log(response.getReturnValue());
                    component.set("v.data", response.getReturnValue());
                }
            })
            
            $A.enqueueAction(action);
        }else{
            let data=component.get("v.data");
            console.log(data);
        }
        
    }
    
})
