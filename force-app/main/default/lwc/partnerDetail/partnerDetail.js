import { LightningElement, wire } from 'lwc';

import  { NavigationMixin} from 'lightning/navigation';


import ACCOUNT_NAME from '@salesforce/schema/Account.Name';
import ACCOUNT_CONTRACT_START from '@salesforce/schema/Account.Partner_Contract_Start_Date__c';

import PARTNER_PRIMARY_POC_FIELD from '@salesforce/schema/Account.Partner_Type_Lookup__c';
import Partner_Budget__c_FIELD from '@salesforce/schema/Account.Partner_Budget__c';
import Partner_Total_Sales_Revenue_FIELD from '@salesforce/schema/Account.Partner_Total_Sales_Revenue__c';
import Partner_Active_Pipeline_Value_FIELD from '@salesforce/schema/Account.Partner_Active_Pipeline_Value__c';
import Partner_Contract_End_Date__c_FIELD from '@salesforce/schema/Account.Partner_Contract_End_Date__c';
import Number_of_trained_Partner_contacts__c_FIELD from '@salesforce/schema/Account.Number_of_trained_Partner_contacts__c';

import Partner_Latitude_FIELD from '@salesforce/schema/Account.Partner_Geo_Location__Latitude__s';
import Partner_Longitude_FIELD from '@salesforce/schema/Account.Partner_Geo_Location__Longitude__s';

export default class PartnerDetail extends NavigationMixin(LightningElement) {

    
    objectApi = 'Account';
    selectedPartnerAccountId = '0015h00001CcXOBAA3'; //TODO: Remove hard coding

    showLocation = false; // property to hold falg to open location component


    // Expose property and map fields
    // Bind the property in the template
    accountName = ACCOUNT_NAME;
    accContractStartDate = ACCOUNT_CONTRACT_START;
    primarypoc = PARTNER_PRIMARY_POC_FIELD;
    budget = Partner_Budget__c_FIELD;
    salesRevenue = Partner_Total_Sales_Revenue_FIELD;
    activepipeline = Partner_Active_Pipeline_Value_FIELD;
    contractEnd = Partner_Contract_End_Date__c_FIELD;
    totalTrained = Number_of_trained_Partner_contacts__c_FIELD;
    partnerLongitude = Partner_Longitude_FIELD;
    partnerLatitude = Partner_Latitude_FIELD;



    get IsPartnerSelected()
    {
        if(this.selectedPartnerAccountId != null && this.selectedPartnerAccountId.length >0 )
        {
            return true;
        }
        return false;
    }

    OpenPartnerReviewScreenFlow()
    {
        // use navigation mixin and redirect user to flow screen

        const flowURL = '/flow/Rate_Partner_Performance?partnerAccountId=' + this.selectedPartnerAccountId;

         // configure input param
         const inputparm = {
            type: 'standard__webPage',
            attributes: {
                url:'/flow/Rate_Partner_Performance?partnerAccountId=' + this.selectedPartnerAccountId
            }
        };

        this[NavigationMixin.Navigate](inputparm);
    }

    OpenContactLocation()
    {
        this.showLocation = true;
    }
}