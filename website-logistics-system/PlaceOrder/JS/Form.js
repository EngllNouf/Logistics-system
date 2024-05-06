 // Default tab
$(".tab").css("display", "none");
$("#tab-1").css("display", "block");

function run(hideTab, showTab) {
    if (hideTab < showTab) { // If not pressing previous button
    // Validation if pressing next button
    var currentTab = 0;
    var x = $('#tab-' + hideTab);
    var y = x.find("input, select");
    for (i = 0; i < y.length; i++) {
        if (y[i].value === "") {
            $(y[i]).css("background", "#ffdddd");
            return false;
            }
        }       
    }

    // Check if the truck is chosen or not
    var radioValue = $("input[name='truck']:checked").val();
    if (radioValue === undefined) {
        $(".truck-alert").show();
        // You can add a message here to inform the user about the missing truck selection
        return false;
    } else {
        $(".truck-alert").hide();
    }

    // Progress bar
    for (i = 1; i < showTab; i++) {
        $("#step-" + i).addClass("active");
    }

    // Switch tab
    $("#tab-" + hideTab).css("display", "none");
    $("#tab-" + showTab).css("display", "block");
    $("input").css("background", "#fff");
}