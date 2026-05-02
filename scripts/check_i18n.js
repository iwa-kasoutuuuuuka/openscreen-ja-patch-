const fs = require('fs');
const path = require('path');

const localesPath = path.join(__dirname, '../src/i18n/locales');
const enPath = path.join(localesPath, 'en');
const jaPath = path.join(localesPath, 'ja-JP');

const files = fs.readdirSync(enPath);

files.forEach(file => {
    const enContent = JSON.parse(fs.readFileSync(path.join(enPath, file), 'utf8'));
    const jaFilePath = path.join(jaPath, file);
    
    if (!fs.existsSync(jaFilePath)) {
        console.log(`Missing file in ja-JP: ${file}`);
        return;
    }
    
    const jaContent = JSON.parse(fs.readFileSync(jaFilePath, 'utf8'));
    
    function compare(en, ja, prefix = '') {
        Object.keys(en).forEach(key => {
            const fullKey = prefix ? `${prefix}.${key}` : key;
            if (ja[key] === undefined) {
                console.log(`Missing key in ja-JP/${file}: ${fullKey}`);
            } else if (typeof en[key] === 'object' && en[key] !== null) {
                compare(en[key], ja[key], fullKey);
            }
        });
    }
    
    compare(enContent, jaContent);
});
