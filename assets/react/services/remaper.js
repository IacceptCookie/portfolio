export function renameKeys(obj, mapping) {
    for (const [oldKey, newKey] of Object.entries(mapping)) {
        if (obj.hasOwnProperty(oldKey)) {
            obj[newKey] = obj[oldKey];
            delete obj[oldKey];
        }
    }
    return obj;
}

export function dataURLtoFile(dataUrl, filename = "image.png") {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1]; // ex: "image/png"
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}