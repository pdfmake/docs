+++
title = "Building font file via PHP script"
description = ""
weight = 10
alwaysopen = false
+++

For a complete description of use custom fonts in client-side, read the article: [Custom fonts (client-side) > via Virtual file system (VFS)](/docs/0.3/fonts/custom-fonts-client-side/vfs/)

If you don't want to install gulp and/or just downloaded pdfMake and want to use custom fonts in client-side, you can generate the `vfs_fonts.js` with an PHP script as well. Put the code below in a file on a server with the font files you want to include in the same directory and view it in a browser. Use parameter "?tofile" in the URL to write the output to "vfs_fonts.js" in the same directory on the server, otherwise it outputs in the browser window for you to copy/paste.

```php
<?php

    $output = "this.pdfMake = this.pdfMake || {}; this.pdfMake.vfs = {";
    $phpDir=dir('.');
    while (($file=$phpDir->read())!==false) {
        if ($file!='..' && $file!='.' && $file!='makefont.php' && $file!='vfs_fonts.js') {
            $output .= '"';
            $output .= $file;
            $output .= '":"';
            $output .= base64_encode(file_get_contents($file));
            $output .= '",';
        }
    }
    $output=substr($output,0,-1);
    $output .= "}";

    if (isset($_REQUEST['tofile'])) {
	$fh = fopen('vfs_fonts.js', 'w') or die("CAN'T OPEN FILE FOR WRITING");
	fwrite($fh,$output);
	fclose($fh);
        echo 'vjs_fonts.js created';
    } else {
        echo $output;
    }
```