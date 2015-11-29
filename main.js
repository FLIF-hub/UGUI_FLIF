$(document).ready(function(){
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    $.get("https://api.github.com/repos/FLIF-Hub/UGUI_FLIF/releases", function(data){
        var totalDownloads = [];
        var win = [];
        var lin = [];
        var osx = [];
        for (var i = 0; i < data.length; i++) {
            var version = data[i].tag_name;
            var versionNumber = version.split('v')[1];
            var dateTime = data[i].created_at;
            var date = dateTime.split('T')[0];
            var release = '<a href="https://github.com/FLIF-Hub/UGUI_FLIF/releases/tag/' + version + '" title="View release notes">' + date + '</a>';
            var downloadURL = "#";
            var downloads = "N/A";
            var sizeMB = "N/A";
            var downloadAndVersion = 'UGUI: FLIF ' + version;
            if (data[i].assets[0]) {
                for (var j = 0; j < data[i].assets.length; j++) {
                    downloadURL = data[i].assets[j].browser_download_url;
                    downloads = data[i].assets[j].download_count;
                    var Bytes = data[i].assets[j].size;
                    var KB = Bytes / 1024;
                    var MB = KB / 1024;
                    sizeMB = '<span title="' + numberWithCommas(Math.round(KB)) + ' KB">' + (Math.round(MB * 10) / 10) + ' MB</span>';
                    var name = data[i].assets[j].name;
                    download = '<a href="' + downloadURL + '" title="Download this version">' + name + '</a>';
                    totalDownloads.push(downloads);
                    //If file is bigger than 20MB
                    if ( Bytes > 20000000 ) {
                        //"23nil-5.3.0_FILF_IUGU"
                        var reversedName = name.split("").reverse().join("").split("piz.")[1];
                        var firstChar = reversedName.charAt(0);
                        //If the filename ends in 32 or 64
                        if ( (firstChar == "2") || (firstChar == "4") ) {
                            //Remove the first 2 characters of the reversed string (32 or 64)
                            reversedName = reversedName.substr(2);
                        }
                        //niW, niL, or xsO, 3rd charachter will be w, l, or o
                        var osLetter = reversedName.toLowerCase().charAt(2);
                        if ( osLetter == "w" ) {
                            win.push(downloads);
                        } else if ( osLetter == "l" ) {
                            lin.push(downloads);
                        } else if ( osLetter == "o" ) {
                            osx.push(downloads);
                        }
                    }
                    //Make the line between releases thicker
                    var tr = "<tr>";
                    if (j == 0 && i == 0) {
                        tr = '<tr class="latest-release">';
                    } else if (j == 0) {
                        tr = '<tr class="new-release">';
                    }
                    $("#output tbody").append(
                        tr +
                          '<td><strong>' + version + '</strong></td>' +
                          '<td>' + download + '</td>' +
                          '<td>' + sizeMB + '</td>' +
                          '<td>' + release + '</td>' +
                          '<td>' + downloads + '</td>' +
                        '</tr>'
                    );
                }
            } else {
                $("#output tbody").append(
                    '<tr>' +
                      '<td><strong>' + version + '</strong></td>' +
                      '<td>' + download + '</td>' +
                      '<td>' + sizeMB + '</td>' +
                      '<td>' + release + '</td>' +
                      '<td>' + downloads + '</td>' +
                    '</tr>'
                );
            }
        }
        var downloadCount = 0;
        var downloadCountWIN = 0;
        var downloadCountLIN = 0;
        var downloadCountOSX = 0;
        for (var k = 0; k < totalDownloads.length; k++) {
            downloadCount = downloadCount + totalDownloads[k];
        }
        for (var l = 0; l < win.length; l++) {
            downloadCountWIN = downloadCountWIN + win[l];
        }
        for (var m = 0; m < lin.length; m++) {
            downloadCountLIN = downloadCountLIN + lin[m];
        }
        for (var n = 0; n < osx.length; n++) {
            downloadCountOSX = downloadCountOSX + osx[n];
        }
        $("#total").html('<p>The official releases of UGUI: FLIF have been downloaded <strong>' + downloadCount + ' times</strong>.</p>');
        var withoutCLI = downloadCountWIN + downloadCountLIN + downloadCountOSX;
        console.log(withoutCLI);
        $("#os .win").width( Math.round( (downloadCountWIN / withoutCLI) * 100) + "%" ).attr("title", downloadCountWIN + " downloads");
        $("#os .lin").width( Math.round( (downloadCountLIN / withoutCLI) * 100) + "%" ).attr("title", downloadCountLIN + " downloads");
        $("#os .osx").width( Math.round( (downloadCountOSX / withoutCLI) * 100) + "%" ).attr("title", downloadCountOSX + " downloads");
        $("#os").css("visibility", "visible");

        var latestVersion = data[0].tag_name.split('v')[1];
        $(".dl-btn-win a").attr("href", "https://github.com/FLIF-hub/UGUI_FLIF/releases/download/v" + latestVersion + "/UGUI_FLIF_" + latestVersion + "-win.zip");
        $(".dl-btn-osx a").attr("href", "https://github.com/FLIF-hub/UGUI_FLIF/releases/download/v" + latestVersion + "/UGUI_FLIF_" + latestVersion + "-osx.zip");
        $(".dl-btn-lin32 a").attr("href", "https://github.com/FLIF-hub/UGUI_FLIF/releases/download/v" + latestVersion + "/UGUI_FLIF_" + latestVersion + "-lin32.zip");
        $(".dl-btn-lin64 a").attr("href", "https://github.com/FLIF-hub/UGUI_FLIF/releases/download/v" + latestVersion + "/UGUI_FLIF_" + latestVersion + "-lin64.zip");
        $(".dl-btn-lin a:first-of-type").attr("href", "https://github.com/FLIF-hub/UGUI_FLIF/releases/download/v" + latestVersion + "/UGUI_FLIF_" + latestVersion + "-lin32.zip");
        $(".dl-btn-lin a:last-of-type").attr("href", "https://github.com/FLIF-hub/UGUI_FLIF/releases/download/v" + latestVersion + "/UGUI_FLIF_" + latestVersion + "-lin64.zip");

    });
});
