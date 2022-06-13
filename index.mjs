import fs from 'fs';

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