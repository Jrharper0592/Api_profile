window.onload = app;

// runs when the DOM is loaded
function app() {
    "use strict";

    // load some scripts (uses promises :D)
    loader.load(
        //css
        {
            url: "./dist/style.css"
        },
        //js
        {
            url: "./bower_components/jquery/dist/jquery.min.js"
        }, {
            url: "./bower_components/lodash/dist/lodash.min.js"
        }
        // {url: "./bower_components/backbone/backbone.js"}
    ).then(function() {
        document.querySelector("html").style.opacity = 1;
        // start app?

        var token = "8f4a01d2d64f5d7898b1f9485d42095fe1c68c5b"
        var url = "https://api.github.com/users/jrharper0592" + "?access_token=" + token;
        var url2 = "https://api.github.com/users/jrharper0592/repos" + "?access_token=" + token;
        var items = $.get(url)
        var stuff = $.get(url2)
        var left = document.querySelector(".user")
        var right = document.querySelector(".repos")

        stuff.then(draw)
        items.then(drawprofile)

        function drawprofile(data) {
            console.log(arguments)
            var img = '<img class="pic" src="'
            var close = '">'
            var br = '<br>'
                // find data we want
            left.innerHTML = [img, data.avatar_url, close, data.login, br, data.blog, br, data.location, br, data.email, br, data.html_url].join('')
                // get the string and...
            // right.innerHTML = [data.repos_url]
                // draw it to the DOM (set some element's innerHTML)
        }

            
        function draw(d) {
            d.map(function(v) { return v.toString()})
                // debugger;
            console.log(arguments)
            right.innerHTML = [d.repos_url,"Repositories" ]

        }




    })

}
