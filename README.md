<div align="center">
  <img src="/docs/docs/assets/img/lilbox.svg" height="200"/>
</div>

<h1 align="center" style="margin-top: -10px"> HomeBox </h1>
<p align="center" style="width: 100;">
   <a href="https://hay-kot.github.io/homebox/">Docs</a>
   |
   <a href="https://homebox.fly.dev">Demo</a>
   |
   <a href="https://discord.gg/tuncmNrE4z">Discord</a>
</p>

## Quick Start

[Configuration & Docker Compose](https://hay-kot.github.io/homebox/quick-start)

```bash
# If using the rootless image, ensure data 
# folder has correct permissions
mkdir -p /path/to/data/folder
chown 65532:65532 -R /path/to/data/folder
docker run -d \
  --name homebox \
  --restart unless-stopped \
  --publish 3100:7745 \
  --env TZ=Europe/Bucharest \
  --volume /path/to/data/folder/:/data \
  ghcr.io/hay-kot/homebox:latest
# ghcr.io/hay-kot/homebox:latest-rootless
```

#### How to update deployed version
```bash
#remove old container
docker remove {container ID}

# Rebuild image from project root folder
docker build -t my-homebox .

# run container with new image
docker run -d --name homebox --restart unless-stopped --publish 50050:7745 --env TZ=Europe/Bratislava --volume /home/adamko/homebox-data/:/data my-homebox
```


## Credits

- Logo by [@lakotelman](https://github.com/lakotelman)
