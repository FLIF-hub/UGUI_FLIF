# UGUI: FLIF

**UGUI: FLIF is a viewer, encoder, and decoder of FLIF files.**

This is a Graphical User Interface for the Free Lossless Image Format that allows for encoding and decoding.

The first version was made in about half an hour using the [UGUI](http://ugui.io) framework. You can watch the video here:

* [How to make a desktop app in 30 minutes with only HTML](https://www.youtube.com/watch?v=qHMRroZ7AAw)

* * *

## UGUI: FLIF Website

* http://flif-hub.github.io/UGUI_FLIF/

* * *

### Screenshots and Download

* https://github.com/FLIF-Hub/UGUI_FLIF/releases

<p align="center"><a href="http://github.com/FLIF-Hub/UGUI_Flif/releases"><img src="http://i.imgur.com/mt80RRZ.gif" alt="Screenshot" /></a></p>

* * *

### Links:

* [FLIF official website](http://flif.info)
* [FLIF on GitHub](https://github.com/FLIF-Hub/FLIF)
* [UGUI](http://ugui.io)

* * *

## Contributing

### Prerequisites

1. Install [git](https://git-scm.com)
1. Install Node & NPM:
 * **Windows/OSX:**
    * Go to [NodeJS.org](https://nodejs.org) and download and install.
 * **Ubuntu:**
    * Install Node.js: `sudo apt-get install nodejs`
    * Install NPM: `sudo apt-get install npm`
    * Create a symbolic link for node `sudo ln -s /usr/bin/nodejs /usr/bin/node`
1. Download [EditorConfig](http://editorconfig.org) for your text editor/IDE.

### Running locally

1. On GitHub, [fork this repo](https://help.github.com/articles/fork-a-repo/).
1. Use `git` to clone down a local copy of your fork to the folder where you keep your projects or repos.
1. In the Command Line/Terminal move into the cloned repo: `cd GitHub/UGUI_FLIF` (wherever your copy is)
1. `git pull origin` - Pull the latest list of branches
1. `git checkout dev` - Switch to the `dev` branch to view the latest code
1. `git pull origin dev` - Update the `dev` branch
1. run `npm install` to download dependencies
1. run `npm start` to load the application

If you are going to make your own changes, you should branch off of the `dev` branch, and when read, make a Pull Request comparing your branch against the `dev` branch **not the `master` branch**.

### Linting locally

1. To lint the JavaScript files: `npm run lint`
1. To have ESLint attempt to auto-fix problems: `npm run fix`
1. To lint the Sass files: `npm run sasslint`

* * *

## Road map

New features we'd like to see added in the future. No particular order:

* **~~Cross-Platform Support~~** - We now support OSX, Windows, and Ubuntu.
* **~~Cross-Platform Release~~** - We have done an [official release](http://github.com/FLIF-Hub/UGUI_FLIF/releases) supporting OSX, Windows, and Ubuntu.
* **Arbitrary Format Conversion** - Currently you can encode .PNG, .PNM, .PPM, .PGM, .PBM, .PAM to .FLIF and decode .FLIF to .PNG, .PNM, and .PAM. We need to detect non-supported images, convert them to somthing supported using `convert.exe` then toss it's output into flif.exe. Also the reverse, allow for converting .flif to any image format `convert.exe` supports.
* **Simple Compression** - The ability to automatically convert an input file to both interlaced and non-interlaced and return whichever is smaller to the user (if desired).
* **Maximum Compression** - Repeats have an interesting affect on filesize. We could add in a FLIF-Crush option that would try every combination (0-1000) and return whichever highest tree value had the smallest filesize. Interlacing may play a part too. 
* **FLIF Preview** - Implement Poly-FLIF.js to preview FLIF files in a quicker fashion.
* **Multi-file Input** - The [SVGO-GUI](https://github.com/svg/svgo-gui) project is a simple app that allows for multi-file import both in the GUI and as command line arguments that can be passed in by dragging a group of files or a folder on to the .exe itself. This would be a good project to reference.
* **Implement more CLI Features** - Below is the full list of CLI features, not all of these would make sense for a GUI however.

#### General Options

Implemented        | Switch | Verbose Switch           | Description
:--:               | :--    | :--                      | :--
:x:                | `-h`   | `--help`                 | Show help
:x:                | `-hvv` | `-hvv`                   | Show advanced help options
:x:                | `-v`   | `--verbose`              | Increase verbosity (multiple -v for more output)
:x:                | `-c`   | `--no-crc`               | Don't verify the CRC (or don't add a CRC)
:x:                | `-m`   | `--no-metadata`          | Strip Exif/XMP metadata (default is to keep it)
:x:                | `-p`   | `--no-color-profile`     | Strip ICC color profile (default is to keep it)

#### Encode Options

Implemented        | Switch | Verbose Switch           | Description
:--:               | :--    | :--                      | :--
:white_check_mark: | `-e`   | `--encode`               | This must be the first switch if encoding to FLIF.
:white_check_mark: | `-E`   | `--effort=N`             | 0=fast/poor compression, 100=slowest/best? (default: -E60)
:white_check_mark: | `-I`   | `--interlace`            | Interlacing (default, except for tiny images)
:white_check_mark: | `-N`   | `--no-interlace`         | Force no interlacing
:white_check_mark: | `-Q`   | `--lossy=N`              | Lossy compression; default: -Q100 (lossless)
:x:                | `-K`   | `--keep-invisible-rgb`   | Store original RGB values behind A=0
:x:                | `-F`   | `--frame-delay=N[,N,..]` | Delay between animation frames in ms; default: -F100

#### Decode Options

Implemented        | Switch | Verbose Switch           | Description
:--:               | :--    | :--                      | :--
:white_check_mark: | `-d`   | `--decode`               | This must be the first switch if decoding from FLIF.
:x:                | `-i`   | `--identify`             | Do not decode, just identify the input FLIF file.
:white_check_mark: | `-q`   | `--quality=N`            | Lossy decode quality percentage; default -q100
:x:                | `-s`   | `--scale=N`              | Lossy downscaled image at scale 1:N (2,4,8,16,32); default -s1
:x:                | `-r`   | `--resize=WxH`           | Lossy downscaled image to fit inside WxH (but typically smaller)
:x:                | `-f`   | `--fit=WxH`              | Lossy downscaled image to exactly WxH

#### Advanced Encode Options: (mostly useful for flifcrushing)

Implemented        | Switch | Verbose Switch           | Description
:--:               | :--    | :--                      | :--
:x:                | `-P`   | `--max-palette-size=N`   | Max size for Palette(_Alpha); default: -P512
:x:                | `-A`   | `--force-color-buckets`  | Force Color_Buckets transform
:x:                | `-B`   | `--no-color-buckets`     | Disable Color_Buckets transform
:x:                | `-C`   | `--no-channel-compact`   | Disable Channel_Compact transform
:x:                | `-Y`   | `--no-ycocg`             | Disable YCoCg transform; use G(R-G)(B-G)
:x:                | `-W`   | `--no-subtract-green`    | Disable YCoCg and SubtractGreen transform; use GRB
:x:                | `-S`   | `--no-frame-shape`       | Disable Frame_Shape transform
:x:                | `-L`   | `--max-frame-lookback=N` | Max nb of frames for Frame_Lookback; default: -L1
:x:                | `-R`   | `--maniac-repeats=N`     | MANIAC learning iterations; default: -R2
:x:                | `-T`   | `--maniac-threshold=N`   | MANIAC tree growth split threshold, in bits saved; default: -T64
:x:                | `-D`   | `--maniac-divisor=N`     | MANIAC inner node count divisor; default: -D30
:x:                | `-M`   | `--maniac-min-size=N`    | MANIAC post-pruning threshold; default: -M50
:x:                | `-X`   | `--chance-cutoff=N`      | Minimum chance (N/4096); default: -X2
:x:                | `-Z`   | `--chance-alpha=N`       | Chance decay factor; default: -Z19
:x:                | `-U`   | `--adaptive`             | Adaptive lossy, second input image is saliency map
:x:                | `-G`   | `--guess=N[N..]`         | Pixel predictor for each plane (Y,Co,Cg,Alpha,Lookback) ?=pick heuristically, 0=avg, 1=median_grad, 2=median_nb, 3=mixed
:x:                | `-H`   | `--invisible-guess=N`    | Predictor for invisible pixels (only if -K is not used)
:x:                | `-t`   | `-t`                     | This must be the first switch if transcoding from FLIF to FLIF.
