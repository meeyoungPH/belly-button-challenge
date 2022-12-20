// Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json'

// extract data from json
var belly_data = d3.json(url).then(d => d);
    
// function to initialize page
function init() {

    // access stored data
    belly_data.then(function(d){

        // generate options for dropdown menu
        d.names.forEach(subject => {
            d3.select('#selDataset')
                .append('option')
                .text(subject)
                .property('value', subject);
        });

        // plot charts for first name value
        plotBarTopTen(d.names[0]);
        plotBubble(d.names[0]);
    });
};

// initialize page
init();

// plot horizontal bar chart with top 10 OTUs per test subject
function plotBarTopTen(name) {
    
    console.log('subject id: ' + name);

    // save data to variables for chart
    belly_data.then(function(d){
        let results = d.samples.filter(subject => subject.id == name)[0];

        // set parameters for plot
        let trace1 = {
            type: 'bar',
            orientation: 'h',
            x: results.sample_values.slice(0,10).reverse(),
            y: results.otu_ids.slice(0,10).reverse().map(id => 'OTU ' + id),
            text: results.otu_labels.slice(0,10).reverse(),
            marker: {
                color: results.otu_ids.slice(0,10).reverse()
            }
        };

        let data = [trace1];

        // plot settings
        let layout = {
            title: `Test Subject ${name}: Top 10 OTUs by Sample Value`
        };

        // draw plot
        Plotly.newPlot('bar', data, layout);
    });
};

// create a bubble chart that displays each sample
function plotBubble(name) {

    // save data to variables for chart
    belly_data.then(function(d) {
        let results = d.samples.filter(subject => subject.id == name)[0];
        console.log(results.sample_values);

        let trace1 = {
            x: results.otu_ids,
            y: results.sample_values,
            text: results.otu_labels,
            mode: 'markers',
            marker: {
                size: results.sample_values.map(value => Math.sqrt(value)*8),
                color: results.otu_ids
            }
        };

        let data = [trace1];

        let layout = {
            title: `Test Subject ${name}: Sample size by OTU ID `
        }; 

        // draw plot
        Plotly.newPlot('bubble', data, layout);
    });
};





// Use otu_ids for the x values.

// Use sample_values for the y values.

// Use sample_values for the marker size.

// Use otu_ids for the marker colors.

// Use otu_labels for the text values.

// Bubble Chart
// Display the sample metadata, i.e., an individual's demographic information.

// Display each key-value pair from the metadata JSON object somewhere on the page.

// function to update charts when dropdown selection changes
function optionChanged(name) {
    plotBarTopTen(name);
    plotBubble(name);
};

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