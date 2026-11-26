#!/bin/bash
git checkout develop
gcloud builds submit --project "ramssol-internal-environment" --config=./dev-cloud-build.yml
gcloud beta run deploy dev-fund-liff-gift-frontend --region asia-southeast1 --platform managed --allow-unauthenticated --image asia-southeast1-docker.pkg.dev/ramssol-internal-environment/asia/dev-fund-liff-gift-frontend --project ramssol-internal-environment --concurrency 80 --max-instances 1
