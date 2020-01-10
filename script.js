$(document).ready(function () {
    var container = $("#main-container");
    var count = 0;
    var count_display = $("#task_count");
    var dateDisplay = $("#date_display");
    var hourDisplay = $("#hour_display");
    var times = ["9-AM", "10-AM", "11-AM", "12-PM", "1-PM", "2-PM", "3-PM", "4-PM", "5-PM"];

    
    
    // Call function handling all function calls
   
    function main() {
        createDOM();
        display_time();
    }

    function createDOM() {
        for (var i = 0; i < times.length; i++) {
            // Create row for each time frame
            var hour_div = $("<div>");
            //Row attributes
            hour_div.attr("class", "row");
            hour_div.attr("data-row", times[i]);

            //create col for each planner element
            var time_div = $("<div>");
            var text_div = $("<div>");
            var save_div = $("<div>");
            //collum attributes
            time_div.attr("class", "col-sm-2 col-md-2 col-lg-2 hourDIV");
            time_div.attr("data-col", times[i] + " hourCOL")
            text_div.attr("class", "col-sm-8 col-md-8 col-lg-8 textDIV")
            text_div.attr("data-col", times[i] + " textCOL")
            save_div.attr("class", "col-sm-2 col-md-2 col-lg-2 saveDIV");
            save_div.attr("data-col", times[i] + " saveCOL")
            // append cols to row
            hour_div.append(time_div);
            hour_div.append(text_div);
            hour_div.append(save_div);

            //create col children
            var time_para = $("<p>");
            var text_area = $("<textarea>");
            var save_button = $("<button>");
            //children attributes
            time_para
                .attr("data-container", times[i])
                .attr("class", "hour-display")
                .text(times[i]);
            text_area.attr("data-container", times[i]);
            text_area.attr("id", times[i]);
            text_area.attr("placeholder", "Enter task and click save!");
            text_area.attr("class", "form-control text-display");
            if(localStorage.getItem(times[i])){
                var task = localStorage.getItem(times[i]);
                text_area.text(task);
            }
            
            save_button.attr("data-container", times[i]);
            save_button.attr("class", "btn btn-primary btn-block button-display");
            save_button.text("save");
            save_button.on("click", function () {
                // event.preventDefualt();
                var button_id = $(this).attr("data-container");
                saveTask(button_id);
            });
            // append children to cols
            time_div.append(time_para);
            text_div.append(text_area);
            save_div.append(save_button);
            // append row to parent container
            container.append(hour_div);
        }
    }
    
    function saveTask(button_id){
        var hour = button_id;
        var task = $("#"+hour).val();
        localStorage.setItem(hour, task);
    }
    function display_time(){
        setInterval(function(){
            console.log(moment().format( 'LTS'));
            dateDisplay.text(moment().format('MMMM Do YYYY'));
            hourDisplay.text(moment().format( 'LTS'));
        }, 1000)
    }

    main();
});

