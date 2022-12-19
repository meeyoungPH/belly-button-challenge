// Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

d3.json(url).then(function sampleData(d) {
    
    // assign dropdown element to variable
    let dropDown = d3.select('#selDataset');

    // save datasets to variables
    let names = d.names;
    let samples = d.samples;
    let metadata = d.metadata;

    // for each individual in list of names, add as dropdown menu option
    names.forEach(individual => {
        dropDown
            .append('option')
            .text(individual)
            .property('value', individual);
    });

    // Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
    d3.selectAll('#selDataset').on('change', plotOTU(samples, dropDown));

});

// function to plot top 10 OTUs
function plotOTU(samples, dropDown) {

    // save dropdown value to variable
    // TO DO: how to capture new selection??
    let selection = dropDown.property('value');

    // save data for top 10 OTUs
    let results = samples.filter(individual => individual.id == selection)[0];
    let sampleIds = results.otu_ids.slice(0,10).reverse();
    let sampleValues = results.sample_values.slice(0,10).reverse();
    let sampleLabels = results.otu_labels.slice(0,10).reverse();

    // add OTU prefix to IDs
    sampleIds = sampleIds.map(id => 'OTU ' + id);

    // specify chart parameters
    let trace1 = {
        type: 'bar',
        orientation: 'h',
        // Use sample_values as the values for the bar chart.
        x: sampleValues, 
        // Use otu_ids as the labels for the bar chart.
        y: sampleIds, 
        // Use otu_labels as the hovertext for the chart.
        text: sampleLabels  
    };

    let data = [trace1];

    let layout = {
        title: `Test Subject ${selection}:\n Top 10 OTUs by Sample Value`,
    };

    console.log(results);    
    console.log(sampleValues);
    console.log(sampleIds);

    // plot bar
    Plotly.newPlot('bar', data, layout);
};







// bar Chart
// Create a bubble chart that displays each sample.

// Use otu_ids for the x values.

// Use sample_values for the y values.

// Use sample_values for the marker size.

// Use otu_ids for the marker colors.

// Use otu_labels for the text values.

// Bubble Chart
// Display the sample metadata, i.e., an individual's demographic information.

// Display each key-value pair from the metadata JSON object somewhere on the page.

// hw
// Update all the plots when a new sample is selected. Additionally, you are welcome to create any layout that you would like for your dashboard. An example dashboard is shown as follows:

// hw
// Deploy your app to a free static page hosting service, such as GitHub Pages. Submit the links to your deployment and your GitHub repo. Ensure that your repository has regular commits and a thorough README.md file

// Advanced Challenge Assignment (Optional with no extra points earning)
// The following task is advanced and therefore optional.

// Adapt the Gauge Chart from https://plot.ly/javascript/gauge-charts/ Links to an external site.to plot the weekly washing frequency of the individual.

// You will need to modify the example gauge code to account for values ranging from 0 through 9.

// Update the chart whenever a new sample is selected.

// Weekly Washing Frequency Gauge
// Hints
// Use console.log inside of your JavaScript code to see what your data looks like at each step.

// Refer to the Plotly.js documentation Links to an external site.when building the plots.

// Requirements
// Bar Chart (30 points)
// Chart initializes without error (10 points)

// Chart updates when a new sample is selected (5 points)

// Chart uses Top 10 sample values as values (5 points)

// Chart uses otu_ids as the labels (5 points)

// Chart uses otu_labels as the tooltip (5 points)

// Bubble Charts (40 points)
// Chart initializes without error (10 points)

// Chart updates when a new sample is selected (5 points)

// Chart uses otu_ids for the x values (5 points)

// Chart uses otu_ids for marker colors (5 points)

// Chart uses sample_values for the y values (5 points)

// Chart uses sample_values for the marker size (5 points)

// Chart uses `otu_labels for text values (5 points)

// Metadata and Deployment (30 points)
// Metadata initializes without error (10 points)

// Metadata updates when a new sample is selected (10 points)

// App Successfully Deployed to Github Pages (10 points)