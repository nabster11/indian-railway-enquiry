$(document).ready(function() {
    $(document).on("pagecreate", "#foo2", function() {
        $.getJSON("./json/stations_with_code.json", function(a, b) {
            source = [];
            $.each(a, function(d, c) {
                source.push({
                    label: c.name + "(" + c.code + ")",
                    code: c.code,
                    station: c.name
                });
            });
        });

        function au(a, c) {
            var b = new RegExp("^" + $.ui.autocomplete.escapeRegex(a.term), "i");
            c($.grep(source, function(d) {
                return b.test(d.station) || b.test(d.code);
            }));
        }
        $("#station1").autocomplete({
            source: au,
            open: function(a) {
                valid = false;
            },
            select: function(b, a) {
                valid = true;
                $("#station1").val(a.item.label);
            },
            close: function(a) {
                if (!valid) {
                    $(this).val("");
                }
            },
            minLength: 2,
            delay: 0
        });
        $("#station1").change(function() {
            if (source.indexOf($(this).val()) == -1) {
                $(this).val("");
            }
        });
        $("#station2").autocomplete({
            source: au,
            open: function(a) {
                valid = false;
            },
            select: function(b, a) {
                valid = true;
                $("#station2").val(a.item.label);
            },
            close: function(a) {
                if (!valid) {
                    $(this).val("");
                }
            },
            minLength: 2,
            delay: 0
        });
        $("#station2").change(function() {
            if (source.indexOf($(this).val()) == -1) {
                $(this).val("");
            }
        });
        var av = [];

        function ab(h) {
            $("#output").html("");
            var g = JSON.parse(h);
            console.log(g);
            var f = 0;
            var j = g.status;
            if (j != "OK") {
                alert("Currently the servers are busy or no data for this train found , please try again later");
                return false;
            } else {
                if (j === "OK") {
                    $.each(g.result, function(k, l) {
                        if (k == "trains") {
                            if (l.length == 0) {
                                f = 1;
                                return false;
                            }
                        }
                    });
                    if (f == 0) {
                        var a = "";
                        var c = '<eed style="position:absolute;top: 7%;">STA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ETA&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DA</eed><eed style="position:absolute;top: 52%;">STD &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ETD&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; DD</eed>';
                        $.each(g.result, function(k, l) {
                            if (k == "station") {
                                te = l;
                                av.push(l);
                            }
                            if (k == "tostation") {
                                te1 = l;
                            }
                            if (k == "hour") {
                                ag = l;
                            }
                        });
                        var b = 0;
                        $.each(g.result.trains, function(k, l) {
                            b++;
                            a += '<ul style = "font-size:x-large;" data-role="listview" data-inset="true" class="my-test' + k + '">';
                            a += '<li style= "font-size: 0.55em;" data-role="list-divider" is="listview-li">' + g.result.trains[k].trainno + "<re>" + g.result.trains[k].trainname + "</re></li>";
                            av.push(g.result.trains[k].trainno);
                            localStorage.tdata = av;
                            var m = "11%";
                            if (g.result.trains[k].type == "MEX") {
                                type = "Express";
                            } else {
                                if (g.result.trains[k].type == "SHT") {
                                    type = "Shatabdi";
                                    m = "9%";
                                } else {
                                    if (g.result.trains[k].type == "GBR") {
                                        type = "Garibrath";
                                    } else {
                                        if (g.result.trains[k].type == "SUF") {
                                            type = "Superfast";
                                            m = "7%";
                                        } else {
                                            if (g.result.trains[k].type == "LUX") {
                                                type = "Luxury";
                                            } else {
                                                if (g.result.trains[k].type == "RAJ") {
                                                    type = "Rajdhani";
                                                    m = "9%";
                                                } else {
                                                    if (g.result.trains[k].type == "JSH") {
                                                        type = "Janshatabdi";
                                                        m = "5%";
                                                    } else {
                                                        if (g.result.trains[k].type == "PAS") {
                                                            type = "Passenger";
                                                            m = "4%";
                                                        } else {
                                                            type = g.result.trains[k].type;
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            if (g.result.trains[k].platform != "NA") {
                                padd1 = "12%";
                            } else {
                                padd1 = "8%";
                            }
                            a += '<ee style="color: #5858C2;font-size:0.76em;padding-left:5%;">' + type + '</ee><span style="color:#666;font-size:0.8em;"><span style="padding-left:' + m + ';font-size:smaller">' + g.result.trains[k].scharr + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + g.result.trains[k].exparr + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + g.result.trains[k].delayarr + '</span></span><span style="color:#666;float:right;font-size:0.8em;padding-right:1%;"></span></br><plat style="font-size: 0.66em ; padding-left: 5%;margin-right:' + padd1 + '"> PF No: ' + g.result.trains[k].platform + '</plat><easd style="color:#843939;font-size:0.66em;">' + g.result.trains[k].schdep + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + g.result.trains[k].expdep + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + g.result.trains[k].delaydep + '</easd></br><div style="margin-top: 2%;color:#666;font-size:0.66em;padding-bottom: 0.26em;"><eel><div id="source" class="ui-corner-all">S</div>' + g.result.trains[k].fromname + '</eel><eel style="display: inherit;padding-top: 0.1em;padding-left: 0.66em;"><div id="dest" class="ui-corner-all">D</div>' + g.result.trains[k].toname + "</eel></div>";
                            a += "</ul>";
                        });
                        var d = '<top>List of Trains from <asd style="color:brown;">' + te + '</asd>-<asd style="color:brown;">' + te1 + ' </asd>in next <asd style="color:darkblue;">' + ag + '</asd>  hours</top></br><asd style="color:brown;">Click on any Train to reveal options<asd>';
                        localStorage.te = te;
                        localStorage.te1 = te1;
                        localStorage.ho = ag;
                        if (g.result.trains.length < 5) {
                            for (var e = 1; e < 15; e++) {
                                a += "<br>";
                            }
                        }
                        $("#output").append(d + a).trigger("create");
                        $(function() {
                            $("html, body").animate({
                                scrollTop: $("#output").offset().top - 43
                            });
                        });
                        $(window).scroll(function(k) {
                            if ($.mobile.activePage.attr("id") == "foo2") {
                                var l = $("#output").offset();
                                var m = $(window).scrollTop();
                                if (m > (l.top) - 50) {
                                    $("#sta").html(c).css("padding-left", "1.5em");
                                } else {
                                    $("#sta").html("Live Stations").css("padding-left", "0.0em");
                                }
                            }
                        });
                        for (var i = 0; i < b; ++i) {
                            $(".my-test" + i).on("click", function() {
                                var k = /\d+/.exec($(this).attr("class"));
                                localStorage.cno = k;
                                cno = parseInt(k) + 1;
                                $("#fmenu").popup("open", {
                                    transition: "fade",
                                });
                                $("#live").click(function(l) {
                                    l.preventDefault();
                                    l.stopImmediatePropagation();
                                    var m = $("<div data-role='page' id='live_status'><div data-theme='b' data-role='header' data-position='fixed'><a data-theme='b' data-transition='flip' data-direction='reverse' data-iconpos='left' data-icon='back' href='#foo2' >Back</a><h1>LIVE STATUS</h1><link rel='stylesheet' href='./css/live_status.css'/><script type='text/javascript' src='./js/live_status.js'><\/script></div><div data-role='content' id='idos1'><p id ='lu'></p><div id = 'output1'></div><div id='live_output'></div></div></div>");
                                    m.appendTo($.mobile.pageContainer);
                                    $("#lu").html("");
                                    $("#live_output").html("");
                                    $("#output1").html("");
                                    $.mobile.changePage($("#live_status"), {
                                        transition: "flip"
                                    });
                                });
                            });
                        }
                    } else {
                        $("#output").html("Trains btw these stations do not exist in the given time period");
                    }
                } else {
                    $("#output").html("The request could not be processed due to a server error,it may succeed if you try again");
                }
            }
        }

        function am(a, b) {
            $("#output").html("The request could not be processed due to a server error,it may succeed if you try again");
        }
        $("#back1").on("click", function() {
            $("#foo2").on("pagehide", function(a) {
                a.stopImmediatePropagation();
                a.preventDefault();
                var b = $(a.target);
                b.attr("data-dom-cache", "false");
                b.remove();
            });
        });
        $(document).on("submit", "#form2", function(a) {
            localStorage.removeItem("tdata");
            av = [];
            aw();
            a.preventDefault();
        });

        function aw(g, a, f) {
            if (g != null) {
                $.ajax({
                    type: "GET",
                    url: "http://api.erail.in/trainsatstation/?key=YOUR_API_KEY&stnfrom=" + g + "&stnto=" + a + "&hr=" + f,
                    cache: false,
                    beforeSend: function() {
                        $.mobile.loading("show", {
                            theme: "b",
                            text: "Please wait...",
                            textonly: false,
                            textVisible: true
                        });
                    },
                    success: ab,
                    error: am,
                    complete: function() {
                        $.mobile.loading("hide");
                    }
                });
            } else {
                var b = $("#station1").val();
                var d = ["\\(", "\\)"];
                var g = b.split(new RegExp(d.join("|"), "g"));
                var c = $("#station2").val();
                var a = c.split(new RegExp(d.join("|"), "g"));
                var e = $("#time1").val();
                $.ajax({
                    type: "GET",
                    url: "http://api.erail.in/trainsatstation/?key=YOUR_API_KEY&stnfrom=" + g[1] + "&stnto=" + a[1] + "&hr=" + e,
                    cache: false,
                    beforeSend: function() {
                        $.mobile.loading("show", {
                            theme: "b",
                            text: "Please wait...",
                            textonly: false,
                            textVisible: true
                        });
                    },
                    success: ab,
                    error: am,
                    complete: function() {
                        $.mobile.loading("hide");
                    }
                });
            }
        }
        if (localStorage.te != null && localStorage.ho != null) {
            var ao = localStorage.te;
            var P = localStorage.te1;
            var ag = localStorage.ho;
            var aI;
            if (ag == 1) {
                aI = "hour";
            } else {
                aI = "hours";
            }
            var ax = '<ul data-role="listview" data-inset="true" style="min-width:210px;" data-theme="c"><li data-role="divider" data-theme="b">Your recent query</li><li ><a href="#" id="query1">' + ao + "&nbsp;-&nbsp;" + P + "&nbspin&nbsp" + ag + "&nbsp;" + aI + "</a></li></ul>";
            $("#output").html(ax);
            $("#query1").on("click", function() {
                aw(ao, P, ag);
            });
        }
        var aD = "";
        $(document).on("click", "#fare_stn", function(a) {
            a.preventDefault();
            a.stopImmediatePropagation();
            $("#popupBasic").popup("close");
            $.ajax({
                type: "GET",
                url: "http://api.erail.in/route/?key=YOUR_API_KEY&trainno=" + av[cno],
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
                    if (aD == "") {
                        return;
                    }
                    var b = $("<div data-role='page' id='fare_data1'><div data-theme='b' data-role='header' data-position='fixed'><a data-theme='b' data-transition='flip' data-direction='reverse' data-iconpos='left' data-icon='back' href='#foo2' >Back</a><h1>Fare</h1></div><div data-role='content' id='_fare_con'><div id='_fare_output'></div></div></div>");
                    b.appendTo($.mobile.pageContainer);
                    $("#_fare_output").html("");
                    $("#_fare_output").html(aD);
                    $.mobile.changePage($("#fare_data1"), {
                        transition: "flip"
                    });
                    $("#fare_data1").trigger("create");
                },
                success: an,
                error: at
            });
        });
        var X;
        var aH;
        var az;

        function an(a, e) {
            var g = JSON.parse(a);
            aH = g.result;
            aD = "";
            if (g.status != "OK") {
                alert("Currently the servers are busy or no data for this train found , please try again later");
                return;
            }
            var b = g.result.route[0].stn;
            var d = g.result.route[0].cls;
            X = d.split(" ");
            aD = '<form id = "fare_data_stn" data-ajax="false">';
            aD += '<div data-role="fieldcontain" class = "ui-btn">';
            aD += '<label for="select-native-1">From:</label>';
            var c, f;
            f = b.length;
            aD += '<select name="select-native-1" date-role ="select" id="ffrom" >';
            for (c = 0; c < f; c++) {
                aD += "<option value=" + b[c].code + ">" + b[c].name + "</option>";
            }
            aD += "</select>";
            aD += "</div>";
            var c, f;
            f = b.length;
            aD += '<div data-role="fieldcontain" class = "ui-btn">';
            aD += '<label for="select-native-1">To:</label>';
            aD += '<select name="select-native-1" id="fto" date-role ="select" >';
            for (c = 0; c < f; c++) {
                aD += "<option value=" + b[c].code + ">" + b[c].name + "</option>";
            }
            aD += "</select>";
            aD += "</div>";
            aD += '<div data-role="fieldcontain" class = "ui-btn">';
            aD += '<label for="select-native-1">Class</label>';
            f = X.length;
            aD += '<select name="select-native-1" id="fcls"  date-role ="select">';
            for (c = 0; c < f; c++) {
                aD += "<option value=" + X[c] + ">" + X[c] + "</option>";
            }
            aD += "</select>";
            aD += "</div>";
            aD += '<div data-role="fieldcontain" class = "ui-btn">';
            aD += '<label for="select-native-1">Quota</label>';
            aD += '<select name="select-native-1" id="fqta"  date-role ="select">';
            aD += "<option value=GN> General Quota</option>";
            aD += "<option value=CK> Tatkal Quota</option>";
            aD += "<option value=DF> Defence Quota</option>";
            aD += "<option value=LD> Ladies Quota</option>";
            aD += "<option value=FT> Foreign Tourist</option>";
            aD += "<option value=DP> Duty Pass Quota</option>";
            aD += "<option value=HP> Handicapped Quota</option>";
            aD += "<option value=PH> Parliament House Quota</option>";
            aD += "<option value=SS> Lower Berth Quota</option>";
            aD += "<option value=YU> Yuva Quota</option>";
            aD += "</select>";
            aD += "</div>";
            aD += '<div data-role="fieldcontain" class = "ui-btn">';
            aD += '<label for="select-native-1">Age</label>';
            aD += '<select name="select-native-1" id="fage"  date-role ="select">';
            aD += "<option value=AD> Adult</option>";
            aD += "<option value=CH> Child</option>";
            aD += "<option value=SM> Senior Citizen(MALE)</option>";
            aD += "<option value=SF> Senior Citizen(FEMALE)</option>";
            aD += "</select>";
            aD += "</div>";
            aD += '<div data-role="fieldcontain" class = "ui-btn">';
            aD += '<label for="date">Date Input:</label>';
            aD += '<input type="date" name="date" id="fdate" required />';
            aD += "</div>";
            aD += '<input data-theme= "e" type="submit" name="submit" id="sub" value="Submit"   />';
            aD += "</div></form>";
        }
        var T, ah, C, ay, af, aA;
        $(document).on("submit", "#fare_data_stn", function(a) {
            a.preventDefault();
            a.stopImmediatePropagation();
            af = ai(document.getElementById("fdate").value);
            T = $("#fto").val();
            f_f = $("#ffrom").val();
            C = $("#fqta").val();
            ay = $("#fage").val();
            aA = $("#fcls").val();
            _fare_cls = aA;
            if (T == f_f) {
                alert("Source and destination can not be same");
                return;
            }
            $.ajax({
                type: "GET",
                url: "http://api.erail.in/fare/?key=YOUR_API_KEY&trainno=" + av[cno] + "&stnfrom=" + f_f + "&stnto=" + T + "&age=" + ay + "&quota=" + C + "&class=" + aA + "&date=" + af,
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
                success: aG,
                error: W
            });
        });
        var ap = ["1A", "2A", "3A", "SL", "CC", "FC", "2S", "3E", "GN"];
        var ak = 0;
        for (ak = 0; ak < 9; ak++) {
            $(document).on("click", "#f_" + ap[ak], function(a) {
                a.preventDefault();
                a.stopImmediatePropagation();
                _fare_cls = $(this).attr("value");
                $.ajax({
                    type: "GET",
                    url: "http://api.erail.in/fare/?key=YOUR_API_KEY&trainno=" + av[cno] + "&stnfrom=" + f_f + "&stnto=" + T + "&age=" + ay + "&quota=" + C + "&class=" + $(this).attr("value") + "&date=" + af,
                    cache: true,
                    beforeSend: function() {
                        $.mobile.loading("show", {
                            theme: "b",
                            text: "Please wait...",
                            textonly: false,
                            textVisible: true
                        });
                    },
                    success: aG,
                    error: W,
                    complete: function() {
                        $.mobile.loading("hide");
                    }
                });
            });
        }
        var Q;

        function aG(e, f) {
            az = JSON.parse(e);
            if (az.status != "OK") {
                if (!az.error_message) {
                    alert("Error");
                } else {
                    alert(az.error_message);
                }
                return;
            }
            var d, g, a, h;
            a = X.length;
            h = "";
            var c, j, l, b, i, m;
            c = az.result.from;
            j = az.result.to;
            l = az.result.from;
            b = az.result.quota;
            i = az.result.trainno;
            m = az.result.date;
            for (d = 0, g = "a"; d < a; d++) {
                if (_fare_cls == X[d]) {
                    h += '<div style="margin-right: 0.75em;" class="ui-block-' + g + '"><div class="button-wrap"><button class="ui-shadow ui-btn ui-corner-all"  data-theme = "b" value ="' + X[d] + '" id = "f_' + X[d] + '"</button></div></div>';
                } else {
                    h += '<div style="margin-right: 0.75em;" class="ui-block-' + g + '"><div class="button-wrap"><button class="ui-shadow ui-btn ui-corner-all"  data-theme = "c" value ="' + X[d] + '" id = "f_' + X[d] + '"</button></div></div>';
                }
                switch (g) {
                    case "a":
                        g = "b";
                        break;
                    case "b":
                        g = "c";
                        break;
                    case "c":
                        g = "a";
                        break;
                }
            }
            h += "</br></br></br></br></br></br>";
            h += '<ul style = "font-size: 1.2em;" data-role="listview"  data-inset="true" class = "p_list" onclick = "">';
            h += ' <li  style = "font-size: 0.7em;" is="listview-li" data-role="list-divider" id = "p_list">' + aH.name + "<re> &nbsp &nbsp" + aH.trainno + "</re></li>";
            h += "<li><span>Class</span> &nbsp &nbsp";
            h += '<span style="color:#666;font-size:0.8em;white-space: normal;">' + az.result.fare[0].cls + "</span>";
            h += "<li><span>From</span> &nbsp &nbsp";
            h += '<span style="color:#666;font-size:0.8em;white-space: normal;">' + az.result.from + "</span>";
            h += "<li><span>To</span> &nbsp &nbsp";
            h += '<span style="color:#666;font-size:0.8em;white-space: normal;">' + az.result.to + "</span>";
            h += "<li><span>Date</span> &nbsp &nbsp";
            h += '<span style="color:#666;font-size:0.8em;white-space: normal;">' + az.result.date + "</span>";
            h += "<li><span>Fare</span> &nbsp &nbsp";
            h += '<span style="color:#666;font-size:0.8em;white-space: normal;">' + az.result.fare[0].fare + "</span>";
            h += "</li>";
            h += "</ul>";
            if (h == "") {
                return;
            }
            var k = $("<div data-role='page' id='_fare_list'><div data-theme = 'b' data-role='header' data-position='fixed'><a data-iconpos='left' data-icon='back' data-transition = 'flip' data-direction='reverse' href='#fare_data1' >Back</a><h1>Fare Information</h1></div><div data-role='content' id='_fare_list_con'><style>.ui-table-columntoggle-btn {display: none !important;}</style><div id='_fare_list_out'></div></div></div>");
            k.appendTo($.mobile.pageContainer);
            $("#_fare_list_out").html("");
            $("#_fare_list_out").html(h);
            $.mobile.changePage($("#_fare_list"), {
                transition: "flip"
            });
            $("#_fare_list").trigger("create");
        }

        function at() {
            alert("Query Didn't Succeed, Please Try Again!!");
            aD = "";
        }

        function W() {
            alert("Query Didn't Succeed, Please Try Again!!");
        }

        function ai(b) {
            var a = new Array();
            a = b.split("-");
            var d = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            var c;
            c = a[2] + "-" + d[parseInt(a[1], 10) - 1] + "-" + a[0];
            return c;
        }
        $(document).on("click", "#route_stn", function(a) {
            a.preventDefault();
            a.stopImmediatePropagation();
            $("#popupBasic").popup("close");
            $.ajax({
                type: "GET",
                url: "http://api.erail.in/route/?key=YOUR_API_KEY&trainno=" + av[cno],
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
                    if (Q == "") {
                        return;
                    }
                    var b = $("<div data-role='page' id='_route_info'><div data-theme='b' data-role='header' data-position='fixed'><a data-theme='b' data-iconpos='left' data-transition='flip' data-direction='reverse' data-icon='back' href='#foo2'>Back</a><h1>Route</h1></div><div data-role='content' id='_route_con'><div id='_route_output'></div><style>.ui-table-columntoggle-btn {display: none !important;}</style></div></div>");
                    b.appendTo($.mobile.pageContainer);
                    $("#_route_output").html("");
                    $("#_route_output").html(Q);
                    $.mobile.changePage($("#_route_info"), {
                        transition: "flip"
                    });
                    $("#_route_info").trigger("create");
                },
                success: ac,
                error: ad
            });
        });

        function ad() {
            alert("Query Didn't Succeed, Please Try Again!!");
            Q = "";
        }

        function ac(c, b) {
            var a = JSON.parse(c);
            Q = "";
            if (a.status != "OK") {
                alert("Currently the servers are busy or no data for this train found , please try again later");
                return;
            }
            Q = "";
            Q = "<h2>" + a.result.name + "</h2>";
            Q += '<table  data-role="table" border = "1" data-mode="columntoggle" class="table-stripe ui-responsive ui-shadow" ><thead style="color:brown;"><tr><th data-priority="6">Station Code</th><th>Station Name</th><th>Arrival</th><th>Departure</th><th data-priority="6">Day</th></tr>';
            var c = a.result.route[0].stn;
            var d, e;
            e = c.length;
            Q += "<tbody>";
            for (d = 0; d < e; d++) {
                Q += "<tr><td>" + c[d].code + "</td><td>" + c[d].name + "</td><td>" + c[d].arr + "</td><td>" + c[d].dep + "</td><td>" + c[d].day + "</td></tr>";
            }
            Q += "</tbody></table>";
            $("#t_list").empty();
        }
        var Z;
        var aa = "";
        $(document).on("click", "#seat_stn", function(a) {
            a.preventDefault();
            a.stopImmediatePropagation();
            $("#popupBasic").popup("close");
            $.ajax({
                type: "GET",
                url: "http://api.erail.in/route/?key=YOUR_API_KEY&trainno=" + av[cno],
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
                    if (aa == "") {
                        return;
                    }
                    var b = $("<div data-role='page' id='seat_info'><div data-theme='b' data-role='header' data-position='fixed'><a data-theme='b' data-iconpos='left' data-icon='back' data-rel='back' >Back</a><h1>Seat Availability</h1></div><div data-role='content' id='seat_con'><div id='seat_output'></div></div></div>");
                    b.appendTo($.mobile.pageContainer);
                    $("#seat_output").html("");
                    $("#seat_output").html(aa);
                    $.mobile.changePage($("#seat_info"), {
                        transition: "flip"
                    });
                    $("#seat_info").trigger("create");
                },
                success: ae,
                error: al
            });
        });

        function al() {
            alert("Your query is unsucessful, Please try again !!");
            aa = "";
        }

        function ae(g, e) {
            Z = JSON.parse(g);
            aa = "";
            if (Z.status != "OK") {
                alert("Currently the servers are busy or no data for this train found , please try again later");
                return;
            }
            var a = Z.result.route[0].stn;
            var d = Z.result.route[0].cls;
            var b = d.split(" ");
            aa = '<form id = "seat_avail_stn" data-ajax="false">';
            aa += '<div data-role="fieldcontain" class = "ui-btn">';
            aa += '<label for="select-native-1">From:</label>';
            var c, f;
            f = a.length;
            aa += '<select name="select-native-1" date-role ="select" id="s_from" >';
            for (c = 0; c < f; c++) {
                aa += "<option value=" + a[c].code + ">" + a[c].name + "</option>";
            }
            aa += "</select>";
            aa += "</div>";
            var c, f;
            f = a.length;
            aa += '<div data-role="fieldcontain" class = "ui-btn">';
            aa += '<label for="select-native-1">To:</label>';
            aa += '<select name="select-native-1" id="s_to" date-role ="select" >';
            for (c = 0; c < f; c++) {
                aa += "<option value=" + a[c].code + ">" + a[c].name + "</option>";
            }
            aa += "</select>";
            aa += "</div>";
            aa += '<div data-role="fieldcontain" class = "ui-btn">';
            aa += '<label for="select-native-1">Class</label>';
            f = b.length;
            aa += '<select name="select-native-1" id="s_cls" date-role ="select">';
            for (c = 0; c < f; c++) {
                aa += "<option value=" + b[c] + ">" + b[c] + "</option>";
            }
            aa += "</select>";
            aa += "</div>";
            aa += '<div data-role="fieldcontain" class = "ui-btn">';
            aa += '<label for="select-native-1">Quota</label>';
            f = b.length;
            aa += '<select name="select-native-1" id="s_qta"  date-role ="select">';
            aa += "<option value=GN> General Quota</option>";
            aa += "<option value=CK> Tatkal Quota</option>";
            aa += "<option value=DF> Defence Quota</option>";
            aa += "<option value=LD> Ladies Quota</option>";
            aa += "<option value=FT> Foreign Tourist</option>";
            aa += "<option value=DP> Duty Pass Quota</option>";
            aa += "<option value=HP> Handicapped Quota</option>";
            aa += "<option value=PH> Parliament House Quota</option>";
            aa += "<option value=SS> Lower Berth Quota</option>";
            aa += "<option value=YU> Yuva Quota</option>";
            aa += "</select>";
            aa += "</div>";
            aa += '<div data-role="fieldcontain" class = "ui-btn">';
            aa += '<label for="date">Date Input:</label>';
            f = b.length;
            aa += '<input type="date" name="s_date" id="s_date"  required />';
            aa += "</div>";
            aa += '<div data-role="fieldcontain" class = "ui-btn">';
            aa += '<input type="submit" data-theme="e" name="submit" id="sub" value="Submit"  />';
            aa += "</div></form>";
        }
        var aE, ar, aq, aB, aC;
        $(document).on("submit", "#seat_avail_stn", function(b) {
            b.preventDefault();
            b.stopPropagation();
            var a = document.getElementById("s_date").value;
            var c = new Array();
            c = a.split("-");
            var d = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
            aC;
            aC = c[2] + "-" + d[parseInt(c[1], 10) - 1] + "-" + c[0];
            aE = document.getElementById("s_to").value;
            ar = document.getElementById("s_from").value;
            aq = document.getElementById("s_cls").value;
            aB = document.getElementById("s_qta").value;
            if (aE == ar) {
                alert("Source and destination can not be same");
                return;
            }
            _seat_cls = aq;
            $.ajax({
                type: "GET",
                url: "http://api.erail.in/seats/?key=YOUR_API_KEY&trainno=" + Z.result.trainno + "&stnfrom=" + ar + "&stnto=" + aE + "&quota=" + aB + "&class=" + aq + "&date=" + aC,
                cache: false,
                beforeSend: function() {
                    $.mobile.loading("show", {
                        theme: "b",
                        text: "Please wait...",
                        textonly: false,
                        textVisible: true
                    });
                },
                success: Y,
                error: F,
                complete: function() {
                    $.mobile.loading("hide");
                }
            });
        });

        function F() {
            alert("Your query is unsucessful, Please try again !!");
        }
        var aF = ["1A", "2A", "3A", "SL", "CC", "FC", "2S", "3E", "GN"];
        var aj = 0;
        for (aj = 0; aj < 9; aj++) {
            $(document).on("click", "#" + aF[aj], function(a) {
                var b = "#" + aF[aj];
                _seat_cls = $(this).attr("value");
                $.ajax({
                    type: "GET",
                    url: "http://api.erail.in/seats/?key=YOUR_API_KEY&trainno=" + Z.result.trainno + "&stnfrom=" + ar + "&stnto=" + aE + "&quota=" + aB + "&class=" + $(this).attr("value") + "&date=" + aC,
                    cache: false,
                    beforeSend: function() {
                        $.mobile.loading("show", {
                            theme: "b",
                            text: "Please wait...",
                            textonly: false,
                            textVisible: true
                        });
                    },
                    success: Y,
                    error: F,
                    complete: function() {
                        $.mobile.loading("hide");
                    }
                });
            });
        }

        function Y(a, l) {
            var h = JSON.parse(a);
            var e = "";
            if (h.status != "OK") {
                if (h.error_message) {
                    alert(h.error_message);
                } else {
                    alert("Error !!");
                }
                return;
            }
            if (h.result.error) {
                if (h.result.error) {
                    alert(h.result.error);
                } else {
                    alert("Error !!");
                }
                return;
            }
            var f = Z.result.route[0].cls;
            var g = f.split(" ");
            var i = g.length;
            var j;
            e = '<div class = "ui-grid-b">';
            var n = ["a", "b", "c", "d"];
            var c, q, p, r, b;
            c = h.result.to;
            q = h.result.from;
            r = h.result.trainno;
            b = h.result.quota;
            p = h.result.seats[0].date;
            var d;
            for (j = 0, d = "a"; j < i; j++) {
                if (_seat_cls == g[j]) {
                    e += '<div class="ui-block-' + d + '"><div class="button-wrap"><button class="ui-shadow ui-btn ui-corner-all" data-theme = "b" value ="' + g[j] + '"id ="' + g[j] + '"  >' + g[j] + "</button></div></div>";
                } else {
                    e += '<div class="ui-block-' + d + '"><div class="button-wrap"><button class="ui-shadow ui-btn ui-corner-all" data-theme = "c" value ="' + g[j] + '"id ="' + g[j] + '"  >' + g[j] + "</button></div></div>";
                }
                switch (d) {
                    case "a":
                        d = "b";
                        break;
                    case "b":
                        d = "c";
                        break;
                }
            }
            e += "</div>";
            e += '<table data-role="table" class="table-stripe ui-shadow" id="myTable1" align = "center"  data-mode="columntoggle">';
            e += '<thead style = "color:brown;" ><th>Date</th><th>Availablity</th></thead>';
            var o;
            o = h.result.seats;
            var k = o.length;
            var j;
            e += "<tbody>";
            for (j = 0; j < k; j++) {
                e += "<tr><td>" + o[j].date + "</td><td>" + o[j].seat + "</td></tr>";
            }
            e += "</tbody></table>";
            if (e == "") {
                return;
            }
            var m = $("<div data-role='page' id='_seat_list'><div data-theme = 'b' data-role='header' data-position='fixed'><a data-iconpos='left' data-icon='back' data-transition = 'flip' data-direction='reverse' href='#seat_info' >Back</a><h1>Seat Availability</h1></div><div data-role='content' id='_seat_list_con'><style>.ui-table-columntoggle-btn {display: none !important;}</style><div id='_seat_list_out'></div></div></div>");
            m.appendTo($.mobile.pageContainer);
            $("#_seat_list_out").html("");
            $("#_seat_list_out").html(e);
            $.mobile.changePage($("#_seat_list"), {
                transition: "flip"
            });
            $("#_seat_list").trigger("create");
        }
    });
});