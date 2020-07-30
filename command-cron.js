const fs = require('fs');
const fetch = require('node-fetch');


jsonFileDIR = './receivedFromAPI.json';



try {
    const JSONFile = fs.readFileSync(jsonFileDIR)
    console.log(JSONFile);
    const dataFromAPIfile = JSON.parse(JSONFile)
    console.log(dataFromAPIfile);
} catch (err) {
    console.log(err)
    return
}

const orderId = 'EP001854032N';

fetch(`https://api.enviopack.com/tracking?tracking_number=${orderId}`)
    .then(res => res.json())
    .then(res => {

        console.log('api response - res:', res[0].tracking);

        console.log('dataFromAPIfile', dataFromAPIfile[0].tracking);

        dataFromAPIfile[0].tracking != res[0].tracking ?
            (writedataFromAPI(JSON.stringify(res)))
            : console.log('no difference between existing data and api response');;

    })

writedataFromAPI = (data) => {
    dataFromAPIfile = fs.writeFileSync(
        jsonFileDIR,
        data,
        (err => {
            if (err) {
                console.log("File write failed:", err)
                return
            }
            console.log('success writing JSON file:')
        })
    )
}
