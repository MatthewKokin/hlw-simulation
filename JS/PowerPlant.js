export default class PowerPlant {
    constructor(name, capacity, daysBeforeClosing, isOperational, constructionFinishTime) {
        this.name = name;
        this.capacity = capacity; // in GW
        this.wastePerMwPerDay = (capacity * 65) / 365;
        this.nuclearWaste = 0; // in metric tons
        this.generatedElectricity = 0;
        this.operationalDays = 0; // total days the plant has been operational
        this.daysBeforeClosing = daysBeforeClosing;
        this.isOperational = isOperational
        this.constructionFinishTime = constructionFinishTime
    }
    continueBuilding(days) {
        this.constructionFinishTime -= days
    }

    isOperatingOrBuilding(days) {
        if (!this.isOperational){
            if (this.constructionFinishTime >= days) {
                continueBuilding(days)
                this.operate(0)
            }
            else if (this.constructionFinishTime < days) {
                this.isOperational = true
                this.constructionFinishTime = 0

                daysOperating = days - this.constructionFinishTime
                this.operate(daysOperating)
            }
            else{
                throw new Error("Unhandled case in isOperatingOrBuilding/PowerPlant.js");
            }
        }
    }

    operate(days = 1) {
        let wasteMassThisYear = 0

        if (days < this.daysBeforeClosing) {
            wasteMassThisYear = this.generateWaste(days)
            this.operationalDays += days;
            this.daysBeforeClosing -= days;
        } else if (this.daysBeforeClosing != 0 && days > this.daysBeforeClosing) {
            wasteMassThisYear = this.generateWaste(this.daysBeforeClosing)
            this.operationalDays += this.daysBeforeClosing;
            this.daysBeforeClosing = 0;
        } else if (this.daysBeforeClosing == 0) {
            wasteMassThisYear = 0
        }
        
        const wasteVolumeThisYear = this.wasteMassToVolume(wasteMassThisYear)
        this.nuclearWaste = this.generateWaste(this.operationalDays)
        let wasteVolumeTotal = this.wasteMassToVolume(this.nuclearWaste);
        this.generateElectricity(this.operationalDays)

        return [wasteVolumeThisYear, wasteVolumeTotal]
    }

    generateElectricity(days) {
        this.generatedElectricity = (days / 365) * this.capacity;
    }

    generateWaste(days) {
        const wasteGenerated = this.capacity * this.wastePerMwPerDay * days;
        this.nuclearWaste += wasteGenerated;
        return wasteGenerated
    }
    wasteMassToVolume(mass) {
        return mass / 19.8
    }
}
