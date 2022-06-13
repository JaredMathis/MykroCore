import path from 'path';
import fs from 'fs';
import axios from 'axios'

export function file_exists(file) {
    return fs.promises.access(file, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false)
}

export function string_replace_any(s, searches, replacement) {
    for (let search of searches) {
        s = s.replaceAll(search, replacement)
    }
    return s;
}

export function js_sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
  
export function object_to_array(o) {
    return Object.keys(o).map(key => ({ key, value: o[key] }));
}

export async function file_read_json(file_path) {
    return JSON.parse(await fs.promises.readFile(file_path));
}

function path_dowloads_get() {
    return './downloads/'
} 

export function http_save(url) {
    let file_path = path.join(
        path_dowloads_get(),
        path_http_to_file(url));
    return {
        file_path,
        url,
        get: async () => {
            if (!await file_exists(file_path)) {
                await js_sleep(3000 + Math.random() * 3000);

                let response = await axios.get(url);
                await fs.promises.writeFile(file_path, response.data);
            }
            let result = await fs.promises.readFile(
                file_path, 'utf8');

            return result;
        }
    };
}

function path_http_to_file(url) {
    return string_replace_any(url, [':', '/'], '_');
}
  