public with sharing class DataFix {
    public DataFix() {

    }
    

    public static void UpdatePartnerType() {

        try {
             
            Partner_Type__c techPartner = [SELECT ID FROM Partner_Type__c WHERE Name = 'Technology Partner'];
            Partner_Type__c marketingPartner = [SELECT ID FROM Partner_Type__c WHERE Name = 'Marketing Partner'];
            
            List<Account> partnerAccs = [SELECT Id, Partner_Type_Lookup__c, Name FROM Account
            WHERE Partner_Status__c IN ('Active','Inactive','Pending')];

            for (Account acc : partnerAccs) {

                
                acc.Partner_Geo_Location__Latitude__s = 51.505;
                acc.Partner_Geo_Location__Longitude__s = -0.09;
                if(acc.Name == '6sense' || acc.Name == 'MailChimp' || acc.Name == 'Demandbase')
                {
                    acc.Partner_Type_Lookup__c = marketingPartner.Id;
                }
                else
                {
                    acc.Partner_Type_Lookup__c = techPartner.Id;
                }
            }
            
            System.debug('acctoUpdate::' + partnerAccs);
            update partnerAccs;


        } catch (Exception ex) {
            
            System.debug('The following exception has occurred: ' + ex.getMessage());
        }
        
    }
}