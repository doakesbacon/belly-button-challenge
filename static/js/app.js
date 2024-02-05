const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'
 
// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });

 
function init() {

    // Use D3 to select the dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    // Use D3 to get sample names and populate the drop-down selector
    d3.json(url).then((data) => {
        
        // Set a variable for the sample names
        let names = data.names;

        // Add  samples to dropdown menu
        names.forEach((id) => {

            // Log the value of id for each iteration of the loop
            console.log(id);

            dropdownMenu.append("option")
            .text(id)
            .property("value",id);
        });

        // Set the first sample from the list
        let sampleOne = names[0];
        // Log the value of sample_one
        console.log(sampleOne);

        // Build the initial plots
        metadata(sampleOne);
        barChart(sampleOne);
        bubbleChart(sampleOne);

    });
};

function metadata(sample) {

    // Use D3 to retrieve all of the data
    d3.json(url).then((data) => {

        // Retrieve all metadata
        let metadata = data.metadata;

        // Filter based on the value of the sample
        let value = metadata.filter(result => result.id == sample);

        // Log the array of metadata objects after the have been filtered
        console.log(value)

        // Get the first index from the array
        let valueData = value[0];

        // Clear out metadata
        d3.select("#sample-metadata").html("");

        // Use Object.entries to add each key/value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

            // Log the individual key/value pairs as they are being appended to the metadata panel
            console.log(key,value);

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};


//bar char logic 
function barChart(sample){

        //d3 to get data
        d3.json(url).then((data) => {
            
            //settign data values
            let selectedData = data.samples;
            let value = selectedData.filter(results => results.id == sample);

            //log value for testign
            console.log(value)

            let valueData = value[0];

            let otuIDS = valueData.otu_ids;
            let otuLabels = valueData.otu_labels;
            let sampleValues = valueData.sample_values;
            
            // Set top ten items to display in descending order
            let yticks = otuIDS.slice(0,10).map(id => `OTU ${id}`).reverse();
            let xticks = sampleValues.slice(0,10).reverse();
            let labels = otuLabels.slice(0,10).reverse();
    
            // Set up the trace for the bar chart
            let trace = {
                x: xticks,
                y: yticks,
                text: labels,
                type: "bar",
                orientation: "h"
    };

        // Setup the layout
        let layout1 = {
            title: "Top 10 OTUs Present"
        };

    // Call Plotly to plot the bar chart
        Plotly.newPlot("bar", [trace], layout1)
    });
};

function bubbleChart(sample){

        //d3 to get data
        d3.json(url).then((data) => {
            
            //settign data values
            let selectedData = data.samples;
            let value = selectedData.filter(results => results.id == sample);

            //log value for testign
            console.log(value)

            let valueData = value[0];

            let otuIDS = valueData.otu_ids;
            let otuLabels = valueData.otu_labels;
            let sampleValues = valueData.sample_values;
       
    
            // Set up the trace for the bar chart
            let trace1 = {
                x: otuIDS,
                y: sampleValues,
                text: otuLabels,
                mode: "markers",
                marker: {
                    size: sampleValues,
                    color: otuIDS,
                    colorscale: "Jet"
                }
    };

        // Setup the layout
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closet",
            xaxis: {title: "OTU ID"}
        };

    // Call Plotly to plot the bar chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

    
function optionChanged(value) { 

    // Log the new value
    console.log(value); 

    // Call all functions 
    metadata(value);
    barChart(value);
    bubbleChart(value);
 

};

// Call the initialize function
init();