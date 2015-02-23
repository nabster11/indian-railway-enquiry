
    function frmt_date(g) {
        var i = new Array();
        i = g.split("-");
        var j = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        var h;
        h = i[2] + "-" + j[parseInt(i[1], 10) - 1] + "-" + i[0];
        return h;
    }
    var f;
    var N, TR;

    function ps(b) {
        N = b;
        console.log("poup");
        $("#popupBasic").popup("open", function() {
            console.log("dfdfdfdf");
        }, {
            transition: "pop",
        });
    }

    function train_info(g, i) {
        var l = parseInt(i);
        var k;
        var j = f.result[l];
        k = '<ul data-role="listview"  data-inset="true" class = "p_list" onclick = "ps(\'' + j.trainno + "')\">";
        k += ' <li  is="listview-li" data-role="list-divider" id = "p_list">' + j.name + "<re> &nbsp &nbsp" + j.trainno + "</re></li>";
        k += "<li><span>Run-Days</span> <br>";
        k += '<span style="color:#666;white-space: normal; width:40px;">' + j.rundays + "</span>";
        k += "<li><span>Departure</span> <br>";
        k += '<span style="color:#666;white-space: normal;">' + j.dep + "&nbsp &nbsp" + j.datefrom.slice(0, 6) + "&nbsp &nbsp" + j.fromname + "</span>";
        k += "<li><span>Arrival</span> <br>";
        k += '<span style="color:#666;white-space: normal;">' + j.arr + "&nbsp &nbsp" + j.dateto.slice(0, 6) + "&nbsp &nbsp" + j.toname + "</span>";
        k += '<span style="color:#666;white-space: normal;"><br>';
        k += "</span></li>";
        k += "</ul>";
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
            success: function() {
                console.log(k);
            },
            complete: function() {
                $.mobile.loading("hide");
                var a = "";
                a = $("<div data-role='page' id='train_details'><div data-role='header' data-theme='b' data-position='fixed'><a data-transition='flip' data-direction ='reverse' data-iconpos='left' data-icon='back' href='#train_list' >Back</a><h1>Train Details</h1></div><div data-role='content' id='td_con'> <div data-role='popup' id='popupBasic' data-overlay-theme='a'><ul data-role = 'listview' data-inset = 'true' ><li data-role = 'list-divider'>Choose an Action</li><li><a href = '#' value = '1' id = 'seat' >Seat Availability</a></li><li><a href = '#' value = '2' id = 'route'>Route</a></li><li><a href = '#' value = '2' id = 'fare'>Fare</a></li></ul></div><p><div id='td_output'></div></p></div></div>");
                a.appendTo($.mobile.pageContainer);
                $("#td_output").html("");
                $("#td_output").html(k);
                $.mobile.changePage($("#train_details"), {
                    transition: "flip"
                });
                $("#train_details").trigger("create");
            }
        });
    }
    $(document).on("submit", "#stn_form123", function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var k, l, n;
        if ($("#stn_date").val() != "") {
            k = frmt_date($("#stn_date").val());
        }
        n = $("#to_stn").val();
        l = $("#from_stn").val();
        if (n.length == 0 || l.length === 0) {
            alert("Enter Stations");
            return;
        }
        var o = /\(([^)]+)\)/;
        var m = o.exec(n);
        var p = o.exec(l);
        localStorage.pto = m[1];
        localStorage.pfrom = p[1];
        if ($("#stn_date").val() != "") {
            $.ajax({
                type: "GET",
                url: "http://api.erail.in/trains/?key=YOUR_API_KEY&stnfrom=" + p[1] + "&stnto=" + m[1] + "&date=" + k,
                cache: false,
                beforeSend: function() {
                    $.mobile.loading("show", {
                        theme: "b",
                        text: "Please wait...",
                        textonly: false,
                        textVisible: true
                    });
                },
                success: onstnsuccess,
                error: onstnError,
                complete: function() {
                    $.mobile.loading("hide");
                    if (LT == "") {
                        return;
                    }
                    console.log(LT);
                    var a = $("<div data-role='page' id='train_list'><div data-theme = 'b' data-role='header' data-position='fixed'><a data-iconpos='left' data-icon='back' data-transition = 'flip' data-direction='reverse'href='section4.html' >Back</a><h1>List of trains</h1></div><div data-role='content' id='tl_con'><div id='tl_output'>" + LT + "</div></div></div>");
                    a.appendTo($.mobile.pageContainer);
                    $.mobile.changePage($(a), {
                        transition: "flip"
                    });
                }
            });
        } else {
            $.ajax({
                type: "GET",
                url: "http://api.erail.in/trains/?key=YOUR_API_KEY&stnfrom=" + p[1] + "&stnto=" + m[1],
                cache: false,
                beforeSend: function() {
                    $.mobile.loading("show", {
                        theme: "b",
                        text: "Please wait...",
                        textonly: false,
                        textVisible: true
                    });
                },
                success: onstnsuccess,
                error: onstnError,
                complete: function() {
                    $.mobile.loading("hide");
                    if (LT == "") {
                        return;
                    }
                    console.log(LT);
                    var a = $("<div data-role='page' id='train_list'><div data-theme = 'b' data-role='header' data-position='fixed'><a data-iconpos='left' data-icon='back' data-transition = 'flip' data-direction='reverse' href='section4.html' >Back</a><h1>List of trains</h1></div><div data-role='content' id='tl_con'><div id='tl_output'>" + LT + "</div></div></div>");
                    console.log(a);
                    a.appendTo($.mobile.pageContainer);
                    $.mobile.changePage($(a), {
                        transition: "flip"
                    });
                }
            });
        }
    });

    function post_stn_form(g, e, h) {
        $.ajax({
            type: "GET",
            url: "http://api.erail.in/trains/?key=YOUR_API_KEY&stnfrom=" + e + "&stnto=" + g,
            cache: false,
            beforeSend: function() {
                $.mobile.loading("show", {
                    theme: "b",
                    text: "Please wait...",
                    textonly: false,
                    textVisible: true
                });
            },
            success: onstnsuccess,
            error: onstnError,
            complete: function() {
                $.mobile.loading("hide");
                if (LT == "") {
                    return;
                }
                console.log(LT);
                var a = $("<div data-role='page' id='train_list'><div data-theme = 'b' data-role='header' data-position='fixed'><a data-iconpos='left' data-icon='back' data-transition = 'flip' data-direction='reverse' href='section4.html' >Back</a><h1>List of trains</h1></div><div data-role='content' id='tl_con'><div id='tl_output'>" + LT + "</div></div></div>");
                console.log(a);
                a.appendTo($.mobile.pageContainer);
                $.mobile.changePage($(a), {
                    transition: "flip"
                });
            }
        });
    }
    $(document).on("click", "#seat", function(b) {
        b.preventDefault();
        b.stopImmediatePropagation();
        $.ajax({
            type: "GET",
            url: "http://api.erail.in/route/?key=YOUR_API_KEY&trainno=" + N,
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
                if (q == "") {
                    return;
                }
                var a = $("<div data-role='page' id='seat_list'><div data-role='header' data-theme='b' data-position='fixed'><a data-iconpos='left' data-icon='back' data-transition = 'flip' data-direction='reverse' href='#train_details' >Back</a><h1>Seat Availability</h1></div><div data-role='content' id='st_con'><div id='st_output'></div></div></div>");
                a.appendTo($.mobile.pageContainer);
                $("#st_output").html("");
                $("#st_output").html(q);
                $.mobile.changePage($("#seat_list"), {
                    transition: "flip"
                });
                $("#seat_list").trigger("create");
            },
            success: seatinfo,
            error: onerror
        });
    });
    $(document).on("click", "#fare", function(b) {
        b.preventDefault();
        b.stopImmediatePropagation();
        $.ajax({
            type: "GET",
            url: "http://api.erail.in/route/?key=YOUR_API_KEY&trainno=" + N,
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
                if (qf == "") {
                    return;
                }
                var a = "";
                a = $("<div data-role='page' id='fare_list'><div data-role='header' data-theme='b' data-position='fixed'><a data-iconpos='left' data-icon='back' href = '#train_details' data-transition = 'flip' >Back</a><h1>Fare Details</h1></div><div data-role='content' id='fare_con'><div id='fare_output'></div></div></div>");
                a.appendTo($.mobile.pageContainer);
                $("#fare_output").html("");
                $("#fare_output").html(qf);
                $.mobile.changePage($("#fare_list"), {
                    transition: "flip"
                });
                $("#fare_list").trigger("create");
            },
            success: fareinfo,
            error: onerror
        });
    });
    var F_cls;
    var F_trn;

    function fareinfo(i, o) {
        var d = JSON.parse(i);
        qf = "";
        if (d.status != "OK") {
            if (!d.status) {
                alert(d.status);
            } else {
                alert("Error !!");
            }
            return;
        }
        F_trn = d.result;
        var l = d.result.route[0].stn;
        var m = d.result.route[0].cls;
        F_cls = m.split(" ");
        qf = '<form id = "fare_data" data-ajax="false">';
        qf += '<div data-role="fieldcontain" class = "ui-btn">';
        qf += '<label for="select-native-1">From:</label>';
        var n, p;
        p = l.length;
        qf += '<select name="select-native-1" date-role ="select" id="ffrom" >';
        for (n = 0; n < p; n++) {
            qf += "<option value=" + l[n].code + ">" + l[n].name + "</option>";
        }
        qf += "</select>";
        qf += "</div>";
        var n, p;
        p = l.length;
        qf += '<div  data-role="fieldcontain" class = "ui-btn">';
        qf += '<label for="select-native-1">To:</label>';
        qf += '<select name="select-native-1" id="fto" date-role ="select" >';
        for (n = 0; n < p; n++) {
            qf += "<option value=" + l[n].code + ">" + l[n].name + "</option>";
        }
        qf += "</select>";
        qf += "</div>";
        qf += '<div data-role="fieldcontain" class = "ui-btn">';
        qf += '<label for="select-native-1">Class</label>';
        p = F_cls.length;
        qf += '<select name="select-native-1" id="fcls"  date-role ="select">';
        for (n = 0; n < p; n++) {
            qf += "<option value=" + F_cls[n] + ">" + F_cls[n] + "</option>";
        }
        qf += "</select>";
        qf += "</div>";
        qf += '<div data-role="fieldcontain" class = "ui-btn">';
        qf += '<label for="select-native-1">Quota</label>';
        qf += '<select name="select-native-1" id="fqta"  date-role ="select">';
        qf += "<option value=GN> General Quota</option>";
        qf += "<option value=CK> Tatkal Quota</option>";
        qf += "<option value=DF> Defence Quota</option>";
        qf += "<option value=LD> Ladies Quota</option>";
        qf += "<option value=FT> Foreign Tourist</option>";
        qf += "<option value=DP> Duty Pass Quota</option>";
        qf += "<option value=HP> Handicapped Quota</option>";
        qf += "<option value=PH> Parliament House Quota</option>";
        qf += "<option value=SS> Lower Berth Quota</option>";
        qf += "<option value=YU> Yuva Quota</option>";
        qf += "</select>";
        qf += "</div>";
        qf += '<div data-role="fieldcontain" class = "ui-btn">';
        qf += '<label for="select-native-1">Age</label>';
        qf += '<select name="select-native-1" id="fage" date-role ="select">';
        qf += "<option value=AD> Adult</option>";
        qf += "<option value=CH> Child</option>";
        qf += "<option value=SM> Senior Citizen(MALE)</option>";
        qf += "<option value=SF> Senior Citizen(FEMALE)</option>";
        qf += "</select>";
        qf += "</div>";
        qf += '<div data-role="fieldcontain" class = "ui-btn">';
        qf += '<label for="date">Date Input:</label>';
        qf += '<input type="date"  id="fdate"    required/>';
        qf += "</div>";
        qf += '<input type="submit" name="submit" id="sub" value="Submit" data-theme="e"   />';
        qf += "</div></form>";
    }
    $(document).on("submit", "#fare_data", function(k) {
        k.preventDefault();
        k.stopImmediatePropagation();
        var l, e, m, a, n;
        l = frmt_date(document.getElementById("fdate").value);
        e = $("#fto").val();
        m = $("#ffrom").val();
        a = $("#fqta").val();
        n = $("#fage").val();
        c = $("#fcls").val();
        selected_cl2 = c;
        if (e == m) {
            alert("Source and destination can not be same");
            return;
        }
        $.ajax({
            type: "GET",
            url: "http://api.erail.in/fare/?key=YOUR_API_KEY&trainno=" + N + "&stnfrom=" + m + "&stnto=" + e + "&age=" + n + "&quota=" + a + "&class=" + c + "&date=" + l,
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
                if (tabf == "") {
                    return;
                }
                var b = $("<div data-role='page' id='fared_list'><div data-role='header' data-theme='b' data-position='fixed'><a data-iconpos='left' data-icon='back' href = '#fare_list' data-transition = 'flip'>Back</a><h1>Fare Details</h1></div><div data-role='content' id='fared_con'><div id='fared_output'></div></div></div>");
                b.appendTo($.mobile.pageContainer);
                $("#fared_output").html("");
                $("#fared_output").html(tabf);
                $.mobile.changePage($("#fared_list"), {
                    transition: "flip"
                });
                $("#fared_list").trigger("create");
            },
            success: fair_info,
            error: onerror
        });
    });

    function fair_info(C, a) {
        var x = JSON.parse(C);
        tabf = "";
        if (x.status == "Past date data not available") {
            alert("Past date data not available");
            return;
        }
        if (x.status != "OK") {
            if (!x.error_message) {
                alert("Query not sucessful!!");
            } else {
                alert(x.error_message);
            }
            return;
        }
        var B, d, v, n;
        v = F_cls.length;
        var w, z, A, y, t, i;
        if (!x.result.fare.length) {
            alert("Error");
            return;
        }
        w = x.result.from;
        z = x.result.to;
        A = x.result.from;
        y = x.result.quota;
        t = x.result.trainno;
        i = x.result.date;
        for (B = 0, d = "a"; B < v; B++) {
            if (selected_cl2 == F_cls[B]) {
                tabf += '<div style = "margin-right: 1.0em;" class="ui-block-' + d + '"><div class="button-wrap"><button data-theme="b" class="ui-shadow ui-btn ui-corner-all" id = "f_cls" value ="' + F_cls[B] + '" onclick = "cls_res(this,\'' + w + "','" + z + "','" + A + "','" + y + "','" + t + "','" + i + "')\">" + F_cls[B] + "</button></div></div>";
            } else {
                tabf += '<div style = "margin-right: 1.0em;" class="ui-block-' + d + '"><div class="button-wrap"><button data-theme="c" class="ui-shadow ui-btn ui-corner-all" id = "f_cls" value ="' + F_cls[B] + '" onclick = "cls_res(this,\'' + w + "','" + z + "','" + A + "','" + y + "','" + t + "','" + i + "')\">" + F_cls[B] + "</button></div></div>";
            }
            switch (d) {
                case "a":
                    d = "b";
                    break;
                case "b":
                    d = "c";
                    break;
                case "c":
                    d = "a";
                    break;
            }
        }
        tabf += '</br></br></br></br></br></br><ul data-role="listview"  data-inset="true" class = "p_list" onclick = "">';
        tabf += ' <li  is="listview-li" data-role="list-divider" id = "p_list">' + F_trn.name + "<re> &nbsp &nbsp" + F_trn.trainno + "</re></li>";
        tabf += "<li><span>Class</span> &nbsp &nbsp";
        tabf += '<span style="color:#666;white-space: normal;">' + x.result.fare[0].cls + "</span>";
        tabf += "<li><span>From</span> &nbsp &nbsp";
        tabf += '<span style="color:#666;white-space: normal;">' + x.result.from + "</span>";
        tabf += "<li><span>To</span> &nbsp &nbsp";
        tabf += '<span style="color:#666;white-space: normal;">' + x.result.to + "</span>";
        tabf += "<li><span>Date</span> &nbsp &nbsp";
        tabf += '<span style="color:#666;white-space: normal;">' + x.result.date + "</span>";
        tabf += "<li><span>Fare</span> &nbsp &nbsp";
        tabf += '<span style="color:#666;white-space: normal;">' + x.result.fare[0].fare + "</span>";
        tabf += "</li>";
        tabf += "</ul>";
    }

    function cls_res(p, m, r, s, o, n, d) {
        var a = $(p).val();
        selected_cl2 = a;
        $.ajax({
            type: "GET",
            url: "http://api.erail.in/fare/?key=YOUR_API_KEY&trainno=" + n + "&stnfrom=" + m + "&stnto=" + r + "&age=" + s + "&quota=" + o + "&class=" + a + "&date=" + d,
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
                var b = $("<div data-role='page' id='fared_list'><div data-role='header' data-position='fixed'><a data-iconpos='left' data-icon='back' data-rel='back' >Back</a><h1>Fare Details</h1></div><div data-role='content' id='fared_con'><div id='fared_output'></div></div></div>");
                b.appendTo($.mobile.pageContainer);
                $("#fared_output").html("");
                $("#fared_output").html(tabf);
                $.mobile.changePage($("#fared_list"), {
                    transition: "flip"
                });
                $("#fared_list").trigger("create");
            },
            success: fair_info,
            error: onerror
        });
    }
    $(document).on("click", "#route", function(b) {
        b.preventDefault();
        b.stopImmediatePropagation();
        $.ajax({
            type: "GET",
            url: "http://api.erail.in/route/?key=YOUR_API_KEY&trainno=" + N,
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
                if (table == "") {
                    return;
                }
                var a = $("<div data-role='page' id='route_list'><div data-theme = 'b' data-role='header' data-position='fixed'><a data-iconpos='left' data-icon='back' data-rel='back' >Back</a><h1>Route Details</h1></div><div data-role='content' id='route_con'><div id='route_output'></div></div></div>");
                a.appendTo($.mobile.pageContainer);
                $("#route_output").html("");
                $("#route_output").html(table);
                $("#route_output").trigger("create");
                $.mobile.changePage($("#route_list"), {
                    transition: "flip"
                });
            },
            success: traininfo,
            error: onerror
        });
    });

    function traininfo(d, j) {
        var l = JSON.parse(d);
        table = "";
        if (l.status != "OK") {
            if (!l.status) {
                alert(l.status);
            } else {
                alert("Error !!");
            }
            return;
        }
        table = "<h2>" + l.result.name + "</h2>";
        table += '<table  data-role="table" border = "1" data-mode="columntoggle"  class="ui-responsive ui-shadow table-stripe" id = "myTable1" ><thead><tr style ="color:brown;"><th data-priority="6">Station Code</th><th>Station Name</th><th>Arrival</th><th>Departure</th><th data-priority="6">Day</th></tr>';
        var d = l.result.route[0].stn;
        var i, k;
        k = d.length;
        table += "<tbody>";
        for (i = 0; i < k; i++) {
            table += "<tr><td>" + d[i].code + "</td><td>" + d[i].name + "</td><td>" + d[i].arr + "</td><td>" + d[i].dep + "</td><td>" + d[i].day + "</td></tr>";
        }
        table += "</tbody></table>";
    }
    $(document).on("submit", "#seat_avail", function(s) {
        s.preventDefault();
        s.stopImmediatePropagation();
        var p = document.getElementById("s_date").value;
        var r = new Array();
        r = p.split("-");
        var e = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        var m;
        m = r[2] + "-" + e[parseInt(r[1], 10) - 1] + "-" + r[0];
        var u = document.getElementById("to").value;
        var o = document.getElementById("from").value;
        var n = document.getElementById("cls").value;
        selected_cl = n;
        var t = document.getElementById("qta").value;
        if (u == o) {
            alert("Source and destination can not be same");
            return;
        }
        $.ajax({
            type: "GET",
            url: "http://api.erail.in/seats/?key=YOUR_API_KEY&trainno=" + TR.result.trainno + "&stnfrom=" + o + "&stnto=" + u + "&quota=" + t + "&class=" + n + "&date=" + m,
            cache: false,
            beforeSend: function() {
                $.mobile.loading("show", {
                    theme: "b",
                    text: "Please wait...",
                    textonly: false,
                    textVisible: true
                });
            },
            success: seat_success,
            error: onerror,
            complete: function() {
                $.mobile.loading("hide");
                if (tab == "") {
                    return;
                }
                var a = $("<div data-role='page' id='seatinfo_list'><div data-role='header' data-theme = 'b' data-position='fixed'><a data-iconpos='left' data-icon='back' href='#seat_list' data-transition = 'flip'>Back</a><h1>Seat Availability</h1></div><div data-role='content' id='seatinfo_con'><div id='seatinfo_output'></div><style>.ui-table-columntoggle-btn {display: none !important;}</style></div></div>");
                a.appendTo($.mobile.pageContainer);
                $("#seatinfo_output").html("");
                $("#seatinfo_output").html(tab);
                $.mobile.changePage($("#seatinfo_list"), {
                    transition: "flip"
                });
                $("#seatinfo_list").trigger("create");
            }
        });
    });

    function seatinfo(i, n) {
        TR = JSON.parse(i);
        q = "";
        localStorage[N] = JSON.stringify(TR);
        if (TR.status != "OK") {
            if (TR.status) {
                alert(TR.status);
            } else {
                alert("Error !!");
            }
            return;
        }
        var k = TR.result.route[0].stn;
        var o = TR.result.route[0].cls;
        var l = o.split(" ");
        q = '<form id = "seat_avail" data-ajax="false">';
        q += '<div data-role="fieldcontain" class = "ui-btn">';
        q += '<label for="select-native-1">From:</label>';
        var m, p;
        p = k.length;
        q += '<select name="select-native-1" date-role ="select" id="from" >';
        for (m = 0; m < p; m++) {
            q += "<option value=" + k[m].code + ">" + k[m].name + "</option>";
        }
        q += "</select>";
        q += "</div>";
        var m, p;
        p = k.length;
        q += '<div data-role="fieldcontain" class = "ui-btn">';
        q += '<label for="select-native-1">To:</label>';
        q += '<select name="select-native-1" id="to" date-role ="select" >';
        for (m = 0; m < p; m++) {
            q += "<option value=" + k[m].code + ">" + k[m].name + "</option>";
        }
        q += "</select>";
        q += "</div>";
        q += '<div data-role="fieldcontain" class = "ui-btn">';
        q += '<label for="select-native-1">Class</label>';
        p = l.length;
        q += '<select name="select-native-1" id="cls"  date-role ="select">';
        for (m = 0; m < p; m++) {
            q += "<option value=" + l[m] + ">" + l[m] + "</option>";
        }
        q += "</select>";
        q += "</div>";
        q += '<div data-role="fieldcontain" class = "ui-btn">';
        q += '<label for="select-native-1">Quota</label>';
        q += '<select name="select-native-1" id="qta" date-role ="select">';
        q += "<option value=GN> General Quota</option>";
        q += "<option value=CK> Tatkal Quota</option>";
        q += "<option value=DF> Defence Quota</option>";
        q += "<option value=LD> Ladies Quota</option>";
        q += "<option value=FT> Foreign Tourist</option>";
        q += "<option value=DP> Duty Pass Quota</option>";
        q += "<option value=HP> Handicapped Quota</option>";
        q += "<option value=PH> Parliament House Quota</option>";
        q += "<option value=SS> Lower Berth Quota</option>";
        q += "<option value=YU> Yuva Quota</option>";
        q += "</select>";
        q += "</div>";
        q += '<div data-role="fieldcontain" class = "ui-btn">';
        q += '<label for="date">Date Input:</label>';
        q += '<input type="date" name="date" id= "s_date"  required />';
        q += "</div>";
        q += '<div data-role="fieldcontain" class = "ui-btn">';
        q += '<input type="submit" name="submit" id="sub" value="Submit"  data-theme="e"/>';
        q += "</div></form>";
    }

    function onerror() {
        alert("Your query is unsucessful, Please try again !!");
    }

    function seat_success(E, C) {
        var v = JSON.parse(E);
        tab = "";
        if (v.status != "OK") {
            if (v.error_message) {
                alert(v.error_message);
            } else {
                if (v.status) {
                    alert("Data not available");
                } else {
                    alert("Error !!");
                }
            }
            return;
        }
        if (v.result.error) {
            if (v.result.error) {
                alert(v.result.error);
            } else {
                alert("Error !!");
            }
            return;
        }
        var I = TR.result.route[0].cls;
        var w = I.split(" ");
        var i = w.length;
        var y;
        tab = "<h2>" + TR.result.name + "</h2>";
        tab += '<div class = "ui-grid-b">';
        var z = ["a", "b", "c", "d"];
        var F, l, H, B, x;
        F = v.result.to;
        l = v.result.from;
        B = v.result.trainno;
        x = v.result.quota;
        H = v.result.seats[0].date;
        var D;
        for (y = 0, D = "a"; y < i; y++) {
            if (w[y] == selected_cl) {
                tab += '<div class="ui-block-' + D + '"><div class="button-wrap"><button data-theme = "b" class="ui-shadow ui-btn ui-corner-all " value ="' + w[y] + '" onclick = "cls_clicked(this,\'' + F + "','" + l + "','" + B + "','" + H + "','" + x + "')\">" + w[y] + "</button></div></div>";
            } else {
                tab += '<div class="ui-block-' + D + '"><div class="button-wrap"><button data-theme = "c" class="ui-shadow ui-btn ui-corner-all " value ="' + w[y] + '" onclick = "cls_clicked(this,\'' + F + "','" + l + "','" + B + "','" + H + "','" + x + "')\">" + w[y] + "</button></div></div>";
            }
            switch (D) {
                case "a":
                    D = "b";
                    break;
                case "b":
                    D = "c";
                    break;
            }
        }
        tab += "</div>";
        tab += '<table data-mode="columntoggle" data-role="table" class="ui-shadow table-stripe" id="myTable1" align = "center" >';
        tab += '<thead style = "color:brown;"><th>Date</th><th>Availablity</th></thead>';
        var A;
        A = v.result.seats;
        var G = A.length;
        var y;
        tab += "<tbody>";
        for (y = 0; y < G; y++) {
            tab += "<tr><td>" + A[y].date + "</td><td>" + A[y].seat + "</td></tr>";
        }
        tab += "</tbody></table>";
    }

    function cls_clicked(p, o, m, j, l, n) {
        var k = $(p).val();
        selected_cl = k;
        $.ajax({
            type: "GET",
            url: "http://api.erail.in/seats/?key=YOUR_API_KEY&trainno=" + j + "&stnfrom=" + m + "&stnto=" + o + "&quota=" + n + "&class=" + k + "&date=" + l,
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
                var a = $("<div data-role='page' id='seatinfo_list'><div data-role='header' data-position='fixed'><a data-iconpos='left' data-icon='back' data-rel='back' >Back</a><h1>Seat Availability</h1></div><div data-role='content' id='seatinfo_con'><div id='seatinfo_output'></div></div></div>");
                a.appendTo($.mobile.pageContainer);
                $("#seatinfo_output").html("");
                $("#seatinfo_output").html(tab);
                $("#seatinfo_output").trigger("create");
                $.mobile.changePage($("#seatinfo_list"), {
                    transition: "flip"
                });
                $("#seatinfo_list").trigger("create");
            },
            success: seat_success,
            error: onerror
        });
    }

    function onstnsuccess(i, l) {
        f = JSON.parse(i);
        LT = "";
        if (f.status != "OK") {
            alert("No Train Found");
            return;
        }
        console.log(f);
        var j = f.result;
        var m = j.length;
        if (!m) {
            alert("No Train Found");
            return;
        }
        var k;
        LT = "";
        LT = '<ul data-role="listview">';
        var n = [];
        for (k = 0; k < m; k++) {
            LT += '<li><a href = "#" onclick = "train_info(this,\'' + k + "')\">" + j[k].name + "</a></li>";
        }
        LT += "</ul>";
    }

    function onstnError() {
        alert("server error");
    }
    $(document).on("pagecreate", "#stn", function() {
    if (localStorage.pto && localStorage.pfrom) {
        lpt = localStorage.pto;
        lpf = localStorage.pfrom;
        var d = '<ul data-role="listview" data-inset="true" style="min-width:210px;" data-theme="c"><li data-role="divider" data-theme="b">Your recent query</li><li ><a href="#" id="query_stn">' + localStorage.pfrom + "&nbsp;-&nbsp;" + localStorage.pto + "</a></li></ul>";
        $("#t_query").html(d);
        $("#query_stn").on("click", function(a) {
            a.preventDefault();
            a.stopImmediatePropagation();
            post_stn_form(lpt, lpf);
        });
    }
    console.log("exec");
    $.getJSON("./json/stations_with_code.json", function(a, b) {
        source = [];
        $.each(a, function(j, i) {
            source.push({
                label: i.name + "(" + i.code + ")",
                code: i.code,
                station: i.name
            });
        });
    });

    function e(h, a) {
        var b = new RegExp("^" + $.ui.autocomplete.escapeRegex(h.term), "i");
        a($.grep(source, function(g) {
            return b.test(g.station) || b.test(g.code);
        }));
    }
    $("#from_stn").autocomplete({
        source: e,
        open: function(a) {
            valid = false;
        },
        select: function(b, a) {
            valid = true;
            $("#from_stn").val(a.item.label);
        },
        close: function(a) {
            if (!valid) {
                $(this).val("");
            }
        },
        minLength: 2,
        delay: 0
    });
    $("#from_stn").change(function() {
        if (source.indexOf($(this).val()) == -1) {
            $(this).val("");
        }
    });
    $("#to_stn").autocomplete({
        source: e,
        open: function(a) {
            valid = false;
        },
        select: function(b, a) {
            valid = true;
            $("#to_stn").val(a.item.label);
        },
        close: function(a) {
            if (!valid) {
                $(this).val("");
            }
        },
        minLength: 2,
        delay: 0
    });
    $("#to_stn").change(function() {
        if (source.indexOf($(this).val()) == -1) {
            $(this).val("");
        }
    });
});
