#!/bin/bash
rm -f code.zip
zip -r code.zip * -x "node_modules/*" "scripts"
