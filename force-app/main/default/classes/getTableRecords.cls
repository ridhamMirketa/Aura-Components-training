public with sharing class getTableRecords {
    @AuraEnabled
    public static List<Account> getAccountRecords(Integer offSet){
        try {
            // System.debug('hi');
            
            // return [select Name,Type,AccountNumber,AnnualRevenue from Account];
            System.debug(offSet);
            return [SELECT Name,Type,AccountNumber,AnnualRevenue FROM Account LIMIT 20 OFFSET :offSet];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static Integer getCount(){
        try {
            Integer accountCount = [SELECT COUNT() FROM Account];
            return accountCount;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void deleteAccountRecord(Id recordId){

        try {
            Account acc=[Select Id from Account where id =: recordId];
            delete acc;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}