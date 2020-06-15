d3.csv("youtube.csv")
    .then(function (data) {
        console.log(data)

        // 1. Create first bar plot based on the "overall" column
        // the plot will show the frequency of the values

        score = data.map(function (d) {
            return d.overall;
        })

        ScoreValues = [0, 0, 0, 0, 0]
        for (var i = 0; i < score.length; i++) {
            // value will be 1, 2, 3, 4, or 5
            var value = score[i];
            // add one to the position in ScoreValues which holds the sum
            // subtract 1 from value because the indexes are 0, 1, 2, 3, 4
            ScoreValues[value - 1] += 1;
            // console.log(ScoreValues);
        }

        var rates = [1, 2, 3, 4, 5];
        // Create the Trace
        var trace1 = {
            x: rates,
            y: ScoreValues,
            type: "bar"
        };

        // Create the data array for the plot
        var data1 = [trace1];

        // Define the plot layout
        var layout1 = {
            title: "Scores by User",
            xaxis: { title: "Scores" },
            yaxis: { title: "User ID" }
        };

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar-plot1", data1, layout1);

        // 2. Create second bar plot based on the "unixReviewTime" column
        // first calculate the frequency of observations for each date
        // then bin each date according to whether it is popular, normal, slow or ultraslow
        // the bar plot will show how many dates are in each bin.

        var Days = data.map(function (d) {
            return d.unixReviewTime;
        })
        console.log("Days:", Days);

        // first calculate the frequency of observations for each date
        var dateFrequency = {}
        for (var i = 0; i < Days.length; i++) {
            // extract the day, month, and year from the unix timestamp
            var timestamp = parseInt(Days[i]);
            var day = new Date(timestamp * 1000).getDate()
            var month = new Date(timestamp * 1000).getMonth() + 1
            var year = new Date(timestamp * 1000).getFullYear()

            // format parts of the date into a string
            var date = `${month}/${day}/${year}`

            // if we haven't counted this date yet, initialize it to 0
            if (!dateFrequency.hasOwnProperty(date)){
                dateFrequency[date] = 0;
            }

            dateFrequency[date] += 1;
        }
        console.log("dateFrequency:", dateFrequency);

        // then bin each date according to whether it is popular, normal, slow or ultraslow        var popularDays = 0;
        var popularDays = 0;
        var normalDays = 0;
        var slowDays = 0;
        var ultraslowdays = 0;

        // loop through TotalofUsers
        Object.entries(dateFrequency).forEach(([key, value])=>{
            if (value > 10) { popularDays += 1; }
            else if (value > 5) { normalDays += 1; }
            else if (value > 2) { slowDays += 1; }
            else { ultraslowdays += 1; }
        })
        console.log("popular, normal, slow, and ultraslow days", popularDays, normalDays, slowDays, ultraslowdays)

        var Frequency = [ultraslowdays, slowDays, normalDays, popularDays];
        var TypeofDay = ["ultraslowdays", "slowDays", "normalDay", "popularDays"];
        // Create the Trace
        var trace2 = {
            x: TypeofDay,
            y: Frequency,
            type: "bar"
        };

        // Define the plot layout
        var layout2 = {
            title: "Views per type of Day",
            xaxis: { title: "Type of Day" },
            yaxis: { title: "Total number of Days" }
        };

        // Create the data array for the plot
        var data2 = [trace2];

        // Plot the chart to a div tag with id "bar-plot"
        Plotly.newPlot("bar-plot2", data2, layout2);
    });