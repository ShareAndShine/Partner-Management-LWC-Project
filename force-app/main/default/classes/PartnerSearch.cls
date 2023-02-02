public with sharing class PartnerSearch {
    public PartnerSearch() {

    }

    // annotate apex method with auraenabled so that it can be accessible in LWC
    @AuraEnabled(cacheable=true)
    public static List<Partner_Type__c> getAllPartnerTypes(){
        try {

            return [SELECT ID, Name FROM Partner_Type__c];
            
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}
