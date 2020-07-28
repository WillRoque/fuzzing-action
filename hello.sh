#!/bin/sh -l

printenv
echo "1 Hello $1"
echo "2 Hello ${WHO_TO_GREET}"
echo "3 Hello ${INPUT_WHOTOGREET}"
time=$(date)
echo "::set-output name=time::$time"