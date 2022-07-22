#### Pre-requisites

Install [Docker desktop](https://www.docker.com/products/docker-desktop/)
Make sure your project root is available as a location that Docker desktop can see. `./data/db` is used as a volume to host database files for MongoDb

Go to:

Preferences > Resources > File Sharing

and check the root directory is in the list e.g. if your project is in `/Users/username/poolfoundation/marketplace-server` then `Users` should be in the list. Add the root if it's not there.


#### Start

Run `yarn db:start`  That will build the app and create the empty db

#### Fill with data

Run `yarn db:seed`  This approach uses files held in uploads and generates a copy for each loaded dataset.

#### Stop

Run `yarn db:stop`

#### Clear data

Run `yarn db:purge`


TODOS:
- Check if all the data created correctly
- Write tests
- add eslint & prettier
- Remove create/clear controllers from the BE repo