#!/bin/bash
commitid=`git rev-parse --short HEAD`
dockerimage=devccrpdf.azurecr.io/prd-azf-docker-fund-gift-frontend:$commitid
echo "Image Name: $dockerimage"

docker buildx build --platform linux/amd64 -t $dockerimage --rm --pull -f Dockerfile ./

az acr login --name devccrpdf
docker push $dockerimage
az functionapp config container set -n prd-azf-docker-fund-gift-frontend -g prd-pine --image $dockerimage
echo "Image Name: $dockerimage"
echo "Commit ID: $commitid"
