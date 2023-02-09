public with sharing class PartnerReviewController {
    public PartnerReviewController() {

    }

   
    @AuraEnabled(cacheable=true)
    public static List<Partner_Performance_Review__c> getPartnerReviews(string partnerAccountId){
    try {

        return [SELECT Id, Name, CreatedById, CreatedBy.Name,CreatedBy.email, Overall_Feedback__c, Overall_rating__c,
         Partner_Account__c,Partner_Account__r.Name, Partner_Business_Planning__c, Partner_Implementation_Description__c, 
         Partner_Quality__c FROM Partner_Performance_Review__c WHERE Partner_Account__c =: partnerAccountId];
        
    } catch (Exception e) {
        throw new AuraHandledException(e.getMessage());
    }
}
}
