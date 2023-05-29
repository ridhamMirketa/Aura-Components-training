public with sharing class FieldInfoWrapper {
        @AuraEnabled
        public String fieldName;
        @AuraEnabled
        public String fieldType;
        @AuraEnabled
        public String fieldLabel;
        @AuraEnabled
        public List<String> picklistValues;
        @AuraEnabled
        public Boolean isRequired;
        @AuraEnabled
        public String values;
        public FieldInfoWrapper(String fieldName, String fieldType, String fieldLabel, List<String> picklistValues, Boolean isRequired, String values) {
            this.fieldName = fieldName;
            this.fieldType = fieldType;
            this.fieldLabel = fieldLabel;
            this.picklistValues = picklistValues;
            this.isRequired = isRequired;
            this.values=values;
        }
    
    
    
}