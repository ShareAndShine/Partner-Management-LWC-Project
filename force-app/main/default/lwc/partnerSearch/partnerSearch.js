import { LightningElement } from 'lwc';


export default class PartnerSearch extends LightningElement {

    appdesc = 'Partner Management app helps Sales & Marketing Team to quickly find list of Channel partners having relationship with the organization. These partners have been vetted by Vendor relationship team. Sales & Marketing users can also use the app to share feedback about a partner and find other details like primary point of contact, location, Sale pipeline etc';
   

    value = 'inProgress';

    get options() {
        return [
            { label: 'New', value: 'new' },
            { label: 'In Progress', value: 'inProgress' },
            { label: 'Finished', value: 'finished' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
    
}