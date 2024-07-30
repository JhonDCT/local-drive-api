#!/bin/bash

echo "Moving files..."

while getopts "r:p:e:" arg; do
  case $arg in
    r) resource_dir="$OPTARG";;
    p) password="$OPTARG";;
    e) emby_dir="$OPTARG";;
  esac
done

# sudo password in line 
# echo Xanandra123 | sudo -S <command>
# echo "$password" | sudo -S mv -r "$resource_dir" "$emby_dir"
mv -v "$resource_dir" "$emby_dir"

echo "Resource dir: $resource_dir"
echo "Password: $password"
echo "Emby dir: $emby_dir"
echo "Done!"