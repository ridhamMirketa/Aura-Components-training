({
    handleSubmit : function(component, event, helper) {
        let childComponent = component.find("childformCmp");
        let message = childComponent.childformMessageMethod();
        console.log(message.name);
        
        let childTableCmp=component.find("childTableCmp");
        childTableCmp.childTableMessageMethod(message);
    }
})
