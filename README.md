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

###Road map

New features we'd like to see added in the future:

1. Cross platform support.
 * Currently only Windows is supported, but with a small amount of effort we could create an OSX or Ubuntu version identical to the windows version.
2. Allow arbitrary image format conversion.
 * Currently you can encode .PNG, .PNM, .PPM, .PGM, .PBM, .PAM to .FLIF and decode .FLIF to .PNG, .PNM, and .PAM. In the future we'd like to support conversion to and from formats like GIF, JPG, BMP, and more by detecting these types and running them through convert.exe first before passing them to flif.exe or converting from .FLIF to .PNG/PNM/PAM and then from that to the desired output (such as GIF or JPG).
3. Better support for advanced arguments supplied by the flif.exe, such as repeats and interlacing.
4. The ability to automatically convert an input file to both interlaced and non-interlaced and return whichever is smaller to the user (if desired).
5. Multi-file input!

* * *

###Links:

* [FLIF official website](http://flif.info)
* [FLIF on GitHub](https://github.com/FLIF-Hub/FLIF)
