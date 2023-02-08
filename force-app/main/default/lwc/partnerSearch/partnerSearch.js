import { LightningElement, wire } from 'lwc'; //Step 1: Import wire decorator 

//Step 2: Import wire decorator > Import APEX method
import fetchPartnerTypes from '@salesforce/apex/PartnerSearch.getAllPartnerTypes';

import  { NavigationMixin} from 'lightning/navigation';

export default class PartnerSearch extends NavigationMixin(LightningElement) {

    appdesc = 'Partner Management app helps Sales & Marketing Team to quickly find list of Channel partners having relationship with the organization. These partners have been vetted by Vendor relationship team. Sales & Marketing users can also use the app to share feedback about a partner and find other details like primary point of contact, location, Sale pipeline etc';
   
    partnerTypes; // to hold all partners to bind in combobox

  
  
    handleChange(event) {
        
        const partnerTypeId = event.detail.value; // get selected channel partner Type Id

        // create and dispatch custom event so that selected channel partner Type Id is sent to master containner component
        const partnerTypeSelectedChangeEvent = new CustomEvent('selectedpartnertype',{detail: partnerTypeId});
        this.dispatchEvent(partnerTypeSelectedChangeEvent);
    }

    //Step 3: Import wire decorator > Import APEX method > Make a call to the method
    @wire(fetchPartnerTypes)
    processOutput({data,error})
    {
        if(data)
        {
            console.log('Before - Partner Type::' + JSON.stringify(data));
            this.partnerTypes = [{label:'--- Select Partner Type ---', value: ''}];

            // loop the data and change object keys
            data.forEach(item => {
                
                const partnerType = {};
                partnerType.label = item.Name;
                partnerType.value = item.Id;

                this.partnerTypes.push(partnerType);
                

            }); 
            console.log('After - Partner Type::' + JSON.stringify(this.partnerTypes));

        }
        else if(error)
        {
            console.log('Error:: ' + error.body.message);
        }
    }

    OpenNewPartnerTypeStdPage()
    {
        // configure input param
        const inputparm = {
            type: 'standard__objectPage',
            attributes: {
                actionName: 'new',
                objectApiName:'Partner_Type__c'
            }
        };

        this[NavigationMixin.Navigate](inputparm);
    }

    OpenNewAccountStdPage()
    {
        // configure input param
        const inputparm = {
            type: 'standard__objectPage',
            attributes: {
                actionName: 'new',
                objectApiName:'Account'
            }
        };

        this[NavigationMixin.Navigate](inputparm);
    }

    OpenNewContactStdPage()
    {
        // configure input param
        const inputparm = {
            type: 'standard__objectPage',
            attributes: {
                actionName: 'new',
                objectApiName:'Contact'
            }
        };

        this[NavigationMixin.Navigate](inputparm);
    }

    
    
}