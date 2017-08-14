
// Fetch helper with error handling
export function API_Call(apiFctName, data) {
    data = typeof data == "undefined" ? {} : data;
    return new Promise((resolve, reject) => {
        let promise = fetch('/api/' + apiFctName, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
            if (response.success) {
                resolve(response.data);
            } else {
                console.error(`API Error - Function "${apiFctName}": \n> ${response.message}`);
            }
        })
        .catch(function(error) {
            console.error(`API Could not fetch - Function "${apiFctName}": \n> ${error.message}`);
        });
    });
}

export default {
    TestOk: (data) => {
        return API_Call('test', data).catch(error => {console.error(error)});
    },
    TestKo: () => {return API_Call('bad_path', {a:123})},
    TestKo2: () => {return API_Call('http://youtube.com/$£', {b:456})}
};
