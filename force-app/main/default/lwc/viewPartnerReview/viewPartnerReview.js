import { LightningElement, wire, api } from 'lwc';
import getPartnerReviews from '@salesforce/apex/PartnerReviewController.getPartnerReviews';


export default class ViewPartnerReview extends LightningElement {

    
    partnerAccountId = '0015h00001CcXOBAA3'; //TODO

    partnerReviews = null; 
    partner; 

    recordIndex = 0;

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
        this.recordIndex++;
        this.getCurrentPartnerReview(); 
    }


    navigatePrevioustReview()
    {
        this.recordIndex--;
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