/*We have a total of 107 cargo types available.*/
const cargoTypes = [
    {value: "Food-Items", label: "Food Items-Dry Fast-Moving Consum"},
    {value: "Items-Cold", label: "Food Items-Cold Fast-Moving Consum"},
    {value: "Food-Items", label: "Food Items-Dry Health Care"},
    {value: "Items-Cold", label: "Food Items-Cold Health Care"},
    {value: "Petrol", label: "Petroleum Products-Petrol 91"},
    {value: "Petrol", label: "Petroleum Products-Petrol 95"},
    {value: "Diesel", label: "Petroleum Products-Diesel"},
    /*{value: "8", label: "Petroleum Products-Kerosene"},
    {value: "9", label: "Petroleum Products-Petrochemicals"},
    {value: "10", label: "Petroleum Products-Oils"},
    {value: "11", label: "Petroleum Products-Petroleum Gas"},
    {value: "12", label: "Petroleum Products-Continent"},
    {value: "13", label: "Petroleum Products-Paraffin Wax"},
    {value: "14", label: "Petroleum Products-Asphalt"},*/
    {value: "Petrol", label: "Petroleum Products-Jet Fuel"},
    {value: "Vehicle-Transportation", label: "Vehicle Transportation-Private Transportation For Individuals"},
    {value: "Vehicle-Transportation", label: "Vehicle Transportation-Vehicle Transportation For Individuals"},
    {value: "Vehicle-Transportation", label: "Vehicle Transportation-Private Transport For Business Sector"},
    {value: "Vehicle-Transportation", label: "Vehicle Transportation-Business Vehicle Transportation"},
    {value: "Vehicle-Transportation", label: "Vehicle Transportation-Damaged Vehicles Transportation"},
    /*{value: "21", label: "Dangerous Materials-Explosives"},
    {value: "22", label: "Dangerous Materials-Gases"},
    {value: "23", label: "Dangerous Materials-Flammable Liquid"},*/
    {value: "Medical-Items", label: "Medical supplies and hospital supplies"},
    /*{value: "25", label: "Dangerous Materials-Dangerous Materials-Toxic and infectious substances"},
    {value: "26", label: "Dangerous Materials-Radioactive material"},
    {value: "27", label: "Dangerous Materials-Corrosive substances"},
    {value: "28", label: "Dangerous Materials-Miscellaneous dangerous substances"},*/
    {value: "Concrete", label: "Building And Construction Items-Concrete"},
    /*{value: "30", label: "Building And Construction Items-Steel"},*/
    {value: "Building", label: "Building And Construction Items-Pipes and water extension materials include tanks"},
    {value: "Building", label: "Building And Construction Items-Glass and aluminum panels include doors and windows"},
    {value: "Building", label: "Building And Construction Items-Finishing works, paints and external textures"},
    {value: "Building", label: "Building And Construction Items-Equipment and tools include saws, hammers, fisher"},
    {value: "Building", label: "Building And Construction Items-Plumbing work and health extensions"},
    {value: "Building", label: "Building And Construction Items-Insulating materials"},
    {value: "Building", label: "Building And Construction Items-Book and asphalt materials"},
    {value: "Building", label: "Building And Construction Items-Woods include carpentry wood, doors and succession"},
    {value: "Building", label: "Building And Construction Items-Reinforcing"},
    {value: "Building", label: "Building And Construction Items-Electricityextensions materials"},
    {value: "Building", label: "Building And Construction Items-Stones, rocks and paving materials, and this is formed tiles"},
    /*{value: "42", label: "Building And Construction Items-Clay"},*/
    /*{value: "43", label: "Building And Construction Items-Brick"},*/
    {value: "Building", label: "Building And Construction Items-Air conditioning tools and machines include extension tubes and air dictations"},
    {value: "Building", label: "Mining or Fossilization Materials-Bauxite/ Aluminium Ore - AL2O3 > 40?"},
    {value: "Building", label: "Mining or Fossilization Materials-Copper"},
    {value: "Building", label: "Mining or Fossilization Materials-Feldspar"},
    {value: "Building", label: "Mining or Fossilization Materials-Fluorite"},
    {value: "Building", label: "Mining or Fossilization Materials-Garnet Minerals Group - Other Uses"},
    {value: "Building", label: "Mining or Fossilization Materials-Gypsum & Anhydrite"},
    {value: "Building", label: "Mining or Fossilization Materials-Iron ore - Fe<40?"},
    {value: "Building", label: "Mining or Fossilization Materials-Limestone for industry"},
    {value: "Building", label: "Mining or Fossilization Materials-Magnesite"},
    {value: "Building", label: "Mining or Fossilization Materials-Marble for industry"},
    {value: "Building", label: "Mining or Fossilization Materials-Nepheline Syenite"},
    {value: "Building", label: "Mining or Fossilization Materials-Perlite"},
    {value: "Building", label: "Mining or Fossilization Materials-Potash"},
    {value: "Building", label: "Building And Construction Items-Cement"},
    {value: "Food-Items", label: "Food Items-Dairy"},
   /* {value: "60", label: "LIVE ANIMALS-Birds"},
    {value: "61", label: "LIVE ANIMALS-Cattles"},
    {value: "62", label: "Sanitation"},*/
    {value: "Water", label: "Water Tanks"},
    /*{value: "64", label: "Gas Tanks"},*/
    {value: "Sand", label: "Building And Construction Items-Sand"},
    /*{value: "66", label: "Spares-Used spare and scrap"},*/
    {value: "closeed", label: "Reinforcing-Computers, electronic and optical products"},
    {value: "Tires", label: "Spares-Tires"},
    {value: "All", label: "Industrial-Plastic materials"},
    /*{value: "70", label: "Chemicals materials"},
    {value: "71", label: "Agricultural-Forage and grain"},*/
    {value: "Food-Items", label: "Food Items-Oils"},
    /*{value: "73", label: "Petroleum Products-Oils"},
    {value: "74", label: "Prefabricated Houses"},*/
    {value: "Food-Items", label: "Food Items-Soft drinks"},
    /*{value: "76", label: "Industrial-Raw materials for manufacturing industries"},
    {value: "77", label: "LIVE ANIMALS-Camels and Horses"},*/
    {value: "All", label: "Furniture-Used Furniture"},
    {value: "All", label: "Furniture- New Furniture"},
    {value: "All", label: "Clothes and Shoes"},
    /*{value: "81", label: "Charcoal and Firewood"},*/
    {value: "Medical-Items", label: "Medicines"},
    {value: "All", label: "Industrial-Leather products and related products"},
    {value: "All", label: "Industrial-Paper and its products"},
    {value: "All", label: "Industrial-Rubber and plastics"},
    {value: "Medical-Items", label: "Veterinary medicines"},
    /*{value: "87", label: "Bicycles"},
    {value: "88", label: "Motorbikes"},*/
    {value: "Medical-Items", label: "Medical supplies and hospital supplies"},
    {value: "closeed", label: "Books"},
    /*{value: "91", label: "Agricultural-Agricultural materials and fertilizers"},*/
    /*{value: "92", label: "Electricity Generators"},*/
    {value: "All", label: "Textile and sewing materials"},
    /*{value: "94", label: "Tobacco Products"},
    {value: "95", label: "Remnants"},*/
    {value: "Building", label: "Building And Construction Items-Ferrous materials"},
    {value: "All", label: "Spares-New spare"},
    {value: "All", label: "Bottled water"},
    {value: "containers", label: "containers"},
    /*{value: "100", label: "Waste material-Medical Waste"},*/
    {value: "All", label: "sponges"},
    {value: "gypsum", label: "Building And Construction Items-gypsum"},
    {value: "Food-Items", label: "Food Items-Vegetables and fruits"},
    {value: "All", label: "Cleaning materials-soap"},
    {value: "All", label: "Cleaning materials-Tissue paper"},
    {value: "All", label: "Cleaning materials-napkins"},
    {value: "heavy", label: "Industrial-Industrial machines"}
 
];
const selectElement = document.getElementById("typeCargo");

cargoTypes.forEach(item => {
    const option = document.createElement("option");
    option.value = item.value;
    option.textContent = item.label;
    selectElement.appendChild(option);
});


// "If the user selects the type, the appropriate trucks will be displayed."
const selectType = document.getElementById('typeCargo');
const truckOptions = document.getElementsByClassName('form-element');

selectType.addEventListener('change', function() {
    const selectedValue = this.value;

    for (let i = 0; i < truckOptions.length; i++) {
        const option = truckOptions[i];
        const platform = option.getAttribute('class');

        if (platform.includes(selectedValue)) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    }
});
