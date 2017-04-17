var customMatchers = {
    toBeASGenerateCustomerProblemReport: function(util, customEqualityTesters){
        var result = {
            pass: true,
            message: 'TODO OK!'
        };
        var errInObj = function(actual, expected){
            for(var key in expected){
                if(actual[key]===void(0)){
                    result =  {
                        pass: false,
                        message: "La key \""+key+"\" no existe en el obj " + JSON.stringify(actual)
                    };
                    return false;
                }else{
                    var value = actual[key];

                    if(angular.isObject(value) || angular.isArray(value)){

                        if(value.length===void(0)){
                            errInObj(actual[key], expected[key]);
                        }else{

                            for(var i=0;i<value.length; i++){
                                if(actual[key][i]===void(0)){
                                    result=  {
                                        pass: true,
                                        message: "<b>LA KEY</b>: "+key+" no existe en actual position : "+JSON.stringify(actual)
                                    };
                                    return;
                                }else{
                                    errInObj(actual[key][i], expected[key][i]);
                                }

                            }
                        }
                    }else{
                        if(actual[key]!==expected[key]){
                            result = {
                                pass: false,
                                message: "El valor actual en key \""+key+"\" es de "+actual[key]+" debe ser "+expected[key]
                            };
                            return;
                        }
                    }
                }

            }
           return;
        };
        return {
            compare: function(actual, expected) {
                errInObj(actual, expected);
                ///and inverse appont matcher
                errInObj(expected, actual);
                return result;
            }
        };
    }
};