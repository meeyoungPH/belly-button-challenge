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

        // plot charts for first subject
        let initId = d.names[0];
        plotBarTopTen(initId);
        plotBubble(initId);
        metadata(initId);
        plotGauge(initId);
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
            // use the top 10 sample values for the x values
            x: results.sample_values.slice(0,10).reverse(),
            // use the top 10 OTU ids for the y values
            y: results.otu_ids.slice(0,10).reverse().map(id => 'OTU ' + id),
            // use the OTU labels for the text values
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

        let trace1 = {
            // Use otu_ids for the x values.
            x: results.otu_ids,
            // Use sample_values for the y values.
            y: results.sample_values,
            // Use otu_labels for the text values.
            text: results.otu_labels,
            mode: 'markers',
            marker: {
                // Use sample_values for the marker size.
                size: results.sample_values.map(value => Math.sqrt(value)*8),
                // Use otu_ids for the marker colors.
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

// display the sample metadata for the chosen test subject
function metadata(name) {
    // clear demographic info box of any content
    d3.select('#sample-metadata')
        .selectAll('p')
        .remove();

    // access metadata
    belly_data.then(function(d) {
        let results = d.metadata.filter(subject => subject.id == name)[0];

        // loop through dictionary pairs
        for (const [key, value] of Object.entries(results)) {
            
            // append each key-value pair to the demographic info box
            d3.select('#sample-metadata')
                .append('p')
                .text(`${key}: ${value}`)
                .property('value', value)
        };
    });
};

// display the wash frequency of the test subject
function plotGauge(name) {
    
    // access the wash frequency data from the metadata
    belly_data.then(function(d) {
        let results = d.metadata.filter(subject => subject.id == name)[0];
        
        // color range
        let colorRange = ['red', 'red', 'red', 'orange', 'orange', 'yellow', 'yellow', 'green', 'green', 'green']

        // parameters for gauge
        let data = [{
            title: {text: 'Wash Frequency'},
            type: 'indicator',
            mode: 'gauge+number',
            gauge: {
                axis: {range: [null, 9]},
                bar: {color: colorRange[results.wfreq]}
            },
            // wash frequency value
            value: results.wfreq    
        }];

        // draw gauge
        Plotly.newPlot('gauge',data);
    });
};

// function to update charts when dropdown selection changes
function optionChanged(name) {
    plotBarTopTen(name);
    plotBubble(name);
    metadata(name);
    plotGauge(name);
};