# -*- mode: ruby -*-
# vi: set ft=ruby :

$script = <<SCRIPT
echo I am provisioning...
date > /etc/vagrant_provisioned_at
SCRIPT

Vagrant.configure("2") do |config|
  config.vm.provision "shell", inline: $script
  config.vm.synced_folder "api-dev/", "/srv/api-dev"
end

Vagrant::Config.run do |config|
  config.vm.box = "ubuntu/trusty64"
  config.vm.box_url = "https://atlas.hashicorp.com/ubuntu/boxes/trusty64"
  config.vm.host_name = "postgresql" 

  config.vm.provision :shell, :path => "api-dev/bootstrap.sh"
  config.vm.provision :shell, inline: "start yadaguru-api-dev", run: "always"
  
  # PostgreSQL Server port forwarding
  config.vm.forward_port 5432, 15432
  config.vm.forward_port 3000, 3000

end
