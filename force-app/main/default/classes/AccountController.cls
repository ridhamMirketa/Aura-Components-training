public with sharing class AccountController {
   
    @AuraEnabled
    public static List<Account> getAccountRecords(){
        try {
            List<Account> accList=new List<Account>();
            accList = [select id,Name,AccountNumber,type,Industry,AnnualRevenue from Account];
            // System.debug(accList);
            return accList;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
   
}