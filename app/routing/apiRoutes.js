//Dependencies
var path = require("path");
var friends = require("../data/friends.js");

// Routes
// ===============================================================================

module.exports = function(app) {
    //Your apiRoutes.js file should contain two routes:
    //A GET route with the url /api/friends. This will be used to display a JSON of all possible friends.
    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });
    //A POST routes /api/friends. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
    app.post("/api/friends", function(req, res) {

        var newFriend = {
            name: req.body.name,
            photo: req.body.photo,
            scores: JSON.parse(req.body.scores)
        }

        var diffArray = [];

        friends.forEach(function(item, index) {
            var difference = 0;
            for (var i = 0; i < item.scores.length; i++) {
                difference += Math.abs(item.scores[i] - newFriend.scores[i]);
            }
            diffArray.push({ "difference": difference, "index": index });
        });

        diffArray.sort(function(a, b) {
            return a.difference - b.difference;
        });

        friends.push(newFriend);
        res.json(friends[diffArray[0].index]);

    });

}