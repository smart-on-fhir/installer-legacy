
cd ./installer/provisioning
sudo service api-server-open stop
ansible-playbook  -c local -i 'localhost,'  smart-on-fhir-servers.yml
sudo service api-server-open start
