import fs from 'fs';
import path from 'path';
import i18n from 'i18n';

export default function t(key: string, fileAddress) {
    if (!i18n.getLocale()) {
        // Translate Config
        i18n.configure(Config.language);
    }

    // get lang from i81n
    const lang = i18n.getLocale();
    // get All translations
    const translations: any = i18n.getCatalog(lang);
    // generate address
    const fileName = path.basename(fileAddress).split('.')[0].toLowerCase();
    const folderName = path.basename(fileAddress).split('.')[1];
    const address = `${folderName}.${fileName}.${key.toLowerCase()}`;
    // add new translate
    if (!checkAddressExist(translations, address)) {
        setValue(translations, address, key).then(() => {
            fs.writeFileSync(`./resource/locales/${lang}.json`, JSON.stringify(translations, null, 2));
        });
    }
    return getTranslate(translations, address);
}

async function setValue(object, path, value) {
    const way = path.replace(/\[/g, '.').replace(/\]/g, '').split('.');
    const last = way.pop();
    way.reduce(function (o, k, i, kk) {
        return (o[k] = o[k] || (isFinite(i + 1 in kk ? kk[i + 1] : last) ? [] : {}));
    }, object)[last] = value;
}

function getTranslate(json: any, address: string): string {
    const [currentPart, ...remainingParts] = address.split('.');
    const currentValue = json[currentPart];
    if (remainingParts.length === 0) {
        return currentValue;
    } else {
        return getTranslate(currentValue, remainingParts.join('.'));
    }
}

function checkAddressExist(json: any, address: string): boolean {
    const [currentPart, ...remainingParts] = address.split('.');
    // eslint-disable-next-line no-prototype-builtins
    if (!json.hasOwnProperty(currentPart)) {
        return false;
    }
    const currentValue = json[currentPart];
    if (remainingParts.length === 0) {
        return true;
    } else {
        return checkAddressExist(currentValue, remainingParts.join('.'));
    }
}
