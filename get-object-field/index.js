module.exports = function getObjField(obj, def) {
    def = def !== undefined ?  def : undefined;
    var getField = function(field) {
        if (field !== undefined) {
            // 字段值为 undefined 或 null 都会使用默认值
            if (obj && obj[field] !== undefined && obj[field] !== null) {
                obj = obj[field];
            } else {
                obj = def;
            }
            return getField;
        }
        return obj;
    };
    getField.toString = function() {
        return obj;
    };
    getField.valueOf = function() {
        return obj;
    };
    return getField;
}