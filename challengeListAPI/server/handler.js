const challengesList = [
    {
        "id": 1,
        "challengeTitle": "Bike to Work",
        "challengeDesc": "Replace your car or motorbike commute with biking to work. This will help reduce your carbon emissions.",
        "challengeStatus": "notStarted",
        "challengePoints": 10
      },
      {
        "id": 2,
        "challengeTitle": "Plant a Tree",
        "challengeDesc": "Plant a tree in your yard or a public space. Trees help absorb CO2 from the atmosphere.",
        "challengeStatus": "notStarted",
        "challengePoints": 50
      },
      {
        "id": 3,
        "challengeTitle": "Use Public Transportation",
        "challengeDesc": "Leave your car at home and use public transportation today.",
        "challengeStatus": "notStarted",
        "challengePoints": 8
      },
      {
        "id": 4,
        "challengeTitle": "Reduce Electricity Usage",
        "challengeDesc": "Cut down on electricity usage by turning off unused electronic devices and using energy-efficient lights.",
        "challengeStatus": "notStarted",
        "challengePoints": 5
      },
      {
        "id": 5,
        "challengeTitle": "Reduce Plastic Waste",
        "challengeDesc": "Reduce single-use plastic by bringing your own cloth shopping bags and water bottles.",
        "challengeStatus": "notStarted",
        "challengePoints": 3
      },
      {
        "id": 6,
        "challengeTitle": "Plant-Based Diet",
        "challengeDesc": "Try to avoid consuming animal products for a day. A plant-based diet has a lower carbon footprint compared to a meat-based diet.",
        "challengeStatus": "notStarted",
        "challengePoints": 15
      },
      {
        "id": 7,
        "challengeTitle": "Work from Home",
        "challengeDesc": "Reduce travel by working from home today.",
        "challengeStatus": "notStarted",
        "challengePoints": 20
      },
      {
        "id": 8,
        "challengeTitle": "Recycle Waste",
        "challengeDesc": "Separate and recycle your household waste, such as paper, plastic, and glass.",
        "challengeStatus": "notStarted",
        "challengePoints": 6
      },
      {
        "id": 9,
        "challengeTitle": "Use Renewable Energy",
        "challengeDesc": "Use renewable energy sources like solar panels or wind turbines for your home's energy needs.",
        "challengeStatus": "notStarted",
        "challengePoints": 30
      },
      {
        "id": 10,
        "challengeTitle": "Compost Organic Waste",
        "challengeDesc": "Start composting your organic food waste at home.",
        "challengeStatus": "notStarted",
        "challengePoints": 7
      },
      {
        "id": 11,
        "challengeTitle": "Reduce Water Usage",
        "challengeDesc": "Conserve water by fixing leaky faucets and using water-saving showerheads.",
        "challengeStatus": "notStarted",
        "challengePoints": 4
      },
      {
        "id": 12,
        "challengeTitle": "Shop Local",
        "challengeDesc": "Support the local economy by shopping at local markets and buying from local farmers.",
        "challengeStatus": "notStarted",
        "challengePoints": 12
      },
      {
        "id": 13,
        "challengeTitle": "Use Eco-Friendly Products",
        "challengeDesc": "Use environmentally friendly cleaning and personal care products.",
        "challengeStatus": "notStarted",
        "challengePoints": 9
      },
      {
        "id": 14,
        "challengeTitle": "Utilize Green Technology",
        "challengeDesc": "Invest in green technology such as LED lights and energy-efficient appliances.",
        "challengeStatus": "notStarted",
        "challengePoints": 18
      },
      {
        "id": 15,
        "challengeTitle": "Reduce Meat Consumption",
        "challengeDesc": "Cut down on red meat consumption to reduce your carbon footprint.",
        "challengeStatus": "notStarted",
        "challengePoints": 14
      }
]

const getAllChallenges = (req, res) =>{
    try{
        res.status(200).json(challengesList)
    } catch(error) {
        res.status(500).json(
            {
                message: "An error occured while fetching challenges list", error: error.message
            }
        )
    }
}

module.exports = {
    getAllChallenges
}