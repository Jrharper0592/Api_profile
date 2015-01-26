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
        var userinfo = $.get(url)
        var repoinfo = $.get(url2)
        var left = document.querySelector(".user")
        var right = document.querySelector(".repos")

        var template_url = "./templates/left_Template.html";

        var right_template_url = "./templates/right_template.html";
            
        var template = $.get(template_url);
        var right_template = $.get(right_template_url);   

            // var print = function(d){return console.log((typeof d == 'string'?d:JSON.stringify(d , null , '    ')))}
        // var print = function(d) {
            // $('body').append('<pre>' + (typeof d == 'string' ? d : JSON.stringify(d)) + '</pre>')
        // }

        $.when( repoinfo, right_template).then( draw )
        $.when( userinfo, template).then( drawprofile )

        function drawprofile(data, template) {
            $('.user').append(
                _.template( template[0], data[0] )
            )
        }


        function draw(d, right_template) {
            d[0].forEach(function(current) {
                right.innerHTML += _.template( right_template[0], current ) //[arrOfName,"Repositories" ]
            })
        }




    })

}

//*** hard coded way.
// var img = '<img class="pic" src="'
// var close = '">'
// var br = '<br>'
//     // find data we want
// left.innerHTML = [img, data.avatar_url, close, data.login, br, data.blog, br, data.location, br, data.email, br, data.html_url].join('')
//     // get the string and...
// right.innerHTML = [data.repos_url]
// draw it to the DOM (set some element's innerHTML)


//*** debugged draw(d)
// d.map(function(v) { return v.toString()})
// debugger;
// print(JSON.stringify(d))
//var name = d.name
// var arrrOfName = _.map(d,function(arg){ return arg.name})
// console.log(arrOfName)
// console.log(JSON.stringify(d[0] , null , '   '))
