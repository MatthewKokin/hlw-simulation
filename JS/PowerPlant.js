export default class PowerPlant {
    constructor(name, capacity, daysBeforeClosing, isOperational, constructionFinishTime, isBuilding, type) {
        this.name = name;
        this.capacity = capacity; // in GW
        this.nuclearWaste = 0; // in metric tons
        this.generatedElectricity = 0;
        this.operationalDays = 0; // total days the plant has been operational
        this.daysBeforeClosing = daysBeforeClosing;
        this.isOperational = isOperational
        this.constructionFinishTime = constructionFinishTime
        this.isBuilding = isBuilding
        this.type = type
        this.uraniumYearlyConsumption = 0
        this.wastePerDay = 0
        
        this.calculateUraniumYearlyConsumption()
        this.calculateWastePerDay()
    }

    calculateUraniumYearlyConsumption(){
        let tonnesOfUperYear = this.type === "AGR" ? 78 : 22
        this.uraniumYearlyConsumption = this.capacity * tonnesOfUperYear
    }

    calculateWastePerDay(){
        this.wastePerDay = this.uraniumYearlyConsumption / 365
    }


    continueBuilding(days) {
        this.constructionFinishTime -= days
    }

    isOperatingOrBuilding(days) {
        if (this.isBuilding){
            if (this.constructionFinishTime > days) {
                this.continueBuilding(days)
                return this.operate(0)
            }
            else if (this.constructionFinishTime == days) {
                this.continueBuilding(days)
                this.isBuilding = false
                this.isOperational = true
                return this.operate(0)
            }
            else if (this.constructionFinishTime < days) {
                this.isBuilding = false
                this.isOperational = true
                this.daysOperating = days - this.constructionFinishTime
                this.continueBuilding(this.constructionFinishTime)
                return this.operate(this.daysOperating)
            }
            else{
                throw new Error("Unhandled case in isOperatingOrBuilding/PowerPlant.js");
            }
        } else {
            return this.operate(days)
        }
    }

    operate(days) {
        let wasteMassThisYear = 0
        let uraniumUsedThisYear = 0

        if (days < this.daysBeforeClosing) {
            wasteMassThisYear = this.generateWaste(days)
            uraniumUsedThisYear = this.useUranium(days)
            this.generateElectricity(days)

            this.operationalDays += days;
            this.daysBeforeClosing -= days;
        } else if (this.daysBeforeClosing != 0 && days > this.daysBeforeClosing) {
            wasteMassThisYear = this.generateWaste(this.daysBeforeClosing)
            uraniumUsedThisYear = this.useUranium(this.daysBeforeClosing)
            this.generateElectricity(this.daysBeforeClosing)

            this.operationalDays += this.daysBeforeClosing;
            this.daysBeforeClosing = 0;
            this.isOperational = false
        } else if (this.daysBeforeClosing == 0) {
            wasteMassThisYear = 0
            uraniumUsedThisYear = 0
            this.generateElectricity(0)
        }
        
        const wasteVolumeThisYear = this.wasteMassToVolume(wasteMassThisYear)
        this.nuclearWaste = this.generateWaste(this.operationalDays)
        let wasteVolumeTotal = this.wasteMassToVolume(this.nuclearWaste);

        return [wasteVolumeThisYear, wasteVolumeTotal, uraniumUsedThisYear]
    }

    generateElectricity(days) {
        this.generatedElectricity = (days / 365) * this.capacity;
    }

    generateWaste(days) {
        const wasteGenerated = this.capacity * this.wastePerDay * days;
        this.nuclearWaste += wasteGenerated;
        return wasteGenerated
    }
    wasteMassToVolume(mass) {
        //Density is 18.4 tonne per m^3, assume 1:1 conditionning with glass, or if not coditionned, then the volume of a container
        return (mass / 18.4) * 1.5
    }

    useUranium(days){
        return (this.uraniumYearlyConsumption / 365)*days
    }
}
