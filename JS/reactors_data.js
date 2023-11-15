const data = [
    {"name": "Hartlepool", "capacity": 1.185, "days_before_closing": 137, isOperational: true, "construction_done": null},
    {"name": "Heysham_A", "capacity": 1.060, "days_before_closing": 46, isOperational: true, "construction_done": null},
    {"name": "Heysham_B", "capacity": 1.240, "days_before_closing": 2238, isOperational: true, "construction_done": null},
    {"name": "Sizewell-B", "capacity": 1.198, "days_before_closing": 4064, isOperational: true, "construction_done": null},
    {"name": "Torness", "capacity": 1.200, "days_before_closing": 2238, isOperational: true, "construction_done": null},
    {"name": "Hinkley-Point-C", "capacity": 3.20, "days_before_closing": 65*365, isOperational: false, "construction_done": 717},
    {"name": "Sizewell-C", "capacity": 3.20, "days_before_closing": 65*365, isOperational: false, "construction_done": 352 + (7 * 365)},
]

export default data
/* Max age for Hinkley Point C is 60 years old (They will definetly push it to 65 though, for sure xDD) [gov.uk Hicley Point C report downloaded]
Hinkley-Point-C is operational on 2025 Nov ([gov.uk Hicley Point C report downloaded] said that end of 2025) => 717 days
Assume Sizwell-B is 60 years old as well, Decision sometime in 2024 (find some source) (assume nov 2024), Assume wil take 8 years to build. Hence: 352 + 7 * 365

const data = [
    {"name": "Hartlepool", "capacity": 1.185, "closing_date": "2024-04-01"},
    {"name": "Heysham_A", "capacity": 1.060, "closing_date": "2024-01-01"},
    {"name": "Heysham_B", "capacity": 1.240, "closing_date": "2030-01-01"},
    {"name": "Sizewell-B", "capacity": 1.198, "closing_date": "2035-01-01"},
    {"name": "Torness", "capacity": 1.200, "closing_date": "2030-01-01"},
]
*/