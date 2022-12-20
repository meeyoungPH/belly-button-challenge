# Belly Button Challenge
In this project, I use D3 and Plotly to create a custom dashboard for visualizing bacterial testing results of belly button samples from numerous test subjects. Data are dynamically shown in a bar chart, bubble chart, and gauge along with demographic details about the chosen test subject.


## Tools/Libraries
* Javascript
* D3
* Plotly.JS
* Bootstrap

## Analysis and Visualization
![screenshot](images/dashboard_956.png)

### The following steps were involved in developing the dashboard:

1. Use the D3 library to read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
   
   * The shading of the bars are color coordinated to match the corresponding color of the bubbles in the bubble chart

3. Create a bubble chart that displays each sample.

4. Display the sample metadata, i.e., an individual's demographic information.

5. (optional) Add a gauge chart.

   * The color of the bar changes to red, orange, yellow, or green depending on the wash frequency of the test subject.
6. Update charts and values when a new test subject is selected in the dropdown menu.

7. Deploy page via Github Pages.
