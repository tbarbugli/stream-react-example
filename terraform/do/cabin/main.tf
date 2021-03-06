#
# Provider
#

provider "digitalocean" {
  token = "${var.token}"
}

#
# Template
#

resource "template_file" "pm2_processes_conf" {
  template = "${file("${path.module}/templates/processes.tpl")}"

  vars {
    JWT_SECRET = "${var.JWT_SECRET}"
    MAPBOX_ACCESS_TOKEN = "${var.MAPBOX_ACCESS_TOKEN}"
    S3_KEY = "${var.S3_KEY}"
    S3_SECRET = "${var.S3_SECRET}"
    S3_BUCKET = "${var.S3_BUCKET}"
    STREAM_APP_ID = "${var.STREAM_APP_ID}"
    STREAM_KEY = "${var.STREAM_KEY}"
    STREAM_SECRET = "${var.STREAM_SECRET}"
    ALGOLIA_APP_ID = "${var.ALGOLIA_APP_ID}"
    ALGOLIA_SEARCH_ONLY_KEY = "${var.ALGOLIA_SEARCH_ONLY_KEY}"
    ALGOLIA_API_KEY = "${var.ALGOLIA_API_KEY}"
    KEEN_PROJECT_ID = "${var.KEEN_PROJECT_ID}"
    KEEN_WRITE_KEY = "${var.KEEN_WRITE_KEY}"
    KEEN_READ_KEY = "${var.KEEN_READ_KEY}"
  }
}

resource "template_file" "userdata_web" {
  template = "${file("${path.module}/templates/web.tpl")}"

  vars {
    userdata_sshkey = "${var.sshkey}"
    userdata_nginx_conf = "${base64encode(file("${path.module}/files/cabin-web-nginx.conf"))}"
    userdata_mysql_init = "${base64encode(file("${path.module}/files/cabin_mysql_init.sh"))}"
    userdata_pm2_conf = "${base64encode("${template_file.pm2_processes_conf.rendered}")}"
  }
}

#
# SSH key
#

resource "digitalocean_ssh_key" "cabin-ssh-key" {
  name = "Cabin"
  public_key = "${var.sshkey}"
}

#
# Web instance
#

resource "digitalocean_floating_ip" "cabin-web-ip" {
  droplet_id = "${digitalocean_droplet.cabin-web.id}"
  region = "${var.region}"
}

resource "digitalocean_droplet" "cabin-web" {
  image = "ubuntu-14-04-x64"
  name = "cabin-web"
  region = "${var.region}"
  size = "2gb"
  ssh_keys = [ "${digitalocean_ssh_key.cabin-ssh-key.id}" ]
  user_data = "${template_file.userdata_web.rendered}"
}
