import { LightningElement } from 'lwc';

export default class MasterContainner extends LightningElement {

    selectedPartnerTypeId = '';

    handleselectedpartnertypeEvent(event)
    {
        this.selectedPartnerTypeId = event.detail;
    }

   
}