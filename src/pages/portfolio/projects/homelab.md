---
layout:  /src/layouts/ProjectLayout.astro
title: 'It''s Homelabbing Time!'
pubDate: 2025-10-22
description: 'Creating a homelab to automate processes and keeping my full autonomy from the Cloud!'
languages: []
image:
  url: "/images/projects/homelab.png"
  alt: "Home Lab Image"
--- 

After 2 years of doing Smart Home related operations, I realized that the Raspberry Pi couldn't handle my operational needs anymore. That is when I started pivoting towards a homelab setup.

My Homelab currently consists of a NAS server running Proxmox. The underlying NAS software is TrueNAS with NFS shares configured for use by the other Virtual Machines in Proxmox.

The NAS server hosts various Quality of Life (QoL) applications for automations, storage, authentication, and monitoring. This includes automatic security patches, storing backups and photos, OAuth authentication, and the Prometheus/Grafana stack.

## 📃 Related Blogs

- Setting up a proper TrueNAS setup in Proxmox (Coming Soon)
- Internal Services - Seperating internal and external (Coming Soon)

## 🖧 Infrastructure

*Coming Soon*

## 🔮 Future Plans

I am currently thinking of expanding my homelab's networking capabilities. From proper subnetting of networks to security ACLs for a more controlled and safe network infrastructure.