import { LightningElement, api, wire } from 'lwc';


// import message channel - Step 1: LMS
import PARTNER_CHANNEL from '@salesforce/messageChannel/PartnerAccountDataMessageChannel__c';

// import functions to publish data  - Step 1: LMS
import { publish,  MessageContext } from 'lightning/messageService';


export default class PartnerCard extends LightningElement {



    @api partnerAccount; // public property to receive data from partnersearchResult 
    @api selectedPartnerAccountId; 

    channelpartnerStyle = 'slds-theme_offline'; // property to hold class for partner type
    userImg = 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'; // to hold user img url 

    // card style property
    //partnerCardStyle;

    //Step 2: LMS - After import make a wire call to Message context
    @wire(MessageContext)
    messageContext;

    connectedCallback() {

        // call to getPartnerTypeStyle function
        this.getPartnerTypeStyle(this.partnerAccount.Partner_Type_Lookup__r.Name);

        this.getUserImage(this.partnerAccount.Partner_Primary_POC__r.Salutation);

    }

    getPartnerTypeStyle(PartnerType) {
        switch (PartnerType) {
            case 'Technology Partner':
                this.channelpartnerStyle = 'slds-theme_success';
                break;
            case 'Marketing Partner':
                this.channelpartnerStyle = 'slds-theme_info';
                break;
            case 'Social Media Channel Partner':
                this.channelpartnerStyle = 'slds-theme_inverse';
                break;
            default:
                this.channelpartnerStyle = 'slds-theme_offline';

                break;
        }
    }

    getUserImage(saluation) {
        const randomId = Math.floor(Math.random() * 100);
        switch (saluation) {
            case 'Mr.':
                this.userImg = `https://randomuser.me/api/portraits/med/men/${randomId}.jpg`;
                break;
            case 'Ms.':
                this.userImg = `https://randomuser.me/api/portraits/med/women/${randomId}.jpg`;
                break;
            default:
                this.userImg = `https://www.lightningdesignsystem.com/assets/images/avatar2.jpg`;

                break;
        }
    }


    handleSelectedPartnerAccount(event)
    {
        // storing partner Account Id in a local variable
        const partnerAccountId = this.partnerAccount.Id;

        // to highlight the selected partner card, expose an event and send selected partner account Id to the parent component
        const partnerAccountSelect = new CustomEvent('partnerselect', {detail: partnerAccountId});
        this.dispatchEvent(partnerAccountSelect);


        //Step 3: LMS - publish
        // publish selected partner account id and other details
        // define the message to be published

        const msgToPublish = {
            selectedPartnerAccountId: this.partnerAccount.Id,
            channelname:"Partner Account",
            selectedPartnerAccountName: this.partnerAccount.Name
        }


        // publish
        publish(this.messageContext, PARTNER_CHANNEL,msgToPublish);
    }

    get partnerCardStyle()
    {
        if(this.partnerAccount.Id === this.selectedPartnerAccountId)
            {
                return "tile selected";
            }
        return "tile";

    }
}