function valid_it(c) {
    var b = /^[0-9]{5}$/;
    var e;
    var a = c;
    if (!/^[0-9]{5}$/.test(+a)) {
        alert("Please Enter Valid Train Number");
        return false;
    }
    return true;
}
$(document).on("submit", "#tr_id", function(b) {
    b.preventDefault();
    b.stopImmediatePropagation();
    var a = $("#train_id").val();
    if (!valid_it(a)) {
        $("#train_id").val("");
        return;
    }
    if (a == "") {
        alert("Enter Train Number");
        $("#train_id").val("");
        return;
    }
    localStorage.pnumber = a;
    $.ajax({
        type: "GET",
        url: "http://api.erail.in/route/?key=YOUR_API_KEY&trainno=" + a,
        beforeSend: function() {
            $.mobile.loading("show", {
                theme: "b",
                text: "Please wait...",
                textonly: false,
                textVisible: true
            });
        },
        cache: true,
        complete: function() {
            $.mobile.loading("hide");
        },
        success: onTsuccess,
        error: onPNRError
    });
});

function post_train_num(a) {
    $.ajax({
        type: "GET",
        url: "http://api.erail.in/route/?key=YOUR_API_KEY&trainno=" + a,
        beforeSend: function() {
            $.mobile.loading("show", {
                theme: "b",
                text: "Please wait...",
                textonly: false,
                textVisible: true
            });
        },
        cache: true,
        complete: function() {
            $.mobile.loading("hide");
        },
        success: onTsuccess,
        error: onPNRError
    });
}
var d;

function onTsuccess(b, a) {
    d = JSON.parse(b);
    if (d.status != "OK") {
        alert(d.status);
        return;
    }
    localStorage.pname = d.result.name;
    $("#h_id").empty();
    $("#t_route").empty();
    $("#h_id").append(d.result.name);
    $("#l_id").empty();
    $("#l_id").append('<li> <a href = "#"  onclick = "myFunction()" id = "r_id">Get Route Details</a></li>');
    $("#l_id").append('<li> <a href = "#" id = "s_id" onclick = "myFunction2()" >Check Seat Availability</a></li>');
    $("#l_id").listview("refresh");
}
function myFunction() {
    var c;
    c = '<table  data-role="table" border = "1" data-mode="columntoggle" class="table-stripe ui-responsive ui-shadow" ><thead><tr style="color:brown;"><th data-priority="6">Station Code</th><th>Station Name</th><th>Arrival</th><th>Departure</th><th data-priority="6">Day</th></tr>';
    var e = d.result.route[0].stn;
    var b, a;
    a = e.length;
    c += "<tbody>";
    for (b = 0; b < a; b++) {
        c += "<tr><td>" + e[b].code + "</td><td>" + e[b].name + "</td><td>" + e[b].arr + "</td><td>" + e[b].dep + "</td><td>" + e[b].day + "</td></tr>";
    }
    c += "</tbody></table>";
    $.ajax({
        type: "GET",
        cache: true,
        beforeSend: function() {
            $.mobile.loading("show", {
                theme: "b",
                text: "Please wait...",
                textonly: false,
                textVisible: true
            });
        },
        success: function() {},
        complete: function() {
            $.mobile.loading("hide");
            var f = $("<div data-role='page' id='rt_details'><div data-theme='b' data-role='header' data-position='fixed'><a data-transition='flip' data-direction ='reverse' data-iconpos='left' data-theme='b' data-icon='back' href='section3.html' >Back</a><h1>Train Details</h1></div><div data-role='content' id='rt_con'><style>.ui-table-columntoggle-btn {display: none !important;}</style> <p><div id='rt_output'></div></p></div></div>");
            f.appendTo($.mobile.pageContainer);
            $("#rt_output").html("");
            $("#rt_output").html(c);
            $("#rt_output").trigger("create");
            $.mobile.changePage($("#rt_details"), {
                transition: "flip"
            });
        }
    });
}
function myFunction2() {
    var f = "",
        g;
    var h = d.result.route[0].stn;
    var b = d.result.route[0].cls;
    var e = b.split(" ");
    f = '<form style="font-weight:bold;color:brown;"id = "target1234" data-ajax="false">';
    f += '<div data-role="fieldcontain" class = "ui-btn">';
    f += '<label for="select-native-1">From:</label>';
    var c, a;
    a = h.length;
    f += '<select name="select-native-1" date-role ="select" id="num_from" >';
    for (c = 0; c < a; c++) {
        f += "<option value=" + h[c].code + ">" + h[c].name + "</option>";
    }
    f += "</select>";
    f += "</div>";
    var c, a;
    a = h.length;
    f += '<div data-role="fieldcontain" class = "ui-btn">';
    f += '<label for="select-native-1">To:</label>';
    f += '<select name="select-native-1" id="num_to" date-role ="select" >';
    for (c = 0; c < a; c++) {
        f += "<option value=" + h[c].code + ">" + h[c].name + "</option>";
    }
    f += "</select>";
    f += "</div>";
    f += '<div data-role="fieldcontain" class = "ui-btn">';
    f += '<label for="select-native-1">Class</label>';
    a = e.length;
    f += '<select name="select-native-1" id="num_cls"  date-role ="select">';
    for (c = 0; c < a; c++) {
        f += "<option value=" + e[c] + ">" + e[c] + "</option>";
    }
    f += "</select>";
    f += "</div>";
    f += '<div data-role="fieldcontain" class = "ui-btn">';
    f += '<label for="select-native-1">Quota</label>';
    a = e.length;
    f += '<select name="select-native-1" id="num_qta"  date-role ="select">';
    for (c = 0; c < a; c++) {
        f += "<option value=GN> General Quota</option>";
        f += "<option value=CK> Tatkal Quota</option>";
        f += "<option value=DF> Defence Quota</option>";
        f += "<option value=LD> Ladies Quota</option>";
        f += "<option value=FT> Foreign Tourist</option>";
        f += "<option value=DP> Duty Pass Quota</option>";
        f += "<option value=HP> Handicapped Quota</option>";
        f += "<option value=PH> Parliament House Quota</option>";
        f += "<option value=SS> Lower Berth Quota</option>";
        f += "<option value=YU> Yuva Quota</option>";
    }
    f += "</select>";
    f += "</div>";
    f += '<div data-role="fieldcontain" class = "ui-btn">';
    f += '<label style="font-weight:bold;" for="date">Date Input:</label>';
    a = e.length;
    f += '<input type="date" name="date" id="num_date" />';
    f += "</div>";
    f += '<div data-role="fieldcontain" class = "ui-btn">';
    f += '<input type="submit" name="submit" id="num_sub" data-theme="e" value="Submit" />';
    f += "</div></form>";
    $.ajax({
        type: "GET",
        cache: true,
        beforeSend: function() {
            $.mobile.loading("show", {
                theme: "b",
                text: "Please wait...",
                textonly: false,
                textVisible: true
            });
        },
        success: function() {},
        complete: function() {
            $.mobile.loading("hide");
            console.log(f);
            if (f == "") {
                return;
            }
            var i = $("<div data-role='page' id='st1_details'><div data-theme='b' data-role='header' data-position='fixed'><a data-transition='flip' data-direction ='reverse' data-iconpos='left' data-theme='b' data-icon='back' href='section3.html' >Back</a><h1>Train Details</h1></div><div data-role='content' id='st_con'> <p><div id='st1_output'></div></p></div></div>");
            i.appendTo($.mobile.pageContainer);
            $("#st1_output").html("");
            $("#st1_output").html(f);
            $.mobile.changePage($("#st1_details"), {
                transition: "flip"
            });
            $("#st1_details").trigger("create");
        }
    });
}
var dt;
$(document).on("submit", "#target1234", function(i) {
    i.preventDefault();
    i.stopImmediatePropagation();
    var b = document.getElementById("num_date").value;
    var f = new Array();
    f = b.split("-");
    var a = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    dt = f[2] + "-" + a[parseInt(f[1], 10) - 1] + "-" + f[0];
    var c = document.getElementById("num_to").value;
    var h = document.getElementById("num_from").value;
    var j = document.getElementById("num_cls").value;
    var g = document.getElementById("num_qta").value;
    selected_cl2 = j;
    console.log(c, h);
    if (c == h) {
        alert("Source and destination can not be same");
        return;
    }
    $.ajax({
        type: "GET",
        url: "http://api.erail.in/seats/?key=YOUR_API_KEY&trainno=" + d.result.trainno + "&stnfrom=" + h + "&stnto=" + c + "&quota=" + g + "&class=" + j + "&date=" + dt,
        cache: false,
        beforeSend: function() {
            $.mobile.loading("show", {
                theme: "b",
                text: "Please wait...",
                textonly: false,
                textVisible: true
            });
        },
        success: onSsuccess,
        error: onPNRError,
        complete: function() {
            $.mobile.loading("hide");
            var e = $("<div data-role='page' id='sti_details'><div data-theme='b' data-role='header' data-position='fixed'><a data-transition='flip' data-direction ='reverse' data-iconpos='left' data-theme='b' data-icon='back' href='#st1_details' >Back</a><h1>Train Details</h1></div><div data-role='content' id='sti_con'> <p><div id='sti_output'></div></p><style>.ui-table-columntoggle-btn {display: none !important;}</style></div></div>");
            if (tabd != "") {
                e.appendTo($.mobile.pageContainer);
                $("#sti_output").html("");
                $("#sti_output").html(tabd);
                $.mobile.changePage($("#sti_details"), {
                    transition: "flip"
                });
                $("#sti_details").trigger("create");
            }
        }
    });
});

function onSsuccess(e, h) {
    var n = JSON.parse(e);
    if (n.status != "OK") {
        if (n.error_message) {
            alert(n.error_message);
        } else {
            alert(n.status);
        }
        tabd = "";
        return;
    }
    if (n.result.error) {
        alert(n.result.error);
        tabd = "";
        return;
    }
    $("#h_id").empty();
    $("#h_id").append(d.result.name);
    $("#t_route").empty();
    var t = d.result.route[0].cls;
    var r = t.split(" ");
    var o = r.length;
    var k;
    tabd = '<div class = "ui-grid-b">';
    var j = ["a", "b", "c", "d"];
    var c, s, a, p, m;
    c = n.result.to;
    s = n.result.from;
    p = n.result.trainno;
    m = n.result.quota;
    a = dt;
    var g;
    for (k = 0, g = "a"; k < o; k++) {
        if (selected_cl2 == r[k]) {
            tabd += '<div class="ui-block-' + g + '"><div class="button-wrap"><button class="ui-shadow ui-btn ui-corner-all" data-theme = "b" value ="' + r[k] + '" onclick = "btn_clicked(this,\'' + c + "','" + s + "','" + p + "','" + a + "','" + m + "')\">" + r[k] + "</button></div></div>";
        } else {
            tabd += '<div class="ui-block-' + g + '"><div class="button-wrap"><button class="ui-shadow ui-btn ui-corner-all" data-theme = "c" value ="' + r[k] + '" onclick = "btn_clicked(this,\'' + c + "','" + s + "','" + p + "','" + a + "','" + m + "')\">" + r[k] + "</button></div></div>";
        }
        switch (g) {
            case "a":
                g = "b";
                break;
            case "b":
                g = "c";
                break;
        }
    }
    tabd += "</div>";
    $("#t_route").trigger("create");
    tabd += '<table data-role="table" class="table-stripe ui-shadow" id="myTable1" align = "center"  data-mode="columntoggle">';
    tabd += '<thead style = "color:brown;"><th>Date</th><th>Availablity</th></thead>';
    var q;
    q = n.result.seats;
    var b = q.length;
    var k;
    tabd += "<tbody>";
    for (k = 0; k < b; k++) {
        tabd += "<tr><td>" + q[k].date + "</td><td>" + q[k].seat + "</td></tr>";
    }
    tabd += "</tbody></table>";
}
function btn_clicked(a, b, e, h, f, c) {
    var g = $(a).val();
    selected_cl2 = g;
    $.ajax({
        type: "GET",
        url: "http://api.erail.in/seats/?key=YOUR_API_KEY&trainno=" + h + "&stnfrom=" + e + "&stnto=" + b + "&quota=" + c + "&class=" + g + "&date=" + f,
        beforeSend: function() {
            $.mobile.loading("show", {
                theme: "b",
                text: "Please wait...",
                textonly: false,
                textVisible: true
            });
        },
        cache: false,
        complete: function() {
            $.mobile.loading("hide");
            var i = $("<div data-role='page' id='sti_details'><div data-theme='b' data-role='header' data-position='fixed'><a data-iconpos='left' data-icon='back' data-rel='back' >Back</a><h1>Train Details</h1></div><div data-role='content' id='sti_con'> <p><div id='sti_output'></div></p></div></div>");
            i.appendTo($.mobile.pageContainer);
            $("#sti_output").html("");
            $("#sti_output").html(tabd);
            $("#sti_output").trigger("create");
            $.mobile.changePage($("#sti_details"), {
                transition: "flip"
            });
        },
        success: onSsuccess,
        error: onPNRError
    });
}
function onPNRError(b, a) {
    alert("Your query is unsucessful, Please try again !!");
}
$(document).ready(function() {
    $(document).on("pagecreate", "#foo3", function() {
        if (localStorage.pnumber && localStorage.pname) {
            ps_num = localStorage.pnumber;
            var a = '<ul data-role="listview" data-inset="true" style="min-width:210px;" data-theme="c"><li data-role="divider" data-theme="b">Your recent query</li><li ><a href="#" id="query_t_num">' + localStorage.pnumber + "&nbsp;-&nbsp;" + localStorage.pname + "</a></li></ul>";
            $("#t_query_num").html(a);
            $("#query_t_num").on("click", function() {
                post_train_num(ps_num);
            });
        }
    });
});