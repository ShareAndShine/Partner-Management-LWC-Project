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


// import message channel - Step 1: LMS
import PARTNER_CHANNEL from '@salesforce/messageChannel/PartnerAccountDataMessageChannel__c';

// import functions to publish data  - Step 1: LMS
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';


export default class PartnerDetail extends NavigationMixin(LightningElement) {

    
    objectApi = 'Account';
    selectedPartnerAccountId;// = '0015h00001CcXOBAA3'; //TODO: Remove hard coding
    channelName;
    selectedPartnerAccountName; 

    showLocation = false; // property to hold falg to open location component

    subscription; // property to check if subscription is already done or not

    //Step 2: LMS - After import make a wire call to Message context
    @wire(MessageContext)
    messageContext;

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

    connectedCallback()
    {
        //Step 3: LMS - subscribe to the channel
        //check if subscription already exists
        if(this.subscription)
        {
            return;
        }

        this.subscription = subscribe(this.messageContext, PARTNER_CHANNEL, (message) => { this.processMessage(message);})
    }

    // call back function to unpack data received from the publisher
    processMessage(message)
    {
        // unpack data
        this.selectedPartnerAccountId = message.selectedPartnerAccountId;
        this.selectedPartnerAccountName = message.selectedPartnerAccountName;
        this.channelName = message.channelname;

    }

    discconnectedCallback()
    {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

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