import { LightningElement, wire, api } from 'lwc';

import fetchPartnerType from '@salesforce/apex/partnerSearchResultController.getPartners';

export default class PartnerSearchResult extends LightningElement {

    /*accountData = {
        Id: '0x111',
        userImg : 'https://randomuser.me/api/portraits/med/women/22.jpg',
        companyName : 'Oracle',
        userName: 'John Doe',
        partnerType:'Marketing PArtner'
    };*/

    // public property that receives selected partner type Id
    @api channelPartnerTypeId ;

    // property to hold selected partner account Id received from child component (partner Card)
    selectedPartnerCardAccountId;



    partnerDataFromDB; // local property to hold all partner from DB

    // Make a call to APEX method
    @wire(fetchPartnerType,{partnerTypeId: '$channelPartnerTypeId'})
    processOutput({data, error}) // Use {data, error} default system properties from result object to access retrieved data 
    {
        if(data)
        {
            console.log('Data from DB::' + JSON.stringify(data));
            this.partnerDataFromDB = data; // copy the data


        }
        else  if(error)
        {
            console.log('Error');
        }
    }


    get IsPartnerfound()
    {
        if(this.partnerDataFromDB != null && this.partnerDataFromDB.length > 0)
        {
            return true;
        }
        return false;
    }


    selectedPartnerHandler(event)
    {
        const partnerId = event.detail;
        this.selectedPartnerCardAccountId = partnerId;
    }
   
}