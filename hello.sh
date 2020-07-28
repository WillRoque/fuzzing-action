#!/bin/sh -l

echo "Hello $1"
printenv
time=$(date)
echo "::set-output name=time::$time"