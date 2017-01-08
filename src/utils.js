
export function getBaseUrl(removeEnidngSlash = false) {
    let re = new RegExp(/^.*\//);
    let BASE_URL = re.exec(window.location.pathname).toString();
    
    if (removeEnidngSlash && _.endsWith(BASE_URL, '/')) BASE_URL = BASE_URL.substring(0, BASE_URL.length - 1); //remove ending '/'
    return BASE_URL; 
}






