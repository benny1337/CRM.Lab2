import * as React from "react";
import * as Model from '../domain/model';
import * as Modal from 'react-modal';

interface IProps {
    product: Model.IProduct;
    productWasAdded: (prod: Model.IOrderRow) => void;
    cancel: () => void;
}
interface IState {
    count?: number
}

export class AddToCartDialogue extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);

        this.okWasPressed.bind(this);
    }

    componentDidMount() {
        this.setState({
            count: 1
        });
    }

    okWasPressed() {
        var order = {
            Product: this.props.product,
            Count: this.state.count
        } as Model.IOrderRow;
        this.props.productWasAdded(order);
    }

    countChanged(noofitems: number) {
        this.setState({ count: noofitems })
    }

    render() {
        if (!this.props.product)
            return null;

        var modalstyle = {
            overlay: {
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(53, 53, 53, 0.75)'
            },
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)'
            }
        }
        var inputstyle = {
            maxWidth: "200px"
        }
        return (
            <div>
                <Modal
                    isOpen={this.props.product != null}
                    onRequestClose={this.props.cancel}
                    style={modalstyle}>
                    <div>
                        <div className="title">
                            <div className="title-content">
                                <h5>{this.props.product.Name}</h5>
                                <p>
                                    {this.props.product.Subtitle}
                                </p>
                            </div>
                        </div>
                        <p>
                            Lägga denna produkt i varukorgen för {this.props.product.Price}kr?
                        </p>

                        <div className="input-group" style={inputstyle}>
                            <span className="input-group-addon">st</span>
                            <input type="text" className="form-control" placeholder="Antal" onChange={(e) => { this.countChanged((e.target as any).value) }} />
                        </div>

                        <div className="addtocartfooter">
                            <button className="btn btn-success" onClick={() => { this.okWasPressed() } }>Ok</button>
                            <button className="btn btn-warning" onClick={() => { this.props.cancel(); } }>Avbryt</button>                            
                        </div>
                    </div>

                </Modal>

            </div>
        )
    }
}
