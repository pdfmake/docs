+++
title = "Building font file via shell script"
description = ""
weight = 11
alwaysopen = false
+++


For a complete description of use custom fonts in client-side, read the article: [Custom fonts (client-side) > via Virtual file system (VFS)](/docs/0.3/fonts/custom-fonts-client-side/vfs/)

If you don't want to install nodejs and/or just downloaded pdfMake and want to use custom fonts in client-side, you can generate the `vfs_fonts.js` with an bash-script as well:

```sh
#!/bin/sh

if [ -t 1 ]; then
	target="vfs_fonts.js"
else
	target="/dev/stdout"
fi

(
	echo "var vfs = {"
	for file in "$@"; do
		file=$1
		filename=$(basename $file)
		filecontent=$(base64 -w 0 $file)
		shift
		echo "\"${filename}\":\"${filecontent}\""
		if [ "$#" -gt 0 ]; then
			echo ","
		fi
	done
	echo "}"
	echo "; var _global = typeof window === 'object' ? window : typeof global === 'object' ? global : typeof self === 'object' ? self : this; if (typeof _global.pdfMake !== 'undefined' && typeof _global.pdfMake.addVirtualFileSystem !== 'undefined') { _global.pdfMake.addVirtualFileSystem(vfs); } if (typeof module !== 'undefined') { module.exports = vfs; }"
) > "$target"
```

How to use script:
```sh
script.sh font1.ttf font2.ttf font3.ttf
```

If you are using a mac you need to change this line
```
		filecontent=$(base64 -w 0 $file)
```

to (change the flag from `-w` to `-b`)

```
		filecontent=$(base64 -b 0 $file)
```

GNU coreutils' `base64` seems to differ to Apple's `base64` in this flag (which prevents line wrapping).
