define(function (require) {
    'use strict';

    var Engine = require('Engine');
    var Renderer = require('Renderer');
    var UserInterface = require('UserInterface');

    var MovingObject = require('MovingObject');

    var Point = require('Point');
    var Ball = require('Ball');
    var Food = require('Food');
    var Block = require('Block');
    var Snake = require('Snake');

    var MongoDB = require('MongoDB');


    // Point tests
    var obj = new MovingObject(null, Point(5, 5), null, Point(1, 1));
    test("When adding to Point", function () {
        obj.update();

        var expected = Point(6, 6);
        deepEqual(obj.position, expected);
    });

    // Ball tests
    var ball = new Ball(Point(5, 5), Point(1, 1));
    test("Adding a ball", function () {
        ball.update();
        deepEqual(obj.position, ball.position);
    });

    // Block tests
    var block = new Block(Point(6, 6));
    test("Adding a block", function () {
        deepEqual(obj.position, block.position);
    });

    // Food tests
    var food = new Food(Point(6, 6));
    test("Adding a food", function () {
        deepEqual(obj.position, food.position);
    });

    test("Check if the food's color is different from black", function () {
        notDeepEqual(food.color, "#fff");
    });

    // Snake tests
    var snake = new Snake(Point(6, 5));
    test("Adding a snake", function () {
        snake.update();
        deepEqual(obj.position, snake.position);
    });

    test("If snake's color is yellow", function () {
        deepEqual(snake.color, "yellow");
    });

    // MongoDB tests // problem - callback scope
    //test("Is the top 5 result really in descending order", function () {
    //    var isItTrue = true;
    //    MongoDB.get(5, function (data) {
    //        for (var i = 0; i < data.length; i++) {
    //            for (var j = 1; j < data.length; j++) {
    //                if (data[i].score < data[j].score) {
    //                    isItTrue = false;
    //                    break;
    //                }
    //            }

    //            if (!isItTrue) {
    //                break;
    //            }
    //        }
    //    });

    //    ok(isItTrue);
    //});

    //test("Is the returned results equal to the asked", function () {
    //    var expected = 10;
    //    var actual;
    //    MongoDB.get(expected, function (data) {
    //        actual = data.length;
    //    });

    //    deepEqual(expected, actual);
    //});
})
