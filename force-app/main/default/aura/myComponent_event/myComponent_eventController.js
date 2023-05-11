({
    parentComponentEvent : function(component, event, helper) {
        let inputObj=event.getParam("inputVal");
        console.log(inputObj.name);
        let childComponent=component.find("table_event");
        let cmpEvent = childComponent.getEvent("Event_To_Send_Data"); 
        //Set event attribute value
        cmpEvent.setParams({"inputValue" : inputObj}); 
        cmpEvent.fire(); 
    }
})
