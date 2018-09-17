export const isEmptyObj = obj => {
    let arr = Object.keys(obj);
    let isEmpty = arr.length === 0 ? true : false;
    return isEmpty;
}