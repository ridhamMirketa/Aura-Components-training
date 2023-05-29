public with sharing class AccountSchemaController {
    
    @AuraEnabled
    public static Map<String,FieldInfoWrapper> getAccountFields(){
        try {  

            List<FieldInfoWrapper> fieldInfoList = new List<FieldInfoWrapper>();
            Map<String,FieldInfoWrapper> fieldInfoMap=new Map<String,FieldInfoWrapper>();
            Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
            Schema.SObjectType sobjSchema = schemaMap.get('Account');
            Map<String, Schema.SObjectField> fieldMap = sobjSchema.getDescribe().fields.getMap();
    
            for (SObjectField fieldName : fieldMap.values()) {
                String fieldlabel;
                String fieldType;
                String fieldNameStr;
                String values;
                fieldlabel = fieldName.getDescribe().getLabel();
                Schema.DisplayType FldType = fieldName.getDescribe().getType();
                fieldType = string.valueOf(FldType);
                fieldNameStr=string.valueOf(fieldName);
                
                Boolean isRequired = fieldName.getDescribe().isNillable();
                
                List<String> picklistValues = new List<String>();
                if(String.valueOf(fieldName)=='AccountNumber' || String.valueOf(fieldName)=='Type' || String.valueOf(fieldName)=='Name' || String.valueOf(fieldName)=='AnnualRevenue' ){
                    
                    if (FldType==Schema.DisplayType.PICKLIST) {
                     
                        List<Schema.PicklistEntry> picklistEntries = fieldName.getDescribe().getPicklistValues();
                        for (Schema.PicklistEntry picklistEntry : picklistEntries) {
                            picklistValues.add(picklistEntry.getLabel());
                        }
                    }
        
                    FieldInfoWrapper fieldInfo = new FieldInfoWrapper(fieldNameStr, fieldType, fieldLabel, picklistValues, isRequired,values);
                    fieldInfoMap.put(fieldNameStr, fieldInfo);
                    // fieldInfoMap[fieldNameStr]=fieldInfo;
                    // fieldInfoList.add(fieldInfo);
                }
            }
    
            return fieldInfoMap;
            
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }


    }

    @AuraEnabled
    public static void createAccountRecord(Account account){
        try {
            System.debug('hi');
            insert account;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static Account getInputValues(Id recordId){
        try {
            System.debug(recordId);
            Account newAcc=[Select Name,Type,AccountNumber,AnnualRevenue from Account where Id =: recordId];
            System.debug(newAcc);
            return newAcc;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static void updateAccountRecord(Account account,Id recordId){
        try {
            Account acc = [SELECT Name,Type,AccountNumber,AnnualRevenue FROM Account WHERE Id = :recordId];
            Map<String, Object> fieldMap = account.getPopulatedFieldsAsMap();
            for (String fieldName : fieldMap.keySet()) {
                // Perform operations with the field name
                acc.put(fieldName,fieldMap.get(fieldName));
            }
            update acc;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}