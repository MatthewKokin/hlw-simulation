import daysBeforeDate from './daysBeforeDate.js';

export default class PowerPlant {
    constructor(name, capacity, closingDate) {
        this.name = name;
        this.capacity = capacity; // in GW
        this.wastePerMwPerDay = (capacity * 65) / 365;
        this.closingDate = closingDate;
        this.nuclearWaste = 0; // in metric tons
        this.generatedElectricity = 0;
        this.operationalDays = 0; // total days the plant has been operational
        this.daysBeforeClosing = 0;
    }

    operate(days = 1) {
        this.daysBeforeClosing = daysBeforeDate(this.closingDate);
        
        if (days < this.daysBeforeClosing) {
            this.operationalDays += days;
            this.daysBeforeClosing -= days;
        } else {
            this.operationalDays += this.daysBeforeClosing;
            this.daysBeforeClosing = 0;
        }
        
        this.generateWaste(this.operationalDays);
        this.generateElectricity(this.operationalDays);
    }

    generateElectricity(days) {
        this.generatedElectricity = (days / 365) * this.capacity;
    }

    generateWaste(days) {
        this.nuclearWaste += this.capacity * this.wastePerMwPerDay * days;
    }
}
