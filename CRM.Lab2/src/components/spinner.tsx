import * as React from "react";
import * as Model from '../domain/model';

interface IProps {
    isLoading: boolean;
}

interface IState {
    dots: string;
}

export default class Spinner extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);       
    }

    componentDidMount() {
        this.setState({
            dots: ""
        });
    }

    dots() {
        if (!this.props.isLoading)
            return;
        var self = this;
        setTimeout(function () {
            var dots = self.state.dots + ".";
            if (dots.length > 4)
                dots = "";
            self.setState({ dots: dots });            
        }, 100);
    }

    render() {
        if (!this.props.isLoading || !this.state)
            return null;
        var self = this;        
                
        self.dots();
        return (
            <div>
                loading{self.state.dots}
            </div>
        )
    }
}