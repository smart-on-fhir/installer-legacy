## Get started with one line, using Vagrant

The three prerequisites, which are available on Mac, Windows, and Linux 
are (we have tested with the versions below, but other versions may be fine too):

1. [VirtualBox 4.3.12](https://www.virtualbox.org/wiki/Downloads)
2. [Vagrant 1.6.2](http://www.vagrantup.com/downloads)
3. [Ansible 1.6.1](http://docs.ansible.com/intro_installation.html)

Once you have Virtualbox and Vagrant installed on your machine, you can:

```
vagrant plugin install vagrant-vbguest
git clone https://github.com/smart-on-fhir/installer
cd installer
vagrant up
```

... wait ~20min while everything installs (depending on your Internet connection speed).

Now visit in a web browser on your local ("host") machine:

 * `http://localhost:9080`  for a FHIR API server
 * `http://localhost:9085`  for an OAuth2 authorization server
 * `http://localhost:9090`  for a SMART apps server

The authorization server uses the OpenLDAP server running on the virtual machine. 
The two sample accounts are `demo/demo` and `admin/password` by default. You should change
these for production environments. You can connect to the LDAP server on `localhost:1389`.

You can poke around the virtual machine by doing:

```
vagrant ssh
```

And when you're done you can shut the virtual machine down with:

```
vagrant halt
```

---

## Building SMART-on-FHIR on fresh Ubuntu 14.04 machine (without Vagrant)

```
apt-get update
apt-get install curl git python-pycurl python-pip python-yaml python-paramiko python-jinja2
pip install ansible==1.6
git clone https://github.com/smart-on-fhir/installer
cd installer/provisioning
```

At this point, you probably want to edit `custom_settings.yml` or pass a
vars file with settings that suit your needs.  For example, change `localhost`
to some world-routable hostname if that's what you need -- and set the
app_server public port to 80.

```
ansible-playbook  -c local -i 'localhost,' -vvvv smart-on-fhir-servers.yml 
```

---

## Notes

By default, the install process will not enable SSL. To enable SSL for specific services, you can set the following variables to `true`:

* `auth_server_secure_http`: Authorization server
* `fhir_server_secure_http`: API server
* `app_server_secure_http`: App server
 
What certificates will be used? You have two options:

1. Set `use_custom_ssl_certificates: true` and `custom_ssl_certificate_path: /path/to/cert/dir`. For an example, see our [testing server settings](provisioning/ci-server.yml#L5). And for an example of what the directory layout should look like, [see here](provisioning/examples/certificates).

2. If you set `use_custom_ssl_certificates: false`, the installer will geneate self-signed SSL certificates.
Please note that with self-signed certificates, you will get a number of trust warning in your
web browser that can be resolved by adding certificate exceptions in your browser, or updating your CA list on
a client by client basis. Before you even try the apps, you should probably load the
API server and add the self-signed certificate to your browser's security exceptions.
