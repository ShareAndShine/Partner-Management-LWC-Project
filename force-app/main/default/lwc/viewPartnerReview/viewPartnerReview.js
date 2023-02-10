import { LightningElement, wire, api } from 'lwc';
import getPartnerReviews from '@salesforce/apex/PartnerReviewController.getPartnerReviews';

// import message channel - Step 1: LMS
import PARTNER_CHANNEL from '@salesforce/messageChannel/PartnerAccountDataMessageChannel__c';

// import functions to publish data  - Step 1: LMS
import { subscribe, unsubscribe, MessageContext } from 'lightning/messageService';

export default class ViewPartnerReview extends LightningElement {

    // hold data received from publisher
    partnerAccountId; //= '0015h00001CcXOBAA3'; //TODO
    channelName;
    selectedPartnerAccountName; 


    partnerReviews = null; 
    partner; 

    recordIndex = 0;

    subscription; // property to check if subscription is already done or not

    //Step 2: LMS - After import make a wire call to Message context
    @wire(MessageContext)
    messageContext;
    

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
        this.partnerAccountId = message.selectedPartnerAccountId;
        this.selectedPartnerAccountName = message.selectedPartnerAccountName;
        this.channelName = message.channelname;

    }

    discconnectedCallback()
    {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    @wire(getPartnerReviews,{partnerAccountId: '$partnerAccountId'})
    processOutput({data,error})
    {
        if(data)
        {
            this.partnerReviews = data; //assign data from DB to a local property partner reviews collection

            if(this.partnerReviewsFound)
            {
                this.getCurrentPartnerReview();
            }
            

        }
        else if(error)
        {
            console.log('Error');
        }
    }

    getCurrentPartnerReview()
    {
        this.partner  = this.partnerReviews[this.recordIndex]; // first record in partner reviews collection
    }

    navigateNextReview()
    {
        if(this.recordIndex === this.partnerReviews.length -1)
        {
            this.recordIndex = this.partnerReviews.length -1;
        }
        else
        {
            this.recordIndex++;
        }
        
        this.getCurrentPartnerReview(); 
    }


    navigatepreviousReview()
    {
        if(this.recordIndex <= 0)
        {
            this.recordIndex = 0;
        }
        else
        {
            this.recordIndex--;
        }
        this.getCurrentPartnerReview(); 
    }

    get partnerReviewsFound()
    {
        if(this.partnerReviews != null && this.partnerReviews.length > 0 )
        {
            return true;
        }

        return false;
    }
   


    get IsPartnerSelected()
    {
        if(this.partnerAccountId ==null || this.partnerAccountId.length === 0)
        {
            return false;
        }
        return true;
    }


}