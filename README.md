# Code-Inline Instructions

* Download/Pull files from Repo.
* Access the project folder using cmd/terminal and type `npm init -y && npm install`
* Make sure dependencies are all installed (it should generate a `node_modules` folder)
  otherwise, remove `package-lock.json` and type `npm init -y && npm install` again
* Once done, create a new folder named `creatives`


## How it works.
* add the files in the creative folder

![Setting Creatives](https://storage.googleapis.com/adlib-storage/code-inline/Screen%20Shot%202020-11-20%20at%207.41.52%20AM.png)

* type in the terminal `npm run adlib`, make sure you are in the project folder.
* check the result in the output folder

![Checking Output](https://storage.googleapis.com/adlib-storage/code-inline/Screen%20Shot%202020-11-20%20at%207.48.24%20AM.png)

## Sample output

##### Uncompressed

![Uncompressed](https://storage.googleapis.com/adlib-storage/code-inline/uncompressed.png)

##### Compressed

![Compressed](https://storage.googleapis.com/adlib-storage/code-inline/compressed.png)


## Requirements

* NodeJS

## Packages
* web-resource-inliner `npm install web-resource-inliner`
* js-beautify `npm install js-beautify`
