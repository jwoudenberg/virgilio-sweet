macro (@execute) {
    case { _ ($action) } => {
        return #{
            @execute($action, _result)
            }
    }
    case { $name ($action, $arg1:expr (,) ...) } => {
        var test = makeIdent('_result', #{$name});
        letstx $test = [test];
        return #{
            .then(function($test) {
                    var virgilio = this;
                    return virgilio.execute($action, $arg1 (,) ...);
                    })
            }
    }
}
export (@execute);

macro (@use) {
    rule {
        $module
    } => {
        .loadModule(require('virgilio-'+$module))
    }
}
export (@use)
