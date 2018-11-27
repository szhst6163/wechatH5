/**
 * Created by Simon on 2017/10/12.
 * localStorage 存储
 */

import {isObject, isArray, isString, isUndefined} from '@/lib/dataType'

export default {
    put (key, val) {
        window.localStorage.setItem(key, (isObject(val) || isArray(val)) ? `{"_OBJECT_ARRAY_": ${JSON.stringify(val)}}` : val);
    },
    get (key) {
        const result = window.localStorage.getItem(key);
        return isString(result) && result.includes("_OBJECT_ARRAY_") ? JSON.parse(result)["_OBJECT_ARRAY_"] : result;
    },
    clear (key) {
        if(isUndefined(key)){
            window.localStorage.clear();
        }else{
            window.localStorage.removeItem(key);
        }
    }
}
