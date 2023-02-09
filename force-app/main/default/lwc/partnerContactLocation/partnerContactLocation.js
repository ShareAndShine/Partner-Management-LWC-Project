import { LightningElement, api, wire } from 'lwc';

import { getRecord } from 'lightning/uiRecordApi';

// import leaftlet from static resource
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import LEAFLET from '@salesforce/resourceUrl/leaflet';

export default class PartnerContactLocation extends LightningElement {

 
    // public property to receive partner account Id from parent component (partner Detail)
    @api partnerAccountId; 

    // property to hold location coordinates
    latitude;
    longitude;

    leaftetMap;

    // get lat and long values from DB using get Record
    @wire(getRecord, { recordId: '$partnerAccountId', fields: ['Account.Partner_Geo_Location__Latitude__s', 'Account.Partner_Geo_Location__Longitude__s']})
    processOutput({data,error})
    {
        if(data)
        {
            // Read values from field and assign to a local property
            this.latitude = data.fields.Partner_Geo_Location__Latitude__s.value;
            this.longitude = data.fields.Partner_Geo_Location__Longitude__s.value;
            
            console.log('lat:' + data.fields.Partner_Geo_Location__Latitude__s.value);
            console.log('longt:' + data.fields.Partner_Geo_Location__Longitude__s.value);
        }
        else if(error)
        {
            console.log('Error');
        }
    }

    connectedCallback()
    {
        Promise.all([
            loadStyle(this, LEAFLET + '/leaflet.css'),
            loadScript(this, LEAFLET + '/leaflet.js'),
        ]).then(() => {
            this.plotMap();
        });
    }

    plotMap()
    {
        // find the div where we wanted to plot the map
        const map = this.template.querySelector('.map');
        if(map){
            this.leafletMap = L.map(map, {zoomControl : true} ).setView([51.505, -0.09], 13);
            L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {attribution : 'Contact Location'}).addTo(this.leafletMap);
        }

        //const location = [51.505, -0.09];
        const location = [this.latitude, this.longitude];

        const leafletMarker = L.marker(location);
        leafletMarker.addTo(this.leafletMap);
        this.leafletMap.setView(location);
    }
}