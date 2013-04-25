function getFileSystem(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){ // success get file system
        var sdcard = fileSystem.root;
        sdcard.getDirectory('dcim',{create:false}, function(dcim){
            var gallery = $('#gallery');
            listDir(dcim, gallery);
        }, function(error){
            alert(error.code);
        })
    }, function(evt){ // error get file system
        console.log(evt.target.error.code);
    });
}


function listDir(directoryEntry, domParent){
    $.mobile.showPageLoadingMsg(); // show loading message
     
    var directoryReader = directoryEntry.createReader();
         
    directoryReader.readEntries(function(entries){ // success get files and folders
        for(var i=0; i<entries.length; ++i){
            if( i%2 == 0) domParent.append('<div class="ui-block-a"><div class="thumbnail"><img src="'+entries[i].fullPath+'" title="'+entries[i].name+'" /></div></div>');
            else domParent.append('<div class="ui-block-b"><div class="thumbnail"><img src="'+entries[i].fullPath+'" title="'+entries[i].name+'" /></div></div>');
            //console.log(entries[i].name);
        }
        $.mobile.hidePageLoadingMsg(); // hide loading message
    }, function(error){ // error get files and folders
        alert(error.code);
    });
}

/* show an image */
function showImage(){
    var imgs = $('#gallery img');
    imgs.live('click', function(){
        var title = $(this).attr('title');
        $('#picture h1').text(title);
        $('#pic').html($(this).clone());
         
        $.mobile.changePage($('#picture'));
    });
}