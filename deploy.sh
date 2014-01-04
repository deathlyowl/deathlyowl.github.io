#!/bin/bash
jekyll build
scp -r _site/* deathlyowl.com:/var/www/deathlyowl.com/
