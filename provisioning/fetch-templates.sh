#!/bin/bash

dir=${1-roles/common/templates/config}
branch=${2-master}

# Download configuration templates for SMART Apps
mkdir $dir
echo Downloading Configuration Templates
wget -q https://raw.githubusercontent.com/smart-on-fhir/apps/$branch/static/fhirStarter/apps.json.default -O $dir/apps.json.j2
wget -q https://raw.githubusercontent.com/smart-on-fhir/apps/$branch/static/fhirStarter/services.js.default -O $dir/services.js.j2