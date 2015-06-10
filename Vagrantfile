# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.hostname = "smart-on-fhir"

  config.vm.box = "ubuntu/trusty64"
  config.vm.box_url = "http://cloud-images.ubuntu.com/vagrant/trusty/current/trusty-server-cloudimg-amd64-vagrant-disk1.box"

  config.vm.provider :virtualbox do |vb|
    vb.customize ["modifyvm", :id, "--memory", "2048"]
    vb.customize ["modifyvm", :id, "--natdnshostresolver1", "on"]
    vb.customize ["modifyvm", :id, "--natdnsproxy1", "on"]
  end

  config.vm.network :forwarded_port, guest: 9080, host: 9080
  config.vm.network :forwarded_port, guest: 9085, host: 9085
  config.vm.network :forwarded_port, guest: 9090, host: 9090
  config.vm.network :forwarded_port, guest: 9095, host: 9095
  config.vm.network :forwarded_port, guest: 389, host: 1389
#  config.vm.network :forwarded_port, guest: 9999, host: 9999
  config.vm.network "private_network", ip: "192.168.50.4"
  
  config.vm.provision "shell", path: "provisioning/fetch-templates.sh", args: ["/vagrant/provisioning/roles/common/templates/config","master"]

  config.vm.provision "ansible" do |ansible|
    #ansible.verbose = "vvvv"
    #ansible.tags=["load_apps"]
    ansible.playbook = "provisioning/smart-on-fhir-servers.yml"
  end

end
