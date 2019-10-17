<div align=center>
    <h1 align=center>
        <img align=center
            src="https://github.com/QAB-LABS/QAB-HUB/blob/master/client/public/logo-placeholder.png?raw=true"
            alt="QAB-HUB logo">
        <br>
        QAB HUB
        <br>
    </h1>
    <p style="font-size: 1.35rem; font-weight: 500; padding: 2rem; text-align: center">TBD</p>
    <br>
    <a align=center href="https://heroku.com/deploy?template=https://github.com/QAB-LABS/QAB-HUB/">
        <img alt="deploy" src="https://www.herokucdn.com/deploy/button.png">
    </a>
    <br>
    <a align=center href="https://codeclimate.com/github/QAB-LABS/QAB-HUB/maintainability">
        <img src="https://api.codeclimate.com/v1/badges/c47607ce54e6f401a1de/maintainability" />
    </a>
    <a align=center href="https://codeclimate.com/github/QAB-LABS/QAB-HUB/test_coverage">
        <img src="https://api.codeclimate.com/v1/badges/c47607ce54e6f401a1de/test_coverage" />
    </a>
    <a align=center href="https://www.gnu.org/licenses/gpl-3.0">
        <img src="https://img.shields.io/badge/License-GPLv3-blue.svg" />
    </a>
    <a align=center href="https://dev.azure.com/QAB-LABS/BoardGameSiloAPI">
        <img src="https://dev.azure.com/QAB-LABS/BoardGameSiloAPI/_apis/build/status/boardgamesiloapilinux%20-%20CI?branchName=master" />
    </a>
</div>

# Setup

### Installation

*   Clone the [repo]('https://github.com/QAB-LABS/QAB-HUB/tree/dev')
*   Install the server dependencies with: `` `npm install` ``
*   Run the local backend server and react frontend server using `` `npm start` ``
*   Open `` `http://localhost:3000` `` and Have fun!

### Environment Variables

#### Set up API Access

*   Create a [Mongo DB Cluster](https://cloud.mongodb.com/)
*   Create a [Heroku App]('https://heroku.com')
*   Create a [Cloudinary API Key](https://cloudinary.com/?utm_source=google&utm_medium=cpc&utm_campaign=brand&utm_content=300704534040&utm_term=cloudinary&gclid=Cj0KCQjw_absBRD1ARIsAO4_D3tfpMaU3ai8tA7FoE0DdxrbsK5xSMaShens1Tn-QYQD7z9-d2mgc_kaApegEALw_wcB)
*   Create a [BoardGameAtlas API Key](https://www.boardgameatlas.com)
*   Set the following environment variables on | [mac](https://stackoverflow.com/questions/7501678/set-environment-variables-on-mac-os-x-lion) | [windows](https://superuser.com/questions/1334129/setting-an-environment-variable-in-windows-10-gpodder) | [linux](https://stackoverflow.com/questions/45502996/how-to-set-environment-variable-in-linux-permanently) |
*   ^ Or just use a .env file in the server directory

| Environment Variables        | Description                                         |
| ---------------------------- |:--------------------------------------------------- |
| PORT                         | Port for the backend express server                 |
| MONGODB_URI                  | URI to log into mongodb                             |
| GOOGLEMAPS_API_KEY           | API Key for google maps.|
| BOARDGAMEATLAS_API_KEY       | BoardGameAtlas API KEY                              |
| BOARDGAMEATLAS_API_SECRET    | BoardGameAtlas API SECRET                           |
| CLOUDINARY_API_NAME          | Cloudinary API cloud name                           |
| CLOUDINARY_API_KEY           | Cloudinary API Key                                  |
| CLOUDINARY_API_SECRET        | Cloudinary API Secret                               |
| NODE_ENV                     | (Optional) Can be Production to set production mode |
| SESSION_SECRET               | (Optional) Secret phrase for Session                |
# Authors

* [Bob Wang](https://github.com/bobbypwang)
* [Andres Weber](https://github.com/AndresMWeber)
* [Qiwei Lin](https://github.com/kiwi-x-kiwi)

