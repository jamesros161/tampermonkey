// ==UserScript==
// @description Add cPJump buttons to PowerPanel
// @name PPcPJump 2.0
// @namespace PPcPJump
// @version 2.1
// @include https://secure1.inmotionhosting.com/admin/note/*
// @include https://cpjump.inmotionhosting.com/cplogin/
// @match https://secure1.inmotionhosting.com/admin/note/*
// @match https://cpjump.inmotionhosting.com/cplogin/
// @match https://secure1.inmotionhosting.com/admin/supportqueue*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
//below is a test
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
// ==/UserScript==



function setupButtons(){
    var data = document.getElementsByClassName('acct_info');
    var username_data = data[0].getElementsByClassName('acct_username');
    var server_data = data[0].getElementsByClassName('acct_server');
    var team_member = document.getElementById('hiddenAdmin').innerText;
    var URL = document.URL;
    var username = username_data[0].innerText;
    var server = server_data[0].innerText;
    var domain = document.getElementsByClassName('acct_domain')[0].innerText;
    var current_acct_tab = document.getElementsByClassName('account_tabs')[0].id;
    var id_offset = 24;

    function clearSelection(){

        if(window.getSelection){
            if(window.getSelection.empty){
                window.getSelection.empty();
            } else if (window.getSelection().removeAllRanges){
                window.getSelection().removeAllRanges();
            }
        } else if (document.selection) {
            document.selection.empty();
        }
    };

    function hide_churn_rate() {
        //document.getElementsByClassName('churn-risk-indicator')[0].style.display("none");
        $(".churn-risk-indicator").css("display","none");

        for (var i = 0; i < Object.values($("button")).length;i++) {
             var x = Object.values($("button"))[i].attr("name");
             if ( x == "quick_copy_button" ) {
                  console.log( Object.values($("button"))[i] );
             }
        }
    }

    function copy_t2c_button_action(){

         var esc_string = `
        Server: ${server}<br />
        User: ${username}<br />
        Domain Name: ${domain}<br />
        Agent: ${team_member}<br />
        PP Link: ${URL}<br />
        Verified: Y<br />
        Issue or Request:
        `;
        clearSelection();
        var esc_text = document.createElement('div');
        esc_text.innerHTML = esc_string;
        document.body.appendChild(esc_text);
        var range = document.createRange();
        range.selectNode(esc_text);
        window.getSelection().addRange(range);
        document.execCommand('copy');
        document.body.removeChild(esc_text);

    };

    function quick_copy_button_action(){
        var quick_copy_str = `${username} / ${server} / ${domain}`;
        var quick_copy_text = document.createTextNode(quick_copy_str);
        clearSelection();
        document.body.appendChild(quick_copy_text);
        var range = document.createRange();
        range.selectNode(quick_copy_text);
        window.getSelection().addRange(range);
        document.execCommand('copy');
        document.body.removeChild(quick_copy_text);
    };

    function drawButtons(acct_tab_id){
        var account_tools = document.getElementsByClassName('acct_tools')[acct_tab_id];
        if(account_tools.childNodes.length === 15){
            var re = new RegExp("biz\|ld\|ngx");
            var re2 = new RegExp("hub\|ld");
            if(re.test(server) === false && re2.test(server) === false){
                //WHM
                var whm_button_container = document.createElement('li');
                var whm_form = document.createElement("form");
                whm_form.setAttribute("target", "_blank");
                whm_form.setAttribute("method", "POST");
                whm_form.setAttribute("action", "https://cpjump.inmotionhosting.com/cplogin/");
                var whm_serverField = document.createElement("input");
                whm_serverField.setAttribute("type", "hidden");
                whm_serverField.setAttribute("name", "server");
                whm_serverField.setAttribute("value", server);
                whm_form.appendChild(whm_serverField);
                var whm_userField = document.createElement("input");
                whm_userField.setAttribute("type", "hidden");
                whm_userField.setAttribute("name", "username");
                whm_userField.setAttribute("value", username);
                var imh_re = new RegExp("biz\|gs");

                whm_form.appendChild(whm_userField);
                var whm_serviceField = document.createElement("input");
                whm_serviceField.setAttribute("type", "hidden");
                whm_serviceField.setAttribute("name", "service");
                whm_serviceField.setAttribute("value", "whostmgrd");
                whm_form.appendChild(whm_serviceField);
                var whm_submit = document.createElement("button");
                whm_submit.setAttribute("type", "submit");
                whm_submit.setAttribute("name", "submit");
                whm_submit.innerHTML = "WHM";
                whm_form.appendChild(whm_submit);
                whm_button_container.appendChild(whm_form);
                account_tools.appendChild(whm_button_container);

                //WHM ROOT
                var whm_button_container = document.createElement('li');
                var whm_form = document.createElement("form");
                whm_form.setAttribute("target", "_blank");
                whm_form.setAttribute("method", "POST");
                whm_form.setAttribute("action", "https://cpjump.inmotionhosting.com/cplogin/");
                var whm_serverField = document.createElement("input");
                whm_serverField.setAttribute("type", "hidden");
                whm_serverField.setAttribute("name", "server");
                whm_serverField.setAttribute("value", server);
                whm_form.appendChild(whm_serverField);
                var whm_userField = document.createElement("input");
                whm_userField.setAttribute("type", "hidden");
                whm_userField.setAttribute("name", "username");
                whm_userField.setAttribute("value", 'root');
                var imh_re = new RegExp("biz\|gs");


                whm_form.appendChild(whm_userField);
                var whm_serviceField = document.createElement("input");
                whm_serviceField.setAttribute("type", "hidden");
                whm_serviceField.setAttribute("name", "service");
                whm_serviceField.setAttribute("value", "whostmgrd");
                whm_form.appendChild(whm_serviceField);
                var whm_submit = document.createElement("button");
                whm_submit.setAttribute("type", "submit");
                whm_submit.setAttribute("name", "submit");
                whm_submit.innerHTML = "WHM ROOT";
                whm_form.appendChild(whm_submit);
                whm_button_container.appendChild(whm_form);
                account_tools.appendChild(whm_button_container);

                //dkey button
                var cpanel_button_container = document.createElement('li');
                var cpanel_form = document.createElement("form");
                cpanel_form.setAttribute("target", "_blank");
                cpanel_form.setAttribute("method", "POST");
                cpanel_form.setAttribute("action", "https://cpjump.inmotionhosting.com/dedtmpkeys/process-dedkey.php");
                var cpanel_serverField = document.createElement("input");
                cpanel_serverField.setAttribute("type", "hidden");
                cpanel_serverField.setAttribute("name", "server");
                cpanel_serverField.setAttribute("value", server);
                cpanel_form.appendChild(cpanel_serverField);
                var cpanel_userField = document.createElement("input");
                cpanel_userField.setAttribute("type", "hidden");
                cpanel_userField.setAttribute("name", "port");
                cpanel_userField.setAttribute("value", "22");
                cpanel_form.appendChild(cpanel_userField);
                var cpanel_submit = document.createElement("button");
                cpanel_submit.setAttribute("type", "submit");
                cpanel_submit.setAttribute("name", "submit");
                cpanel_submit.innerHTML = "dKey";
                cpanel_form.appendChild(cpanel_submit);
                cpanel_button_container.appendChild(cpanel_form);
                account_tools.appendChild(cpanel_button_container);

                //if and IMH shared, load WHM for inmotion
            } else if (re.test(server) === true) {
                //WHM
                var whm_button_container = document.createElement('li');
                var whm_form = document.createElement("form");
                whm_form.setAttribute("target", "_blank");
                whm_form.setAttribute("method", "POST");
                whm_form.setAttribute("action", "https://cpjump.inmotionhosting.com/cplogin/");
                var whm_serverField = document.createElement("input");
                whm_serverField.setAttribute("type", "hidden");
                whm_serverField.setAttribute("name", "server");
                whm_serverField.setAttribute("value", server);
                whm_form.appendChild(whm_serverField);
                var whm_userField = document.createElement("input");
                whm_userField.setAttribute("type", "hidden");
                whm_userField.setAttribute("name", "username");
                whm_userField.setAttribute("value", 'inmotion');
                var imh_re = new RegExp("biz\|gs");


                whm_form.appendChild(whm_userField);
                var whm_serviceField = document.createElement("input");
                whm_serviceField.setAttribute("type", "hidden");
                whm_serviceField.setAttribute("name", "service");
                whm_serviceField.setAttribute("value", "whostmgrd");
                whm_form.appendChild(whm_serviceField);
                var whm_submit = document.createElement("button");
                whm_submit.setAttribute("type", "submit");
                whm_submit.setAttribute("name", "submit");
                whm_submit.innerHTML = "WHM";
                whm_form.appendChild(whm_submit);
                whm_button_container.appendChild(whm_form);
                account_tools.appendChild(whm_button_container);

                //if HUB, load WHM for hubhost
            } else if (re2.test(server) === true) {
                //WHM
                var whm_button_container = document.createElement('li');
                var whm_form = document.createElement("form");
                whm_form.setAttribute("target", "_blank");
                whm_form.setAttribute("method", "POST");
                whm_form.setAttribute("action", "https://cpjump.inmotionhosting.com/cplogin/");
                var whm_serverField = document.createElement("input");
                whm_serverField.setAttribute("type", "hidden");
                whm_serverField.setAttribute("name", "server");
                whm_serverField.setAttribute("value", server);
                whm_form.appendChild(whm_serverField);
                var whm_userField = document.createElement("input");
                whm_userField.setAttribute("type", "hidden");
                whm_userField.setAttribute("name", "username");
                whm_userField.setAttribute("value", 'hubhost');
                var imh_re = new RegExp("biz\|gs");


                whm_form.appendChild(whm_userField);
                var whm_serviceField = document.createElement("input");
                whm_serviceField.setAttribute("type", "hidden");
                whm_serviceField.setAttribute("name", "service");
                whm_serviceField.setAttribute("value", "whostmgrd");
                whm_form.appendChild(whm_serviceField);
                var whm_submit = document.createElement("button");
                whm_submit.setAttribute("type", "submit");
                whm_submit.setAttribute("name", "submit");
                whm_submit.innerHTML = "WHM";
                whm_form.appendChild(whm_submit);
                whm_button_container.appendChild(whm_form);
                account_tools.appendChild(whm_button_container);
            }


                var cpanel_button_container = document.createElement('li');
                var cpanel_form = document.createElement("form");
                cpanel_form.setAttribute("target", "_blank");
                cpanel_form.setAttribute("method", "POST");
                cpanel_form.setAttribute("action", "https://cpjump.inmotionhosting.com/cplogin/");
                var cpanel_serverField = document.createElement("input");
                cpanel_serverField.setAttribute("type", "hidden");
                cpanel_serverField.setAttribute("name", "server");
                cpanel_serverField.setAttribute("value", server);
                cpanel_form.appendChild(cpanel_serverField);
                var cpanel_userField = document.createElement("input");
                cpanel_userField.setAttribute("type", "hidden");
                cpanel_userField.setAttribute("name", "username");
                cpanel_userField.setAttribute("value", username);
                cpanel_form.appendChild(cpanel_userField);
                var cpanel_serviceField = document.createElement("input");
                cpanel_serviceField.setAttribute("type", "hidden");
                cpanel_serviceField.setAttribute("name", "service");
                cpanel_serviceField.setAttribute("value", "cpaneld");
                cpanel_form.appendChild(cpanel_serviceField);
                var cpanel_submit = document.createElement("button");
                cpanel_submit.setAttribute("type", "submit");
                cpanel_submit.setAttribute("name", "submit");
                cpanel_submit.innerHTML = "cPanel";
                cpanel_form.appendChild(cpanel_submit);
                cpanel_button_container.appendChild(cpanel_form);
                account_tools.appendChild(cpanel_button_container);

            var copy_t2c_button_container = document.createElement('li');
            var copy_t2c_button = document.createElement('button');
            copy_t2c_button.type = 'button';
            copy_t2c_button.name = 'copy_t2c_button';
            copy_t2c_button.innerHTML = 'Copy';
            copy_t2c_button.onclick = copy_t2c_button_action;
            copy_t2c_button.keydown = copy_t2c_button_action;
            copy_t2c_button_container.appendChild(copy_t2c_button);

            var quick_copy_button_container = document.createElement('li');
            var quick_copy_button = document.createElement('button');
            quick_copy_button.type = 'button';
            quick_copy_button.name = 'quick_copy_button';
            quick_copy_button.innerHTML = 'Quick Copy';
            quick_copy_button.onclick = quick_copy_button_action;
            quick_copy_button.keydown = quick_copy_button_action;
            quick_copy_button_container.appendChild(quick_copy_button);

            account_tools.appendChild(copy_t2c_button_container);
            account_tools.appendChild(quick_copy_button_container);
        }
    };

var data = document.getElementsByClassName('acct_info');
    for (i = 0; i < data.length; i++) {
      var username_data = data[i].getElementsByClassName('acct_username');
      var server_data = data[i].getElementsByClassName('acct_server');
      var team_member = document.getElementById('hiddenAdmin').innerText;
      var URL = document.URL;
      var username = username_data[0].innerText;
      var server = server_data[0].innerText;
      var domain = document.getElementsByClassName('acct_domain')[i].innerText;
      var current_acct_tab = document.getElementsByClassName('account_tabs')[i].id;
      var id_offset = 24;
      drawButtons(i);
    }

    function updateData(acct_tab_id){
        data = document.getElementsByClassName('acct_info');
        username_data = data[acct_tab_id].getElementsByClassName('acct_username');
        server_data = data[acct_tab_id].getElementsByClassName('acct_server');
        username = username_data[0].innerText;
        server = server_data[0].innerText;
        domain = document.getElementsByClassName('acct_domain')[acct_tab_id].innerText;
    };

    document.addEventListener('click', function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;
        if(target.id && target.id.slice(0, -2) === 'ui-id-') { //} && target.id !== current_acct_tab){
                var target_id_num_str = target.id.slice(-2);
                var target_id_num = parseInt(target_id_num_str);
                var id_diff = target_id_num - 24;
                drawButtons(id_diff-1);
                updateData(id_diff-1);
                current_acct_tab = target.id;
            }
        }, false);
    $(document).ready(function() {

        hide_churn_rate();
        //Creates random background colors
      function cxType(){
          var imgSource = $('#customerInfo > div:nth-child(1) > p:nth-child(1) > img:nth-child(2)').attr('src');
          if (imgSource == "/images/whh_logo_thumb.gif" ) {
               var cx_type = "whh";
          }
          console.log(cx_type);
          return(cx_type);
      }

      function rndbgcolor1(classname, opacity = 1, randmin = 0, randmax = 255) {
          //Creates the first random background, assigns it to the given class.
          //Returns the random colors in a list to be used by other functions.
           var bgRedCode = RandColor1(randmin, randmax);
           var bgGreenCode = RandColor1(randmin, randmax);
           var bgBlueCode = RandColor1(randmin, randmax);
           var backgroundRGB;
           backgroundRGB = bgRedCode + ', ' + bgGreenCode + ', ' + bgBlueCode
           $(classname).css("background-color", "rgb(" + backgroundRGB + ", " + opacity + ")");
           return [ bgRedCode, bgGreenCode, bgBlueCode ];
    }
        function rndbgcolor2(oldcolor, classname, opacity = 1, modifier) {
          //This takes the additional random numbers, and assigns them to the given classes.
           var bgRedCode = RandColor2(oldcolor[0], modifier);
           var bgGreenCode = RandColor2(oldcolor[1], modifier);
           var bgBlueCode = RandColor2(oldcolor[2], modifier);
           var backgroundRGB = bgRedCode + ', ' + bgGreenCode + ', ' + bgBlueCode;
           $(classname).css("background-color", "rgb(" + backgroundRGB + ", " + opacity + ")");
           }

        function RandColor1(randmin, randmax){
            //This actually generates the original random number
            var randcolor1 = Math.floor(Math.random() * (randmax - randmin + 1)) + randmin;
            return randcolor1;
        }

        function RandColor2(whichcolor, modifier, randmin, randmax){
          //generates a new random number based on +- modifier parameter
           var oldcolor = whichcolor;
           var min = oldcolor - modifier;
           if (min <= randmin) {
              min = randmin;
           }
           var max = oldcolor + modifier;
           if (max >= randmax) {
               max = randmax;
           }

           var newcolor = Math.floor(Math.random() * (max - min + 1)) + min;
          return newcolor;
      }
        //Sets Background blend mode for the body
        var cxtype = cxType();
        var bg1opacity = 1;
        var bg2opacity = 1;
        if (cxtype != "whh") {
            $("body").css("background-blend-mode", "luminosity");
            bg2opacity = 0.5;
        }
        //Sets the primary background color which others are based off of and initialize bgcolor2
        //Arguements are (class, opacity, min color value, max color value)
        var basecolor = rndbgcolor1("body", bg1opacity, 25, 150);
        //Generates and sets additional background colors
        //Arguements are (starting color in array [RRR, GGG, BBB] , list of classes, opacity , modifier
        rndbgcolor2( basecolor, ".account_container, .panel-group, form.clearfix, .dataTables_wrapper", bg2opacity , 5);

        });
};


setupButtons();
