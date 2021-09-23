const fs = require('fs');

function generateResource() {
    let folders = ['assets', 'assets/images', 'server', 'client', 'shared']
    let files = ['server/main.lua', 'client/main.lua', 'shared/config.lua']
    let xmlContent = '<meta>\n'

    folders.forEach(folder => {
        if (!fs.existsSync('./' + folder)) {
            fs.mkdirSync('./' + folder)
        }
    })

    files.forEach(function(file, index) {
        let fileDir = file.split('/')[0]
        let fileName = file.split('/')[1]
        if (!fs.existsSync(`${fileDir}/${fileName}`)) {
            fs.writeFileSync(`${fileDir}/${fileName}`, '')
        }

        let type = ""
        if (fileDir == 'client' || fileDir == 'shared') {
            type = "type='client' cache='false'"
        } else {
            type = "type='server'"
        }

        xmlContent += `     <script src='${fileDir}/${fileName}' ${type} />\n`

        if ((index + 1) == files.length) {
            xmlContent += '</meta>'
        }
    })

    fs.writeFileSync('meta.xml', xmlContent)
}

generateResource()