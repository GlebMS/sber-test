docker load -i sber-test-image.tar

docker stop sber-test-image_container 2>/dev/null 
docker rm sber-test-image_container 2>/dev/null

docker run -d -p 3000:3000 --name sber-test-image_container sber-test-image

echo "Running on port 3000"