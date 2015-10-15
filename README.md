# UGUI: FLIF

**UGUI: FLIF is a viewer, encoder, and decoder of FLIF files.**

This is a Graphical User Interface for the Free Lossless Image Format that allows for encoding and decoding.

The first version was made in about half an hour using the [UGUI](http://ugui.io) framework. You can watch the video here:

* [How to make a desktop app in 30 minutes with only HTML](https://www.youtube.com/watch?v=qHMRroZ7AAw)

* * *

###Screenshots and Download

* https://github.com/FLIF-Hub/UGUI_FLIF/releases

<p align="center"><a href="http://github.com/FLIF-Hub/UGUI_Flif/releases"><img src="http://i.imgur.com/mt80RRZ.gif" alt="Screenshot" /></a></p>

* * *

###Links:

* [FLIF official website](http://flif.info)
* [FLIF on GitHub](https://github.com/FLIF-Hub/FLIF)
* [UGUI](http://ugui.io)

* * *

##Contributing

###If you have Node and NPM installed
1. Fork and Clone the repo
2. run `npm install` to download dependencies
3. run `npm start` to load the application
4. Checkout the `dev` branch for latest code, or branch off of Master to add your own changes.

###If you don't have Node or NPM installed
1. Download [NW.js](http://nwjs.io)
2. Fork and Clone the repo
3. Run NW.js pointing it at the repo
 * [This video explains how to do it on Windows](http://ugui.io/tutorials/getting-started.htm) (2:15)
 * [Or follow these instructions for other OS's](https://github.com/nwjs/nw.js/wiki/How-to-run-apps)
4. Checkout the `dev` branch for latest code, or branch off of Master to add your own changes.

* * *

###Road map

New features we'd like to see added in the future. No particular order:

* **~~Cross-Platform Support~~** - We now support OSX, Windows, and Ubuntu.
* **Cross-Platform Release** - Only Windows has had an official release. After we finish adding new features and doing bug fixes, the next release will be cross-platform.
* **Automated Release Builds** - We need to investigate into existing methods to build for cross platform that are reliable.
* **Full CLI Support** - Better support for advanced arguments supplied by the flif.exe, such as repeats and interlacing.
* **Arbitrary Format Conversion** - Currently you can encode .PNG, .PNM, .PPM, .PGM, .PBM, .PAM to .FLIF and decode .FLIF to .PNG, .PNM, and .PAM. We need to detect non-supported images, convert them to somthing supported using `convert.exe` then toss it's output into flif.exe. Also the reverse, allow for converting .flif to any image format `convert.exe` supports.
* **Simple Compression** - The ability to automatically convert an input file to both interlaced and non-interlaced and return whichever is smaller to the user (if desired).
* **Maximum Compression** - Repeats have an interesting affect on filesize. We could add in a FLIF-Crush option that would try every combination (0-1000) and return whichever highest tree value had the smallest filesize. Interlacing may play a part too. 
* **FLIF Preview** - Implement Poly-FLIF.js to preview FLIF files in a quicker fashion.
* **Multi-file Input** - The [SVGO-GUI](https://github.com/svg/svgo-gui) project is a simple app that allows for multi-file import both in the GUI and as command line arguments that can be passed in by dragging a group of files or a folder on to the .exe itself. This would be a good project to reference.
