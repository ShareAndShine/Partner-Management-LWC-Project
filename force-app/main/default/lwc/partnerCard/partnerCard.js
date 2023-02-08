import { LightningElement, api, wire } from 'lwc';



export default class PartnerCard extends LightningElement {



    @api partnerAccount; // public property to receive data from partnersearchResult 


    channelpartnerStyle = 'slds-theme_offline'; // property to hold class for partner type
    userImg = 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'; // to hold user img url 


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

}