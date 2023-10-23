
interface StructureObject {
    [key: string]: any;
}

export function compareObjectsEqualKeys<T extends StructureObject>(obj1: T, obj2: T): boolean {
    // Проверяем, что типы obj1 и obj2 совпадают
    if (typeof obj1 !== typeof obj2) {
        return false;
    }

    // Далее выполняем сравнение по ключам
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
        return false;
    }

    for (const key of keys1) {
        if (!keys2.includes(key) || obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}
