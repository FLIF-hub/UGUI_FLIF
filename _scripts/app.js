
//Wait for the document to load and for ugui.js to run before running your app's custom JS
$(document).ready( runApp );

//Container for your app's custom JS
function runApp() {


    //Require in the File System
    var fs = require('fs');
    var gui = require("nw.gui");
    var errorMsg =
      '<h4 class="text-danger text-center"><strong>There was an error.</strong></h4>' +
      '<div class="text-warning text-center">Make sure you are using one of these file types:<br />' +
      '<code>.FLIF .PNG .PNM .PPM .PGM .PBM .PAM</code></div>';


    $('[data-argName="fileToProcess"]').on("change", function() {

        ugui.helpers.buildUGUIArgObject();
        var filetype = ugui.args.fileToProcess.ext.toLowerCase();

        if (filetype === "flif") {
            isFlif();
        } else {
            isPng();
        }

    });


    function exportImage(type) {
        var input = ugui.args.fileToProcess.value;
        var output = ugui.args.fileToProcess.path + ugui.args.fileToProcess.name + ".new." + type;
        var executableAndArguments = 'flif -d --quality=100 "' + input + '" "' + output + '"';
        ugui.helpers.runcmd(executableAndArguments);
    }


    function isFlif() {

        var outputLocation = "";
        //If you're on windows then folders in file paths are separated with `\`, otherwise OS's use `/`
        if ( process.platform == "win32" ) {
            //Find the path to the settings file and store it
            outputLocation = (gui.App.dataPath + "\\output.png");
        } else {
            //Find the path to the settings file and store it
            outputLocation = (gui.App.dataPath + "/output.png");
        }

        //flif.exe "C:\folder\cow.png" "C:\Users\GLR\AppData\Local\ugui_flif\output.png"
        var executableAndArguments = 'flif -d --quality=100 "' + ugui.args.fileToProcess.value + '" "' + outputLocation + '"';

        var parameters = {
            "executableAndArgs": executableAndArguments,
            "returnedData": function(data) {
                console.log("The text from the executable: " + data);
            },
            "onExit": function(code) {
                $(".outputContainer").html(
                    '<div class="col-xs-12 col-s-12 col-md-12 col-l-12 text-center">' +
                      '<h4 class="text-left">FLIF Preview</h4>' +
                      '<img src="' + outputLocation + '" alt="Flif Preview" />' +
                    '</div>' +
                    '<div class="col-xs-4 col-s-4 col-md-4 col-l-4 text-center">' +
                      '<button id="pngExport" class="btn btn-sm btn-primary">Save as PNG</button>' +
                    '</div>' +
                    '<div class="col-xs-4 col-s-4 col-md-4 col-l-4 text-center">' +
                      '<button id="pnmExport" class="btn btn-sm btn-primary">Save as PNM</button>' +
                    '</div>' +
                    '<div class="col-xs-4 col-s-4 col-md-4 col-l-4 text-center">' +
                      '<button id="pamExport" class="btn btn-sm btn-primary">Save as PAM</button>' +
                    '</div>'
                );
                $("#pngExport").click( function(e) {
                    e.preventDefault();
                    exportImage("png");
                });
                $("#pnmExport").click( function(e) {
                    e.preventDefault();
                    exportImage("pnm");
                });
                $("#pamExport").click( function(e) {
                    e.preventDefault();
                    exportImage("pam");
                });
            },
            "onError": function(err) {
                $(".outputContainer").html(errorMsg);
            },
            "onClose": function(code) {
                if (code === 2) {
                    $(".outputContainer").html(errorMsg);
                }
                console.log("Executable has closed with the exit code: " + code);
            }
        };

        ugui.helpers.runcmdAdvanced(parameters);
    }




    function isPng() {

        $(".outputContainer").html(
            '<div class="col-xs-12 col-s-12 col-md-12 col-l-12 text-center">' +
              '<img src="_img/spinner.svg" alt="Processing" class="spinner" />' +
              'Processing' +
            '</div>'
        );

        var name = ugui.args.fileToProcess.name;
        var nameExt = ugui.args.fileToProcess.nameExt;
        var fullPath = ugui.args.fileToProcess.value;
        var size = ugui.args.fileToProcess.size;
        var flif = ugui.args.fileToProcess.path + name + ".flif";

        //flif.exe -d --quality=100 "C:\folder\cow.png" "C:\folder\cow.flif"
        var executableAndArguments = 'flif "' + fullPath + '" "' + flif + '"';

        var parameters = {
            "executableAndArgs": executableAndArguments,
            "returnedData": function(data) {
                console.log("The text from the executable: " + data);
            },
            "onExit": function(code) {
                function updateUI() {
                    var flifSize = fs.statSync(flif.split("\\").join("/")).size;
                    var bytesSaved = size - flifSize;
                    var percent = Math.floor((flifSize / size) * 10000) / 100;
                    $(".outputContainer").html(
                        '<div class="col-xs-12 col-s-12 col-md-12 col-l-12">' +
                          '<h4>Output Comparison</h4>' +
                          '<table class="table">' +
                            '<tr>' +
                              '<th>Input</th>' +
                              '<td>' + nameExt + '</td>' +
                              '<td>' + size + ' bytes</td>' +
                            '</tr>' +
                            '<tr>' +
                              '<th>Output</th>' +
                              '<td>' + name + '.flif</td>' +
                              '<td>' + flifSize + ' bytes</td>' +
                            '</tr>' +
                            '<tr>' +
                              '<th>Savings</th>' +
                              '<td>' + percent  + '% of original</td>' +
                              '<td>' + bytesSaved + ' bytes saved</td>' +
                            '</tr>' +
                          '</table>' +
                        '</div>'
                    );
                }
                window.setTimeout(updateUI, 3000);
            },
            "onError": function(err) {
                $(".outputContainer").html(errorMsg);
            },
            "onClose": function(code) {
                if (code === 2) {
                    $(".outputContainer").html(errorMsg);
                }
                console.log("Executable has closed with the exit code: " + code);
            }
        };

        ugui.helpers.runcmdAdvanced(parameters);
    }





}// end runApp();
