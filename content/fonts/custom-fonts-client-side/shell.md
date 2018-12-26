+++
title = "Building font file via shell script"
description = ""
weight = 11
alwaysopen = true
+++


For a complete description of use custom fonts in client-side, read the article: [Custom fonts (client-side)](/docs/fonts/custom-fonts-client-side/)

If you don't want to install gulp and/or just downloaded pdfMake and want to use custom fonts in client-side, you can generate the `vfs_fonts.js` with an bash-script as well:

```sh
#!/bin/sh

if [ -t 1 ]; then
	target="vfs_fonts.js"
else
	target="/dev/stdout"
fi

(
	echo -n "this.pdfMake = this.pdfMake || {}; this.pdfMake.vfs = {"
	for file in "$@"; do
		file=$1
		shift
		echo -n '"'
		echo -n "$(basename $file)"
		echo -n '":"'
		echo -n "$(base64 -w 0 $file)"
		echo -n '"'
		if [ "$#" -gt 0 ]; then
			echo -n ","
		fi
	done
	echo -n "};"
) > "$target"
```

How to use script:
```sh
script.sh font1.ttf font2.ttf font3.ttf
```

If you are using a mac you need to change this line
```
		echo -n "$(base64 -w 0 $file)"
```

to (change the flag from `-w` to `-b`)

```
		echo -n "$(base64 -b 0 $file)"
```

GNU coreutils' `base64` seems to differ to Apple's `base64` in this flag (which prevents line wrapping).