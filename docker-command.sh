#!/bin/sh

start_serve() {
    echo -e "\e[32m\n\nStart server\n\e[0m"
    npm run dev
}

if [ ! -d "$PWD/node_modules" ]; then
    echo -e "\nStart downloading node_module..."
    npm install
    echo -e "\nDownloaded node_module\n"
    start_serve
else
    start_serve
fi
