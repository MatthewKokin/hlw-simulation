export default class PowerPlant {
    constructor(name, capacity, daysBeforeClosing) {
        this.name = name;
        this.capacity = capacity; // in GW
        this.wastePerMwPerDay = (capacity * 65) / 365;
        this.nuclearWaste = 0; // in metric tons
        this.generatedElectricity = 0;
        this.operationalDays = 0; // total days the plant has been operational
        this.daysBeforeClosing = daysBeforeClosing;
    }

    operate(days = 1) {
        if (days < this.daysBeforeClosing) {
            this.operationalDays = days;
            this.daysBeforeClosing -= days;
        } else if (this.daysBeforeClosing != 0 && days > this.daysBeforeClosing) {
            this.operationalDays = this.daysBeforeClosing;
            this.daysBeforeClosing = 0;
        } else if (this.daysBeforeClosing == 0) {
            this.operationalDays = 0
        }
        
        this.generateWaste(this.operationalDays);
        this.generateElectricity(this.operationalDays);
        return this.generateWaste(this.operationalDays)
    }

    generateElectricity(days) {
        this.generatedElectricity = (days / 365) * this.capacity;
    }

    generateWaste(days) {
        const wasteGenerated = this.capacity * this.wastePerMwPerDay * days;
        this.nuclearWaste += wasteGenerated;
        return wasteGenerated
    }
}
