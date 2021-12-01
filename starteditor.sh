#! /bin/bash
echo "Starting web-page on localhost..."
gnome-terminal --working-directory=/home/terry/React/test-suite-editor -e 'npm start'

echo "Launching server..."
gnome-terminal --working-directory=/home/terry/React/test-suite-server -e 'npm start'

