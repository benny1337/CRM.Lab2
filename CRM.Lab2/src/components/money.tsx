import * as React from "react";
import * as Model from '../domain/model';

interface IProps {
    money: number;
}

export class Money extends React.Component<IProps, {}> {

    constructor(props: IProps) {
        super(props);
    }

    toMoney() {
        let n = 2, x = 3, s = '.', c = ',';

        var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
            num = this.props.money.toFixed(Math.max(0, ~~n));

        return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ',')) + " kr";        
    }

    render() {

        return (
            <span>
                {this.toMoney()}
            </span>
        )
    }
}
