import { LightningElement, api, wire } from 'lwc'; // Step 1

import { getRecord, getFieldValue } from 'lightning/uiRecordApi'; // Step 2 

// Step 3: fields that needs to be retrieved from the DB
import CLOSEDATE_FIELD from '@salesforce/schema/Opportunity.CloseDate';
import STAGE_FIELD from '@salesforce/schema/Opportunity.StageName';



export default class OppCountDownTimer extends LightningElement {


    // public property
    @api recordId;

    // private reactive property 
    timer = 'Yet to implement!!!'

    currentRecordId;
    CloseDate;
    setTimeInterval; 

    connectedCallback() {
        this.currentRecordId = this.recordId;
    }

    @wire(getRecord, { recordId: "$recordId", fields: [CLOSEDATE_FIELD, STAGE_FIELD] })
    processCloseMileStone({ data, error }) {
        if (data) // check for data
        {
            this.timer = JSON.stringify(data);

            this.CloseDate = getFieldValue(data, CLOSEDATE_FIELD);

            clearInterval(this.setTimeInterval);

            // Count down timer JS logic setinterval method
            this.setTimeInterval = setInterval(() => {

                let day = new Date(this.CloseDate);
                let ddate = day.getTime();

                let currentDateTime = new Date().getTime();

                let timedifference = ddate - currentDateTime; // find time difference between close datetime and current datetime

                if (timedifference < 0) // opp. close date is in the past
                {
                    this.timer = 'Close Date lapsed !!!';
                    clearInterval(this.setTimeInterval);
                }
                else // opp. close date is in future
                {
                    let days = Math.floor(timedifference / (1000 * 60 * 60 * 24));

                    let hours = Math.floor(
                        (timedifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
                    );

                    let mins = Math.floor(
                        (timedifference % (1000 * 60 * 60)) / (1000 * 60)
                    );

                    let secs = Math.floor(
                        (timedifference % (1000 * 60)) / (1000)
                    );

                    this.timer = days + ' days ' + hours + ' hrs' + mins + " mins " + secs + " secs ";

                }


            }, 1000)




        }
        else if (error) {
            this.time = 'Something went wrong !!!!';
        }
    }

}