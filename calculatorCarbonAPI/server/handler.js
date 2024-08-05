async function calculateCarbon(transportation, electricity, waste) {
    try {
        const transportationEmission = transportation * 0.21; 
        const electricityEmission = electricity * 0.5; 
        const wasteEmission = waste * 0.4; 
        const totalEmission = transportationEmission + electricityEmission + wasteEmission;
        return {
            error: false,
            message: totalEmission
        };
    } catch (error) {
        return {
            error: true,
            message: 'Error while calculating carbon'
        };
    }
}

module.exports = {
    calculateCarbon
}