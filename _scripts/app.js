
var $ = window.$;
var ugui = window.ugui;

// Wait for the document to load and for ugui.js to run before running your app's custom JS
$(document).ready(runApp);



// Container for your app's custom JS
function runApp () {




    // /////////////////////////////////////////////////////
    // GENERAL SET UP

    // Variables
    var fs = require('fs');
    var path = require('path');
    var nw = require('nw.gui');

    // SHOW DEVELOPER TOOLS
    // nw.Window.get().showDevTools();

    var appData = nw.App.dataPath;
    var win = nw.Window.get();
    var OS = process.platform;
    var effortDefaultValue = 60;
    var lossyDefaultValue = 100;
    var qualityDefaultValue = 100;
    var flif = path.join('executables', 'win', 'flif64.exe');
    // eslint-disable-next-line no-unused-vars
    var convert = path.join('executables', 'win', 'convert64.exe');

    // NW.js only officially supports OSX 10.9+, Win Vista+, Ubuntu 12LTS and 14LTS
    // Detect if in `darwin`, `freebsd`, `linux`, `sunos`, or `win32`
    if (OS == 'win32') {
        if (process.arch == 'x64') {
            flif = path.join('executables', 'win', 'flif64.exe');
            convert = path.join('executables', 'win', 'convert64.exe');
        } else {
            flif = path.join('executables', 'win', 'flif32.exe');
            convert = path.join('executables', 'win', 'convert32.exe');
        }
    } else if (OS == 'darwin') {
        flif = path.join('executables', 'osx', 'flif64');
        convert = path.join('executables', 'osx', 'convert64');
    } else {
        if (process.arch == 'x64') {
            flif = path.join('executables', 'ubuntu', 'flif64');
            convert = path.join('executables', 'ubuntu', 'convert64');
        } else {
            flif = path.join('executables', 'ubuntu', 'flif32');
            convert = path.join('executables', 'ubuntu', 'convert32');
        }
    }
    var errorMsg =
      '<h4 class="text-danger text-center"><strong>There was an error.</strong></h4>' +
      '<div class="text-warning text-center">Make sure you are using one of these file types:<br />' +
      '<code>.FLIF .PNG .PNM .PPM .PGM .PBM .PAM</code></div>';
    // When the user opens the settings menu, we create a save file of their existing settings so
    // if they change anything and want to cancel we can reset the values to what it was when the
    // modal was first opened.
    var originalSettings = path.join(appData, 'originalsettings.json');

    // Load settings if any were saved previously
    loadSettings();




    // /////////////////////////////////////////////////////
    // IMPORTING A FILE


    // When the user drops an image detect if it's a FLIF or not
    $('[data-argName="fileToProcess"]').on('change', function () {

        // Build the UGUI Arg Object
        ugui.helpers.buildUGUIArgObject();
        // Detect type of file dragged in
        var filetype = ugui.args.fileToProcess.ext.toLowerCase();

        // Act upon the detected filetype
        if (filetype === 'flif') {
            isFlif();
        } else if (
            filetype === 'png' ||
            filetype === 'pnm' ||
            filetype === 'ppm' ||
            filetype === 'pgm' ||
            filetype === 'pbm' ||
            filetype === 'pam'
           ) {
            isPng();
        } else {
            $('.outputContainer').html(errorMsg);
        }

    });

    /*
        Usage:
           flif [-e] [encode options] <input image(s)> <output.flif>
           flif [-d] [decode options] <input.flif> <output.pnm | output.pam | output.png>

        Supported input/output image formats: PNG, PNM (PPM,PGM,PBM), PAM

        General Options:
           -h, --help                  show help (use -hvv for advanced options)
           -v, --verbose               increase verbosity (multiple -v for more output)

        Encode options: (-e, --encode)
           -E, --effort=N              0=fast/poor compression, 100=slowest/best? (default: -E60
           -I, --interlace             interlacing (default, except for tiny images)
           -N, --no-interlace          force no interlacing
           -Q, --lossy=N               lossy compression; default: -Q100 (lossless)
           -K, --keep-invisible-rgb    store original RGB values behind A=0
           -F, --frame-delay=N[,N,..]  delay between animation frames in ms; default: -F100

        Decode options: (-d, --decode)
           -i, --identify             do not decode, just identify the input FLIF file
           -q, --quality=N            lossy decode quality percentage; default -q100
           -s, --scale=N              lossy downscaled image at scale 1:N (2,4,8,16,32); default -s1
           -r, --resize=WxH           lossy downscaled image to fit inside WxH (but typically smaller)
           -f, --fit=WxH              lossy downscaled image to exactly WxH
    */

    // Export the image based on the desired file type passed in
    function exportImage (type) {
        var input = ugui.args.fileToProcess.value;
        var output = ugui.args.fileToProcess.path + ugui.args.fileToProcess.name + '.new.' + type;
        var executableAndArguments = flif + ' -d --quality=100 "' + input + '" "' + output + '"';
        ugui.helpers.runcmd(executableAndArguments);
    }

    function isFlif () {
        // Find the path to the settings file and store it
        var inputFlif = ugui.args.fileToProcess.value;
        var quality = ugui.args.quality.value;
        var extension = 'png';
        for (var arg in ugui.args) {
            if (arg.indexOf('extension') === 0) {
                if (ugui.args[arg].htmlticked) {
                    extension = ugui.args[arg].value;
                }
            }
        }
        var outputLocation = path.join(appData, 'output.png');

        // Create a PNG from the imported FLIF file in a temp directory
        // flif.exe "C:\folder\cow.png" "C:\Users\Bob\AppData\Local\ugui_flif\output.png"
        var executableAndArguments = flif + ' -d --quality=' + quality + ' "' + inputFlif + '" "' + outputLocation + '"';

        var parameters = {
            'executableAndArgs': executableAndArguments,
            'returnedData': function (data) {
                // eslint-disable-next-line no-console
                console.log('The text from the executable: ' + data);
            },
            'onExit': function (code) {
                // eslint-disable-next-line no-console
                console.log('onExit: ' + code);
                // When the PNG file is done being exported and flif.exe exits show it on the screen with export options
                $('.outputContainer').html(
                    '<div class="col-xs-12 col-s-12 col-md-12 col-l-12 text-center">' +
                      '<h4 class="text-left">FLIF Preview</h4>' +
                      '<img src="' + outputLocation + '" alt="Flif Preview" />' +
                    '</div>'
                );
                exportImage(extension);
            },
            'onError': function (err) {
                // eslint-disable-next-line no-console
                console.log(err);
                $('.outputContainer').html(errorMsg);
            },
            'onClose': function (code) {
                if (code === 2) {
                    $('.outputContainer').html(errorMsg);
                }
                // eslint-disable-next-line no-console
                console.log('Executable has closed with the exit code: ' + code);
            }
        };
        // Actually run the params object above
        ugui.helpers.runcmdAdvanced(parameters);
    }

    function isPng () {
        // Put a spinner and loading message on the screen while converting to flif
        $('.outputContainer').html(
            '<div class="col-xs-12 col-s-12 col-md-12 col-l-12 text-center text-primary">' +
              '<img src="_img/processing.svg" alt="Processing" class="spinner" />' +
              'Processing' +
            '</div>'
        );

        // Variables
        var name = ugui.args.fileToProcess.name;
        var nameExt = ugui.args.fileToProcess.nameExt;
        var fullPath = ugui.args.fileToProcess.value;
        var size = ugui.args.fileToProcess.size;
        var outputFlif = ugui.args.fileToProcess.path + name + '.flif';
        var effort = ugui.args.effort.value;
        var lossy = ugui.args.lossy.value;
        var interlace = ugui.args.interlacingauto.value;
        if (ugui.args.interlacingoff.htmlticked) {
            interlace = ' ' + ugui.args.interlacingoff.value;
        } else if (ugui.args.interlacingon.htmlticked) {
            interlace = ' ' + ugui.args.interlacingon.value;
        }

        // flif.exe -d --quality=100 "C:\folder\cow.png" "C:\folder\cow.flif"
        var executableAndArguments =
            flif +
            ' --encode' +
            interlace +
            ' --effort=' + effort +
            ' --lossy=' + lossy +
            ' "' + fullPath + '"' +
            ' "' + outputFlif + '"';

        var parameters = {
            'executableAndArgs': executableAndArguments,
            'returnedData': function (data) {
                // eslint-disable-next-line no-console
                console.log('The text from the executable: ' + data);
            },
            'onExit': function (code) {
                // eslint-disable-next-line no-console
                console.log('onExit: ' + code);
                // When the FLIF file has finished being exported and the flif.exe finishes
                // Change the loading message to have details about the sizes of the input and output
                function updateUI () {
                    var flifSize = fs.statSync(outputFlif.split('\\').join('/')).size;
                    var bytesSaved = size - flifSize;
                    var percent = Math.floor((flifSize / size) * 10000) / 100;
                    $('.outputContainer').html(
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
                              '<th></th>' +
                              '<td>' + percent + '% of original</td>' +
                              '<td>' + bytesSaved + ' bytes saved</td>' +
                            '</tr>' +
                          '</table>' +
                        '</div>'
                    );
                }
                updateUI();
                window.setTimeout(updateUI, 3000);
            },
            'onError': function (err) {
                // eslint-disable-next-line no-console
                console.log(err);
                $('.outputContainer').html(errorMsg);
            },
            'onClose': function (code) {
                if (code === 2) {
                    $('.outputContainer').html(errorMsg);
                }
                // eslint-disable-next-line no-console
                console.log('Executable has closed with the exit code: ' + code);
            }
        };
        // run the params above
        ugui.helpers.runcmdAdvanced(parameters);
    }





    // //////////////////////////////////////////////
    // HELP MENU




    // When the user clicks the button in the help menu, contact Github and check for updates
    function checkForUpdates () {
        $.get('https://api.github.com/repos/FLIF-Hub/UGUI_FLIF/releases', function (data) {

            // 0.2.0
            var remoteVersion = data[0].tag_name.split('v')[1];
            var localVersion = ugui.app.version;
            // [ '0', '2', '0' ]
            var remoteVersionSplit = remoteVersion.split('.');
            var localVersionSplit = localVersion.split('.');
            var rvs = remoteVersionSplit;
            var lvs = localVersionSplit;
            // Check if the Major, Minor, or Patch have been updated on the remote
            if (
                 (rvs[0] > lvs[0]) ||
                 (rvs[0] == lvs[0] && rvs[1] > lvs[1]) ||
                 (rvs[0] == lvs[0] && rvs[1] == lvs[1] && rvs[2] > lvs[2])
               ) {
                $('.updateResults').html(
                    '<p>' +
                      'Update found! ' +
                      '<a href="' + data[0].assets[0].browser_download_url + '" class="external-link">Download ZIP</a> or ' +
                      '<a href="' + data[0].html_url + '" class="external-link">view release notes</a>.' +
                    '</p>'
                );
                ugui.helpers.openDefaultBrowser();
            } else {
                $('.updateResults').html('<p class="text-center"><strong>You have the latest version of UGUI: FLIF.</strong></p>');
            }
        });
    }

    $('#updateChecker').click(checkForUpdates);



    function setContentHeight () {
        var navHeight = $('.navbar').height();
        // Window height - Navbar - bottom border
        var newHeight = win.height - navHeight - 2;
        var settingsHeight = 0;
        if (win.height > 300) {
            $('#settingsModal .modal-header').removeClass('shortScreen');
            settingsHeight = newHeight - 74;
        } else {
            $('#settingsModal .modal-header').addClass('shortScreen');
            settingsHeight = newHeight - 39;
        }
        $('#appHolder').css('height', newHeight + 'px');
        $('#settingsModal .modal-content').css('height', newHeight + 'px');
        $('#settingsModal .modal-body').css('height', settingsHeight + 'px');
        window.setTimeout(ugui.helpers.centerNavLogo, 71);
    }

    setContentHeight();
    win.on('resize', setContentHeight);




    // //////////////////////////////////////////////////////
    // SETTINGS MENU


    // Clicking "About" in the Nav Bar
    $('.navbar a[href="#settings"]').click(function (event) {
        event.stopPropagation();
        // Show the modal
        $('#settingsModal').fadeIn('slow');

        ugui.helpers.buildUGUIArgObject();
        // Store a copy of the current settings before the user does anything
        ugui.helpers.saveSettings(originalSettings);
    });

    // Remove modal, enable scrollbar
    function removeModal (callback) {
        $('#settingsModal').slideUp('slow');
        if (typeof callback === 'function') {
            callback();
        }
    }



    // ///////////////////////////////////////////////////////
    // SETTINGS UI ELEMENTS











    // ///////////////////////////////////////////////////////
    // EXIT SETTINGS


    function settingsDefaults () {
        $('#effort').slider('setValue', effortDefaultValue);
        $('#lossy').slider('setValue', lossyDefaultValue);
        $('#quality').slider('setValue', qualityDefaultValue);
    }

    function settingsCancel () {
        removeModal(function () {
            // Load the stored copy of the original settings
            ugui.helpers.loadSettings(originalSettings, function () {
                // reset the contents of the settings modal back to what the original settings were
                var effortValue = parseInt($('#effort').val() || effortDefaultValue);
                $('#effort').slider('setValue', effortValue);

                var lossyValue = parseInt($('#lossy').val() || lossyDefaultValue);
                $('#lossy').slider('setValue', lossyValue);

                var qualityValue = parseInt($('#quality').val() || qualityDefaultValue);
                $('#quality').slider('setValue', qualityValue);
            });
        });
    }

    function loadSettings () {
        if (fs.existsSync(path.join(appData, 'uguisettings.json'))) {
            ugui.helpers.loadSettings(function () {
                var effortValue = parseInt($('#effort').val() || effortDefaultValue);
                var effortOptions = {
                    'min': 0,
                    'max': 100,
                    'value': effortValue,
                    'step': 1
                };
                $('#effort').slider(effortOptions);

                var lossyValue = parseInt($('#lossy').val() || lossyDefaultValue);
                var lossyOptions = {
                    'min': 0,
                    'max': 100,
                    'value': lossyValue,
                    'step': 1
                };
                $('#lossy').slider(lossyOptions);

                var qualityValue = parseInt($('#quality').val() || qualityDefaultValue);
                var qualityOptions = {
                    'min': 0,
                    'max': 100,
                    'value': qualityValue,
                    'step': 1
                };
                $('#quality').slider(qualityOptions);
            });
        } else {
            var effortOptions = {
                'min': 0,
                'max': 100,
                'value': effortDefaultValue,
                'step': 1
            };
            $('#effort').slider(effortOptions);

            var lossyOptions = {
                'min': 0,
                'max': 100,
                'value': lossyDefaultValue,
                'step': 1
            };
            $('#lossy').slider(lossyOptions);

            var qualityOptions = {
                'min': 0,
                'max': 100,
                'value': qualityDefaultValue,
                'step': 1
            };
            $('#quality').slider(qualityOptions);
        }
    }

    function settingsSave () {
        ugui.helpers.buildUGUIArgObject();
        ugui.helpers.saveSettings();
        removeModal();
    }

    $('#settingsDefaults').click(function (evt) {
        evt.stopPropagation();
        settingsDefaults();
    });

    $('#settingsModal .glyphicon-remove').click(function (evt) {
        evt.stopPropagation();
        settingsCancel();
    });

    $('#settingsCancel').click(function (evt) {
        evt.stopPropagation();
        settingsCancel();
    });

    $('#settingsSave').click(function (evt) {
        evt.stopPropagation();
        settingsSave();
    });




} // end runApp();
