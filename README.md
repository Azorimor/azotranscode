# Azotranscode
Open source video transcoding service.

## Functions
- [ ] Transcode a given video into multiple formats. (360p,480p,720p, ...)
- [ ] Transcode a given video to use onother container. (mp4, mkv, webm, ...)
- [ ] Generate VTT-Subtitle files.
- [ ] Generate VTT-Sprite images.
- [ ] Generate Thumbnails.
- [ ] Load video from specified source. (ftp, s3, dropbox, ...)
- [ ] Upload generated files to specific destination.
- [ ] Allow external workers. (hosted by the end user)
- [ ] Integrations for CMS (Wordpress & Strapi)
- [ ] Use AI to categorize videos.
- [ ] Translate subtitles using external services (DeepL, Google, ...)
- [ ] VTT Online Editor
- [ ] Everything is accessable through the REST API.
- [ ] Easy deployable (docker-compose, helm chart)

## Documentation
The documentation is available [here](https://azorimor.github.io/azotranscode/):
## Architecture Overview
Azotranscode uses open source tools. We use RabbitMQ for the queue system. MinIO for the S3 buckets and docker (docker-compose / kubernetes) to run the REST API, web dashboard and the worker containers. The data is stored using a postgresql database.  
Videos are copied to the temporary video bucket. The worker containers are downloading / uploading the input / output files from this bucket. After the job is finished, all files get uploaded to the destination by another worker.  

![AWS architecture diagram](/website/static/img/diagrams/azotranscode_architecture_overview_aws_simple_v1.svg)
