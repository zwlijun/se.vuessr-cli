const download = require("download");
const path = require("path");
const fs = require("fs");

const resolve = file => path.resolve(__dirname, file);

const VUESSR_GIT_NAME = "se.vuessr";
const VUESSR_GIT_OWNER = "zwlijun";
const VUESSR_GIT_ARCHIVE = `https://github.com/${VUESSR_GIT_OWNER}/${VUESSR_GIT_NAME}/archive/`;
const DEVAULT_VUESSR_VERSION = "master";
const DEFAULT_PROJECT_NAME = VUESSR_GIT_NAME;

// https://github.com/zwlijun/se.vuessr/archive/master.zip
// https://github.com/zwlijun/se.vuessr/archive/v1.0.0.zip

exports.exec = function(version, name, projectPath){
    let VUESSR_VERSION = version;
    let VUESSR_PACKAGE_NAME = version;
    let PROJECT_NAME = name;
    let PROJECT_PATH = projectPath;

    if(!VUESSR_VERSION || VUESSR_VERSION instanceof Object){
        VUESSR_VERSION = DEVAULT_VUESSR_VERSION;
        VUESSR_PACKAGE_NAME = VUESSR_VERSION;
    }else{
        VUESSR_VERSION = VUESSR_VERSION;
        VUESSR_PACKAGE_NAME = "v" + VUESSR_VERSION;
    }

    if(!PROJECT_NAME || PROJECT_NAME instanceof Object){
        PROJECT_NAME = DEFAULT_PROJECT_NAME;
    }

    if(!PROJECT_PATH || PROJECT_PATH instanceof Object){
        PROJECT_PATH = resolve(".");
    }

    const VUESSR_GIT_PACKAGE = `${VUESSR_PACKAGE_NAME}.zip`;
    const VUESSR_ARCHIVE = VUESSR_GIT_ARCHIVE + VUESSR_GIT_PACKAGE;

    console.log("vuessr::version", VUESSR_VERSION);
    console.log("vuessr::name", PROJECT_NAME);
    console.log("vuessr::archive", VUESSR_ARCHIVE);
    console.log("vuessr::path", PROJECT_PATH);

    download(VUESSR_ARCHIVE, PROJECT_PATH, {
        "extract": true
    }).then((data) => {
        let proj = path.join(PROJECT_PATH, `${VUESSR_GIT_NAME}-${VUESSR_VERSION}`);
        let newProj = path.join(PROJECT_PATH, PROJECT_NAME);

        console.log("download success!");

        fs.rename(proj, newProj, (err) => {
            if(err){
                console.log('Rename error!');
                throw err;
            }

            console.log('Rename complete!');
        });        
    }).catch((err) => {
        console.error("download error!");
        throw err;
    });
};

